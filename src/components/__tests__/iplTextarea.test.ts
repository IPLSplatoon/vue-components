import { mount } from '@vue/test-utils';
import IplTextarea from '../iplTextarea.vue';
import { ValidatorInjectionKey } from '../../validation/useValidator';

describe('iplTextarea', () => {
    it('matches snapshot', () => {
        const wrapper = mount(IplTextarea, {
            props: {
                modelValue: null,
                name: 'test-textarea',
                label: 'Textarea!',
                placeholder: 'Test Placeholder',
                disabled: false
            }
        });

        expect(wrapper.html()).toMatchSnapshot();
    });

    it('matches snapshot when valid', () => {
        const wrapper = mount(IplTextarea, {
            props: {
                modelValue: null,
                name: 'test-textarea',
                label: 'Textarea!',
                placeholder: 'Test Placeholder',
                disabled: false
            },
            global: {
                provide: {
                    [ValidatorInjectionKey as symbol]: {
                        state: {
                            'test-textarea': {
                                definition: {
                                    immediate: false
                                },
                                result: {
                                    isValid: true,
                                    message: null
                                }
                            }
                        }
                    }
                }
            }
        });

        expect(wrapper.html()).toMatchSnapshot();
    });

    it('matches snapshot when invalid', () => {
        const wrapper = mount(IplTextarea, {
            props: {
                modelValue: null,
                name: 'test-textarea',
                label: 'Textarea!',
                placeholder: 'Test Placeholder',
                disabled: false
            },
            global: {
                provide: {
                    [ValidatorInjectionKey as symbol]: {
                        state: {
                            'test-textarea': {
                                definition: {
                                    immediate: false
                                },
                                result: {
                                    isValid: false,
                                    message: 'error!!'
                                }
                            }
                        }
                    }
                }
            }
        });

        expect(wrapper.html()).toMatchSnapshot();
    });

    it('emits event on input change', async () => {
        const wrapper = mount(IplTextarea, {
            props: {
                modelValue: null,
                name: 'test-textarea',
                label: 'Textarea!',
                placeholder: 'Test Placeholder',
                disabled: false
            }
        });

        const textarea = wrapper.get('textarea');
        textarea.element.value = 'new-value';
        await textarea.trigger('input');

        expect(wrapper.emitted('update:modelValue')).toEqual([['new-value']]);
    });
});
