const getUrlForCoffeeStores = (latLong, query, limit) => {
  return `https://api.foursquare.com/v3/places/nearby?ll=${latLong}&query=${query}&limit=${limit}`;
};

export const fetchCoffeeStores = async () => {
  const options = {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: process.env.NEXT_PUBLIC_FOURSQUARE_API_KEY,
    },
  };

  const res = await fetch(
    getUrlForCoffeeStores(
      "43.65267326999575,-79.39545615725015",
      "coffee stores",
      6
    ),
    options
  );
  const data = await res.json();

  return data.results?.map((venue, idx) => {
    return {
      id: venue.fsq_id,
      name: venue.name,
      address: venue.location.address || "",
      neighbourhood:
        venue.location.neighborhood || venue.location.crossStreet || "",
    };
  });
};
