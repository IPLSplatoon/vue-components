import IplExpandingSpace from '../iplExpandingSpace.vue';
import { config, shallowMount } from '@vue/test-utils';
import { ref } from 'vue';

describe('IplExpandingSpace', () => {
    config.global.stubs = {
        FontAwesomeIcon: true
    };

    it('toggles content and sets appropriate classes and updates props on header click', async () => {
        const wrapper = shallowMount(IplExpandingSpace);
        const header = wrapper.get('.ipl-expanding-space__header-background');
        const content = wrapper.get('.content');
        const icon = wrapper.get('.icon');

        await header.trigger('click');
        expect(content.isVisible()).toEqual(true);
        expect(icon.classes()).toContain('content-expanded');
        const firstEmit = wrapper.emitted('update:expanded');
        expect(firstEmit).toEqual([[true]]);

        await header.trigger('click');
        expect(content.isVisible()).toEqual(false);
        expect(icon.classes()).not.toContain('content-expanded');
        const secondEmit = wrapper.emitted('update:expanded');
        expect(secondEmit).toEqual([[true], [false]]);
    });

    it('toggles content and sets appropriate classes when props change', async () => {
        const wrapper = shallowMount(IplExpandingSpace);
        const content = wrapper.get('.content');
        const icon = wrapper.get('.icon');

        await wrapper.setProps({
            expanded: true
        });
        expect(content.isVisible()).toEqual(true);
        expect(icon.classes()).toContain('content-expanded');

        await wrapper.setProps({
            expanded: false
        });
        expect(content.isVisible()).toEqual(false);
        expect(icon.classes()).not.toContain('content-expanded');
    });

    it('sets injected active space value when part of a group', async () => {
        const activeSpace = ref<string | null>(null);
        const wrapper = shallowMount(IplExpandingSpace, {
            global: { provide: { activeSpace } },
            props: { key: 'coolkey' }
        });
        const header = wrapper.get('.ipl-expanding-space__header-background');
        const content = wrapper.get('.content');
        const icon = wrapper.get('.icon');

        await header.trigger('click');
        expect(content.isVisible()).toEqual(true);
        expect(activeSpace.value).toEqual('coolkey');
        expect(icon.classes()).toContain('content-expanded');
        const firstEmit = wrapper.emitted('update:expanded');
        expect(firstEmit).toEqual([[false], [true]]);

        await header.trigger('click');
        expect(content.isVisible()).toEqual(false);
        expect(activeSpace.value).toBeNull();
        expect(icon.classes()).not.toContain('content-expanded');
        const secondEmit = wrapper.emitted('update:expanded');
        expect(secondEmit).toEqual([[false], [true], [false]]);
    });

    it('sets injected active space value when props are changed', async () => {
        const activeSpace = ref<string | null>(null);
        const wrapper = shallowMount(IplExpandingSpace, {
            global: { provide: { activeSpace } },
            props: { key: 'coolkey' }
        });
        const content = wrapper.get('.content');
        const icon = wrapper.get('.icon');

        await wrapper.setProps({
            expanded: true
        });
        expect(content.isVisible()).toEqual(true);
        expect(activeSpace.value).toEqual('coolkey');
        expect(icon.classes()).toContain('content-expanded');

        await wrapper.setProps({
            expanded: false
        });
        expect(content.isVisible()).toEqual(false);
        expect(activeSpace.value).toBeNull();
        expect(icon.classes()).not.toContain('content-expanded');
    });

    it('handles active space changing externally', async () => {
        const activeSpace = ref<string>('coolkey');
        const wrapper = shallowMount(IplExpandingSpace, {
            global: { provide: { activeSpace } },
            props: { key: 'coolkey' }
        });
        const content = wrapper.get('.content');

        expect(content.isVisible()).toEqual(true);
        activeSpace.value = 'otherkey';
        await wrapper.vm.$nextTick();

        expect(content.isVisible()).toEqual(false);
        const emitted = wrapper.emitted('update:expanded');
        expect(emitted).toEqual([[true], [false]]);
    });

    it('gets title from props', () => {
        const wrapper = shallowMount(IplExpandingSpace, { props: { title: 'Title' } });

        expect(wrapper.get('.ipl-expanding-space__title').text()).toEqual('Title');
    });

    it('gets title from slot if given', () => {
        const wrapper = shallowMount(IplExpandingSpace, {
            props: { title: 'Title' },
            slots: { title: 'Title from Slots' }
        });

        expect(wrapper.get('.ipl-expanding-space__title').text()).toEqual('Title from Slots');
    });

    it('gets content from default slot', () => {
        const wrapper = shallowMount(IplExpandingSpace, {
            slots: { default: 'Space Content' }
        });

        expect(wrapper.get('.content').text()).toEqual('Space Content');
    });
});
