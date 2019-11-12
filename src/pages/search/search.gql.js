import { gql } from 'apollo-boost';
export const GET_REPOS = gql`
  query GetRepos($query: String!, $type: SearchType!, $after: String) {
    search(query: $query, type: $type, first: 10, after: $after) {
      repositoryCount
      edges {
        cursor
        node {
          ... on Repository {
            name
            url
            description
            watchers {
              totalCount
            }
            primaryLanguage {
              name
            }
            owner {
              login
            }
          }
        }
      }
    }
  }
`;
