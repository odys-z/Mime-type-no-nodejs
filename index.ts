/** @module 'mime-type-no-nodejs';
 * 
 * Credits: mime-types
 * Copyright(c) 2014 Jonathan Ong
 * Copyright(c) 2015 Douglas Christopher Wilson
 * MIT Licensed
 */

import db from 'mime-db';

function extname(pth) {
	let reg = /\.([\w\d]+)\s*$/;
	if (reg.test(pth))
		return pth.match(reg)[1];
	else return '';
}

/** the singleton */
const mimetypes = {};
const docextensions = {};

// Populate the extensions/types maps
populateMaps(docextensions, mimetypes);

/**
 * Module variables.
 * @private
 */
const EXTRACT_TYPE_REGEXP = /^\s*([^;\s]*)(?:;|\s|$)/
const TEXT_TYPE_REGEXP = /^text\//i

/**
 * Populate the extensions and types maps.
 * @private
 */
function populateMaps (extensions: object, types: object) {
  // source preference (least -> most)
  let preference = ['nginx', 'apache', undefined, 'iana']

  Object.keys(db).forEach(function forEachMimeType (type) {
    let mime = db[type]
    let exts = mime.extensions

    if (!exts || !exts.length) {
      return
    }

    // mime -> extensions
    extensions[type] = exts

    // extension -> mime
    for (let i = 0; i < exts.length; i++) {
      let extension = exts[i]

      if (types[extension]) {
        let from = preference.indexOf(db[types[extension]].source)
        let to = preference.indexOf(mime.source)

        if (types[extension] !== 'application/octet-stream' &&
          (from > to || (from === to && types[extension].substr(0, 12) === 'application/'))) {
          // skip the remapping
          continue
        }
      }

      // set the extension -> mime
      types[extension] = type
    }
  })
}

/**
 * Get the default charset for a MIME type.
 *
 * @param {string} type
 * @return {undefined|string}
 */
function charset(type: string): undefined | string {
  if (!type || typeof type !== 'string') {
    return;
  }

  let match = EXTRACT_TYPE_REGEXP.exec(type)
  let mime = match && db[match[1].toLowerCase()]

  if (mime && mime.charset) {
    return mime.charset
  }

  // default text/* to utf-8
  if (match && TEXT_TYPE_REGEXP.test(match[1])) {
    return 'UTF-8'
  }
}

/**
 * Create a full Content-Type header given a MIME type or extension.
 *
 * @param {string} str
 * @return {undefined|string}
 */
function contentType(str: string): string | undefined {
  // TODO: should this even be in this module?
  if (!str || typeof str !== 'string') {
    return;
  }

  let mime = str.indexOf('/') === -1
    ? lookup(str)
    : str

  if (!mime) {
    return;
  }

  // TODO: use content-type or other module
  if (mime.indexOf('charset') === -1) {
    let chars = charset(mime)
    if (chars) mime += '; charset=' + chars.toLowerCase()
  }

  return mime
}

/**
 * 
 * Get the default extension for a MIME type.
 *
 * @param {string} type
 * @return {undefined|string}
 */
function extension(type: string): undefined | string {
  if (!type || typeof type !== 'string') {
    return;
  }

  let match = EXTRACT_TYPE_REGEXP.exec(type)

  // get extensions
  let exts = match && docextensions[match[1].toLowerCase()]

  if (!exts || !exts.length) {
    return;
  }

  return exts[0]
}


/**
 * Lookup the MIME type for a file path/extension.
 *
 * @param {string} path
 * @return {string|undefined}
 */
function lookup (path: string): string | undefined {
  if (!path || typeof path !== 'string') {
    return;
  }

  let extension = extname('x.' + path).toLowerCase();

  if (!extension) {
    return;
  }

  return mimetypes[extension];
}

export default {
    extension,
    lookup,
}