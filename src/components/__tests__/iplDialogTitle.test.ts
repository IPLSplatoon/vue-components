import IplPanelTitle from '../iplDialogTitle.vue';
import { config, mount } from '@vue/test-utils';

describe('IplDialogTitle', () => {
    config.global.stubs = {
        FontAwesomeIcon: true
    };

    it('matches snapshot', () => {
        const wrapper = mount(IplPanelTitle, { props: { title: 'Cool Dialog' } });

        expect(wrapper.html()).toMatchSnapshot();
    });

    it('matches snapshot when closing is disabled', () => {
        const wrapper = mount(IplPanelTitle, { props: { title: 'Cool Dialog', closingDisabled: true } });

        expect(wrapper.html()).toMatchSnapshot();
    });

    it('emits event on close button click', async () => {
        const wrapper = mount(IplPanelTitle, { props: { title: 'Cool Dialog' } });

        await wrapper.get('[data-test="close-button"]').trigger('click');

        expect(wrapper.emitted('close')?.length).toEqual(1);
    });
});
