exports.config = {
  // namespace: 'mcfstencil',
  // generateDistribution: true,
  // generateWWW: false,
  bundles: [{ components: ['mcf-modal', 'mcf-modal-controller'] }, { components: ['my-embedded-component'] }],
  collections: [{ name: '@stencil/router' }]
};

exports.devServer = {
  root: 'www',
  watchGlob: '**/**'
};
