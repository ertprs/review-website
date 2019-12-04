import React from "react";
import MaterialTable from "material-table";

const EndpointListTableColumns = [
  { title: "Request Name", field: "request_name" },
  { title: "Endpoint", field: "endpoint" },
  { title: "Parameter", field: "parameter" },
  { title: "Type", field: "type" },
  { title: "Required", field: "required" },
  { title: "Description", field: "description" }
];

const EndpointListTableData = [
  {
    request_name: "Authentication (POST)",
    endpoint: "/business/api/v1/authenticate",
    parameter: "systemIdentifier",
    type: "String",
    required: "Yes",
    description:
      "Client system identifier created at TrustSearch business dashboard."
  },
  {
    request_name: "",
    endpoint: "",
    parameter: "key",
    type: "String",
    required: "Yes",
    description: "Client system key created at business dashboard"
  },
  {
    request_name: "Push Order (POST)",
    endpoint: "/business/api/v1/order",
    parameter: "email",
    type: "String, Email",
    required: "Yes",
    description: "User’s email."
  },
  {
    request_name: "",
    endpoint: "",
    parameter: "firstName",
    type: "String",
    required: "Yes",
    description: "User’s first name."
  },
  {
    request_name: "",
    endpoint: "",
    parameter: "lastName",
    type: "String",
    required: "No",
    description: "User’s last name."
  },
  {
    request_name: "",
    endpoint: "",
    parameter: "phone",
    type: "String",
    required: "No",
    description: "User’s phone (max 15 characters)"
  },
  {
    request_name: "",
    endpoint: "",
    parameter: "orderId",
    type: "String",
    required: "Yes",
    description: "Unique order identifier in the client system."
  },
  {
    request_name: "",
    endpoint: "",
    parameter: "totalAmount",
    type: "Float",
    required: "Yes",
    description: "Total billed amount."
  },
  {
    request_name: "",
    endpoint: "",
    parameter: "currency",
    type: "String",
    required: "Yes",
    description: "Currency, 3-digit international currency codes."
  },
  {
    request_name: "",
    endpoint: "",
    parameter: "products",
    type: "Array",
    required: "No",
    description: "List of products in order."
  },
  {
    request_name: "",
    endpoint: "",
    parameter: "products.*.name",
    type: "String",
    required: "Yes",
    description: "Name of the product."
  },
  {
    request_name: "",
    endpoint: "",
    parameter: "products.*.id",
    type: "String",
    required: "Yes",
    description: "Unique identifier of the product in the client system"
  },
  {
    request_name: "",
    endpoint: "",
    parameter: "products.*.variantId",
    type: "String",
    required: "No",
    description: "Variant ID of product in the client system."
  },
  {
    request_name: "",
    endpoint: "",
    parameter: "products.*.price",
    type: "Integer",
    required: "Yes",
    description: "Price of the product"
  },
  {
    request_name: "",
    endpoint: "",
    parameter: "products.*.quantity",
    type: "Integer",
    required: "Yes",
    description: "Quantity of this product in order."
  },
  {
    request_name: "",
    endpoint: "",
    parameter: "products.*.description",
    type: "String",
    required: "No",
    description: "Description of this product."
  }
];

const token = `<token>`;
const reqBody = `
{
    "email" : "xyz@email.com",
    "firstName" : "xyz",
    "lastName" : "abc",
    "phone" : "888888888",
    "orderId" : "2231c932",
    "totalAmount" : "322",
    "currency": "EUR",
    "products" :[{
        "name" : "Dummy 1",
        "id" : "sdx9x",
        "variantId" :"genome22",
        "description" : "Some dummy product 3",
        "price": 22,
        "quantity" : 3
    },
    {
        "name" : "Dummy 2",
        "id" : "sdx9cx",
        "variantId" :"genome122",
        "description" : "Some dummy product 2",
        "price": 21,
        "quantity" : 1
    }]
}`;

export default function TrustSearc_API_integrationDocumentation() {
  return (
    <div className="container">
      <style jsx>{`
        .container {
          padding: 50px;
        }
        .heading {
          text-align: center;
          margin-bottom: 30px;
          font-weight: 400;
          letter-spacing: 1px;
        }
        .flexBoxContainer {
          display: flex;
          justify-content: space-between;
          margin: 10px 0 10px 0;
        }
        .bold {
          font-weight: bold;
        }
        .heading_text {
          font-size: 1.2rem;
        }
        .normal_text {
          font-size: 1rem;
        }
        .underline {
          text-decoration: underline;
        }
        .mt_20 {
          margin-top: 20px;
        }
        .mb_20 {
          margin_bottom: 20px;
        }
      `}</style>
      <h2 className="heading">
        TrustSearch Business Magento Plugin Requirements:
      </h2>
      <p>
        <span className="bold heading_text">Magento Plugin: </span>
        <span className="normal_text">
          The plugin should be able to connect to TrustSearch client API with
          authorization and pushing orders, along with handling errors.
        </span>
      </p>
      <p>
        <div className="bold heading_text underline">Test Credentials</div>
        <div className="normal_text">
          <div>
            <div className="row">
              <div className="col-md-6">
                <div className="flexBoxContainer">
                  <div>System Identifier: </div>
                  <div>
                    <b>TO BE FILLED</b>
                  </div>
                </div>
                <div className="flexBoxContainer">
                  <div>Key:</div>
                  <div>
                    <b>TO BE FILLED</b>
                  </div>
                </div>
                <div className="flexBoxContainer">
                  <div>Base URL:</div>
                  <div>
                    <b>https://api.thetrustsearch.com</b>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </p>
      <MaterialTable
        title="Endpoint List"
        columns={EndpointListTableColumns}
        data={EndpointListTableData}
      />
      <div
        style={{
          marginTop: "15px",
          color: "blue",
          fontStyle: "italic",
          fontSize: "16px"
        }}
      >
        * Requests are authorized using a short lived JWT token as received in
        response to authentication request, send it as the header
        ‘Authorization: Bearer {token} in other requests.
      </div>
      <div className="mt_20">
        <p className="heading_text">
          Plugin should have the following configurable:
        </p>
        <p className="normal_text">
          1. Authentication - System Identifier and Key along with a 'Test
          Connection' button. Messages: Connection successful, Connection
          failed, Invalid credentials.
        </p>
      </div>
      <div className="mt_20">
        <p className="heading_text">
          Plugin should be able to perform the following tasks:
        </p>
        <p className="normal_text">
          1. Authenticate (Necessary before every API call to get token)
          <br /> Endpoint: Authentication (POST) <br /> Response: token
        </p>
        <p className="normal_text">
          2. Push Order to TrustSearch after checkout process. <br /> Endpoint:
          Push Order (POST)
        </p>
      </div>
      <p className="heading_text">Sample Request:</p>
      <pre>
        <code className="normal_text">{reqBody}</code>
      </pre>
      <div className="mt_20">
        <p className="heading_text">Response:</p>
        <p className="normal_text">
          JSON with a key ‘message’ or ‘error’ depending upon the result.
          Relying on error codes is possible but not recommended.
        </p>
      </div>
    </div>
  );
}
