import { ref } from 'vue';
import type { Restaurant, Review } from './restaurants';

const selectedRating = ref(0);

export function useRatingFilter() {
  return { selectedRating };
};

function formatAverage(num: number): number {
  const rounded = Math.round(num * 10) / 10;
  return Number.isInteger(rounded) ? rounded : Number.parseFloat(rounded.toFixed(1));
}

export function useAverageRating(restaurant: Restaurant | undefined) {
  const average = computed(() => {
    const ratings = restaurant?.reviews?.map((review: Review) => review.rating);
    if (!ratings || ratings.length === 0) return 0;

    const sum = ratings.reduce((acc, rating) => acc + rating, 0);
    return formatAverage(sum / ratings.length);
  });

  return { average };
}
