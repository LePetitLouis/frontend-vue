import { mount } from '@vue/test-utils';

import RatingFilter from './rating-filter.vue';

describe(`rating-filter`, () => {
  it(`updates selectedRating when user selects an option`, async (context) => {
    const wrapper = mount(RatingFilter, {
      global: { plugins: [context.router] },
    });
    const select = wrapper.findComponent({ name: `VSelect` });
    expect(select.props(`modelValue`)).toBe(0);

    await select.vm.$emit(`update:modelValue`, 2);
    expect(select.props(`modelValue`)).toBe(2);
  });
});
