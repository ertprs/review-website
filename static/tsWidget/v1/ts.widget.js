(function(thetrustSearchWidgets, undefined) {
  // public method
  thetrustSearchWidgets.init = function() {
    var container = getDOMNode();
    var widgetProps = getWidgetDataFromDOM(container);
    // addCSSLoader(container, widgetProps);
    var trustFrame = createTrustFrame(widgetProps, removeCSSLoader, container);
    addTrustToPage(container, trustFrame);
  };

  thetrustSearchWidgets.interval = 0;

  //private methods
  function getDOMNode() {
    return document.querySelector(".trustsearch-widget");
  }

  function addCSSLoader(container, widgetProps) {
    if (widgetProps.dataTemplateId !== "TextReviewsWithScores") {
      container.style.cssText =
        "background:url('https://thetrustsearch.com/static/images/preloader.gif'); background-repeat:no-repeat; background-position:center";
    }
  }

  //remove css loader
  function removeCSSLoader(container) {
    container.style.cssText = "background:transparent";
  }

  function getWidgetDataFromDOM(container) {
    return (widgetProps = {
      dataLocale: container.getAttribute("data-locale") || "en-us",
      dataTemplateId:
        container.getAttribute("data-template-id") || "TextReviews",
      dataBusinessUnitId: container.getAttribute("data-businessunit-id"),
      dataStyleHeight: container.getAttribute("data-style-height") || "200px",
      dataStyleWidth: container.getAttribute("data-style-width") || "500px",
      dataTheme: container.getAttribute("data-theme") || "default",
      platformId: container.getAttribute("data-platform-id") || "0",
      maxReviews: container.getAttribute("data-max-reviews") || "",
      newerThanMonths: container.getAttribute("data-newer-than-months") || "",
      rating: container.getAttribute("data-rating") || ""
    });
  }

  function createTrustFrame(widgetProps, removeCSSLoader, container) {
    var trustFrame = document.createElement("iframe");
    trustFrame.frameBorder = "0";
    trustFrame.scrolling = "no";
    trustFrame.title = "Cutomer reviews powered by The Trustsearch";
    trustFrame.src = `https://thetrustsearch.com/widgetsBox/${
      widgetProps.dataTemplateId
    }?businessunitId=${widgetProps.dataBusinessUnitId}&locale=${
      widgetProps.dataLocale
    }&styleHeight=${widgetProps.dataStyleHeight}&styleWidth=${
      widgetProps.dataStyleWidth
    }&stars=${1}&platformId=${widgetProps.platformId}&maxReviews=${
      widgetProps.maxReviews
    }&newerThanMonths=${widgetProps.newerThanMonths}&rating=${
      widgetProps.rating
    }`;

    trustFrame.style.cssText = `position:relative;height:${widgetProps.dataStyleHeight}; width:${widgetProps.dataStyleWidth};borderStyle:none;display:block;overflow:hidden`;
    // trustFrame.onload = function() {
    //   removeCSSLoader(container);
    // };
    return trustFrame;
  }

  function addTrustToPage(container, trustFrame) {
    container.appendChild(trustFrame);
  }
})((window.thetrustSearchWidgets = window.thetrustSearchWidgets || {}));

thetrustSearchWidgets.interval = setInterval(function() {
  if (document.querySelector(".trustsearch-widget") !== null) {
    clearInterval(thetrustSearchWidgets.interval);
    thetrustSearchWidgets.init();
  }
}, 100);
