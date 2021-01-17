import { countryCodeToPascalCase } from ".";

describe("countryCodeToPascalCase", () => {
  it("returns a country code to pascal case", () => {
    expect(countryCodeToPascalCase("GB")).toEqual("Gb");
  });
});
