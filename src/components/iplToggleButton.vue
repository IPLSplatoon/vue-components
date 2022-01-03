<template>
    <ipl-button
        :label="label"
        :color="modelValue ? 'green' : disabledColor"
        class="ipl-toggle-button"
        @click="toggle"
    />
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import IplButton from './iplButton.vue';
import { themeColors } from '../styles/colors';

export default defineComponent({
    name: 'IplToggleButton',

    components: { IplButton },

    props: {
        label: {
            type: String,
            required: true
        },
        modelValue: {
            type: [Boolean, null] as PropType<boolean | null>,
            required: true
        }
    },

    emits: [ 'update:modelValue' ],

    setup(props, { emit }) {
        return {
            toggle() {
                emit('update:modelValue', !props.modelValue);
            },
            disabledColor: themeColors.backgroundColorSecondary
        };
    }
});
</script>
