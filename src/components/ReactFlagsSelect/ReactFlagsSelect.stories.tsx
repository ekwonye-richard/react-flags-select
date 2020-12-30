import React, { useState } from "react";
import { Meta } from "@storybook/react/types-6-0";

import ReactFlagsSelect from ".";

export default {
  title: "ReactFlagsSelect",
  component: ReactFlagsSelect,
} as Meta;

export const Primary: React.FC<{}> = () => {
  const [selected, setSelected] = useState("");
  const onSelect = (code: string) => setSelected(code);

  return <ReactFlagsSelect selected={selected} onSelect={onSelect} />;
};
