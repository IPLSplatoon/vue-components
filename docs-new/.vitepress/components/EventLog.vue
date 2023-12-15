<script lang="ts">
import { defineComponent, h, ref, VNodeArrayChildren } from 'vue';
import { IplBadge, IplExpandingSpace } from '../../../src';
import EventLogItem from './EventLogItem.vue';

export default defineComponent({
    setup(_props, { slots }) {
        const eventLog = ref<{ name: string, details: unknown[] }[]>([]);

        function addListeners(nodes: VNodeArrayChildren) {
            nodes.forEach(node => {
                if (Array.isArray(node)) {
                    addListeners(nodes);
                } else if (typeof node === 'object') {
                    if (Array.isArray(node.children)) {
                        addListeners(node.children);
                    }
                    if (typeof node.type === 'object' && 'emits' in node.type) {
                        const events: string[] = Array.isArray(node.type.emits) ? node.type.emits : Object.keys(node.type.emits);
                        events.forEach(event => {
                            if (event.length === 0) return;
                            const normalizedName = 'on' + event[0].toUpperCase() + event.substring(1);
                            node.props[normalizedName] = (...args) => {
                                eventLog.value.push({ name: event, details: args });
                            };
                        });
                    }
                }
            });

            return nodes;
        }

        return () => {
            const content = slots.default ? addListeners(slots.default()) : [ h('div') ];
            return [
                ...content,
                ...(slots.extra ? slots.extra() : []),
                h(IplExpandingSpace,
                    null,
                    {
                        default: () => eventLog.value.length === 0
                            ? 'No events recorded'
                            : eventLog.value.map(logItem =>
                                h(EventLogItem, { name: logItem.name, details: logItem.details })),
                        title: () => [
                            'Events',
                            eventLog.value.length > 0
                                ? h(IplBadge,
                                    { style: { marginLeft: '4px' } },
                                    { default: () => eventLog.value.length })
                                : null
                        ]
                    })
            ];
        };
    }
});
</script>
