
export const getDataFromLocalStorage = () => {
  const value = localStorage.getItem("data");
  if (typeof value === "string") {
    return JSON.parse(value);
  }
};
