import { shallowMount } from '@vue/test-utils';
import IplBadge from '../iplBadge.vue';

describe('iplBadge', () => {
    it('matches snapshot', () => {
        const wrapper = shallowMount(IplBadge, {
            props: { color: 'blue' },
            slots: {
                default: () => 'test badge'
            }
        });

        expect(wrapper.html()).toMatchSnapshot();
    });

    it('applies appropriate style according to color prop', () => {
        const redWrapper = shallowMount(IplBadge, { props: { color: 'red' } });
        const greenWrapper = shallowMount(IplBadge, { props: { color: 'green' } });

        expect(redWrapper.find('span').element.style.backgroundColor).toEqual('rgb(231, 78, 54)');
        expect(greenWrapper.find('span').element.style.backgroundColor).toEqual('rgb(0, 166, 81)');
    });

    it('applies hex color from props', () => {
        const wrapper = shallowMount(IplBadge, { props: { color: '#FFFFFF' } });

        expect(wrapper.find('span').element.style.backgroundColor).toEqual('rgb(255, 255, 255)');
    });

    it('sets the expected text color for light background colors', () => {
        const wrapper = shallowMount(IplBadge, { props: { color: '#FFFFFF' } });

        expect(wrapper.find('span').element.style.color).toEqual('rgb(51, 51, 51)');
    });

    it('sets the expected text color for dark background colors', () => {
        const wrapper = shallowMount(IplBadge, { props: { color: '#222222' } });

        expect(wrapper.find('span').element.style.color).toEqual('white');
    });
});
