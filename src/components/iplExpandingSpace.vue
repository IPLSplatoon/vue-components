<template>
    <div
        class="ipl-expanding-space"
        :class="{ 'without-background': withoutContentBackground, [`color-${color}`]: true }"
    >
        <div class="ipl-expanding-space__header">
            <div
                class="ipl-expanding-space__header-background"
                tabindex="0"
                @keydown.space.prevent
                @keyup.space.enter="handleHeaderClick"
                @click.self="handleHeaderClick"
            />
            <div class="ipl-expanding-space__title">
                <slot name="title">
                    {{ title }}
                </slot>
            </div>
            <font-awesome-icon
                :icon="faChevronLeft"
                class="icon"
                :class="{ 'content-expanded': contentVisible }"
            />
            <div class="header-extra">
                <slot name="header-extra" />
            </div>
        </div>
        <div
            v-show="contentVisible"
            class="content"
        >
            <slot />
        </div>
    </div>
</template>

<script lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { defineComponent, getCurrentInstance, inject, PropType, ref, watch, WritableComputedRef } from 'vue';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { isValidSpaceColor, type SpaceColor } from '../helpers/spaceColorHelper';

export default defineComponent({
    name: 'IplExpandingSpace',

    components: {
        FontAwesomeIcon
    },

    props: {
        title: {
            type: String,
            default: ''
        },
        expanded: {
            type: Boolean,
            default: false
        },
        withoutContentBackground: {
            type: Boolean,
            default: false
        },
        color: {
            type: String as PropType<SpaceColor>,
            default: 'dark',
            validator: (value: string): boolean => {
                return isValidSpaceColor(value);
            }
        }
    },

    emits: ['update:expanded'],

    setup(props, { emit }) {
        const key = getCurrentInstance()?.vnode.key as string;
        const contentVisible = ref(props.expanded);

        function setIsExpanded(isExpanded: boolean): void {
            if (isInGroup) {
                activeSpace.value = isExpanded ? key : null;
            } else {
                contentVisible.value = isExpanded;
            }
        }

        function emitExpandedPropUpdate(isExpanded: boolean): void {
            emit('update:expanded', isExpanded);
        }

        watch(() => props.expanded, newValue => {
            if (newValue !== contentVisible.value) {
                setIsExpanded(newValue);
            }
        });

        const activeSpace = inject<WritableComputedRef<string | null> | null>('activeSpace', null);
        const isInGroup = activeSpace != null;
        if (isInGroup) {
            watch(activeSpace, newValue => {
                const newIsExpanded = newValue === key;
                contentVisible.value = newIsExpanded;
                emitExpandedPropUpdate(newIsExpanded);
            }, { immediate: true });
        }

        return {
            contentVisible,
            handleHeaderClick() {
                const newValue = !contentVisible.value;
                setIsExpanded(newValue);
                if (!isInGroup) {
                    emitExpandedPropUpdate(newValue);
                }
            },
            faChevronLeft
        };
    }
});
</script>

<style lang="scss" scoped>
@use 'src/styles/constants';
@use 'src/styles/space';

.ipl-expanding-space {
    @include space.space-colors();
    @include space.space-colors(" .ipl-expanding-space__header-background");
    @include space.space-colors-hover(" .ipl-expanding-space__header-background:hover");
    @include space.space-colors-active(" .ipl-expanding-space__header-background:active");

    background-color: var(--ipl-bg-primary);
    border-radius: constants.$border-radius-outer;
    position: relative;

    &.without-background {
        background-color: transparent;

        .content {
            padding: 0;
        }
    }

    .ipl-expanding-space__header {
        cursor: pointer;
        user-select: none;
        display: flex;
        align-items: center;
        padding: 8px;
        transition-duration: constants.$transition-duration-low;
        border-radius: constants.$border-radius-outer;
        position: relative;

        .icon {
            transition-duration: constants.$transition-duration-low;
            justify-self: flex-end;
            margin: 0 5px;
            z-index: 1;
            position: relative;
            pointer-events: none;

            &.content-expanded {
                transform: rotate(-90deg);
            }
        }

        > .header-extra {
            z-index: 1;

            &:not(:empty) {
                margin-left: 8px;
            }
        }

        .ipl-expanding-space__title {
            font-size: 1rem;
            font-weight: 500;
            flex-grow: 1;
            z-index: 1;
            pointer-events: none;
            overflow-wrap: anywhere;
        }

        .ipl-expanding-space__header-background {
            position: absolute;
            width: 100%;
            height: 100%;
            left: 0; top: 0;
            border-radius: constants.$border-radius-outer;
            z-index: 0;
            transition-duration: constants.$transition-duration-low;
            transition-property: background-color;

            &:focus-visible {
                outline: var(--ipl-focus-outline-color) solid var(--ipl-focus-outline-width);
            }
        }
    }

    .content {
        overflow: hidden;
        height: 100%;
        padding: 4px 8px 8px;
    }
}
</style>
