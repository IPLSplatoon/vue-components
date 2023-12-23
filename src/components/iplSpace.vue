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

export default defineComponent({
    name: 'IplSpace',

    props: {
        color: {
            type: String as PropType<'dark' | 'light' | 'blue'>,
            default: 'dark',
            validator: (value: string): boolean => {
                return ['dark', 'light', 'blue'].includes(value);
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

button.ipl-space {
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

    &:hover {
        &.color-light {
            background-color: var(--ipl-bg-secondary-hover);
        }

        &.color-dark {
            background-color: var(--ipl-bg-primary-hover);
        }

        &.color-blue {
            background-color: colors.$blue-hover;
        }
    }

    &:active {
        &.color-light {
            background-color: var(--ipl-bg-secondary-active);
        }

        &.color-dark {
            background-color: var(--ipl-bg-primary-active);
        }

        &.color-blue {
            background-color: colors.$blue-active;
        }
    }

    &:focus-visible {
        outline: var(--ipl-focus-outline-color) solid 2px;
    }
}

.ipl-space {
    border-radius: constants.$border-radius-outer;
    padding: 8px;

    &.color-light {
        background-color: var(--ipl-bg-secondary);
    }

    &.color-dark {
        background-color: var(--ipl-bg-primary);
    }

    &.color-blue {
        background-color: colors.$blue;
    }
}
</style>
