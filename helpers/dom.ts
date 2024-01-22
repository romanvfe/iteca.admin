/**
 * Скролл к элементу
 */
export function scrollTo(el: HTMLElement | null | undefined, behavior: ScrollBehavior = 'smooth') {
    if (!el) return;

    const elTopOffset = el.getBoundingClientRect().top;
    const { scrollTop } = document.documentElement;
    const targetScrollTop = scrollTop + elTopOffset;

    window.scrollTo({
        top: targetScrollTop,
        behavior,
    });
}
