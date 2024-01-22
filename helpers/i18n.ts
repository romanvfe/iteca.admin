/**
 * @params {number} choice - индекс выбора, при вводе в $tc: `$tc('path.to.rule', choiceIndex)`
 * @param {number} choicesLength - общее количество доступных вариантов
 * @returns индекс окончательного выбора для выбора слова во множественном числе
 */
export function pluralRu(choice: number, choicesLength: number) {
    if (choice === 0) {
        return 0;
    }

    const teen = choice > 10 && choice < 20;
    const endsWithOne = choice % 10 === 1;

    if (choicesLength < 4) {
        return (!teen && endsWithOne) ? 1 : 2;
    }

    if (!teen && endsWithOne) {
        return 1;
    }

    if (!teen && choice % 10 >= 2 && choice % 10 <= 4) {
        return 2;
    }

    return (choicesLength < 4) ? 2 : 3;
}
