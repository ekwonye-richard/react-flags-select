import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";

import ReactFlagsSelect from ".";

describe("ReactFlagsSelect", () => {
  const defaultProps = {
    selected: "",
    onSelect: jest.fn(),
  };

  const openOptions = (props = {}) => {
    render(<ReactFlagsSelect {...defaultProps} {...props} />);
    fireEvent.click(screen.getByTestId("rfs-btn"));
  };

  describe("rendering with required and default props", () => {
    it("renders", () => {
      render(<ReactFlagsSelect {...defaultProps} />);
      expect(screen.getByTestId("rfs")).toBeInTheDocument();
    });

    it("does not render a flag SVG", () => {
      render(<ReactFlagsSelect {...defaultProps} />);
      expect(screen.queryByTestId("rfs-flag")).not.toBeInTheDocument();
    });
  });

  describe("selected", () => {
    describe("placeholder", () => {
      it("renders the default placeholder", () => {
        render(<ReactFlagsSelect {...defaultProps} />);
        expect(screen.getByText("Select a country")).toBeInTheDocument();
      });

      it("renders a custom placeholder if passed", () => {
        render(
          <ReactFlagsSelect {...defaultProps} placeholder="Country of Origin" />
        );
        expect(screen.queryByText("Select a country")).not.toBeInTheDocument();
        expect(screen.getByText("Country of Origin")).toBeInTheDocument();
      });
    });

    describe("with a selected value", () => {
      it("renders the default placeholder when the selected value is invalid", () => {
        render(<ReactFlagsSelect {...defaultProps} selected="XX" />);
        expect(screen.getByText("Select a country")).toBeInTheDocument();
      });

      it("renders the flag SVG of the valid selected country", () => {
        render(<ReactFlagsSelect {...defaultProps} selected="NG" />);
        const flag = screen.getByTestId("rfs-selected-flag");
        expect(flag?.firstChild?.nodeName).toBe("svg");
      });

      it("renders the label of the valid selected country", () => {
        render(<ReactFlagsSelect {...defaultProps} selected="NG" />);
        expect(screen.getByText("Nigeria")).toBeInTheDocument();
      });

      it("renders a custom label of the valid selected country if present as a string", () => {
        render(
          <ReactFlagsSelect
            {...defaultProps}
            selected="GB"
            customLabels={{ GB: "GB" }}
          />
        );
        expect(screen.getByText("GB")).toBeInTheDocument();
      });

      it("renders a custom label of the valid selected country if present as a CustomLabel object", () => {
        render(
          <ReactFlagsSelect
            {...defaultProps}
            selected="GB"
            customLabels={{ GB: { primary: "GB", secondary: "+44" } }}
          />
        );
        expect(screen.getByText("GB")).toBeInTheDocument();
        expect(screen.getByText("+44")).toBeInTheDocument();
      });

      it("does not render a label of the selected country if showSelectedLabel is false", () => {
        render(
          <ReactFlagsSelect
            {...defaultProps}
            selected="US"
            showSelectedLabel={false}
          />
        );
        expect(screen.queryByText("United States")).not.toBeInTheDocument();
      });

      it("does not render a secondary label of the selected country if showSecondarySelectedLabel is false", () => {
        render(
          <ReactFlagsSelect
            {...defaultProps}
            selected="US"
            showSecondarySelectedLabel={false}
            customLabels={{ US: { primary: "US", secondary: "+1" } }}
          />
        );
        expect(screen.queryByText("+1")).not.toBeInTheDocument();
      });

      it("renders the label with the selectedSize in pixels if passed", () => {
        render(
          <ReactFlagsSelect {...defaultProps} selected="NG" selectedSize={24} />
        );
        const selectButton = screen.getByTestId("rfs-btn");
        expect(selectButton).toHaveStyle({ "font-size": "24px" });
      });
    });
  });

  describe("options", () => {
    describe("when closed", () => {
      it("does not render options list by default", () => {
        render(<ReactFlagsSelect {...defaultProps} />);
        expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
      });
    });

    describe("when opened", () => {
      it("renders options list", () => {
        openOptions();
        expect(screen.getByRole("listbox")).toBeInTheDocument();
      });

      it("renders a list of all countries", () => {
        openOptions();
        const options = screen.getAllByRole("option");
        expect(options.length).toBe(221);
      });

      it("renders the flag SVG of each country option", () => {
        openOptions();
        const options = screen.getAllByRole("option");
        expect(options[0].firstChild?.firstChild?.firstChild?.nodeName).toBe(
          "svg"
        );
      });

      it("renders the label of each country option", () => {
        openOptions();
        expect(screen.getByText("Nigeria")).toBeInTheDocument();
      });

      it("renders a custom label of each country option if present as a string", () => {
        openOptions({ customLabels: { GB: "GB", US: "US" } });
        expect(screen.getByText("Nigeria")).toBeInTheDocument();
        expect(screen.getByText("GB")).toBeInTheDocument();
        expect(screen.getByText("US")).toBeInTheDocument();
      });

      it("renders a custom label of each country option if present as a CustomLabel object", () => {
        openOptions({
          customLabels: { GB: { primary: "GB", secondary: "+44" }, US: "US" },
        });
        expect(screen.getByText("Nigeria")).toBeInTheDocument();
        expect(screen.getByText("GB")).toBeInTheDocument();
        expect(screen.getByText("+44")).toBeInTheDocument();
        expect(screen.getByText("US")).toBeInTheDocument();
      });

      it("does not render the label of each country option if showOptionLabel is false", () => {
        openOptions({ showOptionLabel: false });
        expect(screen.queryByText("Nigeria")).not.toBeInTheDocument();
      });

      it("does not render the secondary label of each country option if showSecondaryOptionLabel is false", () => {
        openOptions({
          showSecondaryOptionLabel: false,
          customLabels: { US: { primary: "US", secondary: "+1" } },
        });
        expect(screen.queryByText("+1")).not.toBeInTheDocument();
        expect(screen.queryByText("US")).toBeInTheDocument();
      });

      it("renders the options with the optionsSize in pixels if passed", () => {
        openOptions({ optionsSize: 24 });
        const optionsList = screen.getByRole("listbox");
        expect(optionsList).toHaveStyle({ "font-size": "24px" });
      });

      it("aligns options to right of alignOptionsToRight is true", () => {
        openOptions({ alignOptionsToRight: true });
        const optionsList = screen.getByRole("listbox");
        expect(optionsList.className.includes("alignOptionsToRight")).toBe(
          true
        );
      });
    });

    describe("when opened with searchable options", () => {
      it("does not render a searchable options list by default", () => {
        openOptions();
        expect(screen.queryByPlaceholderText("Search")).not.toBeInTheDocument();
      });

      it("renders a searchable options list when searchable is true", () => {
        openOptions({ searchable: true });
        expect(screen.getByPlaceholderText("Search")).toBeInTheDocument();
      });

      it("renders a custom search input placeholder if passed", () => {
        openOptions({
          searchable: true,
          searchPlaceholder: "Search countries",
        });
        expect(screen.queryByPlaceholderText("Search")).not.toBeInTheDocument();
        expect(
          screen.getByPlaceholderText("Search countries")
        ).toBeInTheDocument();
      });

      it("filters the options list with the search input value", () => {
        openOptions({ searchable: true });
        const searchInput = screen.getByPlaceholderText("Search");

        fireEvent.change(searchInput, { target: { value: "Nige" } });
        const options = screen.getAllByRole("option");
        expect(options.length).toBe(2);
      });

      it("filters the options list against the default and available custom labels with the search input value", () => {
        openOptions({ searchable: true, customLabels: { NG: "Naija" } });
        const searchInput = screen.getByPlaceholderText("Search");

        fireEvent.change(searchInput, { target: { value: "Nige" } });
        const options = screen.getAllByRole("option");
        expect(options.length).toBe(1);

        fireEvent.change(searchInput, { target: { value: "Nigeri" } });
        expect(screen.queryByRole("option")).not.toBeInTheDocument();

        fireEvent.change(searchInput, { target: { value: "Nai" } });
        const updatedOptions = screen.getAllByRole("option");
        expect(updatedOptions.length).toBe(1);
      });
    });

    describe("when an option is selected", () => {
      it("calls onselect and closes the options list", () => {
        openOptions();
        fireEvent.click(screen.getByText("Nigeria"));
        expect(defaultProps.onSelect).toHaveBeenCalledWith("NG");
        expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
      });
    });

    describe("when window is clicked", () => {
      it("closes the options list", () => {
        openOptions();
        fireEvent.click(document);
        expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
      });

      it("doesn't close the options list if the search input is clicked", () => {
        openOptions({ searchable: true });
        const searchInput = screen.getByPlaceholderText("Search");
        fireEvent.click(searchInput);
        expect(screen.getByRole("listbox")).toBeInTheDocument();
      });
    });
  });

  describe("countries", () => {
    describe("when blacklistCountries is false", () => {
      it("uses countries for options", () => {
        openOptions({ countries: ["US", "GB", "DE", "FR", "NG", "ES"] });
        const options = screen.getAllByRole("option");
        expect(options.length).toBe(6);
      });

      it("filters for valid countried", () => {
        openOptions({ countries: ["US", "GB", "DE", "FR", "XX", "KK"] });
        const options = screen.getAllByRole("option");
        expect(options.length).toBe(4);
      });

      it("renders the placeholder if passed selected value is not in the countries list", () => {
        render(
          <ReactFlagsSelect
            {...defaultProps}
            selected="NG"
            countries={["US", "GB", "DE", "FR"]}
          />
        );
        expect(screen.getByText("Select a country")).toBeInTheDocument();
      });
    });

    describe("when blacklistCountries is true", () => {
      it("exempts countries from options", () => {
        openOptions({
          countries: ["US", "GB", "DE", "FR", "NG", "ES"],
          blacklistCountries: true,
        });
        const options = screen.getAllByRole("option");
        expect(options.length).toBe(215);
      });

      it("renders the placeholder if passed selected value is blacklisted", () => {
        render(
          <ReactFlagsSelect
            {...defaultProps}
            selected="FR"
            countries={["US", "GB", "DE", "FR"]}
            blacklistCountries
          />
        );
        expect(screen.getByText("Select a country")).toBeInTheDocument();
      });
    });
  });

  describe("className", () => {
    it("passes className to the container if present", () => {
      render(<ReactFlagsSelect {...defaultProps} className="flags-select" />);
      const container = screen.getByTestId("rfs");
      expect(container.className.includes("flags-select")).toBe(true);
    });
  });

  describe("select button ClassName", () => {
    it("passes selectButtonClassName to the select button className if present", () => {
      render(
        <ReactFlagsSelect
          {...defaultProps}
          selectButtonClassName="flags-select-button"
        />
      );
      const selectButton = screen.getByTestId("rfs-btn");
      expect(selectButton.className.includes("flags-select-button")).toBe(true);
    });
  });

  describe("full width", () => {
    it("renders full width by default", () => {
      render(<ReactFlagsSelect {...defaultProps} />);
      const container = screen.getByTestId("rfs");
      expect(container.className.includes("flagsSelectInline")).toBe(false);
    });

    it("renders inline when fullWidth is false", () => {
      render(<ReactFlagsSelect {...defaultProps} fullWidth={false} />);
      const container = screen.getByTestId("rfs");
      expect(container.className.includes("flagsSelectInline")).toBe(true);
    });
  });

  describe("disabled", () => {
    it("disables the select button", () => {
      render(<ReactFlagsSelect {...defaultProps} disabled />);
      const selectedButton = screen.getByTestId("rfs-btn");
      expect(selectedButton).toHaveAttribute("disabled");
    });

    it("renders with disabled style", () => {
      render(<ReactFlagsSelect {...defaultProps} disabled />);
      const selectedButton = screen.getByTestId("rfs-btn");
      expect(selectedButton.className.includes("disabledBtn")).toBe(true);
    });
  });

  describe("id", () => {
    it("does not have an id on the container by default", () => {
      render(<ReactFlagsSelect {...defaultProps} />);
      const container = screen.getByTestId("rfs");
      expect(container).not.toHaveAttribute("id");
    });

    it("passes id to the container if present", () => {
      render(<ReactFlagsSelect {...defaultProps} id="origin-country" />);
      const container = screen.getByTestId("rfs");
      expect(container).toHaveAttribute("id", "origin-country");
    });
  });
});
