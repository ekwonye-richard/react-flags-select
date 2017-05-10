# react-flags-select

[![Travis][build-badge]][build]
[![npm package][npm-badge]][npm]
[![Coveralls][coveralls-badge]][coveralls]

A customizable svg flags select components for React Js.

## Demo and Example
Live demo: [ekwonye-richard.github.io/react-flags-select/](https://ekwonye-richard.github.io/react-flags-select/)

## Installation
The package can be installed via NPM:
```
npm install react-flags-select --save
```
react-flags-select can be imported as follows

```javascript
import ReactFlagsSelect from 'react-flags-select';

//import css module
import 'react-flags-select/css/react-flags-select.css';

//OR import sass module
import 'react-flags-select/scss/react-flags-select.scss';

```

## Usage

```javascript
    <ReactFlagsSelect />
```

### Default Country

You can a default country to be rendered in the component.

```javascript
    <ReactFlagsSelect
    defaultCountry="GB" />
```

### Countries

You can use an array of countries rather than the full list of countries.

```javascript
    <ReactFlagsSelect
    countries={["US", "GB", "FR", "DE", "IT", "NG"]} />
```

### Custom Labels

You can use an object of countries labels to replace the countries name. The default country name for a countyr will be used when the country code has no label passed.

```javascript
    <ReactFlagsSelect
    countries={["US", "GB", "FR","DE","IT"]}
    customLabels={{"US": "EN-US","GB": "EN-GB","FR": "FR","DE": "DE","IT": "IT"}} />
```

### Placeholder

You can replace the default placeholder text.

```javascript
    <ReactFlagsSelect
    countries={["US", "GB", "FR","DE","IT"]}
    customLabels={{"US": "EN-US","GB": "EN-GB","FR": "FR","DE": "DE","IT": "IT"}}
    placeholder="Select Language" />
```

## License
MIT Licensed. Copyright (c) Richard Ekwonye 2017.

[build-badge]: https://img.shields.io/travis/ekwonye-richard/react-flags-select/master.svg?style=flat-square
[build]: https://travis-ci.org/ekwonye-richard/react-flags-select

[npm-badge]: https://img.shields.io/npm/v/react-flags-select.svg?style=flat-square
[npm]: https://www.npmjs.org/package/react-flags-select

[coveralls-badge]: https://img.shields.io/coveralls/ekwonye-richard/react-flags-select/master.svg?style=flat-square
[coveralls]: https://coveralls.io/github/ekwonye-richard/react-flags-select
