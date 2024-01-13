<template>
    <div class="ipl-data-row">
        <ipl-label>{{ label }}</ipl-label>
        <div class="value">
            <slot>
                {{ isBlank(value) ? '―' : value }}
            </slot>
            <ipl-button
                v-if="copiable"
                class="copy-button"
                icon="copy"
                color="transparent"
                @click="onCopy"
            />
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import IplLabel from './iplLabel.vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCopy } from '@fortawesome/free-solid-svg-icons/faCopy';
import { isBlank } from '../helpers/stringHelper';
import IplButton from './iplButton.vue';

library.add(faCopy);

export default defineComponent({
    name: 'IplDataRow',

    components: { IplButton, IplLabel },

    props: {
        label: {
            type: String,
            required: true
        },
        value: {
            type: [String, Number, null] as PropType<string | number | undefined | null>,
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
                navigator.clipboard.writeText(String(props.value ?? '')).catch(e => {
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
        margin-left: 2px;
        font-size: 0.5em;
    }
}
</style>
