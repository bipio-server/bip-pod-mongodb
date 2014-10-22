/**
 *
 * The Bipio MongoDB Pod.  mongodb Remove definition
 * ---------------------------------------------------------------
 *
 * @author Scott Tuddenham <scott@bip.io>
 * Copyright (c) 2014 WoT.IO http://wot.io
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

var MongoClient = require('mongodb').MongoClient
  , assert = require('assert');

function Remove(podConfig) {
  this.name = 'remove'; 
  this.title = 'Remove', 
  this.description = 'Remove a MongoDB document',
  this.trigger = false; 
  this.singleton = false; 
  this.auto = false; 
  this.podConfig = podConfig; 
}

Remove.prototype = {};

Remove.prototype.getSchema = function() {
  return {
    'imports': {
      'properties' : {
         'collection' : {
          'type' : 'string',
          'description' : 'Name of the Collection'
        },
        'match' : {
            'type' : 'object',
            'description' : 'Pattern to Match for Removal'
        }
     }
    },
    "exports": {
      "properties" : {
        "status" : {
          "type" : "string",
          "description" : "Error or OK for successful removal"
        }
      }
    }
  }
}

/**
 * Action Invoker - the primary function of a channel
 * 
 */
Remove.prototype.invoke = function(imports, channel, sysImports, contentParts, next) {

    if (imports.match && imports.collection) {
   
    var url = sysImports.auth.issuer_token.username;

    MongoClient.connect(url, { auto_reconnect: true }, function(err, db) {
            assert.equal(null, err);
            console.log('Connected correctly to server');
            db.collection(imports.collection, function(err, collection) {
                console.log(collection);
                collection.remove(imports.match, function(err, result) {
                    assert.equal(err, null);
                    callbakck(result);
                });
            });
    });

    }

}

// -----------------------------------------------------------------------------
module.exports = Remove;