module.exports = {
	"parser": "babel-eslint",
	"env": {
		"commonjs": true,
		"es6": true,
		"node": true
	},
	"extends": "eslint:recommended",
	"globals": {
		"Atomics": "readonly",  
		"SharedArrayBuffer": "readonly"
	},
	"parserOptions": {
		"ecmaVersion": 2018
	},
	"rules": {
		'no-trailing-spaces': ["error", { "skipBlankLines": true }],
		'comma-dangle': 'off',
		"require-atomic-updates": "off",
		"quotes": ["error", "single"],
		"no-multi-spaces": "error",
		"lines-around-comment": ["error", { "beforeBlockComment": true }],
		"no-multiple-empty-lines": ["error", {"max": 2}],
	}
};