var assume = require('assume');
var objStorage = require('./');

describe('objStorage', function () {
  beforeEach(function () {
    objStorage.clear();
  });

  describe('setItem', function () {
    it('increments the length', function () {
      assume(objStorage.length).equals(0);

      objStorage.setItem('foo', 'bar');

      assume(objStorage.length).equals(1);
      objStorage.setItem('foo', 'bar');
      objStorage.setItem('foo', 'bar');
      assume(objStorage.length).equals(1);
    });

    it('does not override built-in properties', function () {
      assume(objStorage.length).equals(0);
      objStorage.setItem('toString', 'foo');
      assume(objStorage.length).equals(0);
    });
  });

  describe('getItem', function () {
    it('retrieves the previously set value', function () {
      objStorage.setItem('hello', 'world');
      assume(objStorage.getItem('hello')).equals('world');
    });

    it('does not allow setting or getting of build-in', function () {
      assume(objStorage.getItem('toString')).is.a('null');
    });

    it('returns null when not found', function () {
      assume(objStorage.getItem('foo')).is.a('null');
    });
  });

  describe('removeItem', function () {
    it('removes a single key', function () {
      objStorage.setItem('foo', 'bar');
      objStorage.setItem('bar', 'foo');

      assume(objStorage.length).equals(2);

      objStorage.removeItem('foo');
      assume(objStorage.length).equals(1);
      assume(objStorage.getItem('foo')).is.a('null');
      assume(objStorage.getItem('bar')).equals('foo');
    });
  });

  describe('clear', function () {
    it('removes all items', function () {
      assume(objStorage.length).equals(0);

      objStorage.setItem('hello', 'world');
      objStorage.setItem('hell', 'world');
      objStorage.setItem('hel', 'world');
      objStorage.setItem('he', 'world');
      objStorage.setItem('h', 'world');

      assume(objStorage.length).equals(5);

      objStorage.clear();
      assume(objStorage.length).equals(0);
    });

    it('it resets length to 0', function () {
      assume(objStorage.length).equals(0);

      objStorage.setItem('hello', 'world');
      assume(objStorage.length).equals(1);

      objStorage.clear();
      assume(objStorage.length).equals(0);
    });
  });
});
