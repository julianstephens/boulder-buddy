import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
dayjs.extend(isBetween);

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

export const capitalCase = (s: string) =>
  s
    .split(" ")
    .map((el) => `${el[0]?.toUpperCase()}${el.slice(1)}`)
    .join(" ");

export const isInRange = (
  target: number,
  rangeStart: number,
  rangeEnd: number,
) =>
  dayjs
    .unix(target)
    .isBetween(dayjs.unix(rangeStart), dayjs.unix(rangeEnd), "D", "[)");
