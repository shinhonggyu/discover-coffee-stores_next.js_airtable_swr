import Airtable from "airtable";

const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
  process.env.AIRTABLE_BASE_KEY
);

const table = base("tbllgjYtXihXqRTLk");

const records = findCoffeeStoreRecords.map((record) => {
  return {
    ...record.fields,
  };
});
