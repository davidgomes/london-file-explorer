import * as React from "react";
import _ from "lodash";
import path from "path";

import { graphql } from "react-apollo";
import gql from "graphql-tag";
import { compose } from "react-apollo";

import "./file-list.css";

class FileList extends React.Component<{}> {
    handleFileClick = (pathExtension: string) => {
        const { changePath, path: currentPath } = this.props;

        changePath({
            variables: { path: path.join(currentPath, pathExtension) },
        });
    };

    handleGoBack = () => {
        const { goBack } = this.props;

        goBack();
    };

    render() {
        const { data: { files }, path } = this.props;

        return (
            <div className="file-list">
                <div className="go-back" onClick={this.handleGoBack}>
                    Go Back
                </div>
                <div className="info">Files in {path}</div>
                {_.map(files, file => (
                    <div className="entry" key={file.name}>
                        <div onClick={() => this.handleFileClick(file.name)}>
                            {file.name}
                        </div>
                    </div>
                ))}
            </div>
        );
    }
}

export default compose(
    graphql(
        gql`
            query GetFiles {
                files(path: $path) @client {
                    name
                }
            }
        `,
        {
            options: props => ({
                variables: {
                    path: props.path,
                },
            }),
        }
    ),

    graphql(
        gql`
            mutation ChangePath($path: String!) {
                changePath(path: $path) @client
            }
        `,
        {
            name: "changePath",
        }
    ),

    graphql(
        gql`
            mutation GoBack {
                goBack @client
            }
        `,
        {
            name: "goBack",
        }
    )
)(FileList);
