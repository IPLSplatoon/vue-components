<template>
    <ipl-space>
        <ipl-button
            label="Default"
            @click="onButtonClick"
        />
        <ipl-button
            label="Small"
            small
            class="top-margin"
            @click="onButtonClick"
        />
        <div class="disabled-buttons-layout top-margin">
            <ipl-button
                :label="disabledButtonDisabled ? 'Disabled' : 'Enabled'"
                :disabled="disabledButtonDisabled"
                @click="onButtonClick"
            />
            <ipl-button
                label="Toggle disabled"
                @click="onDisabledToggleClick"
            />
        </div>
        <ipl-button
            label="Link"
            href="https://google.com"
            class="top-margin"
        />
        <ipl-button
            label="Disabled on success"
            disable-on-success
            success-message="Clicked!"
            class="top-margin"
            @click="() => {}"
        />
        <ipl-button
            label="Preset color"
            color="green"
            class="top-margin"
            @click="onButtonClick"
        />
        <ipl-button
            label="Hex color"
            :color="hexButtonColor"
            class="top-margin"
            @click="setHexButtonColor"
        />
        <ipl-button
            icon="brush"
            class="top-margin"
            @click="onIconButtonClick"
        />
    </ipl-space>
</template>

<script lang="ts">
import { IplButton, IplSpace } from '../../src/';
import { defineComponent } from '@vue/runtime-core';
import { ref } from 'vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faBrush } from '@fortawesome/free-solid-svg-icons/faBrush';
import { getRandomColor } from '../helpers';

library.add(faBrush);

export default defineComponent({
    name: 'ButtonExample',

    components: { IplButton, IplSpace },

    setup() {
        const hexButtonColor = ref('#AAAAAA');
        const disabledButtonDisabled = ref(true);

        return {
            hexButtonColor,
            onButtonClick() {
                alert('Hello!');
            },
            onIconButtonClick() {
                alert('I have an icon :)');
            },
            setHexButtonColor() {
                hexButtonColor.value = getRandomColor();
            },

            disabledButtonDisabled,
            onDisabledToggleClick() {
                disabledButtonDisabled.value = !disabledButtonDisabled.value;
            }
        };
    }
});
</script>

<style lang="scss">
.disabled-buttons-layout {
    display: flex;

    > .ipl-button:last-child {
        margin-left: 8px;
    }
}
</style>
