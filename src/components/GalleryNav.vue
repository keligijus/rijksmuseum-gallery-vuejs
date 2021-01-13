<template>
  <b-container>
    <b-row>
      <b-col>
        <b-nav pills class="py-3">
          <b-nav-item
            v-for="item in periods"
            :key="item.name"
            :active="filters.period === item.value"
            @click="UPDATE_FILTERS({ period: item.value, page: 0 })"
          >
            {{ item.name }}
          </b-nav-item>
        </b-nav>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapActions, mapState } = createNamespacedHelpers("gallery");
import { UPDATE_FILTERS } from "@/store/gallery/action-types";

import { generatePeriods } from "@/services/utils";

export default {
  name: "GalleryNav",
  data() {
    return {
      periods: []
    };
  },
  computed: {
    ...mapState(["filters"])
  },
  mounted() {
    this.periods = generatePeriods();
  },
  methods: {
    ...mapActions([UPDATE_FILTERS])
  }
};
</script>
