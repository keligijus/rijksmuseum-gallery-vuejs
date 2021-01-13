<template>
  <b-modal
    :visible="!!modalItem"
    @close="onClose"
    size="xl"
    hide-backdrop
    hide-header
    centered
  >
    <template #default>
      <div
        v-if="modalItem && modalItem.webImage"
        class="d-flex justify-content-center"
      >
        <b-img-lazy
          :src="modalItem.webImage.url"
          :blank-width="modalItem.webImage.width"
          :blank-height="modalItem.webImage.height"
        />
      </div>
    </template>

    <template #modal-footer>
      <b-row align-h="start">
        <b-col v-if="modalItemDetails && modalItemDetails.artObject">
          <p class="h5 mt-2">
            {{
              (modalItemDetails.artObject.label &&
                modalItemDetails.artObject.label.title) ||
                modalItemDetails.artObject.title
            }}
            <small class="text-muted">{{
              modalItemDetails.artObject.subTitle
            }}</small>
          </p>
          <p class="h6">
            {{
              (modalItemDetails.artObject.label &&
                modalItemDetails.artObject.label.makerLine) ||
                modalItemDetails.artObject.scLabelLine
            }}
          </p>
          <p>
            {{
              (modalItemDetails.artObject.label &&
                modalItemDetails.artObject.label.description) ||
                modalItemDetails.artObject.description
            }}
          </p>
          <p>
            <small>{{
              modalItemDetails.artObject.label &&
                modalItemDetails.artObject.label.notes
            }}</small>
          </p>
        </b-col>
      </b-row>
      <b-row align-h="end">
        <b-col>
          <b-button variant="outline-primary" @click="onClose">Close</b-button>
        </b-col>
      </b-row>
    </template>
  </b-modal>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapState, mapMutations } = createNamespacedHelpers("gallery");

import {
  SET_MODAL_ITEM,
  SET_MODAL_ITEM_DETAILS
} from "@/store/gallery/mutation-types";

export default {
  name: "GalleryModal",
  computed: {
    ...mapState(["modalItem", "modalItemDetails"])
  },
  methods: {
    ...mapMutations([SET_MODAL_ITEM, SET_MODAL_ITEM_DETAILS]),
    onClose() {
      this.SET_MODAL_ITEM(null);
      this.SET_MODAL_ITEM_DETAILS(null);
    }
  }
};
</script>

<style scoped>
img {
  max-width: 100%;
  max-height: calc(100vh - 260px);
}

/deep/.modal-body {
  padding: 0;
}
/* 
/deep/.modal-footer {
  justify-content: flex-start;
} */
</style>
