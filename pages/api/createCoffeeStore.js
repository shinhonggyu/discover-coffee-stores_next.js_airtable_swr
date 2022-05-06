import { table, getMinifiedRecords } from "../../lib/airtable";

// Find if this id exist ?
// YES -> don't create a store but just return that store
// NO -> create that store

// List recodrs and Filter
const createCoffeeStore = async (req, res) => {
  if (req.method === "POST") {
    // find a record

    const { id, name, address, neighbourhood, voting, imgUrl } = req.body;

    try {
      if (id) {
        const findCoffeeStoreRecords = await table
          .select({ filterByFormula: `id="${id}"` })
          .firstPage();

        if (findCoffeeStoreRecords.length !== 0) {
          const records = getMinifiedRecords(findCoffeeStoreRecords);
          res.json(records);
        } else {
          // create a record

          if (name) {
            const createRecords = await table.create([
              {
                fields: {
                  id,
                  name,
                  address,
                  neighbourhood,
                  voting,
                  imgUrl,
                },
              },
            ]);
            const records = getMinifiedRecords(createRecords);
            res.json(records);
          } else {
            res.status(400);
            res.json({ message: "Id or name is missing" });
          }
        }
      } else {
        res.status(400);
        res.json({ message: "Id is missing" });
      }
    } catch (err) {
      console.log("Error creating or finding store", err);
      res.status(500);
      res.json({ message: "Error creating or finding store", err });
    }
  }
};

export default createCoffeeStore;
