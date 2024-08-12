export async function dialogAnimationComplete(element: HTMLElement): Promise<unknown> {
    return Promise.allSettled(element.getAnimations({ subtree: true }).filter(anim => anim.effect instanceof KeyframeEffect && anim.effect.target === element && (anim.effect.pseudoElement == null || anim.effect.pseudoElement === '::backdrop')).map(animation => animation.finished));
}
