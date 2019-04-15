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

All country Codes: [Country Codes](https://github.com/ekwonye-richard/react-flags-select/blob/master/src/countries.js)

### Default Country

You can select a default country to be rendered.

```javascript
    <ReactFlagsSelect
    defaultCountry="US" />
```

### Searchable

You can enable search filter using prop `searchable`.

```javascript
    <ReactFlagsSelect
    searchable={true} />
```

### Search Placeholder

You can set the placeholder text for search using prop `searchPlaceholder`.

```javascript
    <ReactFlagsSelect
    searchable={true}
    searchPlaceholder="Search for a country" />
```


### Countries

You can use an array of countries rather than the full list of countries.

```javascript
    <ReactFlagsSelect
    countries={["US", "GB", "FR", "DE", "IT", "NG"]} />
```
or create a black list of countries

```javascript
    <ReactFlagsSelect
    countries={["US", "GB", "FR", "DE", "IT", "NG"]}
    blackList={true} />
```

### Custom Labels

You can use an object of countries labels to replace the countries name. The default country name for a country will be used when the country code has no label passed.

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

### Show Selected Label

You can hide or show the label of a selected flag. The default value is true.

```javascript
    <ReactFlagsSelect
    countries={["US", "GB", "FR","DE","IT"]}
    customLabels={{"US": "EN-US","GB": "EN-GB","FR": "FR","DE": "DE","IT": "IT"}}
    placeholder="Select Language"
    showSelectedLabel={false} />
```

### Show Option Label

You can hide or show the label of the flags in the options dropdown. The default value is true.

```javascript
    <ReactFlagsSelect
    countries={["US", "GB", "FR","DE","IT"]}
    customLabels={{"US": "EN-US","GB": "EN-GB","FR": "FR","DE": "DE","IT": "IT"}}
    placeholder="Select Language"
    showSelectedLabel={false}
    showOptionLabel={false} />
```

### Selected Size

You can set the size in pixels for the svg flag and label of the selected option.

```javascript
    <ReactFlagsSelect
    countries={["US", "GB", "FR","DE","IT"]}
    customLabels={{"US": "EN-US","GB": "EN-GB","FR": "FR","DE": "DE","IT": "IT"}}
    placeholder="Select Language"
    showSelectedLabel={false}
    showOptionLabel={false}
    selectedSize={14} />
```

### Options Size

You can set the size in pixels for the svg flags and labels in the options dropdown.
```javascript
    <ReactFlagsSelect
    countries={["US", "GB", "FR","DE","IT"]}
    customLabels={{"US": "EN-US","GB": "EN-GB","FR": "FR","DE": "DE","IT": "IT"}}
    placeholder="Select Language"
    showSelectedLabel={false}
    showOptionLabel={false}
    selectedSize={18}
    optionsSize={14} />
```

### className

You can pass a style className that will be attached to the top-level `div` of the component.

```javascript
    <ReactFlagsSelect
    className="menu-flags" />
```

### Align Options

You can align the options dropdown to  either left or right. The default value is right.

```javascript
    <ReactFlagsSelect
    alignOptions="left" />
```

### Disabled

You can disable the options dropdown, however the selected country can be updated using the `updateSelected()` method. This can be used for flag badges.

```javascript
    <ReactFlagsSelect
    defaultCountry="US"
    showSelectedLabel={false}
    disabled={true} />
```

### onSelect

You can use onSelect event handler which fires each time an option is selected.
`onSelect(countryCode)`.

```javascript
    //onSelect Method
    onSelectFlag(countryCode){
        console.log(countryCode)
    }
    
    //component render
    <ReactFlagsSelect
    defaultCountry="US"
    onSelect={this.onSelectFlag} />
```

### updateSelected

You can dynamically update the selected country on the component using `updateSelected()` method.

```javascript
    //updateSelected Method
    this.refs.userFlag.updateSelected("UK")
    
    //component render
    <ReactFlagsSelect
    ref="userFlag"
    defaultCountry="US" />
```

## License
MIT Licensed. Copyright (c) Richard Ekwonye 2017.

[build-badge]: https://img.shields.io/travis/ekwonye-richard/react-flags-select/master.svg?style=flat-square
[build]: https://travis-ci.org/ekwonye-richard/react-flags-select

[npm-badge]: https://img.shields.io/npm/v/react-flags-select.svg?style=flat-square
[npm]: https://www.npmjs.org/package/react-flags-select

[coveralls-badge]: https://img.shields.io/coveralls/ekwonye-richard/react-flags-select/master.svg?style=flat-square
[coveralls]: https://coveralls.io/github/ekwonye-richard/react-flags-select
