export const isCountryLabelMatch = (
  label?: string,
  searchValue?: string
): boolean => {
  if (!label || !searchValue) {
    return false;
  }

  return label.toLowerCase().includes(searchValue.toLowerCase());
};
