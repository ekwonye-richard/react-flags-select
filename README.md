# react-flags-select

A customizable React library for SVG country flag selectors and standalone SVG flag components, featuring configurable country ordering to prioritize specific countries in the dropdown.
## Demo and Example

Live demo: [Original React Flags Select Storybook](https://ekwonye-richard.github.io/react-flags-select/?path=/story/reactflagsselect--primary)

## Installation

Install the customized package using npm:

```bash
npm install @shubhamkumarbaranwall/react-flags-select
```

Or using Yarn:

```bash
yarn add @shubhamkumarbaranwall/react-flags-select
```

## Usage

```tsx
import ReactFlagsSelect from "@shubhamkumarbaranwall/react-flags-select";

<ReactFlagsSelect
  selected={selected}
  onSelect={setSelected}
  prioritizedCountries={["IN", "GB"]}
/>
```

The `prioritizedCountries` prop allows you to display selected countries at the beginning of the dropdown in your preferred order.

### ReactFlagsSelect

```jsx
import React, { useState } from "react";
import ReactFlagsSelect from "react-flags-select";

const App = () => {
  const [selected, setSelected] = useState("");

  return (
    <ReactFlagsSelect
      selected={selected}
      onSelect={(code) => setSelected(code)}
    />
  );
};

export default App;
```

### Country Flag

```jsx
import React from "react";
import { Us } from "react-flags-select";

const Region = () => (
  <div>
    <Us /> United States
  </div>
);

export default Region;
```

### Country Codes

See the [full list of country codes](https://github.com/ekwonye-richard/react-flags-select/blob/master/src/data/countries.ts).

## Props

### selected

Required `string` representing the currently selected country code.

```jsx
<ReactFlagsSelect selected={selected} />
```

### onSelect

Required callback invoked with the selected country code. Use it to update the selected value.

```jsx
<ReactFlagsSelect
  selected={selected}
  onSelect={(code) => setSelected(code)}
/>
```

### placeholder

Optional `string` used to replace the default placeholder text.

```jsx
<ReactFlagsSelect
  selected={selected}
  onSelect={setSelected}
  placeholder="Select Language"
/>
```

### searchable

Optional `boolean` that enables searching through the country options. Defaults to `false`.

```jsx
<ReactFlagsSelect
  selected={selected}
  onSelect={setSelected}
  searchable
/>
```

### searchPlaceholder

Optional `string` used to customize the search input's placeholder.

```jsx
<ReactFlagsSelect
  selected={selected}
  onSelect={setSelected}
  searchable
  searchPlaceholder="Search countries"
/>
```

### countries

Optional array of country-code strings used to restrict the available countries to a custom list. Only supported country codes are valid.

```jsx
<ReactFlagsSelect
  selected={selected}
  onSelect={setSelected}
  countries={["US", "GB", "FR", "DE", "IT", "IN"]}
/>
```

### blacklistCountries

Optional `boolean` that treats the `countries` array as a blacklist. When enabled, the listed countries are excluded from the options. Defaults to `false`.

```jsx
<ReactFlagsSelect
  selected={selected}
  onSelect={setSelected}
  countries={["US", "GB", "FR"]}
  blacklistCountries
/>
```

### prioritizedCountries

Optional array of country-code strings specifying which countries should appear first in the dropdown, in the order provided.

Countries listed in `prioritizedCountries` are moved to the beginning of the available country list. All remaining countries retain their original relative order.

```jsx
<ReactFlagsSelect
  selected={selected}
  onSelect={setSelected}
  prioritizedCountries={["IN", "GB"]}
/>
```

In this example:

1. India (`IN`) appears first, at index `0`.
2. The United Kingdom (`GB`) appears second, at index `1`.
3. All remaining available countries follow in their original relative order.

The prop works with `countries` and `blacklistCountries`. A prioritized country is moved only if it is available in the resulting country list.

Additional behavior:

- The prop is optional. When omitted, the existing country order is preserved.
- Duplicate country codes in the prioritized list are ignored.
- Country codes that are invalid or unavailable are ignored.
- Countries excluded by `blacklistCountries` cannot be prioritized into the dropdown.

Example combining custom countries and priorities:

```jsx
<ReactFlagsSelect
  selected={selected}
  onSelect={setSelected}
  countries={["US", "GB", "FR", "IN"]}
  prioritizedCountries={["IN", "GB"]}
/>
```

The resulting order is India, United Kingdom, United States, France.

### customLabels

Optional object mapping country codes to custom labels. If a country has no custom label, its default country name is used.

```jsx
<ReactFlagsSelect
  selected={selected}
  onSelect={setSelected}
  customLabels={{
    US: "EN-US",
    GB: "EN-GB",
    FR: "FR",
    DE: "DE",
    IT: "IT",
  }}
/>
```

Labels can also contain a primary and secondary value:

```jsx
<ReactFlagsSelect
  selected={selected}
  onSelect={setSelected}
  customLabels={{
    US: { primary: "EN-US", secondary: "+1" },
    GB: { primary: "EN-GB", secondary: "+44" },
    FR: { primary: "FR" },
  }}
/>
```

Strings and label objects can be mixed:

```jsx
<ReactFlagsSelect
  selected={selected}
  onSelect={setSelected}
  customLabels={{
    US: { primary: "EN-US", secondary: "+1" },
    GB: { primary: "EN-GB", secondary: "+44" },
    FR: "FR",
  }}
/>
```

### showSelectedLabel

Optional `boolean` controlling whether the selected country's label is displayed. Defaults to `true`.

```jsx
<ReactFlagsSelect
  selected={selected}
  onSelect={setSelected}
  showSelectedLabel={false}
/>
```

### showSecondarySelectedLabel

Optional `boolean` controlling whether the secondary label of the selected country is displayed. Defaults to `true`.

```jsx
<ReactFlagsSelect
  selected={selected}
  onSelect={setSelected}
  showSecondarySelectedLabel={false}
/>
```

### showOptionLabel

Optional `boolean` controlling whether country labels appear in the dropdown options. Defaults to `true`.

```jsx
<ReactFlagsSelect
  selected={selected}
  onSelect={setSelected}
  showOptionLabel={false}
/>
```

### showSecondaryOptionLabel

Optional `boolean` controlling whether secondary labels appear in the dropdown options. Defaults to `true`.

```jsx
<ReactFlagsSelect
  selected={selected}
  onSelect={setSelected}
  showSecondaryOptionLabel={false}
/>
```

### selectedSize

Optional `number` specifying the selected flag and label size in pixels.

```jsx
<ReactFlagsSelect
  selected={selected}
  onSelect={setSelected}
  selectedSize={14}
/>
```

### optionsSize

Optional `number` specifying the flag and label size in the dropdown options.

```jsx
<ReactFlagsSelect
  selected={selected}
  onSelect={setSelected}
  optionsSize={14}
/>
```

### className

Optional `string` passed to the top-level select container.

```jsx
<ReactFlagsSelect
  selected={selected}
  onSelect={setSelected}
  className="menu-flags"
/>
```

### selectButtonClassName

Optional `string` passed to the select button.

```jsx
<ReactFlagsSelect
  selected={selected}
  onSelect={setSelected}
  selectButtonClassName="menu-flags-button"
/>
```

### fullWidth

Optional `boolean` controlling whether the select occupies the full available width. Defaults to `true`.

```jsx
<ReactFlagsSelect
  selected={selected}
  onSelect={setSelected}
  fullWidth={false}
/>
```

### alignOptionsToRight

Optional `boolean` that aligns the dropdown options to the right. Useful when `fullWidth` is `false`. Defaults to `false`.

```jsx
<ReactFlagsSelect
  selected={selected}
  onSelect={setSelected}
  fullWidth={false}
  alignOptionsToRight
/>
```

### disabled

Optional `boolean` that disables the select. Defaults to `false`.

```jsx
<ReactFlagsSelect
  selected={selected}
  onSelect={setSelected}
  disabled
/>
```

### id

Optional `string` used as the ID of the top-level select container.

```jsx
<ReactFlagsSelect
  selected={selected}
  onSelect={setSelected}
  id="flags-select"
/>
```

### rfsKey

Optional `string` used to generate IDs, test IDs, and the search input's name. Defaults to `"rfs"`. Use a unique value when rendering multiple selectors simultaneously.

```jsx
<ReactFlagsSelect
  selected={selected}
  onSelect={setSelected}
  rfsKey="app-lang"
/>
```

## Flags

Each country flag can be rendered as an SVG component. Component names use the country ISO 3166-1 alpha-2 codes in PascalCase.

```jsx
import { GB } from "react-flags-select";

<GB />
```

The SVG `viewBox` is preserved, and the SVG inherits its parent's text size.

## Contribution

This project is written in TypeScript and developed with [Storybook](https://storybook.js.org/). Tests use Jest and [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/).

### Installation

```bash
yarn install
```

### Start Storybook

```bash
yarn start
```

This command generates the country flag components and starts Storybook.

## v1 Documentation

[React Flags Select v1](https://github.com/ekwonye-richard/react-flags-select/blob/master/v1.md)

## License

This project is distributed under the MIT license.
