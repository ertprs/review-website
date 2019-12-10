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
        TrustSearch Business API
      </h2>
      <p>
        <span className="normal_text">
         If you are a business customer looking to integrate your e-commerce systems with TrustSearch, this API enables you to streamline your reputation building process. Continue reading to get started.
        </span>
        <span className="normal_text">
          TrustSearch API follows the REST design. This document will be continually updated to reflect the latest changes in the API. If you encounter any problem during set up or need developer support, feel free to get in touch.
        </span>
      </p>
      <p>
        <div className="bold heading_text underline">Setup</div>
        <div className="normal_text">
          <div className="normal_text">
            You will get a pair of system identifier and key when you set up your automatic invite to use TrustSearch API. (Head to Get Invites -> Select Automatic Invitations -> Click next and set up TrustSearch API)
          </div>
          <div>
            <div className="row">
              <div className="col-md-6">
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
          Steps:
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
          Relying on error codes is possible but not recommended. In case of success, email will be sent out to the customer adhering to the latest invite configuration present in TrustSearch for your e-commerce system.
        </p>
      </div>
    </div>
  );
}
