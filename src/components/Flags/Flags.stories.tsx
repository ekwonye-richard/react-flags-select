import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Us } from ".";

const meta: Meta<typeof Us> = {
  title: "Flags",
  component: Us,
  argTypes: {
    fontSize: {
      control: { type: "number", min: 8, max: 100 },
      defaultValue: 24,
      description: "Parent Font Size in px",
    },
  },
};

export default meta;

type Story = StoryObj<typeof Us>;

export const Primary: Story = {
  args: {
    fontSize: 24,
  },
  render: ({ fontSize }) => (
    <span style={{ fontSize }}>
      <Us />
    </span>
  ),
};
