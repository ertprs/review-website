import React, { Component } from "react";
import Layout from "../hoc/layout/layout";

export default class termsAndConditions extends Component {
  renderHeader = () => {
    return (
      <div className="header">
        <style jsx>
          {`
            .header {
              text-align: center;
              text-transform: uppercase;
              margin: 50px 0 50px 0;
            }
          `}
        </style>
        <h5>terms and conditions</h5>
        <h5>for the use of trustsearch services</h5>
      </div>
    );
  };
  render() {
    return (
      <Layout>
        <div className="container">
          <style jsx>
            {`
              ol {
                list-style-type: none;
                counter-reset: item;
                margin: 0;
                padding: 0;
              }

              ol > li {
                display: table;
                counter-increment: item;
                margin-bottom: 0.6em;
              }

              ol > li:before {
                content: counters(item, ".") ". ";
                display: table-cell;
                padding-right: 0.6em;
              }

              li ol > li {
                margin: 0;
              }

              li ol > li:before {
                content: counters(item, ".") " ";
              }
            `}
          </style>
          {this.renderHeader()}
          <p>
            These user terms and conditions (hereinafter referred to as the
            "User Terms") apply to any use of Trustsearch's services
            (hereinafter referred to as the "Services"), including - but not
            limited to - those services which are provided via
            thetrustsearch.com (hereinafter referred to as the "Website") and
            Trustsearch's Widgets (hereinafter referred to as the "Widgets").
          </p>
          <p>
            The Services are provided by SIA Trustsearch, Riga, Generala Radzina
            krastmala 21 - 34, LV-1050. In these User Terms, the words "we",
            "us" and "ours" refer to Trustsearch.
          </p>
          <p style={{ fontWeight: "bold" }}>
            The Subject of the Services is providing an opportunity to create
            and to leave rating or review on the Website or the third party
            websites, including - but not limited to - Google My Business
            webpage (hereinafter referred to as the "Websites").
          </p>
          <p>
            By using the Services, you accept to be subject to the User Terms.
            If you do not accept these User Terms, you are kindly requested not
            to use the Services any further.{" "}
          </p>
          <p>The using of the Services</p>
          <div>1 User</div>
          <p>
            1.1 You must be 18 years of age or older in order to use the
            Services.
          </p>
          <p>
            1.2 We reserve the right, at any time and without notice or
            explanation, to delete your user-generated content. In this case,
            our disclaimer applies without limitations.
          </p>
          <div>2 User-Generated Content</div>
          <p>
            2.1 To the fullest extent permitted by law, the rights (including
            all intellectual property rights) in any material, information,
            notifications, reviews, articles or other types of communication
            (hereinafter referred to as the "User-Generated Content" or "UGC")
            created by using the Services by Users are licensed to Trustsearch
            for its non-exclusive use. The User is not entitled to royalty
            payments or any other compensation or fee related to such UGC. We
            may freely use and transfer the UGC. Our non-exclusive access to
            freely use the UGC applies irrevocably without any time limitation
            and without territorial limitations.
          </p>
          <p>2.2 Users are liable for the UGC they publish on the Websites.</p>
          <p>
            2.3 Users warrant that all UGC posted on the Websites is correct and
            true (where they state facts) or genuinely held (where they state
            opinions).
          </p>
          <p>2.4 Users must not publish UGC on the Websites which</p>
          <p>
            <ul>
              <li>is of a marketing nature or marketing purposes,</li>
              <li>
                is unlawful, deceptive, misleading, fraudulent, threatening,
                abusive, harassing, libelous, defamatory, tortious, obscene,
                pornographic or profane,
              </li>
              <li>has sexist, political or racial character,</li>
              <li>
                violates other people's rights, including any intellectual
                property rights,
              </li>
              <li>
                is offensive or in any way breaches any applicable local,
                national or international law or regulation,
              </li>
              <li>violates these User Terms</li>
              <li>
                has a disloyal or unlawful purpose and/or content (or promotes
                unlawful purposes),
              </li>
              <li>
                is technically harmful (including without limitation computer
                viruses, logic bombs, Trojan horses, worms, harmful components,
                corrupted data or other malicious software, harmful data or
                conduct).
              </li>
            </ul>
            <p>
              2.5 Contributors of UGC warrant in every context that the UGC is
              lawful and in compliance with the User Terms. If we receive notice
              or otherwise become aware that UGC violates current legislation
              and/or the User Terms, we may delete the UGC without any notice,
              and we - dependent on the character of the violation - may inform
              the violated party and/or the authorities of the violation. Our
              right to delete will not be conditioned on an explanation,
              although we will strive to inform the User about the deletion and
              the reason hereof.
            </p>
            <p>
              2.6 The User hereby grants us the right to initiate and take any
              legal actions which we deem necessary in case of infringement of
              the User's UGC.
            </p>
            <p>
              2.7 The User must indemnify us for any claims which may be made
              against us as a consequence of the User's violation of the User
              Terms or current legislation. The User must indemnify and hold us
              harmless from and against any claim or loss due to third party
              claims against us resulting from the UGC of the User.
            </p>
            <p>
              2.8 We may at any time request information about the UGC from the
              User, including documentation supporting the information included
              in the UGC. The User must e.g. document that the UGC is based on
              an actual buying or service experience in an actual customer
              relation to the company to which the UGC relates.
            </p>
          </p>
          <div style={{ margin: "35px 0 35px 0" }}>General terms</div>
          <div>3 Rights</div>
          <p>
            3.1 The content on the Websites, including but not limited to the
            intellectual property rights, text, characteristics, graphics,
            icons, photos, calculations, references and software, which are
            created by using the Services is the property of Trustsearch (other
            than the User) and is protected by Latvian or international
            legislation.
          </p>
          <p>
            3.2 Unauthorised copying, distribution, presentation or other use of
            the Services or part hereof is a violation of the Latvian and/or
            other legislations and may thus result in civil and criminal
            penalties.
          </p>
          <p>
            3.3 To the fullest extent permitted by law, the rights to free use
            of the UGC are transferred to us irrevocably, without any time
            limitation and without territorial limitations, by submitting the
            UGC to us.
          </p>
          <p>
            3.4 Downloading and other digital copying of the content on the
            Websites or parts hereof are only permitted for personal
            non-commercial use unless otherwise agreed with us in writing or
            allowed under applicable mandatory law.
          </p>
          <p>
            3.5 All company names, trademarks and other business characteristics
            on the Websites are or will be the property of Trustsearch and must
            only be used for business purposes upon prior approval from us or
            the third party owner, respectively.
          </p>
          <div style={{ marginTop: "35px" }}>
            4 Disclaimer and indemnification
          </div>
          <p>
            4.1 The Website, content and Services are provided 'as is', and we
            make no warranties with respect to the content or accuracy of the
            UGC or the Website and shall not be held liable for our own or
            others' deletion or blockage of the UGC. We may, at any time at our
            own discretion and without any liability, delete any content on the
            Website. We expressly exclude all conditions, warranties and other
            terms which might otherwise be implied by statute, common law or the
            law of equity.
          </p>
          <p>
            4.2 We shall not examine or monitor UGC which is published on the
            Websites. Notwithstanding the foregoing, we may at all times
            investigate and edit (including anonymising) UGC, e.g. if such
            actions are (i) prompted by third party requests, (ii) required
            under applicable law or (iii) necessary for the UGC's compliance.
          </p>
          <p>
            4.3 We are not liable for the content of UGC. Our non-liability
            applies to any UGC, including UGC which has been edited by us (see
            4.2). We are not liable for any links to third party websites in the
            UGC, including the content of the page to which the UGC links.
          </p>
          <p>
            4.4 Recommendations, reviews, comments, etc. of specific companies,
            services, e-businesses, etc. on the Website are only guidelines. We
            are in no case liable for the content of the Website. The use of
            Trustsearch is in any respect the sole responsibility of the Users.
            We are not liable for the availability of the Website.
          </p>
          <p>
            4.4 Recommendations, reviews, comments, etc. of specific companies,
            services, e-businesses, etc. on the Website are only guidelines. We
            are in no case liable for the content of the Website. The use of
            Trustsearch is in any respect the sole responsibility of the Users.
            We are not liable for the availability of the Website.
          </p>
          <p>
            4.5 We are in no case liable for damages for the use of the Website,
            including (i) loss of profits, contracts, turnover, business,
            business opportunity, loss or corruption of data or recovery of
            data, goodwill, security breach resulting from a failure of third
            party telecommunications and/or the internet, anticipated savings or
            revenue (regardless of whether any of these are direct, indirect or
            consequential) (ii) any loss or damage arising in connection with
            liabilities to third parties (whether direct, indirect or
            consequential) or (iii) any indirect or consequential loss or damage
            whatsoever.
          </p>
          <p>
            4.6 Nothing in the User Terms excludes or limits our liability for
            death or personal injury arising from negligence, nor liability for
            fraudulent misrepresentation or misrepresentation as to a
            fundamental matter, nor any other liability which cannot be excluded
            or limited under applicable law.
          </p>
          <div style={{ marginTop: "35px" }}>5 Other User Terms</div>
          <p>
            5.1 We may at any time and without notice revise or change these
            User Terms or, in our own discretion and without notice, close,
            change or reorganise the Website. As a User you accept to be covered
            by the at all times current User Terms. Any revision or change of
            the User Terms will be stated on the Website. The Users agree that
            the continued use of the Website after any posted modified version
            of the User Terms is an acceptance of the modified User Terms.
          </p>
          <p>
            5.2 Should any of these User Terms be regarded as unlawful or
            without effect and therefore not to be enforced, this will not have
            any effect on the applicability and enforcement of the remaining
            part of the User Terms.
          </p>
          <div style={{ marginTop: "35px" }}>6 Term and termination</div>
          <p>
            6.1 We may terminate your right to access and use the Services at
            any time for any reason without liability. Section 2-8 will survive
            any termination of the User Terms.
          </p>
          <div>7 Applicable law and venue</div>
          <p>
            7.1 The User Terms are subject to Latvian law, and, unless otherwise
            stated, the general rules of Latvian law apply in all relations
            between us and the Users and the users of the Website. Any disputes
            must be brought before the court of Trustsearch's Latvian
            jurisdiction unless this violates the mandatory jurisdiction rules.
          </p>
        </div>
      </Layout>
    );
  }
}
