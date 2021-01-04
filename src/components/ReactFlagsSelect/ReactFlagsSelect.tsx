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
  showOptionLabel?: boolean;
  selectedSize?: number;
  optionsSize?: number;
  customLabels?: CustomLabels;
  placeholder?: React.ReactNode;
  searchable?: boolean;
  searchPlaceholder?: string;
  alignOptionsToLeft?: boolean;
  countries?: CountryCodes;
  blacklistCountries?: boolean;
  fullWidth?: boolean;
  disabled?: boolean;
  id?: string;
};

const ReactFlagsSelect: React.FC<Props> = ({
  className,
  selected = "",
  onSelect,
  selectButtonClassName,
  showSelectedLabel = true,
  showOptionLabel = true,
  selectedSize = 16,
  optionsSize = 14,
  customLabels = {},
  placeholder,
  searchable = false,
  searchPlaceholder,
  alignOptionsToLeft = false,
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

  return (
    <div
      className={cx(styles.flagsSelect, className, {
        [styles.flagsSelectInline]: !fullWidth,
      })}
      id={id}
    >
      <button
        ref={selectedFlagRef}
        id="rfs_btn"
        type="button"
        className={cx(styles.selectBtn, selectButtonClassName, {
          [styles.disabledBtn]: disabled,
        })}
        style={{ fontSize: selectedSize }}
        onClick={toggleDropdown}
        onKeyUp={(e) => closeDropdwownWithKeyboard(e)}
        disabled={disabled}
        aria-labelledby="rfs_btn"
        aria-haspopup="listbox"
        aria-expanded={isDropdownOpen}
      >
        <span className={styles.selectValue}>
          {validSelectedValue ? (
            <>
              {getSelectedFlag()}
              {showSelectedLabel && (
                <span className={styles.label}>
                  {getLabel(validSelectedValue)}
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
            [styles.alignOptionsToLeft]: alignOptionsToLeft,
            [styles.fullWidthOptions]: fullWidth,
          })}
        >
          {searchable && (
            <div className={styles.filterBox}>
              <input
                type="text"
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
                  <CountryFlag />
                  {showOptionLabel && (
                    <span className={styles.label}>
                      {getLabel(countryCode)}
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
