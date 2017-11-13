exports.config = {
  namespace: 'mcf-stencil-container',
  generateDistribution: true,
  generateWWW: false,
  bundles: [{ components: ['my-name'] }],
  collections: [{ name: '@stencil/router' }]
};

exports.devServer = {
  root: 'www',
  watchGlob: '**/**'
};
