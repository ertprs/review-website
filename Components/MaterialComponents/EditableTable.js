import React from "react";
import MaterialTable from "material-table";

export default function EditableTable(props) {
  return (
    <>
    <style jsx>
      {`
        .mobileVerision{
          display:none;
        }
        @media screen and (max-width:404px){
          .desktopVerision{
            display:none;
          }
          .mobileVerision{
            display:block;
          }
        }
      `}
    </style>
    <div className="desktopVerision">
      <MaterialTable
      title={props.title}
      columns={props.columns}
      data={props.data}
      editable={{
        onRowAdd: newData =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              props.onRowAdd(newData);
            }, 600);
          }),
        onRowUpdate: (newData, oldData) =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              props.onRowUpdate(newData, oldData);
            }, 600);
          }),
        onRowDelete: oldData =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              props.onRowDelete(oldData);
            }, 600);
          })
      }}
    />
    </div>
    <div className="mobileVerision">
      <MaterialTable
      components={{
        Toolbar: props => (
          <div style={{ backgroundColor: "#e8eaf5" }}>
            
          </div>
        ),
        Pagination: props => (
          <div style={{ backgroundColor: "#e8eaf5" }}>
            
          </div>
        ),
      }}
      title={props.title}
      columns={props.columns}
      data={props.data}
      editable={{
        onRowAdd: newData =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              props.onRowAdd(newData);
            }, 600);
          }),
        onRowUpdate: (newData, oldData) =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              props.onRowUpdate(newData, oldData);
            }, 600);
          }),
        onRowDelete: oldData =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              props.onRowDelete(oldData);
            }, 600);
          })
      }}
    />
    </div>
    </>
  );
}
