<template>
  <div>
    <GalleryNav />
    <GalleryImages />
    <GalleryPagination />
    <GalleryModal />
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";

const { mapActions } = createNamespacedHelpers("gallery");

import { FETCH_GALLERY } from "@/store/gallery/action-types";

import GalleryNav from "@/components/GalleryNav";
import GalleryImages from "@/components/GalleryImages";
import GalleryPagination from "@/components/GalleryPagination";
import GalleryModal from "@/components/GalleryModal";

export default {
  name: "Gallery",
  components: {
    GalleryNav,
    GalleryImages,
    GalleryPagination,
    GalleryModal
  },
  methods: {
    ...mapActions([FETCH_GALLERY])
  },
  mounted() {
    this[FETCH_GALLERY]();
  }
};
</script>
