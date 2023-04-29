<template>
    <ipl-space>
        <ipl-spinner />
        <ipl-spinner
            color="#00FF00"
            width="64px"
            size="2px"
        />
    </ipl-space>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import IplSpinner from '../../src/components/iplSpinner.vue';
import IplSpace from '../../src/components/iplSpace.vue';

export default defineComponent({
    name: 'SpinnerExample',

    components: { IplSpinner, IplSpace }
});
</script>
