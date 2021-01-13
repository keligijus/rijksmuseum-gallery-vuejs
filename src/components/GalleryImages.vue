<template>
  <b-container>
    <b-row
      v-if="isLoading"
      class="full-height"
      align-h="center"
      align-v="center"
    >
      <b-spinner label="Loading..."></b-spinner>
    </b-row>
    <b-row
      v-else-if="
        currentGallery &&
          currentGallery.artObjects &&
          currentGallery.artObjects.length
      "
    >
      <b-col md="4" class="row-pb">
        <div
          class="img-square-wrapper"
          @click="UPDATE_MODAL_ITEM(sortedArtObjects.lead)"
        >
          <img :src="sortedArtObjects.lead.webImage.url" />
        </div>
      </b-col>
      <b-col md="8">
        <b-row>
          <b-col
            md="3"
            v-for="artObject in sortedArtObjects.nestedRow1"
            :key="artObject.id"
            class="row-pb"
          >
            <div
              class="img-square-wrapper"
              @click="UPDATE_MODAL_ITEM(artObject)"
            >
              <img :src="artObject.webImage.url" />
            </div>
          </b-col>
        </b-row>
        <b-row>
          <b-col
            md="3"
            v-for="artObject in sortedArtObjects.nestedRow2"
            :key="artObject.id"
            class="row-pb"
          >
            <div
              class="img-square-wrapper"
              @click="UPDATE_MODAL_ITEM(artObject)"
            >
              <img :src="artObject.webImage.url" />
            </div>
          </b-col>
        </b-row>
      </b-col>
      <b-col
        md="2"
        v-for="artObject in sortedArtObjects.fullRows"
        :key="artObject.id"
        class="row-pb"
      >
        <div class="img-square-wrapper" @click="UPDATE_MODAL_ITEM(artObject)">
          <img :src="artObject.webImage.url" />
        </div>
      </b-col>
    </b-row>
    <b-row v-else class="full-height" align-h="center" align-v="center">
      No results!
    </b-row>
  </b-container>
</template>

<script>
import { createNamespacedHelpers } from "vuex";

const { mapState, mapActions } = createNamespacedHelpers("gallery");

import { UPDATE_MODAL_ITEM } from "@/store/gallery/action-types";

export default {
  name: "GalleryImages",
  computed: {
    ...mapState(["isLoading", "currentGallery"]),
    sortedArtObjects() {
      if (!this.currentGallery || !this.currentGallery.artObjects) return [];

      const sorted = {
        lead: this.currentGallery.artObjects[0],
        nestedRow1: this.currentGallery.artObjects.slice(1, 5),
        nestedRow2: this.currentGallery.artObjects.slice(5, 9),
        fullRows: this.currentGallery.artObjects.slice(9, Infinity)
      };

      return sorted;
    }
  },
  methods: {
    ...mapActions([UPDATE_MODAL_ITEM])
  }
};
</script>

<style lang="scss" scoped>
.row-pb {
  padding-bottom: 30px;
}

.img-square-wrapper {
  position: relative;
  overflow: hidden;
  padding-bottom: 100%;
}

.img-square-wrapper > img {
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.full-height {
  min-height: calc(100vh - 260px);
}
</style>
