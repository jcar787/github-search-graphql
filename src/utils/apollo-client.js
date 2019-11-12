import ApolloClient from 'apollo-boost';

const { REACT_APP_GITHUB_URL, REACT_APP_ACCESS_TOKEN } = process.env;
const client = new ApolloClient({
  uri: REACT_APP_GITHUB_URL,
  headers: {
    authorization: `Bearer ${REACT_APP_ACCESS_TOKEN}`
  }
});

export const query = async (query, variables) => {
  const results = await client.query({
    query,
    variables: { ...variables }
  });
  return results;
};
