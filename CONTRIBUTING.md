# Contributing

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.0.0-beta.26.



## Implementation notes

* QR code generation is accomplished with non-Angular libraries:
  [node-qrcode][node-qrcode] and [biosentiers-qrcode][biosentiers-qrcode].
  They must be loaded into the page for QR code generation to work.

  This is accomplished by including their files in `node_modules`
  in the `scripts` section of `angular-cli.json`.

  The libraries' global variables must also be declared,
  e.g. `declare const qrcodelib: any;`.



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



[biosentiers-qrcode]: https://github.com/MediaComem/biosentiers-qrcode
[lodash]: https://lodash.com
[node-qrcode]: https://github.com/soldair/node-qrcode
