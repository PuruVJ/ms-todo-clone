/**
 * Wait for a duration
 * @param time Time in milliseconds
 */
export const waitFor = (time: number) => new Promise(resolve => setTimeout(resolve, time));

export const randInt = (a: number, b: number) => a + Math.ceil(Math.random() * b);
