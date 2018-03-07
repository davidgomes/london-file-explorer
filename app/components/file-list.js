// @flow

import * as React from "react";
import _ from "lodash";
import path from "path";

import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { compose } from 'react-apollo';

class FileList extends React.Component<{}> {
  handleFileClick = (pathExtension: string) => {
    const { mutate, path: currentPath } = this.props;

    mutate({ variables: { path: path.join(currentPath, pathExtension) } });
  };

  handleGoBack = () => {
    const { mutate, previousPath } = this.props;

    mutate({ variables: { path: previousPath } });
  };

  render() {
    const { data: { files }, path } = this.props;

    return (
      <div>
        <div onClick={this.handleGoBack}>Go Back</div>

        <b>Files in {path}</b>:

        {_.map(files, file => (
          <div key={file.name}><div onClick={() => this.handleFileClick(file.name)}>{file.name}</div></div>
        ))}
      </div>
    );
  }
}

export default compose(
  graphql(gql`
    query GetFiles {
      files(path: $path) @client {
        name
      }
    }
  `,
  {
    options: (props) => ({
      variables: {
        path: props.path,
      },
    }),
  }),

  graphql(gql`
    mutation ChangePath($path: String!) {
      changePath(path: $path) @client
    }
  `)
)(FileList);
