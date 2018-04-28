<p align="center">
  <img height="256px" width="256px" style="text-align: center;" src="https://cdn.rawgit.com/diego-rangel/ngx-ui-hero/master/demo/src/assets/logo.svg">
</p>

# ngx-ui-hero - Angular library built with ❤ using ngx-library yeoman generator.

[![npm version](https://badge.fury.io/js/ngx-ui-hero.svg)](https://badge.fury.io/js/ngx-ui-hero),
[![Build Status](https://travis-ci.org/diego-rangel/ngx-ui-hero.svg?branch=master)](https://travis-ci.org/diego-rangel/ngx-ui-hero)
[![Coverage Status](https://coveralls.io/repos/github/diego-rangel/ngx-ui-hero/badge.svg?branch=master)](https://coveralls.io/github/diego-rangel/ngx-ui-hero?branch=master)
[![dependency Status](https://david-dm.org/diego-rangel/ngx-ui-hero/status.svg)](https://david-dm.org/diego-rangel/ngx-ui-hero)
[![devDependency Status](https://david-dm.org/diego-rangel/ngx-ui-hero/dev-status.svg?branch=master)](https://david-dm.org/diego-rangel/ngx-ui-hero#info=devDependencies)

## Demo

View all the directives in action at https://diego-rangel.github.io/ngx-ui-hero

## Dependencies
* [Angular](https://angular.io) (*requires* Angular 2 or higher, tested with 2.0.0)

## Installation
Install above dependencies via *npm*. 

Now install `ngx-ui-hero` via:
```shell
npm install --save ngx-ui-hero
```

---
##### SystemJS
>**Note**:If you are using `SystemJS`, you should adjust your configuration to point to the UMD bundle.
In your systemjs config file, `map` needs to tell the System loader where to look for `ngx-ui-hero`:
```js
map: {
  'ngx-ui-hero': 'node_modules/ngx-ui-hero/bundles/ngx-ui-hero.umd.js',
}
```
---

Once installed you need to import the main module:
```js
import { LibModule } from 'ngx-ui-hero';
```
The only remaining part is to list the imported module in your application module. The exact method will be slightly
different for the root (top-level) module for which you should end up with the code similar to (notice ` LibModule .forRoot()`):
```js
import { LibModule } from 'ngx-ui-hero';

@NgModule({
  declarations: [AppComponent, ...],
  imports: [LibModule.forRoot(), ...],  
  bootstrap: [AppComponent]
})
export class AppModule {
}
```

Other modules in your application can simply import ` LibModule `:

```js
import { LibModule } from 'ngx-ui-hero';

@NgModule({
  declarations: [OtherComponent, ...],
  imports: [LibModule, ...], 
})
export class OtherModule {
}
```

## Usage



## License

Copyright (c) 2018 Diego Rangel. Licensed under the MIT License (MIT)

