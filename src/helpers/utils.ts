/**
 * Wait for a duration
 * @param time Time in milliseconds
 */
export const waitFor = (time: number) => new Promise(resolve => setTimeout(resolve, time));
