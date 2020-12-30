import React from "react";
import { Meta } from "@storybook/react/types-6-0";

import ReactFlagsSelect from ".";

export default {
  title: "ReactFlagsSelect",
  component: ReactFlagsSelect,
} as Meta;

export const Primary: React.VFC<{}> = () => <ReactFlagsSelect />;
