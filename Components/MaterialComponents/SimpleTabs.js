import React, { Component } from "react";
import uuid from "uuid/v1";
export default class SimpleTabs extends Component {
  render() {
    return (
      <div className="simpleTabs">
        <style jsx>
          {`
            .simpleTabs {
              display: flex;
              background: #fff;
              position: sticky;
              z-index: 1;
              color:#000;
              width: 100%;
              top: 0;
              left: 0;
              box-shadow:0px 1px 2px #d8d8d8;
              display:none;
            }
            .simpleTabs div {
              flex: 1;
              padding: 10px;
              text-align: center;
            }
            .selectedTab{
                color:#21bc61;
                border-bottom:3px solid #21bc61;
            }
            @media screen and (max-width: 767px){
                .simpleTabs{
                    display:flex;
                }
            }
          `}
        </style>
        {this.props.children.map((item, index) => {
          return <div key={uuid()} className={`${this.props.selectedTab===item.props.to ? "selectedTab" : ""}`}>{item}</div>;
        })}
      </div>
    );
  }
}
