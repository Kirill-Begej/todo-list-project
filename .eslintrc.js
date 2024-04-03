module.exports = {
  parser: '@babel/eslint-parser',
  parserOptions: {
    requireConfigFile: false,
    babelOptions: {
      babelrc: false,
      configFile: false,
      presets: ['@babel/preset-env'],
    },
  },
  extends: ['airbnb-base'],
  rules: {
    'no-undef': 0,
    'no-console': 0,
    'import/prefer-default-export': 0,
    'class-methods-use-this': 0,
    'no-underscore-dangle': 0,
    'no-param-reassign': 0,
    'no-useless-constructor': 0,
  },
};
