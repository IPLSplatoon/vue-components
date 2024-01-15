import { config, mount } from '@vue/test-utils';
import IplPagination from '../iplPagination.vue';
import IplButton from '../iplButton.vue';
import IplSelect from '../iplSelect.vue';

describe('iplPagination', () => {
    config.global.stubs = {
        IplButton: true,
        IplSelect: true
    };

    it('matches snapshot', () => {
        const wrapper = mount(IplPagination, {
            props: {
                maxPage: 9,
                modelValue: 1
            }
        });

        expect(wrapper.html()).toMatchSnapshot();
    });

    it('handles advancing to a selected page', () => {
        const wrapper = mount(IplPagination, {
            props: {
                maxPage: 9,
                modelValue: 2
            }
        });

        const pageSelect = wrapper.getComponent(IplSelect);
        pageSelect.vm.$emit('update:modelValue', '6');

        expect(wrapper.emitted('update:modelValue')).toEqual([[6]]);
    });

    it('handles advancing to the previous page', () => {
        const wrapper = mount(IplPagination, {
            props: {
                maxPage: 9,
                modelValue: 2
            }
        });

        const pageButtons = wrapper.get('.page-buttons').findAllComponents(IplButton);
        pageButtons.at(0)?.vm.$emit('click');

        expect(wrapper.emitted('update:modelValue')).toEqual([[1]]);
    });

    it('disabled advancing to the previous page if user is on the first page', () => {
        const wrapper = mount(IplPagination, {
            props: {
                maxPage: 9,
                modelValue: 1
            }
        });

        const pageButtons = wrapper.get('.page-buttons').findAllComponents(IplButton);
        expect(pageButtons.at(0)?.vm.disabled).toEqual(true);
    });

    it('handles advancing to the next page', () => {
        const wrapper = mount(IplPagination, {
            props: {
                maxPage: 9,
                modelValue: 4
            }
        });

        const pageButtons = wrapper.get('.page-buttons').findAllComponents(IplButton);
        pageButtons.at(1)?.vm.$emit('click');

        expect(wrapper.emitted('update:modelValue')).toEqual([[5]]);
    });

    it('disabled advancing to the next page if user is on the last page', () => {
        const wrapper = mount(IplPagination, {
            props: {
                maxPage: 9,
                modelValue: 9
            }
        });

        const pageButtons = wrapper.get('.page-buttons').findAllComponents(IplButton);
        expect(pageButtons.at(1)?.vm.disabled).toEqual(true);
    });
});
