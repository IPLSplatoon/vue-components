import * as Vue from 'vue';
import { provideValidators, validator, ValidatorResult } from '../validator';
import { minLength, notBlank } from '../stringValidators';
import { useValidator, ValidatorInjectionKey } from '../useValidator';
import { defineComponent, ref } from 'vue';
import { mount } from '@vue/test-utils';

describe('validator', () => {
    const testValidator = (value: string): ValidatorResult => {
        if (value === 'valid') {
            return { isValid: true };
        }

        return {
            isValid: false,
            message: 'Value is invalid'
        };
    };

    const TestInputComponent = defineComponent({
        props: {
            name: {
                type: String,
                required: true
            },
            value: {
                type: String,
                required: true
            }
        },
        setup(props) {
            return {
                validator: useValidator(() => props.name, () => props.value)
            };
        },
        template: `
            <div class="test-input-component">
                <div>isValid: {{ validator?.isValid }}</div>
                <div v-if="validator != null && !validator.isValid">validation message: {{ validator.message }}</div>
            </div>
        `
    });
        
    const TestFormComponent = (initialValue: string, initialImmediateValue: string) => defineComponent({
        components: { TestInputComponent },
        setup() {
            const { allValid } = provideValidators({
                value: validator(false, testValidator),
                immediateValue: validator(true, testValidator)
            });

            const value = ref(initialValue);
            const immediateValue = ref(initialImmediateValue);

            return {
                value,
                immediateValue,
                allValid
            };
        },
        template: `
            <test-input-component name="value" :value="value" />
            <test-input-component name="immediateValue" :value="immediateValue" />
        `
    });

    it('handles valid initial values as expected', () => {
        const wrapper = mount(TestFormComponent('valid', 'valid'));

        const inputs = wrapper.findAllComponents<typeof TestInputComponent>('.test-input-component');
        expect(inputs.length).toEqual(2);
        expect(inputs.at(0)?.vm.validator).toEqual({
            isValid: null,
            message: null
        });
        expect(inputs.at(1)?.vm.validator).toEqual({
            isValid: true,
            message: null
        });
        expect(wrapper.vm.allValid).toEqual(false);
    });

    it('handles invalid initial values as expected', () => {
        const wrapper = mount(TestFormComponent('invalid', 'invalid'));

        const inputs = wrapper.findAllComponents<typeof TestInputComponent>('.test-input-component');
        expect(inputs.length).toEqual(2);
        expect(inputs.at(0)?.vm.validator).toEqual({
            isValid: null,
            message: null
        });
        expect(inputs.at(1)?.vm.validator).toEqual({
            isValid: false,
            message: 'Value is invalid'
        });
        expect(wrapper.vm.allValid).toEqual(false);
    });

    it('handles values changing to become valid', async () => {
        const wrapper = mount(TestFormComponent('invalid', 'invalid'));
        const inputs = wrapper.findAllComponents<typeof TestInputComponent>('.test-input-component');

        wrapper.vm.value = 'valid';
        await wrapper.vm.$nextTick();
        expect(inputs.at(0)?.vm.validator).toEqual({
            isValid: true,
            message: null
        });
        expect(inputs.at(1)?.vm.validator).toEqual({
            isValid: false,
            message: 'Value is invalid'
        });
        expect(wrapper.vm.allValid).toEqual(false);

        wrapper.vm.immediateValue = 'valid';
        await wrapper.vm.$nextTick();
        expect(inputs.at(0)?.vm.validator).toEqual({
            isValid: true,
            message: null
        });
        expect(inputs.at(1)?.vm.validator).toEqual({
            isValid: true,
            message: null
        });
        expect(wrapper.vm.allValid).toEqual(true);
    });

    it('handles values changing to become invalid', async () => {
        const wrapper = mount(TestFormComponent('valid', 'valid'));
        const inputs = wrapper.findAllComponents<typeof TestInputComponent>('.test-input-component');

        wrapper.vm.value = 'invalid';
        await wrapper.vm.$nextTick();
        expect(inputs.at(0)?.vm.validator).toEqual({
            isValid: false,
            message: 'Value is invalid'
        });
        expect(inputs.at(1)?.vm.validator).toEqual({
            isValid: true,
            message: null
        });
        expect(wrapper.vm.allValid).toEqual(false);

        wrapper.vm.immediateValue = 'invalid';
        await wrapper.vm.$nextTick();
        expect(inputs.at(0)?.vm.validator).toEqual({
            isValid: false,
            message: 'Value is invalid'
        });
        expect(inputs.at(1)?.vm.validator).toEqual({
            isValid: false,
            message: 'Value is invalid'
        });
        expect(wrapper.vm.allValid).toEqual(false);
    });

    it('provides validators in the expected format', () => {
        jest.spyOn(Vue, 'provide').mockReturnValue(undefined);
            
        provideValidators({
            name: validator(false, notBlank),
            email: validator(true, minLength(2))
        });
            
        expect(Vue.provide).toHaveBeenCalledWith(ValidatorInjectionKey, {
            state: {
                name: {
                    definition: {
                        immediate: false,
                        validators: [notBlank]
                    },
                    result: {
                        isValid: null,
                        message: null
                    }
                },
                email: {
                    definition: {
                        immediate: true,
                        validators: [expect.any(Function)]
                    },
                    result: {
                        isValid: null,
                        message: null
                    }
                }
            },
            update: expect.any(Function)
        });
    });
});
