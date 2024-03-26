import IplButton from '../iplButton.vue';
import { config, shallowMount } from '@vue/test-utils';
import { buttonColors } from '../../styles/colors';

describe('iplButton', () => {
    beforeEach(() => {
        jest.restoreAllMocks();
        jest.clearAllMocks();
    });

    config.global.stubs = {
        FontAwesomeIcon: true
    };

    it('applies label to element', () => {
        const wrapper = shallowMount(IplButton, { props: { label: 'Button' } });

        expect(wrapper.find('span.label').text()).toEqual('Button');
    });

    it('applies content from default slot', () => {
        const wrapper = shallowMount(IplButton, {
            slots: {
                default: () => 'test default slot'
            }
        });

        expect(wrapper.find('span.label').text()).toEqual('test default slot');
    });

    it('applies given href to button if present', () => {
        const wrapper = shallowMount(IplButton, { props: { label: 'Button', href: 'https://google.com/' } });

        expect(wrapper.find('a').element.href).toEqual('https://google.com/');
    });

    it('creates icon if given', () => {
        const wrapper = shallowMount(IplButton, { props: { icon: 'cool-icon' } });

        expect(wrapper.find('font-awesome-icon-stub.icon').attributes().icon).toEqual('cool-icon');
    });

    it('creates icon element if icon is provided', () => {
        const wrapper = shallowMount(IplButton, { props: { icon: 'cool-icon', label: 'something' } });

        expect(wrapper.find('span.label').text()).toEqual('');
        expect(wrapper.find('font-awesome-icon-stub.icon').exists()).toEqual(true);
    });

    it('applies appropriate style according to color prop', () => {
        const redWrapper = shallowMount(IplButton, { props: { label: 'Button', color: 'red' } });
        const yellowWrapper = shallowMount(IplButton, { props: { label: 'Button', color: 'yellow' } });

        const redButtonStyle = redWrapper.find('button').element.style;
        expect(redButtonStyle.backgroundColor).toEqual('rgb(231, 78, 54)');
        expect(redButtonStyle.color).toEqual('white');
        const yellowButtonStyle = yellowWrapper.find('button').element.style;
        expect(yellowButtonStyle.backgroundColor).toEqual('rgb(255, 199, 0)');
        expect(yellowButtonStyle.color).toEqual('rgb(51, 51, 51)');
    });

    it('has expected button style when transparent', () => {
        const wrapper = shallowMount(IplButton, { props: { label: 'Button', color: 'transparent' } });

        expect(wrapper.vm.buttonStyle).toEqual({ backgroundColor: 'transparent', color: undefined });
    });

    it('has expected button style when disabled', () => {
        const wrapper = shallowMount(IplButton, { props: { label: 'Button', disabled: true } });

        expect(wrapper.vm.buttonStyle).toEqual({ backgroundColor: 'var(--ipl-bg-tertiary)', color: 'var(--ipl-disabled-body-text-color)' });
    });

    it('applies hex color from props', () => {
        const wrapper = shallowMount(IplButton, { props: { label: 'Button', color: '#FFF' } });

        expect(wrapper.find('button').element.style.backgroundColor).toEqual('rgb(255, 255, 255)');
    });

    it('emits event on click', async () => {
        const wrapper = shallowMount(IplButton, { props: { label: 'Button' } });

        await wrapper.find('button').trigger('click');

        expect(wrapper.emitted().click.length).toEqual(1);
    });

    it('emits event on right click', async () => {
        const wrapper = shallowMount(IplButton, { props: { label: 'Button' } });

        await wrapper.find('button').trigger('contextmenu');

        expect(wrapper.emitted().rightClick.length).toEqual(1);
    });

    it('does not emit event if disabled', async () => {
        const wrapper = shallowMount(IplButton, { props: { label: 'Button', disabled: true } });

        await wrapper.find('button').trigger('click');

        expect(wrapper.emitted().click).toBeUndefined();
    });

    it('gives class to link button element if disabled', () => {
        const wrapper = shallowMount(IplButton, { props: { label: 'Button', disabled: true } });

        expect(wrapper.find('button').classes()).toContain('disabled');
    });

    it('gives class to link button element if small', () => {
        const wrapper = shallowMount(IplButton, { props: { label: 'Button', small: true } });

        expect(wrapper.find('button').classes()).toContain('small');
    });

    it('gives class to link button element if element has icon', () => {
        const wrapper = shallowMount(IplButton, { props: { icon: 'dope-icon' } });

        expect(wrapper.find('button').classes()).toContain('has-icon');
    });

    describe('validator: color', () => {
        const validator = IplButton.props.color.validator as (value: string) => boolean;

        Object.keys(buttonColors).forEach(color => {
            it(`allows color '${color}'`, () => {
                expect(validator(color)).toEqual(true);
            });
        });

        it('allows hex values', () => {
            expect(validator('#FFFFFF')).toEqual(true);
        });

        it('does not allow unknown colors', () => {
            expect(validator('something that is not a color')).toEqual(false);
        });
    });

    describe('requires-confirmation', () => {
        it('must be pressed twice to emit click event', async () => {
            const wrapper = shallowMount(IplButton, { props: { label: 'Button', requiresConfirmation: true } });
            const button = wrapper.get('button');

            await button.trigger('click');
            await button.trigger('click');

            expect(wrapper.emitted('click')?.length).toEqual(1);
        });

        it('has expected label and color when clicked once', async () => {
            const wrapper = shallowMount(IplButton, { props: { label: 'Button', requiresConfirmation: true } });
            const button = wrapper.get('button');

            await button.trigger('click');

            expect(button.text()).toEqual('Are you sure?');
            expect((wrapper.vm.buttonStyle as { backgroundColor: string }).backgroundColor).toEqual('#e74e36');
        });

        it('has expected label and color when clicked once and short confirmation message is enabled', async () => {
            const wrapper = shallowMount(IplButton, {
                props: {
                    label: 'Button',
                    requiresConfirmation: true,
                    shortConfirmationMessage: true
                }
            });
            const button = wrapper.get('button');

            await button.trigger('click');

            expect(button.text()).toEqual('Confirm?');
            expect((wrapper.vm.buttonStyle as { backgroundColor: string }).backgroundColor).toEqual('#e74e36');
        });

        it('has expected label and color when clicked once and original color is red', async () => {
            const wrapper = shallowMount(IplButton, {
                props: {
                    label: 'Button',
                    requiresConfirmation: true,
                    color: 'red'
                }
            });
            const button = wrapper.get('button');

            await button.trigger('click');

            expect(button.text()).toEqual('Are you sure?');
            expect((wrapper.vm.buttonStyle as { backgroundColor: string }).backgroundColor).toEqual('#FF682E');
        });

        it('resets state after timeout', async () => {
            // @ts-ignore: Fine for testing
            jest.spyOn(global.window, 'setTimeout').mockImplementation(handler => {
                handler();
            });
            const wrapper = shallowMount(IplButton, {
                props: {
                    label: 'Button',
                    requiresConfirmation: true,
                    color: 'green'
                }
            });
            const button = wrapper.get('button');

            await button.trigger('click');

            expect(wrapper.emitted('click')).toBeUndefined();
            expect(button.text()).toEqual('Button');
            expect((wrapper.vm.buttonStyle as { backgroundColor: string }).backgroundColor).toEqual('#00A651');
            expect(global.window.setTimeout).toHaveBeenCalledWith(expect.any(Function), 5000);
        });
    });

    describe('async behavior', () => {
        it('disables button and applies label provided in props to button when action is in progress', async () => {
            const wrapper = shallowMount(IplButton, {
                props: {
                    label: 'Button',
                    async: true,
                    progressMessage: 'Loading...'
                }
            });
            if (!wrapper.vm.$.vnode.props) {
                return fail('vnode is missing props');
            }
            // eslint-disable-next-line @typescript-eslint/no-empty-function
            wrapper.vm.$.vnode.props.onClick = jest.fn().mockReturnValue(new Promise(() => {
            }));
            const button = wrapper.find('button');

            await button.trigger('click');

            expect(wrapper.vm.disabledInternal).toEqual(true);
            expect(button.classes()).toContain('disabled');
            expect(button.classes()).toContain('is-loading');
            expect(button.text()).toEqual('Loading...');
            expect(wrapper.vm.$.vnode.props.onClick).toHaveBeenCalled();
        });

        it('applies label provided in props and uses appropriate color on success', async () => {
            const wrapper = shallowMount(IplButton, {
                props: {
                    label: 'Button',
                    async: true,
                    successMessage: 'All good!'
                }
            });
            if (!wrapper.vm.$.vnode.props) {
                return fail('vnode is missing props');
            }
            wrapper.vm.$.vnode.props.onClick = jest.fn().mockResolvedValue({});
            const button = wrapper.find('button');

            await button.trigger('click');
            await wrapper.vm.$nextTick();

            expect(wrapper.vm.disabledInternal).toEqual(false);
            expect(button.text()).toEqual('All good!');
            expect((wrapper.vm.buttonStyle as { backgroundColor: string }).backgroundColor).toEqual('#00A651');
            expect(wrapper.vm.$.vnode.props.onClick).toHaveBeenCalled();
        });

        it('uses different success color if idle color is already green', async () => {
            const wrapper = shallowMount(IplButton, {
                props: {
                    label: 'Button',
                    async: true,
                    successMessage: 'All good!',
                    color: 'green'
                }
            });
            if (!wrapper.vm.$.vnode.props) {
                return fail('vnode is missing props');
            }
            wrapper.vm.$.vnode.props.onClick = jest.fn().mockResolvedValue({});
            const button = wrapper.find('button');

            await button.trigger('click');
            await wrapper.vm.$nextTick();

            expect(wrapper.vm.disabledInternal).toEqual(false);
            expect(button.text()).toEqual('All good!');
            expect((wrapper.vm.buttonStyle as { backgroundColor: string }).backgroundColor).toEqual('#18C682');
            expect(wrapper.vm.$.vnode.props.onClick).toHaveBeenCalled();
        });

        it('changes text color on success if color is transparent', async () => {
            const wrapper = shallowMount(IplButton, {
                props: {
                    label: 'Button',
                    async: true,
                    successMessage: 'All good!',
                    color: 'transparent'
                }
            });
            if (!wrapper.vm.$.vnode.props) {
                return fail('vnode is missing props');
            }
            wrapper.vm.$.vnode.props.onClick = jest.fn().mockResolvedValue({});
            const button = wrapper.find('button');

            await button.trigger('click');
            await wrapper.vm.$nextTick();

            expect(wrapper.vm.disabledInternal).toEqual(false);
            expect(button.text()).toEqual('All good!');
            expect(wrapper.vm.buttonStyle).toEqual({ backgroundColor: 'transparent', color: '#00A651' });
            expect(wrapper.vm.$.vnode.props.onClick).toHaveBeenCalled();
        });

        it('resets successful button state after a timeout period', async () => {
            // @ts-ignore: Fine for testing
            jest.spyOn(global.window, 'setTimeout').mockImplementation(handler => {
                handler();
            });
            const wrapper = shallowMount(IplButton, {
                props: {
                    label: 'Button',
                    async: true,
                    successMessage: 'All good!',
                    color: 'green'
                }
            });
            if (!wrapper.vm.$.vnode.props) {
                return fail('vnode is missing props');
            }
            wrapper.vm.$.vnode.props.onClick = jest.fn().mockResolvedValue({});
            const button = wrapper.find('button');

            await button.trigger('click');
            await wrapper.vm.$nextTick();

            expect(wrapper.vm.disabledInternal).toEqual(false);
            expect(button.text()).toEqual('Button');
            expect(wrapper.vm.buttonState).toEqual('idle');
            expect(global.window.setTimeout).toHaveBeenCalled();
            expect(wrapper.vm.$.vnode.props.onClick).toHaveBeenCalled();
        });

        it('applies label provided in props and uses appropriate color on failure', async () => {
            const wrapper = shallowMount(IplButton, {
                props: {
                    label: 'Button',
                    async: true
                }
            });
            if (!wrapper.vm.$.vnode.props) {
                return fail('vnode is missing props');
            }
            wrapper.vm.$.vnode.props.onClick = jest.fn().mockRejectedValue({});
            const button = wrapper.find('button');

            try {
                // button.trigger('click') fails here, as the click handler rejects.
                await (wrapper.vm as unknown as { handleClick: () => void }).handleClick();
                await wrapper.vm.$nextTick();
            } catch (e) {}

            expect(wrapper.vm.disabledInternal).toEqual(false);
            expect(button.text()).toEqual('Error!');
            expect((wrapper.vm.buttonStyle as { backgroundColor: string }).backgroundColor).toEqual('#e74e36');
            expect(wrapper.vm.$.vnode.props.onClick).toHaveBeenCalled();
        });

        it('uses different failure color if idle color is already red', async () => {
            const wrapper = shallowMount(IplButton, {
                props: {
                    label: 'Button',
                    async: true,
                    color: 'red'
                }
            });
            if (!wrapper.vm.$.vnode.props) {
                return fail('vnode is missing props');
            }
            wrapper.vm.$.vnode.props.onClick = jest.fn().mockRejectedValue({});
            const button = wrapper.find('button');

            try {
                // button.trigger('click') fails here, as the click handler rejects.
                await (wrapper.vm as unknown as { handleClick: () => void }).handleClick();
                await wrapper.vm.$nextTick();
            } catch (e) {}

            expect(wrapper.vm.disabledInternal).toEqual(false);
            expect(button.text()).toEqual('Error!');
            expect((wrapper.vm.buttonStyle as { backgroundColor: string }).backgroundColor).toEqual('#FF682E');
            expect(wrapper.vm.$.vnode.props.onClick).toHaveBeenCalled();
        });

        it('changes text color on failure if color is transparent', async () => {
            const wrapper = shallowMount(IplButton, {
                props: {
                    label: 'Button',
                    async: true,
                    color: 'transparent'
                }
            });
            if (!wrapper.vm.$.vnode.props) {
                return fail('vnode is missing props');
            }
            wrapper.vm.$.vnode.props.onClick = jest.fn().mockRejectedValue({});
            const button = wrapper.find('button');

            try {
                // button.trigger('click') fails here, as the click handler rejects.
                await (wrapper.vm as unknown as { handleClick: () => void }).handleClick();
                await wrapper.vm.$nextTick();
            } catch (e) {}

            expect(wrapper.vm.disabledInternal).toEqual(false);
            expect(button.text()).toEqual('Error!');
            expect(wrapper.vm.buttonStyle).toEqual({ backgroundColor: 'transparent', color: '#e74e36' });
            expect(wrapper.vm.$.vnode.props.onClick).toHaveBeenCalled();
        });

        it('resets unsuccessful button state after a timeout period', async () => {
            expect.assertions(5);
            // @ts-ignore: Fine for testing
            jest.spyOn(global.window, 'setTimeout').mockImplementation(handler => {
                handler();
            });
            const wrapper = shallowMount(IplButton, {
                props: {
                    label: 'Button',
                    async: true
                }
            });
            if (!wrapper.vm.$.vnode.props) {
                return fail('vnode is missing props');
            }
            wrapper.vm.$.vnode.props.onClick = jest.fn().mockRejectedValue({});
            const button = wrapper.find('button');

            try {
                // button.trigger('click') fails here, as the click handler rejects.
                await (wrapper.vm as unknown as { handleClick: () => void }).handleClick();
                await wrapper.vm.$nextTick();
            } catch (e) {}

            expect(wrapper.vm.disabledInternal).toEqual(false);
            expect(button.text()).toEqual('Button');
            expect(wrapper.vm.buttonState).toEqual('idle');
            expect(global.window.setTimeout).toHaveBeenCalled();
            expect(wrapper.vm.$.vnode.props.onClick).toHaveBeenCalled();
        });
    });

    describe('disableOnSuccess', () => {
        it('applies label provided in props and uses appropriate color on click', async () => {
            const wrapper = shallowMount(IplButton, {
                props: {
                    label: 'Button',
                    disableOnSuccess: true,
                    successMessage: 'All good!'
                }
            });
            if (!wrapper.vm.$.vnode.props) {
                return fail('vnode is missing props');
            }
            wrapper.vm.$.vnode.props.onClick = jest.fn().mockReturnValue({});
            const button = wrapper.find('button');

            await button.trigger('click');
            await wrapper.vm.$nextTick();

            expect(wrapper.vm.disabledInternal).toEqual(true);
            expect(button.text()).toEqual('All good!');
            expect(wrapper.vm.$.vnode.props.onClick).toHaveBeenCalled();
        });

        it('resets successful button state after a timeout period', async () => {
            // @ts-ignore: Fine for testing
            jest.spyOn(global.window, 'setTimeout').mockImplementation(handler => {
                handler();
            });
            const wrapper = shallowMount(IplButton, {
                props: {
                    label: 'Button',
                    disableOnSuccess: true,
                    successMessage: 'All good!',
                    color: 'green'
                }
            });
            if (!wrapper.vm.$.vnode.props) {
                return fail('vnode is missing props');
            }
            wrapper.vm.$.vnode.props.onClick = jest.fn().mockReturnValue({});
            const button = wrapper.find('button');

            await button.trigger('click');
            await wrapper.vm.$nextTick();

            expect(wrapper.vm.disabledInternal).toEqual(false);
            expect(button.text()).toEqual('Button');
            expect(wrapper.vm.buttonState).toEqual('idle');
            expect(global.window.setTimeout).toHaveBeenCalled();
            expect(wrapper.vm.$.vnode.props.onClick).toHaveBeenCalled();
        });
    });
});
