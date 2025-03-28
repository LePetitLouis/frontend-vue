<script setup lang="ts">
import { type Review } from '~/composables/restaurants';

const props = defineProps<{
  review?: Review
}>();

const formattedReview = props.review?.text.replace(/\n/g, `<br>`);
</script>

<template>
  <VCard class="va-company-review" tag="li">
    <VCardText>
      <div class="flex flex-col gap-2">
        <VRating
          readonly
          half-increments
          :length="5"
          :size="28"
          :model-value="review?.rating"
        />
        <div v-html="formattedReview" />
      </div>
      <!-- TODO Fixed ! -->
      <!-- <VAlert type="warning">
        TODO: implement the reviews
        <br>
        • Rating using the appropriate Vuetify component
        <br>
        • Text (with carriage return)
      </VAlert> -->
    </VCardText>
  </VCard>
</template>
