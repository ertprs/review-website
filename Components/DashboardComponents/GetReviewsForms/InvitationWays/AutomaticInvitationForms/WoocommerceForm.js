import React, { Component } from "react";
import FormField from "../../../../Widgets/FormField/FormField";
import Button from "@material-ui/core/Button/Button";
import ArrowRight from "@material-ui/icons/ArrowRight";

class WoocommerceForm extends Component {
 
  renderFormFields = () => {
    let output = [];
    const { formData } = this.props;
    for (let item in formData) {
      output = [
        ...output,
        <div>
          <style jsx>
            {`
              .label {
                font-weight: bold;
                margin-bottom: 5px;
                font-size: 15px;
              }
            `}
          </style>
          <div className="form-group">
            <div className="label">
              <label>{formData[item].labelText}</label>
            </div>
            <FormField
              {...formData[item]}
              handleChange={(e,id)=>{
                this.props.handleFormDataChange(e, id, "woocommerceFormData")
              }}
            />
          </div>
        </div>
      ];
    }
    return output;
  };

  render() {
    return (
      <div>
        <div style={{marginBottom:"25px"}}><h4>Integrate Woocommerce plugin form :</h4></div>
        {this.renderFormFields()}
        <div className="form-group" style={{ textAlign: "right" }}>
          <Button variant="contained" color="primary" endIcon={<ArrowRight />}>
            Continue
          </Button>
        </div>
      </div>
    );
  }
}

export default WoocommerceForm;
