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
  const selectedSize = number("Selected Size", 16);
  const showOptionLabel = boolean("Show Option Label", true);
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
        selectedSize={selectedSize}
        showOptionLabel={showOptionLabel}
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
