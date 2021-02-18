import { isCountryLabelMatch } from ".";

describe("isCountryLabelMatch", () => {
  it("returns true is there is search value can be found in label", () => {
    expect(isCountryLabelMatch("France", "Fra")).toBe(true);
  });

  it("is not case sensitive", () => {
    expect(isCountryLabelMatch("FRANCE", "fra")).toBe(true);
  });

  it("returns false is there is search value can not be found in label", () => {
    expect(isCountryLabelMatch("France", "ger")).toBe(false);
  });
});
