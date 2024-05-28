export const baseUrl = (): string => {
  return window.location.href.split("/").slice(0, 3).join("/");
};
