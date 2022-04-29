<template>
    <ipl-space>
        <ipl-data-row
            label="Label"
            value="Value"
        />
        <ipl-data-row
            label="Label #2"
            :value="'Long value '.repeat(15)"
        />
    </ipl-space>
</template>

<script lang="ts">
import { defineComponent } from '@vue/runtime-core';
import IplSpace from '../../src/components/iplSpace.vue';
import IplDataRow from '../../src/components/iplDataRow.vue';

export default defineComponent({
    name: 'DataRowExample',
    components: { IplDataRow, IplSpace }
});
</script>
