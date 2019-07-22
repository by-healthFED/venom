const configs = require('../config');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const scripts = function(params) {
	return `<script src="https://by-health-cdn.oss-cn-beijing.aliyuncs.com/region/regions.js"></script>
	<script src="./data/${params}/prizes1.js"></script>
	<script src="./data/${params}/prizes2.js"></script>
	<script src="./data/${params}/themedata1.js"></script>
	<script src="./data/${params}/themedata2.js"></script>`;
};

// console.log('HtmlWebpackPlugin', HtmlWebpackPlugin);
let HtmlPlugin = [];
let entry = {};
let entryfile = '';

configs.forEach(element => {
	const {name, path, template, filename, templatename} = element;
	const HtmlPluginItem = new HtmlWebpackPlugin({
		title: templatename || name,
		minify: {
			collapseWhitespace: true
		},
		hash : true,
		template,
		filename: filename ? `demo/${filename}` : `demo/${name}.html`,
		chunks: [name],
		scripts: scripts(name)
	});
	entry[name] = path;
	HtmlPlugin.push(HtmlPluginItem);
	entryfile += `var ${name} = require('./lib/${name}.js'); exports.${name} = ${name};`;
});

module.exports = {
	HtmlWebpackPlugin: HtmlPlugin,
	entry,
	entryfile
};