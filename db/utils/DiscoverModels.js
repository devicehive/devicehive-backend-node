const loopback = require('loopback');
const ds = loopback.createDataSource('postgresql', {
  "host": "localhost",
  "port": 5432,
  "database": "devicehive",
  "username": "postgres",
  "password": "12345"
});

String.prototype.capitalize = function() {
  return this.charAt(0).toUpperCase() + this.slice(1);
};

[`device`, `network`, `configuration`, `dh_user`, `user_network`]
  .forEach ((modelName) => {
    ds.discoverAndBuildModels(modelName, {visited: {}, associations: true}, (err, models) => {
      if (!err) {
        const model = models[modelName.capitalize()];

        console.log(modelName.capitalize());
      }
    });
  });


