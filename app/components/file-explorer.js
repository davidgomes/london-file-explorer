// @flow

import * as React from "react";
import _ from "lodash";
import path from "path";

import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { compose } from 'react-apollo';

import FileList from "./file-list";

class FileExplorer extends React.Component<{}> {
  render() {
    const { currentPath } = this.props.data;

    return (
      <FileList path={currentPath} />
    );
  }
}

export default compose(
  graphql(gql`
    query GetPath {
      currentPath
    }
  `)
)(FileExplorer);
