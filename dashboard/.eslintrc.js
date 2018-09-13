module.exports = {
  env: {
    browser: true,
    jest: true
  },
  extends: ['airbnb', 'plugin:prettier/recommended'],
  parser: 'babel-eslint',
  rules: {
    quotes: [2, 'single'],
    'import/extensions': [0],
    'no-console': [2],
    'no-underscore-dangle': [0],
    'react/no-find-dom-node': [0],
    'jsx-a11y/label-has-associated-control': [0],
    'import/no-unresolved': [0],
    'react/jsx-one-expression-per-line': [0],
    'react/destructuring-assignment': [0],
    'jsx-a11y/interactive-supports-focus': [0],
    'react/no-array-index-key': [0],
    'react/button-has-type': [0],
    'react/forbid-prop-types': [0],
    'jsx-a11y/no-noninteractive-element-interactions': [0],
    'jsx-a11y/label-has-for': [0],
    'jsx-a11y/label-has-associated-control': [0],
    'jsx-a11y/click-events-have-key-events': [0],
    'linebreak-style': 0,
    'react/jsx-filename-extension': [
      'error',
      {
        extensions: ['.js', '.jsx']
      }
    ]
  }
};
