import IplSidebar from '../iplSidebar.vue';
import { flushPromises, mount } from '@vue/test-utils';

describe('IplSidebar', () => {
    // https://github.com/jsdom/jsdom/issues/3294
    beforeAll(() => {
        HTMLDialogElement.prototype.showModal = jest.fn();
        HTMLDialogElement.prototype.close = jest.fn();
        Element.prototype.getAnimations = jest.fn().mockReturnValue([]);
    });

    it('matches snapshot', () => {
        expect(mount(IplSidebar, {
            props: { isOpen: false },
            slots: {
                default: () => 'test sidebar content'
            }
        }).html()).toMatchSnapshot();
    });

    it('opens the modal if mounted as open', () => {
        const wrapper = mount(IplSidebar, { props: { isOpen: true } });
        expect(wrapper.get('dialog').element.showModal).toHaveBeenCalled();
    });

    it('emits an event when the modal is closed', () => {
        const wrapper = mount(IplSidebar, { props: { isOpen: true } });

        wrapper.get('dialog').element.dispatchEvent(new Event('close'));

        expect(wrapper.emitted('update:isOpen')).toEqual([[false]]);
    });

    it('closes the dialog when directly clicked', async () => {
        const wrapper = mount(IplSidebar, { props: { isOpen: true } });

        const dialog = wrapper.get('dialog');
        const event = new Event('click');
        Object.defineProperty(event, 'target', { value: dialog.element });
        dialog.element.dispatchEvent(event);
        await flushPromises();

        expect(dialog.element.close).toHaveBeenCalled();
        expect(dialog.element.hasAttribute('inert')).toEqual(true);
    });

    it('does not close the dialog when directly clicked and persistent', async () => {
        const wrapper = mount(IplSidebar, { props: { isOpen: true, persistent: true } });

        const dialog = wrapper.get('dialog');
        const event = new Event('click');
        Object.defineProperty(event, 'target', { value: dialog.element });
        dialog.element.dispatchEvent(event);
        await flushPromises();

        expect(dialog.element.close).not.toHaveBeenCalled();
        expect(dialog.element.hasAttribute('inert')).toEqual(false);
    });

    it('does not close the dialog when clicking on a child of the dialog', async () => {
        const wrapper = mount(IplSidebar, { props: { isOpen: true } });

        const dialog = wrapper.get('dialog');
        const event = new Event('click');
        Object.defineProperty(event, 'target', { value: document.createElement('div') });
        dialog.element.dispatchEvent(event);
        await flushPromises();

        expect(dialog.element.close).not.toHaveBeenCalled();
    });

    it('closes the dialog when cancelled', async () => {
        const wrapper = mount(IplSidebar, { props: { isOpen: true } });

        const dialog = wrapper.get('dialog');
        const event = new Event('cancel');
        jest.spyOn(event, 'preventDefault');
        dialog.element.dispatchEvent(event);
        await flushPromises();

        expect(dialog.element.close).toHaveBeenCalled();
        expect(dialog.element.hasAttribute('inert')).toEqual(true);
        expect(event.preventDefault).toHaveBeenCalled();
    });
});
