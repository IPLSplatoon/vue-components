import IplMessage from '../iplMessage.vue';
import { config, mount } from '@vue/test-utils';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

describe('IplMessage', () => {
    config.global.stubs = {
        FontAwesomeIcon: true,
        IplButton: true
    };

    it('matches snapshot', () => {
        const wrapper = mount(IplMessage, { props: { type: 'info' } });

        expect(wrapper.html()).toMatchSnapshot();
    });

    it('matches snapshot when closeable', () => {
        const wrapper = mount(IplMessage, { props: { type: 'info', closeable: true } });

        expect(wrapper.html()).toMatchSnapshot();
    });

    it('emits event on close button click', async () => {
        const wrapper = mount(IplMessage, { props: { type: 'info', closeable: true } });

        await wrapper.get('.close-button').trigger('click');

        expect(wrapper.emitted('close')?.length).toEqual(1);
    });

    it('has expected wrapper class and icon if type is error', () => {
        const wrapper = mount(IplMessage, { props: { type: 'error' } });

        expect(wrapper.getComponent(FontAwesomeIcon).vm.icon).toEqual(faExclamationCircle);
        expect(wrapper.get('.ipl-message__wrapper').classes()).toContain('ipl-message__type-error');
    });

    it('has expected wrapper class and icon if type is info', () => {
        const wrapper = mount(IplMessage, { props: { type: 'info' } });

        expect(wrapper.getComponent(FontAwesomeIcon).vm.icon).toEqual(faInfoCircle);
        expect(wrapper.get('.ipl-message__wrapper').classes()).toContain('ipl-message__type-info');
    });

    it('has expected wrapper class and icon if type is warning', () => {
        const wrapper = mount(IplMessage, { props: { type: 'warning' } });

        expect(wrapper.getComponent(FontAwesomeIcon).vm.icon).toEqual(faExclamationTriangle);
        expect(wrapper.get('.ipl-message__wrapper').classes()).toContain('ipl-message__type-warning');
    });

    describe('validator: type', () => {
        const validator = IplMessage.props.type.validator as (value?: string | null) => boolean;

        it('allows valid types', () => {
            expect(validator('info')).toEqual(true);
            expect(validator('warning')).toEqual(true);
            expect(validator('error')).toEqual(true);
        });

        it('does not allow unknown types', () => {
            expect(validator('some message')).toEqual(false);
            expect(validator(null)).toEqual(false);
            expect(validator(undefined)).toEqual(false);
        });
    });
});
