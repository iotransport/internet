/**
 * Bootstrap
 * (sails.config.bootstrap)
 *
 * An asynchronous bootstrap function that runs before your Sails app gets lifted.
 * This gives you an opportunity to set up your data model, run jobs, or perform some special logic.
 *
 * For more information on bootstrapping your app, check out:
 * http://sailsjs.org/#/documentation/reference/sails.config/sails.config.bootstrap.html
 */

module.exports.bootstrap = function(cb) {

  // hack move to task
  require('../data/loader.js')(function(result) {    

    // Ensure we have 2dsphere index on Property so GeoSpatial queries can work!
    sails.models.snapshot.native(function(err, collection) {
      collection.ensureIndex({geom: '2dsphere'}, function() {
        cb();
      });
    });

  })
};
