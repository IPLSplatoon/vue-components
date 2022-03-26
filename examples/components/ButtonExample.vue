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
        <ipl-button
            label="Disabled"
            disabled
            class="top-margin"
            @click="onButtonClick"
        />
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

library.add(faBrush);

export default defineComponent({
    name: 'ButtonExample',

    components: { IplButton, IplSpace },

    setup() {
        const hexButtonColor = ref('#AAAAAA');

        return {
            hexButtonColor,
            onButtonClick() {
                alert('Hello!');
            },
            onIconButtonClick() {
                alert('I have an icon :)');
            },
            setHexButtonColor() {
                hexButtonColor.value = '#' + Math.floor(Math.random()*16777215).toString(16);
            }
        };
    }
});
</script>
