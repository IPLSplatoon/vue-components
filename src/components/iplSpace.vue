<template>
    <component
        :is="clickable ? 'button' : 'div'"
        class="ipl-space"
        :class="`color-${color}`"
    >
        <slot />
    </component>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { isValidSpaceColor, type SpaceColor } from '../helpers/spaceColorHelper';

export default defineComponent({
    name: 'IplSpace',

    props: {
        color: {
            type: String as PropType<SpaceColor>,
            default: 'dark',
            validator: (value: string): boolean => {
                return isValidSpaceColor(value);
            }
        },
        clickable: {
            type: Boolean,
            default: false
        }
    }
});
</script>

<style lang="scss" scoped>
@use 'src/styles/constants';
@use 'src/styles/colors';
@use 'src/styles/space';

button.ipl-space {
    @include space.space-colors-hover();
    @include space.space-colors-active();

    font-family: inherit;
    font-size: inherit;
    line-height: inherit;
    text-align: left;
    color: inherit;
    background-image: none;
    border: 0;
    display: block;
    box-sizing: border-box;
    width: 100%;
    user-select: none;
    cursor: pointer;
    transition-property: background-color;
    transition-duration: constants.$transition-duration-low;

    &:focus-visible {
        outline: var(--ipl-focus-outline-color) solid 2px;
    }
}

.ipl-space {
    @include space.space-colors();

    border-radius: constants.$border-radius-outer;
    padding: 8px;
}
</style>
