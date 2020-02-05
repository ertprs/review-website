import React, { Component } from "react";
import Dropzone from "react-dropzone";
import UploadIcon from "@material-ui/icons/CloudUpload";

export default class ImageUpload extends Component {
  render() {
    const { onUpload } = this.props;
    return (
      <div className="container">
        <div className="dopzoneContainer">
          <style jsx>
            {`
              .dopzoneContainer {
                margin: 30px 30px 40px 30px;
                border-radius: 2px;
                border: 1px solid black;
                padding: 100px;
                display: flex;
                justify-content: center;
                align-items: center;
              }

              .ml-10 {
                margin-left: 10px;
              }

              .pointer {
                border: none;
              }

              .pointer:hover {
                cursor: pointer;
              }
            `}
          </style>
          <Dropzone
            onDrop={acceptedFiles => {
              onUpload(acceptedFiles);
            }}
            onDropAccepted={e => {}}
            onDropRejected={e => {}}
          >
            {({ getRootProps, getInputProps }) => (
              <section>
                <div {...getRootProps()}>
                  <input {...getInputProps()} />
                  <div className="pointer">
                    <UploadIcon />
                    <span className="ml-10">
                      Drag 'n' drop some files here, or click to select files
                    </span>
                  </div>
                </div>
              </section>
            )}
          </Dropzone>
        </div>
      </div>
    );
  }
}
