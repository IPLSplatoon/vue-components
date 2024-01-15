import IplSmallToggle from '../iplSmallToggle.vue';
import { mount } from '@vue/test-utils';

describe('IplSmallToggle', () => {
    it('matches snapshot when toggle value is true', () => {
        const wrapper = mount(IplSmallToggle, {
            props: {
                label: 'Toggle!',
                modelValue: true
            }
        });

        expect(wrapper.html()).toMatchSnapshot();
    });

    it('matches snapshot when toggle value is false', () => {
        const wrapper = mount(IplSmallToggle, {
            props: {
                label: 'Toggle!',
                modelValue: false
            }
        });

        expect(wrapper.html()).toMatchSnapshot();
    });

    it('matches snapshot when toggle is disabled', () => {
        const wrapper = mount(IplSmallToggle, {
            props: {
                label: 'Toggle!',
                modelValue: true,
                disabled: true
            }
        });

        expect(wrapper.html()).toMatchSnapshot();
    });

    it('emits event in inner input change', () => {
        const wrapper = mount(IplSmallToggle, {
            props: {
                label: 'Toggle!',
                modelValue: true,
                disabled: false
            }
        });

        const input = wrapper.find('input');
        input.element.checked = false;
        input.element.dispatchEvent(new Event('change'));

        const emitted = wrapper.emitted('update:modelValue');
        expect(emitted?.length).toEqual(1);
        expect(emitted?.[0]).toEqual([false]);
    });

    it('does nothing when clicking wrapper while toggle is disabled', async () => {
        const wrapper = mount(IplSmallToggle, {
            props: {
                label: 'Toggle!',
                modelValue: true,
                disabled: true
            }
        });

        await wrapper.get('.ipl-small-toggle__wrapper').trigger('click');

        expect(wrapper.emitted('update:modelValue')).toBeFalsy();
    });
});
