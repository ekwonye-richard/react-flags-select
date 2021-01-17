import React from "react";
import { Meta } from "@storybook/react/types-6-0";
import { withKnobs, number } from "@storybook/addon-knobs";

import { Us } from ".";

export default {
  title: "Flags",
  component: Us,
  decorators: [withKnobs],
} as Meta;

export const Primary: React.FC<{}> = () => {
  const fontSize = number("Parent Font Size in px", 24);

  return (
    <span style={{ fontSize }}>
      <Us />
    </span>
  );
};
