import IplPanelTitle from '../iplDialogTitle.vue';
import { config, mount } from '@vue/test-utils';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

describe('IplDialogTitle', () => {
    config.global.stubs = {
        FontAwesomeIcon: true
    };

    it('matches snapshot', () => {
        const wrapper = mount(IplPanelTitle, { props: { title: 'Cool Dialog' } });

        expect(wrapper.html()).toMatchSnapshot();
    });

    it('emits event on close button click', () => {
        const wrapper = mount(IplPanelTitle, { props: { title: 'Cool Dialog' } });

        wrapper.getComponent<typeof FontAwesomeIcon>('[data-test="close-button"]').vm.$emit('click');

        expect(wrapper.emitted('close')?.length).toEqual(1);
    });
});
