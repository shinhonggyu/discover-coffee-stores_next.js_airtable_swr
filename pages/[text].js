import { useRouter } from "next/router";
import Head from "next/head";

const Text = () => {
  const router = useRouter();
  const query = router.query.text;

  return (
    <div>
      <Head>
        <title>{query}</title>
      </Head>
      Page {query}
    </div>
  );
};

export default Text;
