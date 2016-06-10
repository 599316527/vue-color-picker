module.exports = {
  root: true,
  // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
  extends: 'standard',
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  // add your custom rules here
  'rules': {
    // allow paren-less arrow functions
    'arrow-parens': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,

    // http://eslint.org/docs/rules/
    'no-unused-vars': [
      process.env.NODE_ENV === 'production' ? 1 : 0,
      {'vars': 'local', 'args': 'none'}
    ],
    'comma-dangle': [2, 'only-multiline'],
    'space-before-function-paren': 2,
    'no-multiple-empty-lines': 0,
    'space-before-function-paren': [2, { 'anonymous': 'always', 'named': 'never' }],
    'operator-linebreak': [2, 'before']
  }
}
