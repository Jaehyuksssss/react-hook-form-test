/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateChat = /* GraphQL */ `
  subscription OnCreateChat($filter: ModelSubscriptionChatFilterInput) {
    onCreateChat(filter: $filter) {
      id
      text
      author
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateChat = /* GraphQL */ `
  subscription OnUpdateChat($filter: ModelSubscriptionChatFilterInput) {
    onUpdateChat(filter: $filter) {
      id
      text
      author
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteChat = /* GraphQL */ `
  subscription OnDeleteChat($filter: ModelSubscriptionChatFilterInput) {
    onDeleteChat(filter: $filter) {
      id
      text
      author
      createdAt
      updatedAt
    }
  }
`;
