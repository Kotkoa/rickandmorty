declare module '*/queries.gql' {
  import { DocumentNode } from 'graphql';
  const defaultDocument: DocumentNode;
  export const Character: DocumentNode;
  export const Characters: DocumentNode;
  export const CharactersByIds: DocumentNode;

  export default defaultDocument;
}
