import IplSpace from '../iplSpace.vue';
import { shallowMount } from '@vue/test-utils';

describe('IplSpace', () => {
    it.each(['light', 'dark', 'blue'] as const)('has expected class when colors is %s', color => {
        const wrapper = shallowMount(IplSpace, { props: { color } });

        expect(wrapper.get('.ipl-space').classes()).toContain(`color-${color}`);
    });

    it('is a div by default', () => {
        const wrapper = shallowMount(IplSpace, { props: { clickable: false } });

        expect(wrapper.element.tagName).toEqual('DIV');
    });

    it('becomes a button when clickable', () => {
        const wrapper = shallowMount(IplSpace, { props: { clickable: true } });

        expect(wrapper.element.tagName).toEqual('BUTTON');
    });

    describe('validator: color', () => {
        const validator = IplSpace.props.color.validator as (value?: string | null) => boolean;

        it('allows expected color values', () => {
            expect(validator('dark')).toEqual(true);
            expect(validator('light')).toEqual(true);
            expect(validator('blue')).toEqual(true);
        });

        it('does not allow unexpected color values', () => {
            expect(validator('something')).toEqual(false);
            expect(validator('foobar')).toEqual(false);
            expect(validator(undefined)).toEqual(false);
            expect(validator(null)).toEqual(false);
        });
    });
});
