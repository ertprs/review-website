import React, { Component } from "react";
import axios from "axios";
import CircularProgress from "@material-ui/core/CircularProgress";
import Grow from "@material-ui/core/Grow";
import _get from "lodash/get";
class FetchSchemaCode extends Component {
  state = {
    schemaCodeData: {
      isLoading: false,
      success: false,
      errorMsg: "",
      value: ""
    }
  };

  fetchData = async () => {
    const { schemaCodeData } = this.state;
    const { handleSchemaCodeValueChange } = this.props;
    try {
      //set loading to true
      this.setState({ schemaCodeData: { ...schemaCodeData, isLoading: true } });
      const result = await axios({
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        data,
        url
      });
      const success = _get(result, "data.success", false);
      const value = _get(result, "data.value", "");
      this.setState(
        {
          success,
          isLoading: false,
          errorMsg: "",
          value
        },
        () => {
          //execute the parent callback method
          handleSchemaCodeValueChange(value);
        }
      );
    } catch (err) {
      console.log(err);
      this.setState(
        {
          success: false,
          isLoading: false,
          errorMsg: "Some error ocurred",
          value: ""
        },
        () => {
          //execute the parent callback method
          handleSchemaCodeValueChange("");
        }
      );
    }
  };

  componentDidMount() {
    //? Uncomment the code below after the API is ready, and also make changes to the fetchData function
    //this.fetchData()

    //! Remove the code below after integrating with the API********************************
    const { handleSchemaCodeValueChange } = this.props;
    this.setState({
      schemaCodeData: { ...this.state.schemaCodeData, isLoading: true }
    });
    new Promise(resolve => {
      setTimeout(() => {
        resolve();
      }, 3000);
    }).then(() => {
      let value = `[{"@context":"http://schema.org","@type":"LocalBusiness","@id":"https://www.trustpilot.com/review/www.flipkart.com","url":"http://www.flipkart.com","image":"https://s3-eu-west-1.amazonaws.com/tpd/screenshots/4bdc080f0000640005057d24/198x149.png","name":"Flipkart","aggregateRating":{"@type":"AggregateRating","bestRating":"5","worstRating":"1","ratingValue":"1.5","reviewCount":"1162"},"address":{"@type":"PostalAddress","addressCountry":"IN"},"review":[{"@type":"Review","itemReviewed":{"@type":"Thing","name":"Flipkart"},"author":{"@type":"Person","name":"Lokesh Kumar","url":"https://www.trustpilot.com/users/5e423ee112b06c5143f0060f"},"datePublished":"2020-02-11T05:43:51Z","headline":"IMPLEMENT NEW FEATURE(IN PAY LATER SERVICE)","reviewBody":"Hey,\n \ni have an suggestion for the product payment. when we select pay later option so we have to pay on 10th day of next month. why we do more interesting this feature so what we have to do first.\nif i am purchasing some thing in January month so on that time if i want to pay some amount for this product so on that time an option raise \u0022pay partly\u0022 or \u0022pay full amount on due date\u0022 so in this feature customer has an option to pay amount in two times. this feature can create an EMI option like a credit card.\n\nThank you.","reviewRating":{"@type":"Rating","bestRating":"5","worstRating":"1","ratingValue":"3"},"publisher":{"@type":"Organization","name":"Trustpilot","sameAs":"https://www.trustpilot.com"},"inLanguage":"en"},{"@type":"Review","itemReviewed":{"@type":"Thing","name":"Flipkart"},"author":{"@type":"Person","name":"Laveena Mam","url":"https://www.trustpilot.com/users/5e3d0d6abef4a4b44b69e669"},"datePublished":"2020-02-07T07:10:48Z","headline":"Very bad experience Flipkart is fraud…","reviewBody":"Very bad experience Flipkart is fraud give fraud product ,they send wrong and faulty product to customers","reviewRating":{"@type":"Rating","bestRating":"5","worstRating":"1","ratingValue":"1"},"publisher":{"@type":"Organization","name":"Trustpilot","sameAs":"https://www.trustpilot.com"},"inLanguage":"en"},{"@type":"Review","itemReviewed":{"@type":"Thing","name":"Flipkart"},"author":{"@type":"Person","name":"Abdul Hullikeri","url":"https://www.trustpilot.com/users/5e398d9f85d02838220027a5"},"datePublished":"2020-02-04T15:28:46Z","headline":"FELT VERY GOOD TO DISCUSS MY ISSUE…","reviewBody":"FELT VERY GOOD TO DISCUSS MY ISSUE REGARDING MY ORDER THE CALL EXECUTIVE WAS VERY POLITE AND HELPFUL AND UNDERSTANDABLE KEEP IT UP FLIPKART I M HAPPY TO USE","reviewRating":{"@type":"Rating","bestRating":"5","worstRating":"1","ratingValue":"5"},"publisher":{"@type":"Organization","name":"Trustpilot","sameAs":"https://www.trustpilot.com"},"inLanguage":"en"},{"@type":"Review","itemReviewed":{"@type":"Thing","name":"Flipkart"},"author":{"@type":"Person","name":"Nazim","url":"https://www.trustpilot.com/users/5e396826fe898946b92968c7"},"datePublished":"2020-02-04T12:49:18Z","headline":"Non delivery of order","reviewBody":"Flipkart delays the delivery of orders which you made during Flipkart mega sales and pressurise customer to cancel the order. It has happened to me I have ordered Realme x phone (Order ID OD117636433204523000). It was supposed to deliver on 23-2-2020 and still not delivered.","reviewRating":{"@type":"Rating","bestRating":"5","worstRating":"1","ratingValue":"1"},"publisher":{"@type":"Organization","name":"Trustpilot","sameAs":"https://www.trustpilot.com"},"inLanguage":"en"},{"@type":"Review","itemReviewed":{"@type":"Thing","name":"Flipkart"},"author":{"@type":"Person","name":"vijay kumar","url":"https://www.trustpilot.com/users/5d7282e34adfb84ea7ac88b7","image":"https://user-images.trustpilot.com/5d7282e34adfb84ea7ac88b7/73x73.png"},"datePublished":"2020-02-04T06:28:06Z","headline":"delivery boy\u0027s behavior is very rude","reviewBody":"delivery boy\u0027s behavior is very rude. they do not come to my address. and calls to pick order in market or main roads 3 or 4 km from address given , And if we call to customer care , they only say you will get a call from us within 2 days with your solutions . what is this ? very very bad...","reviewRating":{"@type":"Rating","bestRating":"5","worstRating":"1","ratingValue":"1"},"publisher":{"@type":"Organization","name":"Trustpilot","sameAs":"https://www.trustpilot.com"},"inLanguage":"en"},{"@type":"Review","itemReviewed":{"@type":"Thing","name":"Flipkart"},"author":{"@type":"Person","name":"Vipul Kumar","url":"https://www.trustpilot.com/users/5cf16566edd84e2cd4b6aaf3","image":"https://user-images.trustpilot.com/5cf16566edd84e2cd4b6aaf3/73x73.png"},"datePublished":"2020-02-03T07:44:57Z","headline":"Overall nice experience for me buying a…","reviewBody":"Overall nice experience for me buying a TV from them","reviewRating":{"@type":"Rating","bestRating":"5","worstRating":"1","ratingValue":"3"},"publisher":{"@type":"Organization","name":"Trustpilot","sameAs":"https://www.trustpilot.com"},"inLanguage":"en"},{"@type":"Review","itemReviewed":{"@type":"Thing","name":"Flipkart"},"author":{"@type":"Person","name":"Vinay","url":"https://www.trustpilot.com/users/5e304024fe8989fb39249fca"},"datePublished":"2020-01-28T14:13:49Z","headline":"Worst service and application","reviewBody":"Worst service and application, not delivering on time.\nTaking actions very low.\nConcerns adoption very low. \nNot mature customer service.\nActions implementation no.\nRegularly same issues no corrective action.\nBetter give Cash on Delivery options.","reviewRating":{"@type":"Rating","bestRating":"5","worstRating":"1","ratingValue":"1"},"publisher":{"@type":"Organization","name":"Trustpilot","sameAs":"https://www.trustpilot.com"},"inLanguage":"en"},{"@type":"Review","itemReviewed":{"@type":"Thing","name":"Flipkart"},"author":{"@type":"Person","name":"Raj","url":"https://www.trustpilot.com/users/5e2f1e83d1e2f966fa9dfcad"},"datePublished":"2020-01-27T17:32:08Z","headline":"Very bad customer care","reviewBody":"Very bad customer care, they don\u0027t have courtsey and they behave very rude. Placed an order and it was cancelled by delivery agent without attempting to delivery. We waited in the home but received item got cancelled.\n\nThis looks like they are not having proper third party delivery agents or they are becoming untrustful.\n\nI am going to stop further orders in Flipkart","reviewRating":{"@type":"Rating","bestRating":"5","worstRating":"1","ratingValue":"1"},"publisher":{"@type":"Organization","name":"Trustpilot","sameAs":"https://www.trustpilot.com"},"inLanguage":"en"},{"@type":"Review","itemReviewed":{"@type":"Thing","name":"Flipkart"},"author":{"@type":"Person","name":"Rabiul R. Mahtab","url":"https://www.trustpilot.com/users/5e2547c5e5a4c736f883ffea","image":"https://user-images.trustpilot.com/5e2547c5e5a4c736f883ffea/73x73.png"},"datePublished":"2020-01-20T06:25:40Z","headline":"One of the cheapest company in India.","reviewBody":"One of the cheapest company I ever know, They never care of their customers. I lost my washing machine due to their own profit policy.","reviewRating":{"@type":"Rating","bestRating":"5","worstRating":"1","ratingValue":"1"},"publisher":{"@type":"Organization","name":"Trustpilot","sameAs":"https://www.trustpilot.com"},"inLanguage":"en"},{"@type":"Review","itemReviewed":{"@type":"Thing","name":"Flipkart"},"author":{"@type":"Person","name":"Naresh Yadav","url":"https://www.trustpilot.com/users/5e253c0e013d41451b259e19","image":"https://user-images.trustpilot.com/5e253c0e013d41451b259e19/73x73.png"},"datePublished":"2020-01-20T05:35:39Z","headline":"Very bad service","reviewBody":"Very bad service. My order automatically cancelled by seller. Why not come my order pls take hardly action with seller.","reviewRating":{"@type":"Rating","bestRating":"5","worstRating":"1","ratingValue":"1"},"publisher":{"@type":"Organization","name":"Trustpilot","sameAs":"https://www.trustpilot.com"},"inLanguage":"en"},{"@type":"Review","itemReviewed":{"@type":"Thing","name":"Flipkart"},"author":{"@type":"Person","name":"Victoria nimmakuri","url":"https://www.trustpilot.com/users/5e23330c616781ee0b83afc1"},"datePublished":"2020-01-18T16:33:02Z","headline":"worst experience.","reviewBody":"I got a new phone from flipkart and got a defective one. After a long process of repacement it was rejected. My new phone is not working. will never ever buy from flipkart again.","reviewRating":{"@type":"Rating","bestRating":"5","worstRating":"1","ratingValue":"1"},"publisher":{"@type":"Organization","name":"Trustpilot","sameAs":"https://www.trustpilot.com"},"inLanguage":"en"},{"@type":"Review","itemReviewed":{"@type":"Thing","name":"Flipkart"},"author":{"@type":"Person","name":"Vishal Patil","url":"https://www.trustpilot.com/users/5e230b0c4c2453ee6502dff6"},"datePublished":"2020-01-18T13:41:43Z","headline":"The order is not delivered on time and…","reviewBody":"The order is not delivered on time and the delivery person wil not answer the call and when he answers he will disconnect the call\n8071031268 this is the no. Of the delivery guy and he also dont have a proper speaking etiquettes. and when i call the customer care thyll reply by telling that the product wil be delivered by 7pm and after 7 when i called the told that they wil deliver it by next working day.\nIts just cheating and fraud.","reviewRating":{"@type":"Rating","bestRating":"5","worstRating":"1","ratingValue":"1"},"publisher":{"@type":"Organization","name":"Trustpilot","sameAs":"https://www.trustpilot.com"},"inLanguage":"en"},{"@type":"Review","itemReviewed":{"@type":"Thing","name":"Flipkart"},"author":{"@type":"Person","name":"Ekveera Wadekar","url":"https://www.trustpilot.com/users/5e22e64de5a4c757bf83311c"},"datePublished":"2020-01-18T11:06:17Z","headline":"Very bad service..","reviewBody":"Very bad service... They provide our couriers but courierboy didn\u0027t back our change and never agree they take an extra money.... And they just confuse us and thats the reasons we cant asked for change so pls humble request to all people keep change they never agree","reviewRating":{"@type":"Rating","bestRating":"5","worstRating":"1","ratingValue":"1"},"publisher":{"@type":"Organization","name":"Trustpilot","sameAs":"https://www.trustpilot.com"},"inLanguage":"en"},{"@type":"Review","itemReviewed":{"@type":"Thing","name":"Flipkart"},"author":{"@type":"Person","name":"STAR DWIRAJ","url":"https://www.trustpilot.com/users/5e1ea87fddcefaa9865786a9"},"datePublished":"2020-01-15T05:52:10Z","headline":"Very  bad.","reviewBody":"Very  bad.\n They people  show themail false information that the mobile phones will be available for thousands  . Thinking that it\u0027s true we will invest on it but no use its just stratergy  of snatching money.","reviewRating":{"@type":"Rating","bestRating":"5","worstRating":"1","ratingValue":"1"},"publisher":{"@type":"Organization","name":"Trustpilot","sameAs":"https://www.trustpilot.com"},"inLanguage":"en"},{"@type":"Review","itemReviewed":{"@type":"Thing","name":"Flipkart"},"author":{"@type":"Person","name":"Anand Maheshwari","url":"https://www.trustpilot.com/users/4f1e41ed0000640001128757","image":"https://user-images.trustpilot.com/4f1e41ed0000640001128757/73x73.png"},"datePublished":"2020-01-13T09:14:51Z","headline":"Bad delivery team! Wrost experience","reviewBody":"The delivery boy is giving lectures instead of delivering the product. The proper and complete address is given they don\u0027t try to deliver. If someone is in a meeting they think they own them. I called him back...\n\nBut instead of talking to deliver the item, he gave me lectures like a stupid.","reviewRating":{"@type":"Rating","bestRating":"5","worstRating":"1","ratingValue":"1"},"publisher":{"@type":"Organization","name":"Trustpilot","sameAs":"https://www.trustpilot.com"},"inLanguage":"en"},{"@type":"Review","itemReviewed":{"@type":"Thing","name":"Flipkart"},"author":{"@type":"Person","name":"Ashley","url":"https://www.trustpilot.com/users/5e19d10a4c24530b8ffe4972"},"datePublished":"2020-01-11T13:45:43Z","headline":"Worst experience","reviewBody":"I ordered a nike shoes Worth $50 from USA for a friend in India and the product she received is worth $5. \n\nTotally dissatisfied with the platform.","reviewRating":{"@type":"Rating","bestRating":"5","worstRating":"1","ratingValue":"1"},"publisher":{"@type":"Organization","name":"Trustpilot","sameAs":"https://www.trustpilot.com"},"inLanguage":"en"},{"@type":"Review","itemReviewed":{"@type":"Thing","name":"Flipkart"},"author":{"@type":"Person","name":"Prakash T","url":"https://www.trustpilot.com/users/5e097e176af50297932ddf21"},"datePublished":"2019-12-30T04:33:42Z","headline":"ordered 2 items","reviewBody":"ordered 2 items, received only 1 item. pathetic delivery and customer service. had raised issue which was marked as resolved without actual resolution. had to provide repeated info everytime. have been asked to raise multiple tickets. call to customer care disconnected. not solved even after 10 days.","reviewRating":{"@type":"Rating","bestRating":"5","worstRating":"1","ratingValue":"1"},"publisher":{"@type":"Organization","name":"Trustpilot","sameAs":"https://www.trustpilot.com"},"inLanguage":"en"},{"@type":"Review","itemReviewed":{"@type":"Thing","name":"Flipkart"},"author":{"@type":"Person","name":"G Rajesh","url":"https://www.trustpilot.com/users/5e087021984836134179f313"},"datePublished":"2019-12-29T09:22:40Z","headline":"Very bad","reviewBody":"Very bad delivery and pick up calling.","reviewRating":{"@type":"Rating","bestRating":"5","worstRating":"1","ratingValue":"1"},"publisher":{"@type":"Organization","name":"Trustpilot","sameAs":"https://www.trustpilot.com"},"inLanguage":"en"},{"@type":"Review","itemReviewed":{"@type":"Thing","name":"Flipkart"},"author":{"@type":"Person","name":"Ravi Kumar","url":"https://www.trustpilot.com/users/5e06edcc6af5023abf2d05a0","image":"https://user-images.trustpilot.com/5e06edcc6af5023abf2d05a0/73x73.png"},"datePublished":"2019-12-28T05:53:34Z","headline":"Poor Service or you can say the worst…","reviewBody":"Poor Service or you can say the worst service they are offering...\nI ordered one product from Flipkart and they took 10 days to deliver after 10 days they delivered a broken product.","reviewRating":{"@type":"Rating","bestRating":"5","worstRating":"1","ratingValue":"1"},"publisher":{"@type":"Organization","name":"Trustpilot","sameAs":"https://www.trustpilot.com"},"inLanguage":"en"},{"@type":"Review","itemReviewed":{"@type":"Thing","name":"Flipkart"},"author":{"@type":"Person","name":"Venkat Kishore","url":"https://www.trustpilot.com/users/5e05d059984836fffa78e255"},"datePublished":"2019-12-27T09:35:33Z","headline":"worst service of this flipfat","reviewBody":"worst service of this flipfat\n\nno need to check in this dirty flipart","reviewRating":{"@type":"Rating","bestRating":"5","worstRating":"1","ratingValue":"1"},"publisher":{"@type":"Organization","name":"Trustpilot","sameAs":"https://www.trustpilot.com"},"inLanguage":"en"}]},{"@context":"http://schema.org","@type":"Dataset","name":"Flipkart","description":"Bar chart review and ratings distribution for Flipkart","publisher":{"@type":"Organization","name":"Trustpilot","sameAs":"https://www.trustpilot.com"},"mainEntity":{"@type":"csvw:Table","csvw:tableSchema":{"csvw:columns":[{"csvw:name":"1 star","csvw:datatype":"integer","csvw:cells":[{"csvw:value":"981","csvw:notes":["84%"]}]},{"csvw:name":"2 stars","csvw:datatype":"integer","csvw:cells":[{"csvw:value":"37","csvw:notes":["3%"]}]},{"csvw:name":"3 stars","csvw:datatype":"integer","csvw:cells":[{"csvw:value":"29","csvw:notes":["2%"]}]},{"csvw:name":"4 stars","csvw:datatype":"integer","csvw:cells":[{"csvw:value":"35","csvw:notes":["3%"]}]},{"csvw:name":"5 stars","csvw:datatype":"integer","csvw:cells":[{"csvw:value":"80","csvw:notes":["7%"]}]},{"csvw:name":"Total","csvw:datatype":"integer","csvw:cells":[{"csvw:value":"1162","csvw:notes":["100%"]}]}]}}}];
`;
      this.setState(
        {
          schemaCodeData: {
            ...this.state.schemaCodeData,
            isLoading: false,
            success: true,
            value
          }
        },
        () => handleSchemaCodeValueChange(value)
      );
    });
    //! Remove till here*********************************************************************
  }

