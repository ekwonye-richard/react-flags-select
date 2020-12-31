import React, { useState } from "react";
import { Meta } from "@storybook/react/types-6-0";
import { withKnobs, boolean, number } from "@storybook/addon-knobs";

import ReactFlagsSelect from ".";

export default {
  title: "ReactFlagsSelect",
  component: ReactFlagsSelect,
  decorators: [withKnobs],
} as Meta;

export const Primary: React.FC<{}> = () => {
  const [selected, setSelected] = useState("");
  const onSelect = (code: string): void => setSelected(code);

  const searchable = boolean("Searchable", false);
  const showSelectedLabel = boolean("Show Selected Label", true);
  const selectedSize = number("Selected Size", 16);
  const showOptionLabel = boolean("Show Option Label", true);
  const optionsSize = number("Options Size", 14);
  const alignOptionsToLeft = boolean("Align Options to Left", false);
  const fullWidth = boolean("Full Width", true);

  return (
    <ReactFlagsSelect
      selected={selected}
      onSelect={onSelect}
      searchable={searchable}
      showSelectedLabel={showSelectedLabel}
      selectedSize={selectedSize}
      showOptionLabel={showOptionLabel}
      optionsSize={optionsSize}
      alignOptionsToLeft={alignOptionsToLeft}
      fullWidth={fullWidth}
    />
  );
};
