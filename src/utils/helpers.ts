import dayjs from "dayjs";

export const isEmpty = (obj: unknown) => {
  if (!obj) return true;

  if (typeof obj === "string") return obj === "";

  if (Array.isArray(obj)) return obj.length === 0;

  return Object.keys(obj).length === 0;
};

export const formatTimestamp = (ts: number) =>
  dayjs.unix(ts).format("DD.MM.YYYY");

export const fromTimestamp = (ts: number) => dayjs.unix(ts).toDate();

export const toTimestamp = (d: Date) => dayjs(d).unix();
