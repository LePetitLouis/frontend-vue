import { mount } from '@vue/test-utils';

import RestaurantReview from './review.vue';
import { type Review } from '@/src/composables/restaurants';
import restaurantsResponse from '@/mock/restaurants.json';

const review = restaurantsResponse[0].reviews[0] as Review;

describe(`restaurant-review`, () => {
  test(`no props`, (context) => {
    const wrapper = mount(RestaurantReview, {
      global: { plugins: [context.router] },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it(`renders a review`, (context) => {
    const wrapper = mount(RestaurantReview, {
      global: { plugins: [context.router] },
      props: { review },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });
});
