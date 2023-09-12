import IplSelect from '../iplSelect.vue';
import { mount } from '@vue/test-utils';

describe('IplSelect', () => {
    it('applies given label to element', () => {
        const wrapper = mount(IplSelect, { props: { label: 'Label!', modelValue: '', options: []} });

        expect(wrapper.get('label').text()).toEqual('Label!');
    });

    it('has class if disabled', () => {
        const wrapper = mount(IplSelect, { props: { label: 'Label!', modelValue: '', options: [], disabled: true } });

        expect(wrapper.get('.ipl-select__wrapper').classes()).toContain('disabled');
        expect(wrapper.get('select').element.disabled).toEqual(true);
    });

    it('throws error if no options or option groups are given', () => {
        expect(() => mount(IplSelect, { props: { label: 'Label!', modelValue: '' } }))
            .toThrow('ipl-select requires either options or option groups to be set.');
    });

    it('applies given options to select element', () => {
        const wrapper = mount(IplSelect, {
            props: {
                modelValue: '',
                options: [
                    { name: 'Option', value: 'opt' },
                    { name: 'Option the Second', value: 'opt2', disabled: false },
                    { name: 'Opt 3', value: 'optthree', disabled: true }
                ]
            }
        });

        expect(wrapper.get('select').html()).toMatchSnapshot();
    });

    it('applies given option groups to select element', () => {
        // @ts-ignore: This works; I can't explain why it's causing an error.
        const wrapper = mount(IplSelect, {
            props: {
                modelValue: '',
                optionGroups: [
                    {
                        name: 'Group A',
                        options: [
                            { name: 'Option', value: 'opt' },
                            { name: 'Option the Second', value: 'opt2', disabled: false },
                            { name: 'Opt 3', value: 'optthree' }
                        ]
                    },
                    {
                        name: 'Group B',
                        options: [
                            { name: 'Another Option', value: 'opt4' },
                            { name: 'Option the Fifth', value: 'opt5' },
                            { name: 'Opt 6', value: 'opt6', disabled: true }
                        ]
                    }
                ]
            }
        });

        expect(wrapper.get('select').html()).toMatchSnapshot();
    });

    it('emits update message on change', async () => {
        const wrapper = mount(IplSelect, {
            props: {
                modelValue: '',
                options: [
                    { name: 'Option', value: 'opt' },
                    { name: 'Option the Second', value: 'opt2', testAdditionalAttribute: true },
                    { name: 'Opt 3', value: 'optthree' }
                ]
            }
        });

        await wrapper.get('select').setValue('opt2');

        const emitted = wrapper.emitted('update:modelValue');
        expect(emitted?.length).toEqual(1);
        expect(emitted?.[0]).toEqual([ 'opt2', { name: 'Option the Second', value: 'opt2', testAdditionalAttribute: true } ]);
    });

    it('emits update message on change for a grouped select', async () => {
        const wrapper = mount(IplSelect, {
            props: {
                modelValue: '',
                optionGroups: [
                    {
                        name: 'Group A',
                        options: [
                            { name: 'Option', value: 'opt' },
                            { name: 'Option the Second', value: 'opt2', disabled: false },
                            { name: 'Opt 3', value: 'optthree' }
                        ]
                    },
                    {
                        name: 'Group B',
                        options: [
                            { name: 'Another Option', value: 'opt4', testAdditionalAttribute: 999 },
                            { name: 'Option the Fifth', value: 'opt5' },
                            { name: 'Opt 6', value: 'opt6', disabled: true }
                        ]
                    }
                ]
            }
        });

        await wrapper.get('select').setValue('opt4');

        const emitted = wrapper.emitted('update:modelValue');
        expect(emitted?.length).toEqual(1);
        expect(emitted?.[0]).toEqual([ 'opt4', { name: 'Another Option', value: 'opt4', testAdditionalAttribute: 999 } ]);
    });
});
