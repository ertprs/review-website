import React, { Component } from "react";
//! axios
import axios from "axios";
//! Material imports
import MaterialTable from "material-table";

class ProductsTable extends Component {
  constructor(props) {
    super(props);
    this.tableRef = React.createRef();
  }

  render() {
    return (
      <div>
        <MaterialTable
          title="List of monitored products"
          columns={[
            { title: "Id", field: "id" },
            { title: "Product Name", field: "prodName" },
            {
              title: "URL",
              field: "url",
              render: rowData => (
                <a href={rowData.url} target="_blank" alt="prod_url">
                  {rowData.url}
                </a>
              )
            },
            { title: "Date added", field: "dateAdded", type: "date" },
            { title: "Latest reviews", field: "latestReviews" },
            { title: "Total Reviews", field: "totalReviews", type: "date" }
          ]}
          data={[
            {
              id: "1",
              prodName: "iPhone 11 pro",
              url: "https://thetrustsearch.com",
              dateAdded: "26/02/2020",
              latestReviews: "25",
              totalReviews: "250"
            },
            {
              id: "2",
              prodName: "Mi note 7",
              url: "https://thetrustsearch.com",
              dateAdded: "26/02/2020",
              latestReviews: "2",
              totalReviews: "20"
            },
            {
              id: "3",
              prodName: "Samsung S3",
              url: "https://thetrustsearch.com",
              dateAdded: "26/02/2020",
              latestReviews: "50",
              totalReviews: "500"
            }
          ]}
          actions={[
            {
              icon: "edit",
              tooltip: "Edit Product",
              onClick: (event, rowData) => alert("You edited " + rowData.name)
            },
            {
              icon: "delete",
              tooltip: "Delete Product",
              onClick: (event, rowData) =>
                confirm("You want to delete " + rowData.name)
            }
          ]}
          options={{
            actionsColumnIndex: -1
          }}
        />
      </div>
    );
  }
}

export default ProductsTable;
