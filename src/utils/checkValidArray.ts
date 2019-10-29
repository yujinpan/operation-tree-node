// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function checkValidArray(data: any): boolean {
  return !!(Array.isArray(data) && data.length);
}
