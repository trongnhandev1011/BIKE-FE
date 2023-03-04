export const stringToGMT = (dateTime: string) => new Date(dateTime).toString();

export const stringToReadableGMT = (dateTime: string) =>
  new Date(dateTime).toLocaleString("en-GB", {
    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  });

export const dateToISOFormatString = (date: Date) =>
  date.toISOString().slice(0, -5) + "Z";

export const getTodayDate = () => new Date();

export const getRelativeDate = ({
  yearDiff = 0,
  monthDiff = 0,
  dayDiff = 0,
}: {
  yearDiff?: number;
  monthDiff?: number;
  dayDiff?: number;
}) => {
  const today = getTodayDate();
  return new Date(
    today.getFullYear() + yearDiff,
    today.getMonth() + monthDiff,
    today.getDate() + dayDiff
  );
};
