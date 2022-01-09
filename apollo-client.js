import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  ssrMode: true,
  uri: "http://localhost:5000",
  cache: new InMemoryCache(),
});

export default client;
