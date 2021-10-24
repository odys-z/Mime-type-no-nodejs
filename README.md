 [![npm](https://img.shields.io/npm/v/mime-types-no-nodejs?logo=npm)](https://npmjs.org/package/mime-types-no-nodejs)

# About

Convert mime type to and from document type.

Reference:

[W3cubDocs/http](https://docs.w3cub.com/http/basics_of_http/mime_types/complete_list_of_mime_types)

## Credits

Source modified from [jshttp/mime-types](https://github.com/jshttp/mime-types).

## Why?

1. Removed Node.js dependency.

See [#50](https://github.com/jshttp/mime-types/issues/50#issuecomment-442916069).

2. Re-write in typescript.

# Qick start

install dependency

```
    npm install mime-types-no-nodejs
```

run test (with source)

```
    npm install
    npm test
```

# API

```
    import Mime from 'mime-types-no-nodejs';
```

- lookup()

Lookup the MIME type for a file / path extension.

```
    /**
     * @param {string} path
     * @return {boolean|string} false when failed
     */
    function lookup (path);
```

- extension()

Get the default extension for a MIME type.

```
    /**
     * @param {string} type
     * @return {boolean|string} doc type or false if failed
     */
    function extension (type);
```

Testing code snippet:

```
    // test/no-node.js
    import Mime from '../index';

    it('mime2type', () => {
        assert.equal(Mime.extension('image/png;base64'), 'png');
    });

    it('type2mime', () => {
        assert.equal(Mime.lookup('png'), 'image/png');
    });
```
