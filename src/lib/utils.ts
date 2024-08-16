import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const convertFileToUrl = (file: File) => URL.createObjectURL(file);

export const timeAgo = (timestamp: string): string => {
  const now = new Date().getTime();
  const past = new Date(timestamp).getTime();
  const diffInSeconds = Math.floor((now - past) / 1000);

  const intervals: [string, number][] = [
      ["year", 31536000],
      ["month", 2592000],
      ["week", 604800],
      ["day", 86400],
      ["hour", 3600],
      ["minute", 60],
      ["second", 1]
  ];

  const [interval, value] = intervals.find(([_, seconds]) => diffInSeconds >= seconds) || ["second", 1];
  const count = Math.floor(diffInSeconds / value);

  return count > 1 ? `${count} ${interval}s ago` : count === 1 ? `${count} ${interval} ago` : "Just now";
};

 export const checkIsLiked = (likeList: string[], userId: string) => {
  return likeList.includes(userId);
 }