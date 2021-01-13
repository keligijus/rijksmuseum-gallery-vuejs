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
    let url = `${process.env.VUE_APP_RIJKSMUSEUM_API_URL}/${culture}/collection?key=${process.env.VUE_APP_RIJKSMUSEUM_API_KEY}&imgonly=${imgonly}&p=${p}&ps=${ps}&type=${type}&s=${s}`;

    if (period && period !== "all") {
      url += `&f.dating.period=${period}`;
    }

    return axios
      .get(url)
      .then(response => response.data)
      .catch(error => error);
  },
  getDetails({ url }) {
    return axios
      .get(
        `${url.replace(/(^\w+:|^)\/\//, "https://")}?key=${
          process.env.VUE_APP_RIJKSMUSEUM_API_KEY
        }`
      )
      .then(response => response.data)
      .catch(error => error);
  }
};
