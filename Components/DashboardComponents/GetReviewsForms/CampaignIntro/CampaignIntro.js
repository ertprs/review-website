import React from "react";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Divider from "@material-ui/core/Divider";
import ArrowRight from "@material-ui/icons/ArrowRight";
import Button from "@material-ui/core/Button";
import dynamic from "next/dynamic";
const ManualCampaignIntro = dynamic(
  () => import("./ManualCampaignIntro/ManualCampaignIntro.js"),
  {
    loading: () => (
      <div
        style={{
          width: "100%",
          height: "80vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <p>Loading.....</p>
      </div>
    )
  }
);

const AutomaticCampaignIntro = dynamic(
  () => import("./AutomaticCampaignIntro/AutomaticCampaignIntro.js"),
  {
    loading: () => (
      <div
        style={{
          width: "100%",
          height: "80vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <p>Loading.....</p>
      </div>
    )
  }
);

class CampaignIntro extends React.Component {
  componentDidMount(){
    this.props.scrollToTopOfThePage();
  }
  render() {
    return (
      <Container style={{ background: "#fff" }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={12} lg={12}>
            <h2>Review Invitations</h2>
            <h6 style={{ lineHeight: "1.8rem" }}>
              if you are creating your first campaign it's worth reading the
              steps below to understand the campaign creation flow or click on
              the button below to continue directly to campaign creation:
            </h6>
            <div style={{textAlign:"right"}}>
              <Button
                color="primary"
                variant="contained"
                size="medium"
                endIcon={<ArrowRight />}
                onClick={()=>{
                  this.props.handleCampaignCreationClick()
                }}
              >
                Continue to campaign creation
              </Button>
            </div>
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={6}>
            <div style={{ marginTop: "50px" }}>
              <ManualCampaignIntro handleCampaignCreationClick={this.props.handleCampaignCreationClick}/>
            </div>
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <div style={{ marginTop: "50px" }}>
              <AutomaticCampaignIntro handleCampaignCreationClick={this.props.handleCampaignCreationClick}/>
            </div>
          </Grid>
        </Grid>
      </Container>
    );
  }
}

export default CampaignIntro;
