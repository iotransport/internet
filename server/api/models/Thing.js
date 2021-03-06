/**
* Thing.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
  attributes: {
    title: 'string',
    description: 'string',
    geom: {
      type: 'json',
      required: true
    },
    wifi: {
      type: 'boolean',
      defaultsTo: true
    },
    fleet: {
      model: 'fleet'
    },
    snapshots: {
      collection: 'snapshot',
      via: 'thing'
    }
  }
};
