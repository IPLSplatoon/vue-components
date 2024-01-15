import IplDataRow from '../iplDataRow.vue';
import { mount } from '@vue/test-utils';

describe('IplDataRow', () => {
    it('sets label with data from props', () => {
        const wrapper = mount(IplDataRow, { props: { label: 'Label!' } });

        expect(wrapper.get('label').text()).toEqual('Label!');
    });

    it('shows placeholder when value is undefined', () => {
        const wrapper = mount(IplDataRow, { props: { label: 'Label!', value: undefined } });

        expect(wrapper.get('.value').text()).toEqual('―');
    });

    it('shows placeholder when value is null', () => {
        const wrapper = mount(IplDataRow, { props: { label: 'Label!', value: null } });

        expect(wrapper.get('.value').text()).toEqual('―');
    });

    it('shows value if present', () => {
        const wrapper = mount(IplDataRow, { props: { label: 'Label!', value: 'Value!' } });

        expect(wrapper.get('.value').text()).toEqual('Value!');
    });

    it('does not show copy button by default', () => {
        const wrapper = mount(IplDataRow, { props: { label: 'Label!', value: 'Value!' } });

        expect(wrapper.find('.copy-button').exists()).toEqual(false);
    });

    it('shows copy button when enabled', () => {
        const wrapper = mount(IplDataRow, { props: { label: 'Label!', value: 'Value!', copiable: true } });

        expect(wrapper.find('.copy-button').exists()).toEqual(true);
    });

    it('copies value on copy button click', async () => {
        const wrapper = mount(IplDataRow, { props: { label: 'Label!', value: 'Value!', copiable: true } });
        Object.defineProperty(navigator, 'clipboard', {
            value: { writeText: jest.fn().mockResolvedValue(undefined) }
        });

        await wrapper.get('.copy-button').trigger('click');

        expect(navigator.clipboard.writeText).toHaveBeenCalledWith('Value!');
    });
});
