Package.describe({
  name: 'huttonr:flo',
  version: '0.0.1',
  summary: 'An intuitive event handler.',
  git: '',
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.2.1');
  api.use('ecmascript');

  api.export(['ReactMeteorComputations'])

  api.addFiles('flo.js');
});
