import React from "react";
import MaterialTable from "material-table";

export default function EditableTable(props) {
  return (
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
  );
}
