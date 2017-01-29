# Contributing

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
  import { map, pick } from 'lodash';
  ```

  See [this comment](http://disq.us/p/1ck2bq6).



[lodash]: https://lodash.com
