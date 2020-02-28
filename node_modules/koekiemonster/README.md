# koekiemonster

A node.js compatible version of `cookie-monster`, which is a clone of
`cookie-cutter`. We must fork deeper yessss?

## Installation

The package is released in the public npm registry as `koekiemonster` which is
the dutch name for `cookie monster` and can be installed by running:

```
npm install --save koekiemonster
```

## API

The module returns a single function that requires a reference to document. If
you are in a node.js environment you can pass in a object instead and it should
still function as intended.

```js
var cookie = require('koekiemonster')(document);
var times = parseInt(cookie.getItem('times'), 10) || 0;
cookie.setItem('times', times + 1);
```

### getItem(key)

Return the contents of a cookie for the given key name.

### setItem(key, value, opts)

Set a new cookie with the given key as name and value as contents. You can use
the `opts` object to configure the cookie string.

- `expires` Sets the expiree of the cookie.
- `path` Path of the cookie.
- `domain` Domain of the cookie.
- `secure` Should the cookie be secure only.

### removeItem(key)

Remove a cookie with the name of the key.

#### clear

Remove all cookies.

## License

MIT/X11
