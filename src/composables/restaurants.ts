import { api } from '~/services/api';

export interface Restaurant {
  name: string
  id: string
  url: string
  phone: string
  display_phone: string
  photos: string[]
  location?: Location
  reviews: Review[]
}

export interface Location {
  address1: string
  city: string
  postal_code: string
  formatted_address: string
}

export interface Review {
  text: string
  rating: number
  id: string
}

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

export function useFetchRestaurants() {
  return useQuery({
    queryKey: [`restaurants-list`],
    queryFn: () => {
      const url = `restaurants`;
      return api(url).json<Restaurant[]>();
    },
  });
}

export function useFetchRestaurant({ restaurantId }: { restaurantId: string | string[] }) {
  return useQuery({
    queryKey: [`company`, restaurantId],
    queryFn: () => {
      const url = `restaurants/${restaurantId}`;
      return api(url).json<Restaurant>();
    },
  });
}
