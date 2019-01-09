const globby = require('globby');
const fs = require('fs-extra');

module.exports = async function loadComponent({
	siteDir,
	siteConfig,
	componentsDir,
	componentsRelative,
}) {
	if (!fs.existsSync(componentsDir)) {
		return {
			rawString: `export default {}`,
			injectComponents: Object.keys(components),
		};
	}

	const componentFiles = await globby(['**/index.js'], {
		cwd: componentsDir,
	});

	const components = componentFiles.reduce((map, component) => {
		const componentName = component.split('/')[0];
		map[
			componentName
		] = `import ${componentName} from '@site/${componentsRelative}/${component}';`;
		return map;
	}, {});

	return {
		rawString: `${Object.values(components).join('\n')}
export default {${Object.keys(components).join(',')}};`,
		injectComponents: Object.keys(components),
	};
};
