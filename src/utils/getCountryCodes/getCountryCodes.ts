import { countries as AllCountries } from "../../data";
import type { CountryCodes } from "../../types";

export const getCountryCodes = (
  countries?: CountryCodes,
  blacklistCountries?: boolean
): CountryCodes => {
  const fullCountryCodes = Object.keys(AllCountries);

  if (!countries) {
    return fullCountryCodes;
  }

  const uniqueCountries = [...new Set(countries)];

  const validCountryCodes = uniqueCountries.filter(
    (code) => AllCountries[code]
  );
  const filteredCountryCodes = blacklistCountries
    ? fullCountryCodes.filter((code) => !validCountryCodes.includes(code))
    : validCountryCodes;

  return filteredCountryCodes;
};
