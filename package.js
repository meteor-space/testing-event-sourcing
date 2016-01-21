Package.describe({
  summary: 'BDD testing APIs for the space:event-sourcing package',
  name: 'space:testing-event-sourcing',
  version: '3.0.0',
  git: 'https://github.com/meteor-space/testing-event-sourcing.git',
  debugOnly: true
});

Package.onUse(function(api) {

  api.versionsFrom('1.2.0.1');

  api.use([
    'coffeescript',
    'underscore',
    'space:base@4.0.0',
    'practicalmeteor:munit@2.1.5'
  ]);

  api.addFiles([
    'source/allow-to-ignore-some-struct-types.js',
    'source/aggregates-bdd-api.coffee'
  ], 'server');

});

Package.onTest(function(api) {

  api.use([
    'coffeescript',
    'check',
    'space:base@4.0.0',
    'space:testing@3.0.1',
    'practicalmeteor:munit@2.1.5'
  ]);

  api.addFiles([
  ], 'server');

});
