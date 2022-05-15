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
};

export default getCoffeeStoresByLocation;
