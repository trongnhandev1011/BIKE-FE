export const findScheme = (path: string) =>
  (path.match(/^([a-z0-9]+):\/\//) || [])[1];
export const pathToImgURL = (path: string) =>
  (!["http", "https"].includes(findScheme(path))
    ? process.env.NEXT_PUBLIC_IMG_URL
    : "") + path;
