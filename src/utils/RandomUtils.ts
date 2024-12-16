
export function getRandomNumberBetween(start: number, end: number): number {
    return Math.random() * (end - start) + start;
}