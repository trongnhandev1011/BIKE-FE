export const stringToGMT = (dateTime: string) => new Date(dateTime).toString();
export const stringToReadableGMT = (dateTime: string) =>
  new Date(dateTime).toLocaleString("en-GB", {
    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  });
