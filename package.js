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
    'ecmascript',
    'check',
    'underscore',
    'space:base@4.1.1',
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
    'ecmascript',
    'check',
    'space:base@4.1.1',
    'space:testing@3.0.1',
    'space:testing-event-sourcing@3.0.0',
    'space:domain@0.2.1',
    'practicalmeteor:munit@2.1.5'
  ]);

  api.addFiles([
    //'tests/aggregate-test.unit.js'
  ], 'server');

});
