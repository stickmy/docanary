const merge = require('webpack-merge');

exports.applyConfigureWebpack = function(userConfig, config, isServer) {
	if (typeof userConfig === 'object') {
		return merge(config, userConfig);
	}

	if (typeof userConfig === 'function') {
		const result = userConfig(config, isServer);

		if (result && typeof result === 'object') {
			return merge(config, result);
		}
	}

	return config;
};

exports.applyChainWebpack = function(userChain, config, isServer) {
	if (userChain) {
		userChain(config, isServer);
	}
};
