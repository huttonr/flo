Package.describe({
  name: 'huttonr:flo',
  version: '0.1.3',
  summary: 'An intuitive, ultra-lite event/callback system for Meteor.',
  git: 'https://github.com/huttonr/flo',
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.2.1');
  api.use('ecmascript');
  api.use('random');

  api.export(['Flo'])

  api.addFiles('flo.js');
});
