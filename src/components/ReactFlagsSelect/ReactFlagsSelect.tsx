import React, { useState, useEffect, useRef } from "react";
import cx from "classnames";

import { countries as AllCountries } from "../../data";
import { getCountryCodes } from "../../utils";
import type { OnSelect, CountryCodes, CustomLabels } from "../../types";

import styles from "./ReactFlagsSelect.module.scss";

type Props = {
  className?: string;
  selected?: string;
  onSelect: OnSelect;
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
  disabled?: boolean;
  id?: string;
};

const ReactFlagsSelect: React.FC<Props> = ({
  className,
  selected = "",
  onSelect,
  showSelectedLabel = true,
  showOptionLabel = true,
  selectedSize = 16,
  optionsSize = 14,
  customLabels = {},
  placeholder = "Select a country",
  searchable = false,
  searchPlaceholder = "Search",
  alignOptionsToLeft = false,
  countries,
  blacklistCountries = false,
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

  const options = filterValue ? filteredCountriesOptions : countriesOptions;

  const toggleDropdown = (): void => setIsDropdownOpen(!isDropdownOpen);

  const onOptionSelect = (countryCode: string): void => {
    setFilterValue("");
    onSelect(countryCode);
  };

  const filterSearch = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value || "";
    setFilterValue(value);

    if (!value) {
      setFilteredCountriesOptions([]);
      return;
    }

    const filteredCountriesOptions = countriesOptions.filter((key) => {
      const label = customLabels[key] || AllCountries[key];
      return label && label.match(new RegExp(value, "i"));
    });

    setFilteredCountriesOptions(filteredCountriesOptions);
  };

  const closeDropdown = (e: MouseEvent): void => {
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
    window.addEventListener("click", closeDropdown);

    return () => {
      window.removeEventListener("click", closeDropdown);
    };
  }, []);

  return (
    <div className={cx(styles.flagsSelect, className)} id={id}>
      <button
        ref={selectedFlagRef}
        type="button"
        className={styles.selectBtn}
        style={{ fontSize: selectedSize }}
        onClick={toggleDropdown}
        onKeyUp={(e) => closeDropdwownWithKeyboard(e)}
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={isDropdownOpen}
      >
        <span className={styles.selectValue}>
          {selected ? (
            <>
              {/* <img
              className="flag-select__option__icon"
              src={require(`../flags/${selected.toLowerCase()}.svg`)}
              alt={selected}
            /> */}
              {showSelectedLabel && (
                <span className={styles.label}>
                  {customLabels[selected] || AllCountries[selected]}
                </span>
              )}
            </>
          ) : (
            <>{placeholder}</>
          )}
        </span>
      </button>
      {isDropdownOpen && (
        <ul
          tabIndex={-1}
          role="listbox"
          ref={optionsRef}
          style={{ fontSize: optionsSize }}
          className={cx(styles.selectOptions, {
            [styles.alignOptionsToLeft]: alignOptionsToLeft,
          })}
        >
          {searchable && (
            <div className={styles.filterBox}>
              <input
                type="text"
                value={filterValue}
                placeholder={searchPlaceholder}
                ref={filterTextRef}
                onChange={filterSearch}
              />
            </div>
          )}
          {options.map((countryCode) => (
            <li
              key={countryCode}
              role="option"
              tabIndex={0}
              className={cx(styles.selectOption, {
                [styles.selectOptionWithlabel]: showOptionLabel,
              })}
              onClick={(): void => onOptionSelect(countryCode)}
              onKeyUp={(e) => onSelectWithKeyboard(e, countryCode)}
            >
              <span
                style={{
                  width: optionsSize,
                  height: optionsSize,
                }}
              >
                {/* <img
                  className="flag-select__option__icon"
                  alt={`flag for ${countries[countryCode]}`}
                  src={require(`../flags/${countryCode.toLowerCase()}.svg`)}
                /> */}
                {showOptionLabel && (
                  <span className={styles.label}>
                    {customLabels[countryCode] || AllCountries[countryCode]}
                  </span>
                )}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ReactFlagsSelect;
