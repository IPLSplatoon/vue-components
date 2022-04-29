import IplProgressBar from '../iplProgressBar.vue';
import { mount } from '@vue/test-utils';

describe('IplProgressBar', () => {
    it('sets progress bar width from props', () => {
        const wrapper = mount(IplProgressBar, { props: { value: 64, color: 'blue' } });

        expect((wrapper.get('.progress-bar').element as HTMLElement).style.width).toEqual('64%');
    });

    it('restricts bar width to only 0% or more', () => {
        const wrapper = mount(IplProgressBar, { props: { value: -99, color: 'pink', backgroundColor: 'dark' } });

        expect((wrapper.get('.progress-bar').element as HTMLElement).style.width).toEqual('0%');
    });

    it('restricts bar width to 100% or less', () => {
        const wrapper = mount(IplProgressBar, { props: { value: 110, color: 'pink', backgroundColor: 'dark' } });

        expect((wrapper.get('.progress-bar').element as HTMLElement).style.width).toEqual('100%');
    });

    it('sets preset progress bar color from props', () => {
        const wrapper = mount(IplProgressBar, { props: { value: 23, color: 'pink' } });

        expect((wrapper.get('.progress-bar').element as HTMLElement).style.backgroundColor).toEqual('rgb(245, 0, 155)');
    });

    it('sets hex progress bar color from props', () => {
        const wrapper = mount(IplProgressBar, { props: { value: 23, color: '#222222' } });

        expect((wrapper.get('.progress-bar').element as HTMLElement).style.backgroundColor).toEqual('rgb(34, 34, 34)');
    });

    it('sets background color from props', () => {
        const wrapper = mount(IplProgressBar, { props: { value: 23, color: 'pink', backgroundColor: 'dark' } });

        expect((wrapper.get('.ipl-progress-bar__wrapper').element as HTMLElement).style.backgroundColor)
            .toEqual('rgb(38, 47, 64)');
    });

    describe('validator: color', () => {
        it('is true when value is hex code', () => {
            expect(IplProgressBar.props.color.validator('#222222')).toEqual(true);
            expect(IplProgressBar.props.color.validator('#948567')).toEqual(true);
            expect(IplProgressBar.props.color.validator('#A947DB')).toEqual(true);
            expect(IplProgressBar.props.color.validator('#349473')).toEqual(true);
        });

        it('is true when value is in list of preset colors', () => {
            expect(IplProgressBar.props.color.validator('pink')).toEqual(true);
            expect(IplProgressBar.props.color.validator('blue')).toEqual(true);
            expect(IplProgressBar.props.color.validator('yellow')).toEqual(true);
        });

        it('is false when value is not a hex code or a preset color', () => {
            expect(IplProgressBar.props.color.validator('aaaaaaaaa')).toEqual(false);
            expect(IplProgressBar.props.color.validator('test')).toEqual(false);
            expect(IplProgressBar.props.color.validator('#12312')).toEqual(false);
            expect(IplProgressBar.props.color.validator('#2')).toEqual(false);
        });
    });

    describe('validator: backgroundColor', () => {
        it('is true when value is in list of preset colors', () => {
            expect(IplProgressBar.props.backgroundColor.validator('light')).toEqual(true);
            expect(IplProgressBar.props.backgroundColor.validator('dark')).toEqual(true);
        });

        it('is false when value is not in list of preset colors', () => {
            expect(IplProgressBar.props.backgroundColor.validator('value')).toEqual(false);
            expect(IplProgressBar.props.backgroundColor.validator('test test test')).toEqual(false);
        });
    });
});
