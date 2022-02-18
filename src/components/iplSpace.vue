<template>
    <div
        class="ipl-space"
        :class="{[`color-${color}`]: true, clickable: clickable}"
    >
        <slot />
    </div>
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
@import './src/styles/colors';
@import './src/styles/constants';

.ipl-space {
    border-radius: $border-radius-outer;
    padding: 8px;

    &.color-light {
        background-color: $background-secondary;
    }

    &.color-dark {
        background-color: $background-primary;
    }

    &.color-blue {
        background-color: $blue;
    }

    &.clickable {
        user-select: none;
        cursor: pointer;
        transition-duration: $transition-duration-low;

        &:hover {
            &.color-light {
                background-color: $background-secondary-hover;
            }

            &.color-dark {
                background-color: $background-primary-hover;
            }

            &.color-blue {
                background-color: $blue-hover;
            }
        }

        &:active {
            &.color-light {
                background-color: $background-secondary-active;
            }

            &.color-dark {
                background-color: $background-primary-active;
            }

            &.color-blue {
                background-color: $blue-active;
            }
        }
    }
}
</style>
