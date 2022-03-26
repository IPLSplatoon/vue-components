<template>
    <div>
        <a
            v-for="item in items"
            :key="item.id"
            :href="`#${item.id}`"
            class="page-index-link"
        >{{ item.text }}</a>
    </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/runtime-core';
import { onMounted, ref } from 'vue';

export default defineComponent({
    name: 'PageIndex',

    setup() {
        const items = ref<Array<{ text: string, id: string }>>([]);

        onMounted(() => {
            items.value = Array.from(document.querySelectorAll('.content-wrapper > h2').values())
                .map(elem => ({ text: elem.textContent, id: elem.id }));
        });

        return {
            items
        };
    }
});
</script>

<style lang="scss">
@import 'src/styles/colors';
@import 'src/styles/constants';

a.page-index-link {
    display: block;
    text-decoration: none;
    color: #8A9AF5;
    transition-duration: $transition-duration-low;

    &:hover {
        text-decoration: underline;
        color: #6578F8;
    }
}
</style>
