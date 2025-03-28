<script setup lang="ts">
import type { Restaurant, Review } from '~/composables/restaurants';

const props = defineProps<{
  restaurant: Restaurant
}>();

function formatAverage(num: number) {
  const rounded = Math.round(num * 10) / 10;
  return Number.isInteger(rounded) ? rounded : Number.parseFloat(rounded.toFixed(1));
};

const average = computed(() => {
  const ratings = props.restaurant?.reviews?.map((review: Review) => review.rating);
  if (!ratings || ratings.length === 0) return 0;
  const sum = ratings.reduce((acc, rating) => acc + rating, 0);
  return formatAverage(sum / ratings.length);
});
</script>

<template>
  <VCard>
    <VImg
      height="100"
      cover
      :src="restaurant?.photos?.[0]"
    />
    <VCardTitle>
      {{ restaurant?.name }}
    </VCardTitle>
    <div v-if="average > 0" class="flex items-center gap-2 mx-4">
      {{ average }}
      <VRating
        readonly
        half-increments
        :length="5"
        :size="28"
        :model-value="average"
      />
    </div>
    <!-- TODO Fixed ! -->
    <!-- <VAlert variant="tonal" type="warning" class="mx-4 w-1/2">
      TODO: display the average rating
      <br>
      Vuetify has a component for this. Use this one
    </VAlert> -->
    <VCardText>
      <RestaurantLocation :location="restaurant?.location" />
    </VCardText>
    <VCardActions class="mt-auto">
      <VBtn color="primary" variant="tonal" :to="`/restaurants/${restaurant?.id}`">
        see more
      </VBtn>
    </VCardActions>
  </VCard>
</template>
