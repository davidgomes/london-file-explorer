import * as React from "react";
import _ from "lodash";
import path from "path";

import { graphql } from "react-apollo";
import gql from "graphql-tag";
import { compose } from "react-apollo";

import FileList from "./file-list";

class FileExplorer extends React.Component<{}> {
    render() {
        const { currentPath, previousPath } = this.props.data;

        return <FileList path={currentPath} previousPath={previousPath} />;
    }
}

export default compose(
    graphql(gql`
        query GetPath {
            currentPath @client
            previousPath @client
        }
    `)
)(FileExplorer);
