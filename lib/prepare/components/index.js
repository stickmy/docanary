const globby = require('globby');

module.exports = async function loadComponent({
	siteDir,
	siteConfig,
	componentsDir,
	componentsRelative
}) {
	const componentFiles = await globby(['**/index.js'], {
		cwd: componentsDir
	})

	const components = componentFiles.reduce((map, component) => {
		const componentName = component.split('/')[0];
		map[componentName] = `import ${componentName} from '@site/${componentsRelative}/${component}';`;
		return map;
	}, {});

	return (
`${Object.values(components).join('\n')}
export default {${Object.keys(components).join(',')}};`
);
};
