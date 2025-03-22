export const getDateValue = (date) => {
  return date ? new Date(date).toISOString().split("T")[0] : "--";
};

export const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
};
