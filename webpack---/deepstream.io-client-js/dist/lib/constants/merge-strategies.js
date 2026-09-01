'use strict';

module.exports = {
  /**
  *  Choose the server's state over the client's
  **/
  REMOTE_WINS: function REMOTE_WINS(record, remoteValue, remoteVersion, callback) {
    callback(null, remoteValue);
  },

  /**
  *  Choose the local state over the server's
  **/
  LOCAL_WINS: function LOCAL_WINS(record, remoteValue, remoteVersion, callback) {
    callback(null, record.get());
  }
};

//////////////////
// WEBPACK FOOTER
// ./~/deepstream.io-client-js/dist/lib/constants/merge-strategies.js
// module id = 89
// module chunks = 1
//# sourceURL=webpack:///./~/deepstream.io-client-js/dist/lib/constants/merge-strategies.js?