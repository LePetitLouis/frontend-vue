<script setup lang="ts">
import { type Restaurant, useAverageRating } from '~/composables/restaurants';

const props = defineProps<{
  restaurant: Restaurant
}>();

const { average } = useAverageRating(props.restaurant);
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
