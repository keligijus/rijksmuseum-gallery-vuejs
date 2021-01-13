<template>
  <b-container>
    <b-row>
      <b-col>
        <b-pagination
          v-model="currentPage"
          :per-page="filters.ps"
          :total-rows="currentGallery.count"
          prev-class="d-none"
          next-class="d-none"
        ></b-pagination>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapActions, mapState } = createNamespacedHelpers("gallery");
import { UPDATE_FILTERS } from "@/store/gallery/action-types";

export default {
  name: "GalleryPagination",
  computed: {
    ...mapState(["currentGallery", "filters"]),
    currentPage: {
      get: function() {
        return this.$store.state.gallery.filters.page + 1;
      },
      set: function(newVal) {
        this[UPDATE_FILTERS]({ page: newVal - 1 });
      }
    }
  },
  methods: {
    ...mapActions([UPDATE_FILTERS])
  }
};
</script>
