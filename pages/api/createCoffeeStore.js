import Airtable from "airtable";

const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
  process.env.AIRTABLE_BASE_KEY
);

const table = base("tbllgjYtXihXqRTLk");

const createCoffeeStore = async (req, res) => {
  if (req.method === "POST") {
    // find a record

    const { id, name, neighbourhood, address, imgUrl, voting } = req.body;

    try {
      if (id) {
        const findCoffeeStoreRecords = await table
          .select({
            filterByFormula: `id=${id}`,
          })
          .firstPage();

        if (findCoffeeStoreRecords.length !== 0) {
          // data transform
          const records = findCoffeeStoreRecords.map((record) => {
            return {
              ...record.fields,
            };
          });

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

            const records = createRecords.map((record) => {
              return {
                ...record.fields,
              };
            });

            res.json(records);
          } else {
            res.status(400);
            res.json({ message: "name is missing" });
          }
        }
      } else {
        res.status(400);
        res.json({ message: "id is missing" });
      }
    } catch (err) {
      console.error("Error creating or finding a store", err);
      res.status(500);
      res.json({ message: "Error creating or finding a store", err });
    }
  }
};

export default createCoffeeStore;
