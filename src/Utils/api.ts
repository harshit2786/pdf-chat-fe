export const setBaseUrl = (str : string) => {
    const baseUrl = import.meta.env.REACT_API_URI ?? "http://localhost:8000/api/v1";
    return `${baseUrl}${str}`
} 

export function formatTimestampToDate(timestamp: number): string {
  const date = new Date(timestamp * 1000); // Convert seconds to milliseconds
  const options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "short",
    year: "numeric",
  };
  return date.toLocaleDateString("en-US", options);
}