export type Countries = Record<string, string>;
export type CountryCodes = Array<string>;
export type CustomLabels = Record<string, string | CustomLabel>;
export type CustomLabel = { primary: string; secondary?: string };
export type OnSelect = (countryCode: string) => void;
