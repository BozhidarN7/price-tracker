export function formatDate(
  dateString: string,
  options?: { short?: boolean },
): string {
  const safeDateString = dateString.replace(/:(\d{3})Z$/, '.$1Z'); // fix malformed input
  const date = new Date(safeDateString);

  if (isNaN(date.getTime())) return ''; // handle invalid date

  return date.toLocaleDateString('en-US', {
    month: options?.short ? 'short' : 'long',
    day: 'numeric',
    year: options?.short ? undefined : 'numeric',
  });
}

export function toDate(input: string) {
  if (!input) {
    return null;
  }
  console.log('input', input);

  // Handle ISO string with time zone (e.g., "2025-11-02T13:04:06.986Z")
  if (input.includes('T')) {
    const parsed = new Date(input);
    return isNaN(parsed.getTime()) ? null : parsed;
  }

  // Handle "YYYY-MM-DD" (no timezone info)
  const [year, month, day] = input.split('-').map(Number);
  if (!year || !month || !day) {
    return null;
  }

  return new Date(year, month - 1, day); // Local date, no UTC shift
}

export function toDateStringISO(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}
