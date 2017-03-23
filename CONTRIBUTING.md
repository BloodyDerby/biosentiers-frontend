# Contributing

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.0.0-beta.26.



## Implementation notes

* The [ng2-qrcode][ng2-qrcode] package depends on the third-party [qrcode.js][qrcodejs] library,
  which must be loaded into the page for QR code generation to work.

  This is accomplished by including the `node_modules/qrcodejs2/qrcode.min.js` files
  in the `scripts` section of `angular-cli.json`.



## Known issues

* The `allowSyntheticDefaultImports` had to be added to `src/tsconfig.json` in
  order for single-function imports of [lodash][lodash] functions to work. In
  TypeScript with the current version of lodash, you can only import the whole
  library like this:

  ```js
  import * as _ from 'lodash';
  ```

  But with the new option, you can import specific functions:

  ```js
  import map from 'lodash/map';
  import pick from 'lodash/pick';
  ```

  See [this comment](http://disq.us/p/1ck2bq6).



[lodash]: https://lodash.com
[ng2-qrcode]: https://www.npmjs.com/package/ng2-qrcode
[qrcodejs]: https://davidshimjs.github.io/qrcodejs/
