import {
  FETCH_DETAILS,
  FETCH_GALLERY,
  UPDATE_FILTERS,
  UPDATE_MODAL_ITEM
} from "./action-types";
import {
  SET_CACHED_RESPONSE,
  SET_FILTERS,
  SET_GALLERY,
  SET_IS_LOADING,
  SET_MODAL_ITEM,
  SET_MODAL_ITEM_DETAILS
} from "./mutation-types";

import museumApi from "@/services/museumApi";

export default {
  namespaced: true,
  state: {
    isLoading: false,
    cachedResponses: {},
    currentGallery: {},
    modalItem: null,
    modalItemDetails: null,
    filters: {
      page: 0,
      period: "all",
      ps: process.env.VUE_APP_RIJKSMUSEUM_API_DEFAULT_PAGE_SIZE
    }
  },
  mutations: {
    [SET_IS_LOADING](state, isLoading) {
      state.isLoading =
        typeof isLoading === "boolean" ? isLoading : !state.isLoading;
    },
    [SET_GALLERY](state, data) {
      state.currentGallery = data;
    },
    [SET_FILTERS](state, filters) {
      state.filters = { ...state.filters, ...filters };
    },
    [SET_CACHED_RESPONSE](state, { data, key }) {
      state.cachedResponses[key] = data;
    },
    [SET_MODAL_ITEM](state, item) {
      state.modalItem = item;
    },
    [SET_MODAL_ITEM_DETAILS](state, data) {
      state.modalItemDetails = data;
    }
  },
  actions: {
    [FETCH_GALLERY]({ commit, state }) {
      const { period, page, ps } = state.filters;
      const cachedReponseKey = `${period}--${page}`;

      commit(SET_IS_LOADING, true);

      if (state.cachedResponses[cachedReponseKey]) {
        commit(SET_GALLERY, state.cachedResponses[cachedReponseKey]);
        commit(SET_IS_LOADING, false);
        return;
      }

      return museumApi.getCollection({ period, p: page, ps }).then(data => {
        commit(SET_GALLERY, data);
        commit(SET_CACHED_RESPONSE, { data, key: cachedReponseKey });
        commit(SET_IS_LOADING, false);
      });
    },
    [FETCH_DETAILS]({ commit, state }, artObject) {
      if (state.cachedResponses[artObject.id]) {
        commit(SET_MODAL_ITEM_DETAILS, state.cachedResponses[artObject.id]);
        return;
      }

      return museumApi.getDetails({ url: artObject.links.self }).then(data => {
        commit(SET_MODAL_ITEM_DETAILS, data);
        commit(SET_CACHED_RESPONSE, { data, key: [artObject.id] });
      });
    },
    [UPDATE_FILTERS]({ commit, dispatch }, filters) {
      commit(SET_FILTERS, filters);
      dispatch(FETCH_GALLERY);
    },
    [UPDATE_MODAL_ITEM]({ commit, dispatch }, artObject) {
      commit(SET_MODAL_ITEM, artObject);
      commit(SET_MODAL_ITEM_DETAILS, { artObject }); // optimistic ui update
      dispatch(FETCH_DETAILS, artObject);
    }
  }
};
