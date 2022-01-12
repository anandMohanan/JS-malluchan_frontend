import Cookies from "js-cookie";
import {
  cacheExchange,
  createClient,
  dedupExchange,
  fetchExchange,
  ssrExchange,
} from "urql";

const isServerSide = typeof window === "undefined";
const ssrCache = ssrExchange({ isClient: !isServerSide });

const client = createClient({
  url: "http://localhost:5000",
  exchanges: [dedupExchange, cacheExchange, ssrCache, fetchExchange],
  fetchOptions: () => {
    const token = Cookies.get("jwtToken");
    console.log(token);
    return {
      headers: {
        Authorization: token ? `Bearer ${token}` : "kjdahsj",
      },
    };
  },
});

export { client, ssrCache };
