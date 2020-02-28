'use strict';

/**
 * Cookie creation interface.
 *
 * @param {Object} doc Reference to the document.
 * @returns {Object} Session storage inspired API.
 * @public
 */
module.exports = function bake(doc){
  if(!doc) doc = {};
  if(typeof doc === 'string') doc = { cookie: doc };
  if(doc.cookie === undefined) doc.cookie = '';

  // Returning object
  var self = {
    /**
     * Get the contents of a cookie.
     *
     * @param {String} key Name of the cookie we want to fetch.
     * @returns {String|Undefined} Result of the cookie or nothing.
     * @public
     */
    getItem: function getItem(key){
      var cookiesSplat = doc.cookie.split(/;\s*/);

      for (var i = 0; i < cookiesSplat.length; i++) {
        var ps = cookiesSplat[i].split('=');
        var k = decodeURIComponent(ps[0]);
        if (k === key) return decodeURIComponent(ps[1]);
      }
    },

    /**
     * Set a new cookie.
     *
     * @param {String} key Name of the cookie.
     * @param {String} value Data for the cookie.
     * @param {Object} opts Options for the cookie setting
     * @returns {String} Cookie.
     * @public
     */
    setItem: function setItem(key, value, opts){
      // Checks before we start
      if (typeof key !== 'string' || typeof value !== 'string') return false;
      if (!opts) opts = {};

      // Creating new cookie string
      var newCookie = encodeURIComponent(key) + '=' + encodeURIComponent(value);
      if (opts.hasOwnProperty('expires')) newCookie += '; expires=' + opts.expires;
      if (opts.hasOwnProperty('path')) newCookie += '; path=' + opts.path;
      if (opts.hasOwnProperty('domain')) newCookie += '; domain=' + opts.domain;
      if (opts.secure) newCookie += '; secure';

      doc.cookie = newCookie;
      return newCookie;
    },

    /**
     * Remove a cookie.
     *
     * @param {String} key Name of the cookie.
     * @returns {Undefined} Void.
     * @public
     */
    removeItem: function removeCookie(key){
      doc.cookie = key + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    },

    /**
     * Clear all cookies.
     *
     * @returns {Undefined} Void.
     * @public
     */
    clear: function clear(){
      var cookiesSplat = doc.cookie.split(/;\s*/);
      for (var i = 0; i < cookiesSplat.length; i++) {
        self.removeItem(decodeURIComponent(cookiesSplat[i].split('=')[0]));
      }
    }
  };

  return self;
};