  componentWillUnmount() {
    this.setState(
      {
        schemaCodeData: {
          isLoading: false,
          success: null,
          errorMsg: "",
          value: ""
        }
      },
      () => {
        this.props.handleSchemaCodeValueChange("");
      }
    );
  }
  render() {
    const { schemaCodeData } = this.state;
    const success = _get(schemaCodeData, "success", false);
    const isLoading = _get(schemaCodeData, "isLoading", false);
    return (
      <>
        <style jsx>
          {`
            .loading,
            .success,
            .error {
              font-size: 0.9rem;
              margin-top: 15px;
              text-align: center;
            }
            .success {
              color: green;
            }
            .error {
              color: red;
            }
            .circularProgressContainer {
              display: inline-block;
              margin-left: 5px;
            }
          `}
        </style>
        {isLoading ? (
          <Grow in={true}>
            <div className="loading">
              Please wait while we fetch the schema code for you...
              <span className="circularProgressContainer">
                <CircularProgress size={25} />
              </span>
            </div>
          </Grow>
        ) : success ? (
          <Grow in={true}>
            <div className="success">
              Schema code was added successfully to the code below!
            </div>
          </Grow>
        ) : (
          <Grow in={true}>
            <div className="error">
              Some error ocurred while loading the schema code!
            </div>
          </Grow>
        )}
      </>
    );
  }
}

export default FetchSchemaCode;
