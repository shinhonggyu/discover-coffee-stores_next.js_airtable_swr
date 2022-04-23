// initialize unsplash
import { createApi } from "unsplash-js";

const unsplashApi = createApi({
  accessKey: process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY,
  //...other fetch options
});

const options = {
  method: "GET",
  headers: {
    Accept: "application/json",
    Authorization: process.env.NEXT_PUBLIC_FOURSQUARE_API_KEY,
  },
};

const getUrlForCoffeeStores = (latLong, query, limit) => {
  return (
    "https://api.foursquare.com/v3/places/nearby?" +
    new URLSearchParams({
      ll: latLong,
      query,
      limit,
    })
  );
};

const getListOfCoffeeStorePhotos = async () => {
  const photos = await unsplashApi.search.getPhotos({
    query: "coffee shop",
    perPage: 40,
  });
  const unsplashResults = photos.response?.results || [];
  return unsplashResults.map((result) => result.urls.small);
};

export const fetchCoffeeStores = async (
  latLong = "43.65267326999575,-79.39545615725015",
  query = "coffee store",
  limit = 7
) => {
  const photos = await getListOfCoffeeStorePhotos();
  const res = await fetch(
    getUrlForCoffeeStores(latLong, query, limit),
    options
  );
  const data = await res.json();

  return (
    data.results?.map((venue, idx) => {
      const neighbourhood = venue.location.neighborhood;

      return {
        id: venue.fsq_id,
        name: venue.name,
        address: venue.location.address || "",
        neighbourhood:
          (neighbourhood && neighbourhood.length > 0 && neighbourhood[0]) ||
          venue.location.cross_street ||
          "",
        imgUrl: photos[idx],
      };
    }) || []
  );
};
