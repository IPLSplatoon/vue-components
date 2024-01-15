import IplRadio from '../iplRadio.vue';
import { mount } from '@vue/test-utils';

describe('IplRadio', () => {
    it('matches snapshot', () => {
        const wrapper = mount(IplRadio, {
            props: {
                modelValue: 'opt1',
                label: 'Radio!',
                name: 'test-radio',
                options: [
                    { name: 'Option One', value: 'opt1' },
                    { name: 'Option Two', value: 'opt2', disabled: false },
                    { name: 'Option Three', value: 'opt3', disabled: true }
                ]
            }
        });

        expect(wrapper.html()).toMatchSnapshot();
    });

    it('emits update event when new option is selected', async () => {
        const wrapper = mount(IplRadio, {
            props: {
                modelValue: 'opt1',
                label: 'Radio!',
                name: 'test-radio',
                options: [
                    { name: 'Option One', value: 'opt1' },
                    { name: 'Option Two', value: 'opt2', disabled: false },
                    { name: 'Option Three', value: 'opt3', disabled: true }
                ]
            }
        });

        const secondOption = wrapper.findAll('input').at(1);
        expect(secondOption).not.toBeUndefined();
        secondOption!.element.checked = true;
        await secondOption!.trigger('change');

        const emitted = wrapper.emitted('update:modelValue');
        expect(emitted).toBeTruthy();
        expect(emitted?.[0]).toEqual(['opt2']);
    });
});
