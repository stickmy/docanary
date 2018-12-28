// Remove the raw HTML but reserve the HTML wrapped by `<code>`.
// e.g.
// "<a> b" => "b"
// "`<a>` b" => "`<a>` b"

module.exports = str => {
	return String(str).replace(/(^|[^><`])<.*>([^><`]|$)/g, '$1$2');
};
