/**
 * Получить рандомное целое число в промежутке
 * @param {number} min
 * @param {number} max
 */
export function getRandomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
