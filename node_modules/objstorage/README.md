# objstorage

[![Made by unshift][made-by]](http://unshift.io)[![Version npm][version]](http://browsenpm.org/package/objstorage)[![Build Status][build]](https://travis-ci.org/unshiftio/objstorage)[![Dependencies][david]](https://david-dm.org/unshiftio/objstorage)[![Coverage Status][cover]](https://coveralls.io/r/unshiftio/objstorage?branch=master)[![IRC channel][irc]](http://webchat.freenode.net/?channels=unshift)

[made-by]: https://img.shields.io/badge/made%20by-unshift-00ffcc.svg?style=flat-square
[version]: https://img.shields.io/npm/v/objstorage.svg?style=flat-square
[build]: https://img.shields.io/travis/unshiftio/objstorage/master.svg?style=flat-square
[david]: https://img.shields.io/david/unshiftio/objstorage.svg?style=flat-square
[cover]: https://img.shields.io/coveralls/unshiftio/objstorage/master.svg?style=flat-square
[irc]: https://img.shields.io/badge/IRC-irc.freenode.net%23unshift-00a8ff.svg?style=flat-square

A cross platform `sessionStorage` or `localStorage` for browsers and node backed
by an plain `object` instead of browser API's.

## Installation

This module is written for node and browserify and can be installed using npm:

```
npm install --save objstorage
```

## Usage

This module exposes a node / `module.exports` interface.

```js
var objStorage = require('objStorage')
```

The API is exactly the same as the DOM storage API so you can use the following
methods:

- `getItem(key)`
- `setItem(key, value)`
- `removeItem(key)`
- `clear()`

## License

MIT
