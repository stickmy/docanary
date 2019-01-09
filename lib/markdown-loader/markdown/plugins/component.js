// TODO: Support react component in markdown.

const blockNames = require('markdown-it/lib/common/html_blocks');
const HTML_OPEN_CLOSE_TAG_RE = require('markdown-it/lib/common/html_re')
	.HTML_OPEN_CLOSE_TAG_RE;

// An array of opening and corresponding closing sequences for html tags,
// last argument defines whether it can terminate a paragraph or not
const HTML_SEQUENCES = [
	[/^<(script|pre|style)(?=(\s|>|$))/i, /<\/(script|pre|style)>/i, true],
	[/^<!--/, /-->/, true],
	[/^<\?/, /\?>/, true],
	[/^<![A-Z]/, />/, true],
	[/^<!\[CDATA\[/, /\]\]>/, true],
	// PascalCase Components
	[/^<[A-Z]/, />/, true],
	// custom elements with hyphens
	[/^<\w+\-/, />/, true],
	[
		new RegExp('^</?(' + blockNames.join('|') + ')(?=(\\s|/?>|$))', 'i'),
		/^$/,
		true,
	],
	[new RegExp(HTML_OPEN_CLOSE_TAG_RE.source + '\\s*$'), /^$/, false],
];

module.exports = md => {
	md.block.ruler.at('html_block', htmlBlock);
};

function htmlBlock(state, startLine, endLine, silent) {
	let i, nextLine, lineText;
	let pos = state.bMarks[startLine] + state.tShift[startLine];
	let max = state.eMarks[startLine];

	// if it's indented more than 3 spaces, it should be a code block
	if (state.sCount[startLine] - state.blkIndent >= 4) {
		return false;
	}

	if (!state.md.options.html) {
		return false;
	}

	if (state.src.charCodeAt(pos) !== 0x3c /* < */) {
		return false;
	}

	lineText = state.src.slice(pos, max);

	for (i = 0; i < HTML_SEQUENCES.length; i++) {
		if (HTML_SEQUENCES[i][0].test(lineText)) {
			break;
		}
	}

	// End of HtmlSequences
	if (i === HTML_SEQUENCES.length) {
		return false;
	}

	if (silent) {
		// true if this sequence can be a terminator, false otherwise
		return HTML_SEQUENCES[i][2];
	}

	nextLine = startLine + 1;

	// If we are here - we detected HTML block.
	// Let's roll down till block end.
	if (!HTML_SEQUENCES[i][1].test(lineText)) {
		for (; nextLine < endLine; nextLine++) {
			if (state.sCount[nextLine] < state.blkIndent) {
				break;
			}

			pos = state.bMarks[nextLine] + state.tShift[nextLine];
			max = state.eMarks[nextLine];
			lineText = state.src.slice(pos, max);

			if (HTML_SEQUENCES[i][1].test(lineText)) {
				if (lineText.length !== 0) {
					nextLine++;
				}
				break;
			}
		}
	}

	state.line = nextLine;

	const token = state.push('html_block', '', 0);
	token.map = [startLine, nextLine];

	const componentLine = state.getLines(
		startLine,
		nextLine,
		state.blkIndent,
		true,
	);
	const componentName = componentLine.substr(1, componentLine.indexOf('>') - 1);
	token.content =
		`<!--InjectComponentStart:${componentName}-->` +
		componentLine +
		`<!--InjectComponentEnd:${componentName}-->`;

	return true;
}