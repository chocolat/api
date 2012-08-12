# Chocolat scripting API

This is the API for the [Chocolat](http://chocolatapp.com) text editor. It's open source so that others can add any functionality that is missing.

## Contributing

The API is separated into **JavaScript** and **Objective-C** parts.

### JavaScript

The **`js`** folder contains the JavaScript side of the API. These files are all concatenated to form one big file. Files are concatenated in alphabetical order, with the exception of `prelude.js` which goes first.

The **`deps`** folder contains all JS dependencies. Currently this is `underscore.js`, `underscore.string.js`, and `buckets.js`. While I have no particular objection to including extra libraries with Chocolat, size matters. Bigger libraries increase how long Chocolat takes to download, which means less money and fewer yachts for us `:)`.

To call Objective-C methods, use the three `objc_msgSend` functions. These mimic their C counterparts and have the form

    objc_msgSend(<receiver>, <selector>, <arguments>...)

The two others are `objc_msgSendSync()` which blocks and returns a value, and `objc_msgSendThread()` which executes the function on the JS thread instead of the main thread (**do not use `objc_msgSendThread()`** unless you know what you're doing).

### Objective-C

The **`objc`** folder contains a bunch of Objective-C categories.

Note that Chocolat currently uses GC and will probably switch to ARC in the future, so please try to write code that works with both.

## License

The Chocolat API is public domain and released under the terms of [Unlicense](http://unlicense.org/). Basically this means you can do whatever the hell you want with it.

If you submit a pull request or patch, you must agree to license your changes similarly.
