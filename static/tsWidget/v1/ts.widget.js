(function(thetrustSearchWidgets, undefined) {
  // public method
  thetrustSearchWidgets.init = function() {
    var container = getDOMNode();
    addCSSLoader(container);
    var widgetProps = getWidgetDataFromDOM(container);
    var trustFrame = createTrustFrame(widgetProps);
    addTrustToPage(container, trustFrame);
  };

  thetrustSearchWidgets.interval = 0;

  //private methods
  function getDOMNode() {
    return document.querySelector(".trustsearch-widget");
  }

  function addCSSLoader(container) {
    container.style.cssText =
      "background:url('https://thetrustsearch-dev.cryptopolice.com/static/images/preloader.gif'); background-repeat:no-repeat; background-position:center";
  }

  function getWidgetDataFromDOM(container) {
    return (widgetProps = {
      dataLocale: container.getAttribute("data-locale") || "en-us",
      dataTemplateId:
        container.getAttribute("data-template-id") || "TextReviews",
      dataBusinessUnitId: container.getAttribute("data-businessunit-id"),
      dataStyleHeight: container.getAttribute("data-style-height") || "200px",
      dataStyleWidth: container.getAttribute("data-style-width") || "500px",
      dataTheme: container.getAttribute("data-theme") || "default"
    });
  }

  function createTrustFrame(widgetProps) {
    var trustFrame = document.createElement("iframe");
    trustFrame.frameBorder = "0";
    trustFrame.scrolling = "no";
    trustFrame.title = "Cutomer reviews powered by The Trustsearch";
    trustFrame.src = `http://localhost:3000/widgetsBox/${
      widgetProps.dataTemplateId
    }?businessunitId=${widgetProps.dataBusinessUnitId}&locale=${
      widgetProps.dataLocale
    }&styleHeight=${widgetProps.dataStyleHeight}&styleWidth=${
      widgetProps.dataStyleWidth
    }&stars=${5}`;

    trustFrame.style.cssText = `position:relative;height:${widgetProps.dataStyleHeight}; width:${widgetProps.dataStyleWidth};borderStyle:none;display:block;overflow:hidden`;
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
