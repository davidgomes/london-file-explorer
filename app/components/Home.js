// @flow
import React from 'react';
import _ from "lodash";
import fs from "fs";

import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { withClientState } from 'apollo-link-state';
import gql from 'graphql-tag';
import { ApolloProvider } from 'react-apollo';

import FileExplorer from "./file-explorer";

const cache = new InMemoryCache();

const stateLink = withClientState({
  cache,
  resolvers: {
    Query: {
      files: (obj, { path }) => {
        return new Promise((resolve, reject) => {
          fs.readdir(
            path,
            (error, files) => {
              if (error) {
                console.error(error);
                reject(error);
              } else {
                resolve(_.map(files, file => ({name: file, __typename: "string"})));
              }
            }
          );
        });
      }
    },

    Mutation: {
      changePath: (_, { path }, { cache }) => {
        console.log("inside the mutation", path);
        cache.writeData({ data: { currentPath: path } });
        return null;
      },
    },
  },
  defaults: {
    currentPath: "/Users/davidgomes/",
  },
})

type Props = {};

const client = new ApolloClient({
  cache,
  link: stateLink,
});

export default class Home extends React.Component<Props> {
  render() {
    return (
      <ApolloProvider client={client}>
        <FileExplorer />
      </ApolloProvider>
    );
  }
}
