import React, { useState, useEffect, useRef } from "react";
import cx from "classnames";

import { countries as AllCountries } from "../../data";
import { countryCodeToPascalCase, getCountryCodes } from "../../utils";
import type { CountryCodes, CustomLabels, OnSelect } from "../../types";
import * as flags from "../Flags";

import styles from "./ReactFlagsSelect.module.scss";

const defaultPlaceholder = "Select a country";
const defaultSearchPlaceholder = "Search";

type Flags = typeof flags;
type FlagKey = keyof Flags;

type Props = {
  className?: string;
  selected: string;
  onSelect: OnSelect;
  selectButtonClassName?: string;
  showSelectedLabel?: boolean;
  showSecondarySelectedLabel?: boolean;
  showOptionLabel?: boolean;
  showSecondaryOptionLabel?: boolean;
  selectedSize?: number;
  optionsSize?: number;
  customLabels?: CustomLabels;
  placeholder?: React.ReactNode;
  searchable?: boolean;
  searchPlaceholder?: string;
  alignOptionsToRight?: boolean;
  countries?: CountryCodes;
  blacklistCountries?: boolean;
  fullWidth?: boolean;
  disabled?: boolean;
  id?: string;
};

const ReactFlagsSelect: React.FC<Props> = ({
  className,
  selected,
  onSelect,
  selectButtonClassName,
  showSelectedLabel = true,
  showSecondarySelectedLabel = true,
  showOptionLabel = true,
  showSecondaryOptionLabel = true,
  selectedSize = 16,
  optionsSize = 16,
  customLabels = {},
  placeholder,
  searchable = false,
  searchPlaceholder,
  alignOptionsToRight = false,
  countries,
  blacklistCountries = false,
  fullWidth = true,
  disabled = false,
  id,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [countriesOptions, setCountriesOptions] = useState<CountryCodes>([]);
  const [
    filteredCountriesOptions,
    setFilteredCountriesOptions,
  ] = useState<CountryCodes>([]);
  const [filterValue, setFilterValue] = useState<string>("");

  const selectedFlagRef = useRef(null);
  const optionsRef = useRef(null);
  const filterTextRef = useRef(null);

  const validSelectedValue = countriesOptions.includes(selected)
    ? selected
    : "";

  const options = filterValue ? filteredCountriesOptions : countriesOptions;

  const getFlag = (key: FlagKey): Flags[FlagKey] => flags[key];

  const getSelectedFlag = (): React.ReactElement => {
    const selectedFlagName = countryCodeToPascalCase(validSelectedValue);
    const SelectedFlag = getFlag(selectedFlagName as FlagKey);
    return <SelectedFlag />;
  };

  const getLabel = (countryCode: string) => {
    return customLabels[countryCode] || AllCountries[countryCode];
  };

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  const onOptionSelect = (countryCode: string) => {
    setFilterValue("");
    onSelect(countryCode);
  };

  const filterSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value || "";
    setFilterValue(value);

    if (!value) {
      setFilteredCountriesOptions([]);
      return;
    }

    const filteredCountriesOptions = countriesOptions.filter((key) => {
      const label = getLabel(key);
      if (typeof label === "object") {
        return label && label.primary.match(new RegExp(value, "i"));
      }
      return label && label.match(new RegExp(value, "i"));
    });

    setFilteredCountriesOptions(filteredCountriesOptions);
  };

  const closeDropdown = (e: MouseEvent) => {
    if (
      e.target !== selectedFlagRef.current &&
      e.target !== optionsRef.current &&
      e.target !== filterTextRef.current
    ) {
      setIsDropdownOpen(false);
    }
  };

  const closeDropdwownWithKeyboard = (e: React.KeyboardEvent) => {
    e.preventDefault();
    if (e.keyCode === 27) {
      //esc key: close dropdown
      setIsDropdownOpen(false);
    }
  };

  const onSelectWithKeyboard = (
    e: React.KeyboardEvent,
    countryCode: string
  ) => {
    e.preventDefault();
    if (e.keyCode === 13) {
      //enter key: select option
      onOptionSelect(countryCode);
      setIsDropdownOpen(false);
    } else if (e.keyCode === 27) {
      //esc key: close dropdown
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    setCountriesOptions(getCountryCodes(countries, blacklistCountries));
  }, [countries, blacklistCountries]);

  useEffect(() => {
    window.addEventListener("click", closeDropdown);

    return () => {
      window.removeEventListener("click", closeDropdown);
    };
  }, []);

  const displayLabel = getLabel(validSelectedValue);

  return (
    <div
      className={cx(styles.flagsSelect, className, {
        [styles.flagsSelectInline]: !fullWidth,
      })}
      id={id}
      data-testid="rfs"
    >
      <button
        ref={selectedFlagRef}
        id="rfs-btn"
        type="button"
        className={cx(styles.selectBtn, selectButtonClassName, {
          [styles.disabledBtn]: disabled,
        })}
        style={{ fontSize: selectedSize }}
        onClick={toggleDropdown}
        onKeyUp={(e) => closeDropdwownWithKeyboard(e)}
        disabled={disabled}
        aria-labelledby="rfs-btn"
        aria-haspopup="listbox"
        aria-expanded={isDropdownOpen}
        data-testid="rfs-btn"
      >
        <span className={styles.selectValue}>
          {validSelectedValue ? (
            <>
              <span
                className={styles.selectFlag}
                data-testid="rfs-selected-flag"
              >
                {getSelectedFlag()}
              </span>
              {showSelectedLabel && (
                <span className={styles.label}>
                  {typeof displayLabel === "object"
                    ? displayLabel.primary
                    : displayLabel}
                </span>
              )}
              {showSecondarySelectedLabel &&
                typeof displayLabel === "object" && (
                  <span className={[styles.label, styles.secondary].join(" ")}>
                    {displayLabel.secondary}
                  </span>
                )}
            </>
          ) : (
            <>{placeholder || defaultPlaceholder}</>
          )}
        </span>
      </button>
      {!disabled && isDropdownOpen && (
        <ul
          tabIndex={-1}
          role="listbox"
          ref={optionsRef}
          style={{ fontSize: optionsSize }}
          className={cx(styles.selectOptions, {
            [styles.selectOptionsWithSearch]: searchable,
            [styles.alignOptionsToRight]: alignOptionsToRight,
            [styles.fullWidthOptions]: fullWidth,
          })}
        >
          {searchable && (
            <div className={styles.filterBox}>
              <input
                type="text"
                name="rfs-q"
                autoComplete="off"
                value={filterValue}
                placeholder={searchPlaceholder || defaultSearchPlaceholder}
                ref={filterTextRef}
                onChange={filterSearch}
              />
            </div>
          )}
          {options.map((countryCode) => {
            const countryFlagName = countryCodeToPascalCase(countryCode);
            const CountryFlag = getFlag(countryFlagName as FlagKey);
            const countryLabel = getLabel(countryCode);

            return (
              <li
                key={countryCode}
                id={`rfs-${countryCode}`}
                role="option"
                tabIndex={0}
                className={cx(styles.selectOption, {
                  [styles.selectOptionWithlabel]: showOptionLabel,
                })}
                onClick={() => onOptionSelect(countryCode)}
                onKeyUp={(e) => onSelectWithKeyboard(e, countryCode)}
              >
                <span className={styles.selectOptionValue}>
                  <span className={styles.selectFlag}>
                    <CountryFlag />
                  </span>
                  {showOptionLabel && (
                    <span className={styles.label}>
                      {typeof countryLabel === "object"
                        ? countryLabel.primary
                        : countryLabel}
                    </span>
                  )}
                  {showSecondaryOptionLabel &&
                    typeof countryLabel === "object" && (
                      <span
                        className={[styles.label, styles.secondary].join(" ")}
                      >
                        {countryLabel.secondary}
                      </span>
                    )}
                </span>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default ReactFlagsSelect;
