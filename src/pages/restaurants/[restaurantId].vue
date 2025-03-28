<script setup lang="ts">
import { useAverageRating, useFetchRestaurant } from '~/composables/restaurants';

const { params } = useRoute();
const { data: restaurant, isError } = useFetchRestaurant({ restaurantId: params.restaurantId });

const { average } = useAverageRating(restaurant.value);
</script>

<template>
  <!-- TODO Fixed ! -->
  <!-- <VAlert v-if="isError" type="warning" class="mt-4">
    TODO: It might be an Fetch error
    <br>
    You should fix that
  </VAlert> -->
  <LoadingError v-if="isError" />
  <div class="grid grid-cols-1 md:grid-cols-[minmax(0,_1fr)_16rem] gap-6">
    <VCard v-if="restaurant">
      <VImg
        v-for="photo in restaurant.photos"
        :key="photo"
        :src="restaurant.photos[0]"
        height="250"
        cover
        gradient="to top, rgba(0,0,0,.1), rgba(0,0,0,.5)"
      >
        <VCardTitle class="!text-4xl text-white">
          {{ restaurant.name }}
        </VCardTitle>
        <div v-if="average > 0" class="flex items-center gap-2 mx-4 color-white">
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
        <!-- <VAlert variant="flat" type="warning" class="mx-4 inline-block">
          TODO: display the mean rating
          <br>
          Vuetify has a component for this. Use this one
        </VAlert> -->
      </VImg>
      <VCardText>
        <div class="grid grid-cols-2 gap-4">
          <RestaurantLocation :location="restaurant.location" />
          <KeyValue icon="mdi-phone">
            <p class="text-body-1">
              {{ restaurant.phone }}
              <VAlert type="warning">
                ↑ TODO: we would like to display the formatted phone
              </VAlert>
            </p>
          </KeyValue>
        </div>
      </VCardText>
    </VCard>
    <aside>
      <!-- TODO Fixed ! -->
      <!-- <VAlert type="warning">
        TODO: this should go under the company card on small device
      </VAlert> -->
      <ul v-if="restaurant" class="pa-0 flex flex-col gap-4">
        <RestaurantReview
          v-for="review of restaurant.reviews"
          :key="review.id"
          :review="review"
        />
      </ul>
    </aside>
  </div>
</template>
