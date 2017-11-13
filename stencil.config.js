exports.config = {
  namespace: 'mcfstencil',
  generateDistribution: true,
  generateWWW: false,
  bundles: [{ components: ['my-name'] }],
  collections: [{ name: '@stencil/router' }]
};

exports.devServer = {
  root: 'www',
  watchGlob: '**/**'
};
