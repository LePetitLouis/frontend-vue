<script setup lang="ts">
import { useFetchRestaurants } from '~/composables/restaurants';
import { useAverageRating, useRatingFilter } from '@/src/composables/rating';

const { selectedRating } = useRatingFilter();
const { data: restaurants, isError } = useFetchRestaurants();

const filteredRestaurants = computed(() => {
  return restaurants.value?.filter((restaurant) => {
    const { average } = useAverageRating(restaurant);
    return selectedRating.value === 0 || average.value >= selectedRating.value;
  });
});

defineExpose({
  selectedRating,
});
</script>

<template>
  <div>
    <RatingFilter />
    <!-- TODO Fixed ! -->
    <!-- <VAlert type="warning" class="my-4">
      TODO: this should be presented as a grid<br>
      • 3 columns max<br>
      • 1 column on small devices <br>
      • DO NOT USE
      <a
        href="https://vuetifyjs.com/en/components/grids/"
        target="_blank"
        class="text-indigo-700"
        rel="noopener noreferrer"
      >
        Vuetify's grid components
      </a>
    </VAlert> -->
    <LoadingError v-if="isError" />
    <div v-else-if="filteredRestaurants" class="grid grid-cols-1 md:grid-cols-3 gap-4 my-4">
      <RestaurantCard
        v-for="restaurant of filteredRestaurants"
        :key="restaurant.id"
        :restaurant="restaurant"
      />
    </div>
  </div>
</template>
