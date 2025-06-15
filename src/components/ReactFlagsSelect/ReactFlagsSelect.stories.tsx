import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";

import ReactFlagsSelect from ".";

const meta: Meta<typeof ReactFlagsSelect> = {
  title: "ReactFlagsSelect",
  component: ReactFlagsSelect,
  argTypes: {
    showSelectedLabel: { control: "boolean" },
    showSecondarySelectedLabel: { control: "boolean" },
    selectedSize: { control: { type: "number", min: 8, max: 64 } },
    showOptionLabel: { control: "boolean" },
    showSecondaryOptionLabel: { control: "boolean" },
    optionsSize: { control: { type: "number", min: 8, max: 64 } },
    placeholder: { control: "text" },
    searchable: { control: "boolean" },
    searchPlaceholder: { control: "text" },
    alignOptionsToRight: { control: "boolean" },
    fullWidth: { control: "boolean" },
    disabled: { control: "boolean" },
    customLabels: { control: "object" },
    countries: { control: "object" },
    blacklistCountries: { control: "boolean" },
    selected: { control: false },
    onSelect: { control: false },
  },
};

export default meta;

const useSelected = () => {
  const [selected, setSelected] = useState("");
  const onSelect = (code: string) => setSelected(code);

  return { selected, onSelect };
};

type Story = StoryObj<typeof ReactFlagsSelect>;

export const Primary: Story = {
  args: {
    showSelectedLabel: true,
    showSecondarySelectedLabel: true,
    selectedSize: 16,
    showOptionLabel: true,
    showSecondaryOptionLabel: true,
    optionsSize: 16,
    placeholder: "",
    searchable: false,
    searchPlaceholder: "",
    alignOptionsToRight: false,
    fullWidth: true,
    disabled: false,
  },
  render: (args) => {
    const { selected, onSelect } = useSelected();

    return (
      <div className="demo-wrapper">
        <ReactFlagsSelect {...args} selected={selected} onSelect={onSelect} />
      </div>
    );
  },
};

export const WithCustomLabels: Story = {
  args: {
    customLabels: { GB: "GB", US: "US", FR: "FR" },
    searchable: false,
  },
  render: (args) => {
    const { selected, onSelect } = useSelected();

    return (
      <div className="demo-wrapper">
        <ReactFlagsSelect {...args} selected={selected} onSelect={onSelect} />
      </div>
    );
  },
};

export const WithCustomLabelsObject: Story = {
  args: {
    showSelectedLabel: true,
    showSecondarySelectedLabel: true,
    showOptionLabel: true,
    showSecondaryOptionLabel: true,
    customLabels: {
      GB: { primary: "GB", secondary: "+44" },
      US: { primary: "US", secondary: "+1" },
    },
    countries: ["GB", "US", "FR"],
    searchable: false,
  },
  render: (args) => {
    const { selected, onSelect } = useSelected();

    return (
      <div className="demo-wrapper">
        <ReactFlagsSelect {...args} selected={selected} onSelect={onSelect} />
      </div>
    );
  },
};

export const WithMixedCustomLabels: Story = {
  args: {
    showSelectedLabel: true,
    showSecondarySelectedLabel: true,
    showOptionLabel: true,
    showSecondaryOptionLabel: true,
    customLabels: {
      GB: { primary: "GB", secondary: "+44" },
      US: { primary: "US", secondary: "+1" },
      FR: "FR",
    },
    countries: ["GB", "US", "FR"],
    searchable: false,
  },
  render: (args) => {
    const { selected, onSelect } = useSelected();

    return (
      <div className="demo-wrapper">
        <ReactFlagsSelect {...args} selected={selected} onSelect={onSelect} />
      </div>
    );
  },
};

export const WithCountries: Story = {
  args: {
    countries: ["US", "GB", "DE", "FR", "NG", "ES"],
    blacklistCountries: false,
  },
  render: (args) => {
    const { selected, onSelect } = useSelected();

    return (
      <div className="demo-wrapper">
        <ReactFlagsSelect {...args} selected={selected} onSelect={onSelect} />
      </div>
    );
  },
};
