/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getChat = /* GraphQL */ `
  query GetChat($id: ID!) {
    getChat(id: $id) {
      id
      text
      author
      createdAt
      updatedAt
    }
  }
`;
export const listChats = /* GraphQL */ `
  query ListChats(
    $filter: ModelChatFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listChats(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        text
        author
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
