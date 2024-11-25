export function formatDateToYYYYMMDD(date: Date | string): string {
  const newDate = typeof date === "string" ? new Date(date) : date;
  return newDate.toISOString().substring(0, 10);
}
