import { getCountryCodes } from ".";
import { countries as AllCountries } from "../../data";

describe("getCountryCodes", () => {
  const fullCountryCodes = Object.keys(AllCountries);

  describe("when no param is passed", () => {
    it("returns all country codes", () => {
      expect(getCountryCodes()).toEqual(fullCountryCodes);
    });
  });

  describe("when only countries param is passed", () => {
    it("returns all passed country codes if all are valid", () => {
      const countryCodes = ["US", "GB"];
      expect(getCountryCodes(countryCodes)).toEqual(countryCodes);
    });

    it("returns only valid passed country codes if some are invalid", () => {
      const countryCodes = ["US", "ZZ", "GB", "de", "Fr", "Ng", "PAR"];
      expect(getCountryCodes(countryCodes)).toEqual(["US", "GB"]);
    });

    it("returns non-repeated country codes", () => {
      const countryCodes = ["US", "US", "GB"];
      expect(getCountryCodes(countryCodes)).toEqual(["US", "GB"]);
    });
  });

  describe("when only countries param is passed and blacklist is true", () => {
    it("returns all country codes excluding the passed countriea", () => {
      const countryCodes = ["US", "GB"];
      const filteredCountryCodes = fullCountryCodes.filter(
        (code) => !countryCodes.includes(code)
      );
      expect(getCountryCodes(countryCodes, true)).toEqual(filteredCountryCodes);
    });
  });
});
