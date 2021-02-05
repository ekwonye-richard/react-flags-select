import { CustomLabel } from "../../types";

export const isCustomLabelObject = (label: string | CustomLabel): boolean => {
  return typeof label === "object";
};
