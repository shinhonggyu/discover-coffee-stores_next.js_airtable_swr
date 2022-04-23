// Create Serverlsee Function.

// Rules of API routes.
// 1. File needs to be a function.
// 2. Function needs to be exported by default.
// 3. Every function should be it's own file.

import { fetchCoffeeStores } from "../../lib/coffee-stores";

const getCoffeeStoresByLocation = async (req, res) => {
  try {
    const { latLong, query, limit } = req.query;
    const response = await fetchCoffeeStores(latLong, query, limit);
    res.status(200);
    res.json(response);
  } catch (error) {
    console.error("There is an error", error);
    res.status(500);
    res.json({ message: "Oh no ! Someting went wrong", error });
  }

  // return
};

export default getCoffeeStoresByLocation;
