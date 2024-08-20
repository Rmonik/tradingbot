import { TimeUnit } from "./types.js";


export function addTime(date: Date, time: number, units: TimeUnit): Date {
  switch (units) {
    case TimeUnit.Milliseconds:
      return new Date(date.getTime() + time);
    case TimeUnit.Seconds:
      return new Date(date.getTime() + time * 1000);
    case TimeUnit.Minutes:
      return new Date(date.getTime() + time * 1000 * 60);
    case TimeUnit.Hours:
      return new Date(date.getTime() + time * 1000 * 60 * 60);
  }
}