module.exports = {
  root: true,
  extends: ['@react-native-community', 'plugin:prettier/recommended'],
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': ['error', {endOfLine: 'auto'}],
    'editor.formatOnSave': true,
  },
};
