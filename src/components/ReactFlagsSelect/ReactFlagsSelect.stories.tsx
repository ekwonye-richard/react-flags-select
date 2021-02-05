import React, { useState } from "react";
import { Meta } from "@storybook/react/types-6-0";
import {
  withKnobs,
  text,
  boolean,
  number,
  object,
  array,
} from "@storybook/addon-knobs";

import ReactFlagsSelect from ".";

export default {
  title: "ReactFlagsSelect",
  component: ReactFlagsSelect,
  decorators: [withKnobs],
} as Meta;

export const Primary: React.FC<{}> = () => {
  const [selected, setSelected] = useState("");
  const onSelect = (code: string): void => setSelected(code);

  const showSelectedLabel = boolean("Show Selected Label", true);
  const showSecondarySelectedLabel = boolean(
    "Show Secondary Selected Label",
    true
  );
  const selectedSize = number("Selected Size", 16);
  const showOptionLabel = boolean("Show Option Label", true);
  const showSecondaryOptionLabel = boolean("Show Secondary Option Label", true);
  const optionsSize = number("Options Size", 16);
  const placeholder = text("Placeholder", "");
  const searchable = boolean("Searchable", false);
  const searchPlaceholder = text("Search Placeholder", "");
  const alignOptionsToRight = boolean("Align Options to Right", false);
  const fullWidth = boolean("Full Width", true);
  const disabled = boolean("Disabled", false);

  return (
    <div className="demo-wrapper">
      <ReactFlagsSelect
        selected={selected}
        onSelect={onSelect}
        showSelectedLabel={showSelectedLabel}
        showSecondarySelectedLabel={showSecondarySelectedLabel}
        selectedSize={selectedSize}
        showOptionLabel={showOptionLabel}
        showSecondaryOptionLabel={showSecondaryOptionLabel}
        optionsSize={optionsSize}
        placeholder={placeholder}
        searchable={searchable}
        searchPlaceholder={searchPlaceholder}
        alignOptionsToRight={alignOptionsToRight}
        fullWidth={fullWidth}
        disabled={disabled}
      />
    </div>
  );
};

export const WithCustomLabels: React.FC<{}> = () => {
  const [selected, setSelected] = useState("");
  const onSelect = (code: string): void => setSelected(code);

  const customLabels = object("Custom Labels", {
    GB: "GB",
    US: "US",
  });

  return (
    <div className="demo-wrapper">
      <ReactFlagsSelect
        selected={selected}
        onSelect={onSelect}
        customLabels={customLabels}
      />
    </div>
  );
};

export const WithCustomLabelsObject: React.FC<{}> = () => {
  const [selected, setSelected] = useState("");
  const onSelect = (code: string): void => setSelected(code);

  const showSecondarySelectedLabel = boolean(
    "Show Secondary Selected Label",
    true
  );
  const showSecondaryOptionLabel = boolean("Show Secondary Option Label", true);

  const customLabels = object("Custom Labels", {
    GB: { primary: "GB", secondary: "+44" },
    US: { primary: "US", secondary: "+1" },
  });

  return (
    <div className="demo-wrapper">
      <ReactFlagsSelect
        selected={selected}
        onSelect={onSelect}
        showSecondarySelectedLabel={showSecondarySelectedLabel}
        showSecondaryOptionLabel={showSecondaryOptionLabel}
        customLabels={customLabels}
      />
    </div>
  );
};

export const WithMixedCustomLabels: React.FC<{}> = () => {
  const [selected, setSelected] = useState("");
  const onSelect = (code: string): void => setSelected(code);

  const showSecondarySelectedLabel = boolean(
    "Show Secondary Selected Label",
    true
  );
  const showSecondaryOptionLabel = boolean("Show Secondary Option Label", true);

  const customLabels = object("Custom Labels", {
    GB: { primary: "GB", secondary: "+44" },
    US: { primary: "US", secondary: "+1" },
    FR: "FR",
  });

  return (
    <div className="demo-wrapper">
      <ReactFlagsSelect
        selected={selected}
        onSelect={onSelect}
        showSecondarySelectedLabel={showSecondarySelectedLabel}
        showSecondaryOptionLabel={showSecondaryOptionLabel}
        customLabels={customLabels}
      />
    </div>
  );
};

export const WithCountries: React.FC<{}> = () => {
  const [selected, setSelected] = useState("");
  const onSelect = (code: string): void => setSelected(code);

  const countries = array("Countries", ["US", "GB", "DE", "FR", "NG", "ES"]);
  const blacklistCountries = boolean("Blacklist Countries", false);

  return (
    <div className="demo-wrapper">
      <ReactFlagsSelect
        selected={selected}
        onSelect={onSelect}
        countries={countries}
        blacklistCountries={blacklistCountries}
      />
    </div>
  );
};
