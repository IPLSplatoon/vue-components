<template>
    <div class="ipl-data-row">
        <ipl-label>{{ label }}</ipl-label>
        <div class="value">
            <slot>
                {{ isBlank(value) ? '―' : value }}
            </slot>
            <button
                v-if="copiable"
                class="copy-button"
                @click="onCopy"
            >
                <font-awesome-icon icon="copy" />
            </button>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import IplLabel from './iplLabel.vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCopy } from '@fortawesome/free-solid-svg-icons/faCopy';
import { isBlank } from '../helpers/stringHelper';

library.add(faCopy);

export default defineComponent({
    name: 'IplDataRow',

    components: { IplLabel, FontAwesomeIcon },

    props: {
        label: {
            type: String,
            required: true
        },
        value: {
            type: [String, null] as PropType<string | undefined | null>,
            default: null
        },
        copiable: {
            type: Boolean,
            default: false
        }
    },

    setup(props) {
        return {
            onCopy() {
                navigator.clipboard.writeText(props.value ?? '').catch(e => {
                    console.error('Failed to copy value', e);
                });
            },
            isBlank
        };
    }
});
</script>

<style lang="scss" scoped>
@use 'src/styles/constants';

.ipl-data-row {
    display: flex;
    flex-direction: row;
    border-bottom: 1px solid var(--ipl-input-color);
    width: 100%;
    padding: 2px 0;
    margin-top: 6px;

    label {
        align-self: flex-end;
        flex-grow: 1;
        min-width: max-content;
    }

    .value {
        justify-self: flex-end;
        align-self: flex-end;
        text-align: right;
        overflow-wrap: anywhere;
    }

    .copy-button {
        font-size: 0.9em;
        margin-left: 2px;
        padding: 0 2px;
        border: 0;
        background-color: transparent;
        color: var(--ipl-text-button-color);
        cursor: default;
        border-radius: constants.$border-radius-inner;
        text-align: center;
        transition-property: color, background-color;
        transition-duration: constants.$transition-duration-low;

        &:hover {
            color: var(--ipl-text-button-color-hover);
            background-color: var(--ipl-hover-overlay-color);
        }

        &:active {
            color: var(--ipl-text-button-color-active);
            background-color: var(--ipl-active-overlay-color);
        }

        &:focus-visible {
            outline: var(--ipl-focus-outline-color) solid 2px;
        }
    }
}
</style>
