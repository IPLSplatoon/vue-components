<template>
    <ipl-space>
        Uploaded file: {{ uploadedFile?.name }}
        <ipl-upload v-model="uploadedFile" />
    </ipl-space>
</template>

<script lang="ts">
import { defineComponent } from '@vue/runtime-core';
import IplSpace from '../../src/components/iplSpace.vue';
import IplUpload from '../../src/components/iplUpload.vue';
import { ref } from 'vue';

export default defineComponent({
    name: 'UploadExample',

    components: { IplUpload, IplSpace },

    setup() {
        return {
            uploadedFile: ref(null)
        };
    }
});
</script>
