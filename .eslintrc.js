module.exports = {
  extends: './core/packages/volto/.eslintrc',
  rules: {
    'import/no-unresolved': 1,
  },
  settings: {
    'import/resolver': {
      alias: {
        map: [
          ['@plone/volto', './core/packages/volto/src'],
          ['@plone/volto-slate', './core/packages/volto-slate/src'],
          ['@plone/registry', './core/packages/registry/src'],
          [
            '@plonegovbr/volto-code-block',
            './packages/volto-code-block/src',
          ],
        ],
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
      },
    },
  },
};
