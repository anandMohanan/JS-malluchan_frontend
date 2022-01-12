import { Provider } from "urql";
import { AuthProvider } from "../context/authentication";
import "../styles/globals.css";
import { client, ssrCache } from "../urqlClient";

function MyApp({ Component, pageProps }) {
  if (pageProps.urqlState) {
    ssrCache.restoreData(pageProps.urqlState);
  }
  return (
    <Provider value={client}>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </Provider>
  );
}

export default MyApp;
