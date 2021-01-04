export const countryCodeToPascalCase = (countryCode: string): string => {
  return `${countryCode.slice(0, 1)}${countryCode.charAt(1).toLowerCase()}`;
};
