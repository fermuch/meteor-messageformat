Package.describe({
  name:    "gadicohen:messageformat-ui",
  version: "2.0.0-preview.1",
  summary: "messageformat: translation UI",
  git:      "https://github.com/gadicc/meteor-messageformat.git",
});

Package.onUse(function (api) {
  api.versionsFrom("METEOR@1.0.1");
  api.use(['templating', 'underscore'], 'client');
  api.use('iron:router@1.0.0', ['client', 'server']);
  api.use('mongo');
  api.use('gadicohen:messageformat@2.0.0-preview.1');

  api.addFiles('lib/common.js');
  api.addFiles('lib/server.js', 'server');

  // client
  api.addFiles([
    'lib/ui.html',
    'lib/ui.css',
    'lib/client.js',
    'lib/3rdparty/taboverride.js',
    'lib/3rdparty/taboverride.jquery.js',
  ], 'client');
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('gadicohen:messageformat-ui');

  api.addFiles('tests/tests-client.js', 'client');
  api.addFiles('tests/tests-server.js', 'server');
});