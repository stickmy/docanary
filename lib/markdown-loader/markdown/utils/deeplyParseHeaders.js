const compose = require('./compose');
const parseHeaders = require('./parseHeaders');
const removeNonCodeWrapperHtml = require('./removeNonCodeWrapperHtml');

module.exports = compose(
	// removeNonCodeWrapperHtml,
	parseHeaders,
);
