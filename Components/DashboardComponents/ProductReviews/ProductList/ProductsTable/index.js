import React, { Component } from "react";
import { connect } from "react-redux";
//! Own components
import ConfirmDialog from "../../../../Widgets/MaterialConfirmDialog";
//! utilities
import { getAllProductsApi } from "../../../../../utility/config";
import { isValidArray } from "../../../../../utility/commonFunctions";
import cookie from "js-cookie";
//! actions
import { deleteProduct } from "../../../../../store/actions/dashboardActions";
//! axios
import axios from "axios";
//! Material imports
import MaterialTable from "material-table";
//! Lodash imports
import _get from "lodash/get";

class ProductsTable extends Component {
  constructor(props) {
    super(props);
    this.tableRef = React.createRef();
    this.state = {
      openDialog: false,
      productToDelete: {}
    };
  }

  parseTableData = tableData => {
    if (isValidArray(tableData)) {
      return tableData.map(row => {
        return {
          id: _get(row, "_id", ""),
          name: _get(row, "name", ""),
          originalData: {
            ...row
          }
        };
      });
    }
  };

  deleteProductHandler = () => {
    const { productToDelete } = this.state;
    const { deleteProduct } = this.props;
    const productId = _get(productToDelete, "_id", "");
    // deleteProduct();
  };

  render() {
    const { openDialog } = this.state;
    const { handleProductToEdit } = this.props;
    return (
      <div>
        <MaterialTable
          title="Products List"
          options={{
            search: false,
            pageSize: 10,
            pageSizeOptions: [5, 10, 15, 20, 25, 30],
            actionsColumnIndex: -1
          }}
          tableRef={this.tableRef}
          columns={[
            { title: "Id", field: "id" },
            { title: "Product Name", field: "name" }
          ]}
          actions={[
            {
              icon: "refresh",
              tooltip: "Refresh Data",
              isFreeAction: true,
              onClick: () =>
                this.tableRef.current && this.tableRef.current.onQueryChange()
            },
            {
              icon: "edit",
              tooltip: "Edit Product",
              onClick: (event, rowData) =>
                handleProductToEdit(_get(rowData, "originalData", {}))
            }
            // {
            //   icon: "delete",
            //   tooltip: "Delete Product",
            //   onClick: (event, rowData) =>
            //     this.setState({ openDialog: true, productToDelete: rowData })
            // }
          ]}
          data={query =>
            new Promise((resolve, reject) => {
              let url = `${process.env.CORE_BASE_URL}${getAllProductsApi}`;
              // url += "perPage=" + query.pageSize;
              // url += "&page=" + (query.page + 1);
              axios({
                method: "GET",
                url,
                headers: { Authorization: `Bearer ${cookie.get("token")}` }
              }).then(result => {
                let tableData = _get(result, "data.data", []);
                let parsedTableData = [];
                if (isValidArray(tableData)) {
                  parsedTableData = this.parseTableData(tableData);
                }
                resolve({
                  data: parsedTableData,
                  page: query.page,
                  totalCount: (_get(result, "data.data", []) || []).length
                });
              });
            })
          }
        />
        <ConfirmDialog
          open={openDialog}
          handleClose={() => {
            this.setState({ openDialog: false });
          }}
          dialogTitle="Are you sure you want to delete this product"
          okText="Delete"
          handleSubmit={this.deleteProductHandler}
        />
      </div>
    );
  }
}

export default connect(null, { deleteProduct })(ProductsTable);
