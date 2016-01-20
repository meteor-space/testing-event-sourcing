Package.describe({
  summary: 'BDD testing APIs for the space:event-sourcing package',
  name: 'space:testing-event-sourcing',
  version: '0.1.0',
  git: 'https://github.com/meteor-space/testing-event-sourcing.git',
  debugOnly: true
});

Package.onUse(function(api) {

  api.versionsFrom("METEOR@1.0");

  api.use([
    'coffeescript',
    'underscore',
    'space:base@3.1.1',
    'space:messaging@2.1.0',
    'space:event-sourcing@2.1.0',
    'space:testing@2.0.1',
    'practicalmeteor:munit@2.1.5'
  ]);

  api.addFiles([
    'source/aggregates-bdd-api.coffee'
  ], 'server');

});

Package.onTest(function(api) {

  api.use([
    'coffeescript',
    'check',
    'space:base@3.1.1',
    'space:messaging@2.1.0',
    'space:event-sourcing@2.1.0',
    'space:testing',
    'practicalmeteor:munit@2.1.5'
  ]);

  api.addFiles([
    'tests/aggregates-bdd-api.tests.coffee'
  ], 'server');

});
