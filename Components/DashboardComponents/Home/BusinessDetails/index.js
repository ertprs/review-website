import React from "react";
import { connect } from "react-redux";
import Link from "next/link";
import Grid from "@material-ui/core/Grid";
import SimpleCard from "../../../MaterialComponents/Card";
import _get from "lodash/get";
import {
  utcToTimezone,
  getSubscriptionPlan
} from "../../../../utility/commonFunctions";

const BusinessDetails = props => {
  const {
    domain,
    companyName,
    subscriptionPlan,
    expiresAt,
    timezone,
    screenshot
  } = props;
  return (
    <>
      <style jsx>{`
        .businessDetailsContainer {
          display: flex;
        }
        .businessDetailsImgContainer {
          flex-basis: 20%;
          display: flex;
          align-items: center;
        }
        .businessDetailsTextContainer {
          align-self: center;
          flex-basis: 80%;
        }
        .businessDetailsImgContainer img {
          max-width: 100%;
          height: auto;
        }

        @media screen and (max-width: 720px) {
          .businessDetailsImgContainer {
            display: none;
          }
        }
        .bold {
          font-weight: bold;
        }
        .editBtnContainer {
          text-align: right;
        }
        .businessDetailsRightContainer {
          margin-left: 25px;
        }
        .businessDetailsFlexItem {
          display: flex;
          margin-bottom: 10px;
        }
        .businessDetailsFlexItem div {
          flex: 1;
          font-size: 16px;
        }
        @media screen and (max-width: 720px) {
          .businessDetailsFlexItem {
            flex-direction: column;
            flex-basis: 100%;
          }
        }
      `}</style>
      <Grid item xs={12} md={12} lg={12}>
        <SimpleCard>
          <div className="businessDetailsContainer">
            <div className="businessDetailsImgContainer">
              <img src={screenshot} />
            </div>
            <div className="businessDetailsTextContainer">
              <div className="businessDetailsRightContainer">
                <div className="businessDetailsFlexItem">
                  <div className="bold">Domain :</div>
                  <div>
                    <Link href={`https://www.${domain}`}>
                      <a target="_blank">{domain}</a>
                    </Link>
                  </div>
                </div>
                <div className="businessDetailsFlexItem">
                  <div className="bold">Company Name :</div>
                  <div>{companyName}</div>
                </div>
                <div className="businessDetailsFlexItem">
                  <div className="bold">Subscription Plan :</div>
                  <div>{getSubscriptionPlan(subscriptionPlan)}</div>
                </div>
                <div className="businessDetailsFlexItem">
                  <div className="bold">Subscription Expiry Date :</div>
                  <div>{utcToTimezone(expiresAt, timezone)}</div>
                </div>
              </div>
            </div>
          </div>
        </SimpleCard>
      </Grid>
    </>
  );
};

const mapStateToProps = state => {
  const { auth } = state;
  const userProfile = _get(auth, "logIn.userProfile", {});
  const domain = _get(userProfile, "business_profile.domain", "");
  const companyName = _get(userProfile, "company.name", "");
  const subscriptionPlan = _get(userProfile, "subscription.plan_type_id", "");
  const expiresAt = _get(userProfile, "subscription.expires_at", "");
  const timezone = _get(userProfile, "timezone", "");
  let screenshot = _get(userProfile, "business_profile.screenshot", "");
  screenshot = screenshot ? screenshot : "/static/images/noimageavailable.png";
  return {
    domain,
    companyName,
    subscriptionPlan,
    expiresAt,
    timezone,
    screenshot
  };
};

export default connect(mapStateToProps)(BusinessDetails);
