import { diaEmMilliseconds } from "./constants";

export const formatDate = (date: number) => {
  var d = new Date(date),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("-");
};

export const formatFullDate = (date: number) => {
  var m = new Date(date);
  var dateString =
    m.getUTCFullYear() +
    "/" +
    ("0" + (m.getUTCMonth() + 1)).slice(-2) +
    "/" +
    ("0" + m.getUTCDate()).slice(-2) +
    " " +
    ("0" + m.getUTCHours()).slice(-2) +
    ":" +
    ("0" + m.getUTCMinutes()).slice(-2) +
    ":" +
    ("0" + m.getUTCSeconds()).slice(-2);
  return dateString;
};

export const arrayOfDates = (date: number, days: number) => {
  const dates: Array<string> = [];

  for (let i = 0; i < days; i++) {
    dates.push(formatDate(date - (i + 1) * diaEmMilliseconds));
  }

  return dates.reverse();
};
