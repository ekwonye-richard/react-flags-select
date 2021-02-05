import { CustomLabel } from "../../types";
import { isCustomLabelObject } from "./isCustomLabelObject";

describe("isCustomLabelObject", () => {
  describe("when string is passed", () => {
    it("returns false when string is valid", () => {
      const label: string | CustomLabel = "US";
      const isLabelObject = isCustomLabelObject(label);
      expect(isLabelObject).toBe(false);
    });
  });

  describe("when CustomLabel object is passed", () => {
    it("returns true when object is valid", () => {
      const label: string | CustomLabel = {
        primary: "US",
        secondary: "+1",
      };
      const isLabelObject = isCustomLabelObject(label);
      expect(isLabelObject).toBe(true);
    });

    it("returns true when only primary property is valid in object", () => {
      const label: string | CustomLabel = {
        primary: "US",
      };
      const isLabelObject = isCustomLabelObject(label);
      expect(isLabelObject).toBe(true);
    });
  });
});
