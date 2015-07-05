/**
* Snapshot.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    count: 'integer',
    humidity: 'integer',
    temperature: 'float',
    device: 'string',
    thing: {
      model: 'thing'
    },
    geom: {
      type: 'json',
      required: false
    }
  }
};
