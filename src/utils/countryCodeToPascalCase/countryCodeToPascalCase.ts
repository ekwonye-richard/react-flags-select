export const countryCodeToPascalCase = (countryCode: string): string =>
  `${countryCode.slice(0, 1)}${countryCode.charAt(1).toLowerCase()}`;
