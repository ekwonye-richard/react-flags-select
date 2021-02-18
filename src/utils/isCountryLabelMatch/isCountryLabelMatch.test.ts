import { isCountryLabelMatch } from ".";

describe("isCountryLabelMatch", () => {
  it("returns false if there is no label", () => {
    expect(isCountryLabelMatch(undefined, "ger")).toBe(false);
  });

  it("returns false if there is no search value", () => {
    expect(isCountryLabelMatch("France")).toBe(false);
  });

  it("returns true if the search value can be found in label", () => {
    expect(isCountryLabelMatch("France", "Fra")).toBe(true);
  });

  it("is not case sensitive", () => {
    expect(isCountryLabelMatch("FRANCE", "fra")).toBe(true);
  });

  it("returns false if the search value can not be found in label", () => {
    expect(isCountryLabelMatch("France", "ger")).toBe(false);
  });
});
