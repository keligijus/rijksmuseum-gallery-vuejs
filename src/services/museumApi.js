import axios from "axios";

// docs @ https://data.rijksmuseum.nl/object-metadata/api/

export default {
  getCollection({
    culture = "en",
    p = 0,
    ps = process.env.VUE_APP_RIJKSMUSEUM_API_DEFAULT_PAGE_SIZE,
    period,
    s = "relevance",
    type = "painting",
    imgonly = "true"
  }) {
    const url = `${process.env.VUE_APP_RIJKSMUSEUM_API_URL}/${culture}/collection`;
    const params = {
      key: process.env.VUE_APP_RIJKSMUSEUM_API_KEY,
      imgonly,
      p,
      ps,
      type,
      s
    };

    if (period && period !== "all") {
      params["f.dating.period"] = period;
    }

    return axios
      .get(url, { params })
      .then(response => response.data)
      .catch(error => error);
  },
  getDetails({ url }) {
    const httpsUrl = url.replace(/(^\w+:|^)\/\//, "https://");
    const params = {
      key: process.env.VUE_APP_RIJKSMUSEUM_API_KEY
    };

    return axios
      .get(httpsUrl, { params })
      .then(response => response.data)
      .catch(error => error);
  }
};
