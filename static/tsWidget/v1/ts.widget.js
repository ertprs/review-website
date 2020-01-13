/*jslint browser: true*/
(function() {
  "use strict";
  try {
    (function() {
      / Cross browser compatible functions (IE8) /;
      function addEventListener(element, type, listener) {
        if (element.addEventListener) {
          element.addEventListener(type, listener);
        } else {
          element.attachEvent("on" + type, function(e) {
            e = e || window.event;
            e.preventDefault =
              e.preventDefault ||
              function() {
                e.returnValue = false;
              };
            e.stopPropagation =
              e.stopPropagation ||
              function() {
                e.cancelBubble = true;
              };
            listener.call(self, e);
          });
        }
      }
      / END - Cross browser compatible functions /;

      var widgetHtmlFile = "",
        widgetIFrameProtocol = "https:",
        widgetIFrameOrigin =
          widgetIFrameProtocol + "//widget-dev.thetrustsearch.com",
        widgetBaseUrl =
          widgetIFrameProtocol + "//widget-dev.thetrustsearch.com/widgetsBox";

      function Widget(container) {
        this.id = generateWidgetId();
        this.container = container;
        this.options = {
          frameBorder: 0,
          allowTransparency: "true",
          scrolling: "no",
          styles: {
            borderStyle: "none",
            backgroundColor: "transparent",
            display: "block",
            overflow: "hidden",
            height: 0,
            width: 0
          }
        };
        this.hasSentImpression = false;
        this.queryString = this.createQueryStringFromDataSet();
        this.iframes = {};

        this.applyWidget();
      }

      Widget.prototype = {
        applyWidget: function() {
          var self = this,
            templateId,
            businessUnitId,
            platformId,
            maxReviews,
            newerThanMonths,
            rating,
            locale;

          if (!this.container) {
            throw "Unable to locate a widget container";
          }

          this.container.style.position = "relative";

          templateId = this.container.getAttribute("data-template-id") || "";
          businessUnitId =
            this.container.getAttribute("data-businessunit-id") || "";
          locale = this.container.getAttribute("data-locale") || "";
          platformId = this.container.getAttribute("data-platform-id") || "";
          maxReviews = this.container.getAttribute("data-max-reviews") || "";
          newerThanMonths =
            this.container.getAttribute("data-newer-than-months") || "";
          rating = this.container.getAttribute("data-rating") || "";

          // if (!templateId || !businessUnitId || !locale) {
          //   throw "Missing template id, business unit id or locale";
          // }

          this.options.styles.height = this.getHeightAttribute();
          this.options.styles.width = this.getWidthAttribute();
          this.options.show = true;
          this.baseUrl = widgetBaseUrl + "/" + templateId;
          this.options.source = widgetHtmlFile;

          this.createIFrame("main", this.options);

          addEventListener(
            window,
            "message",
            function(event) {
              if (
                event.origin !== widgetIFrameOrigin ||
                typeof event.data !== "string"
              ) {
                return;
              }

              var parsedData;
              try {
                parsedData = JSON.parse(event.data);
              } catch (ex) {
                console.log("Invalid data sent on widget: " + event.data);
                return;
              }

              var e = {
                data: parsedData,
                origin: event.origin
              }; // This is to make it IE8 compatible

              if (e.data.widgetId !== self.id) {
                return;
              }

              self.widgetIframeMessageHandler(e);
            },
            false
          );
        },

        getWidthAttribute: function() {
          var attribute = this.container
            .getAttribute("data-style-width")
            .toLowerCase();
          return getAttributeValue(attribute);
        },

        getHeightAttribute: function() {
          var attribute = this.container
            .getAttribute("data-style-height")
            .toLowerCase();
          return getAttributeValue(attribute);
        },

        widgetIframeMessageHandler: function(event) {
          switch (event.data.command) {
            case "createIFrame":
              this.createIFrame(event.data.name, event.data);
              break;
            case "setStyle":
              this.setStyle(event.data.name, event.data.style);
              break;
            case "loaded":
              this.sendLoadedToMainFrame();
              break;
            case "message":
              this.sendMessage(this.iframes[event.data.name], event.data);
              break;
            case "impression":
              if (this.hasSentImpression) {
                return;
              }
              this.hasSentImpression = true;

              this.sendMessage(this.iframes.main, {
                command: "impression-received",
                url: window.document.URL,
                referrer: window.document.referrer,
                userAgent: window.navigator.userAgent,
                language:
                  window.navigator.userLanguage || window.navigator.language,
                platform: window.navigator.platform
              });
              break;
          }
        },

        getElementDataSet: function() {
          var i = 0,
            dataSet = {},
            rawAttribute,
            nameMatch,
            trimmedAttribute;

          // IE polyfill
          if (typeof this.container.dataset === "undefined") {
            if (!this.container.attributes) {
              return undefined;
            }

            for (i; i < this.container.attributes.length; i++) {
              rawAttribute = this.container.attributes[i];
              nameMatch = rawAttribute.name.match(/^data-(.+)$/i);

              if (nameMatch) {
                trimmedAttribute = this.toCamelCase(nameMatch[1]);
                dataSet[trimmedAttribute] = rawAttribute.value;
              }
            }

            return dataSet;
          } else {
            return this.container.dataset;
          }
        },

        createQueryStringFromDataSet: function() {
          var dataSet = this.getElementDataSet();
          var queryString = "?";
          var attribute;

          for (attribute in dataSet) {
            queryString +=
              attribute + "=" + encodeURIComponent(dataSet[attribute]) + "&";
          }

          return queryString.replace(/(\&|\?)+$/, "");
        },

        createIFrame: function(name, data) {
          var iframe = makeIframeElement(
              getIframeOptionsFromData(
                data,
                this.options,
                this.baseUrl,
                this.queryString
              )
            ),
            self = this;

          this.iframes[name] = iframe;
          this.container.appendChild(iframe);
          addEventListener(iframe, "load", function() {
            self.setWidgetId(iframe);
            self.sendClientData(iframe);
            self.sendLoadedToMainFrame();
          });
        },

        setStyle: function(iframeName, styles) {
          var iframe = this.iframes[iframeName];

          if (styles.display !== undefined) {
            iframe.style.display = styles.display;
          }
        },

        sendLoadedToMainFrame: function() {
          this.sendMessage(this.iframes.main, { command: "loaded" });
        },

        sendMessage: function(iframe, message) {
          message = JSON.stringify(message); // This is to make it IE8 compatible
          iframe.contentWindow.postMessage(message, widgetIFrameOrigin);
        },

        setWidgetId: function(iframe) {
          this.sendMessage(iframe, { command: "setId", widgetId: this.id });
        },

        sendClientData: function(iframe) {
          this.sendMessage(iframe, {
            command: "clientData",
            url: window.document.URL
          });
        },

        toCamelCase: function(str) {
          return str.replace(/(\-[a-z])/g, function($1) {
            return $1.toUpperCase().replace("-", "");
          });
        }
      };

      function getIframeOptionsFromData(
        data,
        defaultOptions,
        baseUrl,
        queryString
      ) {
        var options = defaultOptions ? defaultOptions : {};
        options.position = data.styles.position || "";
        options.zindex = data.styles.zindex || "";
        options.margin = data.styles.margin || "";
        options.top = data.styles.top || "";
        options.bottom = data.styles.bottom || "";
        options.left = data.styles.left || "";
        options.right = data.styles.right || "";
        options.height = data.styles.height || "";
        options.width = data.styles.width || defaultOptions.styles.width || "";
        options.display = data.show ? "block" : "none";
        options.src = baseUrl + data.source + queryString;
        options.borderStyle = defaultOptions.styles.borderStyle;
        options.overflow = defaultOptions.styles.overflow;
        return options;
      }

      function makeIframeElement(options) {
        var iframe = document.createElement("iframe");
        iframe.style.position = options.position;
        iframe.style.zIndex = options.zindex;
        iframe.style.margin = options.margin;
        iframe.style.top = options.top;
        iframe.style.bottom = options.bottom;
        iframe.style.left = options.left;
        iframe.style.right = options.right;
        iframe.style.height = options.height;
        iframe.style.width = options.width;
        iframe.style.borderStyle = options.borderStyle;
        iframe.style.backgroundColor = options.backgroundColor;
        iframe.style.display = options.display;
        iframe.style.overflow = options.overflow;
        iframe.frameBorder = options.frameBorder;
        iframe.scrolling = options.scrolling;
        iframe.allowTransparency = options.allowTransparency;
        iframe.src = options.src;

        return iframe;
      }

      function getAttributeValue(attribute) {
        var suffixRegEx = /(px|\%)/i;
        var value = "";

        if (attribute && attribute.length > 0) {
          if (suffixRegEx.test(attribute)) {
            value = attribute;
          } else {
            value = attribute + "px";
          }
        }

        return value;
      }

      function getWidgetElements() {
        var widgetElements,
          arrayOfElements,
          regularExpression,
          allElements,
          i,
          j;

        if (document.getElementsByClassName) {
          widgetElements = document.getElementsByClassName(
            "trustsearch-widget"
          );
        } else if (document.querySelectorAll) {
          widgetElements = document.querySelectorAll(".trustsearch-widget");
        } else {
          arrayOfElements = [];
          regularExpression = new RegExp("(^| )trustsearch-widget( |$)");
          allElements = document.body.getElementsByTagName("*");
          for (i = 0, j = allElements.length; i < j; i++) {
            if (regularExpression.test(allElements[i].className)) {
              arrayOfElements.push(allElements[i]);
            }
          }
          widgetElements = arrayOfElements;
        }

        return widgetElements;
      }

      function generateWidgetId() {
        var random = Math.random();
        if (generateWidgetId[random]) {
          return generateWidgetId();
        }
        generateWidgetId[random] = true;
        return random;
      }

      function WidgetManagement() {
        this.loading = true;
        return this;
      }

      WidgetManagement.prototype.initializeOnPageLoad = function() {
        if (this.loading) {
          var interval = 5;
          if (document.readyState !== "complete") {
            setTimeout(function() {
              window.Trustsearch.Modules.WidgetManagement.initializeOnPageLoad();
            }, interval);
          } else {
            window.Trustsearch.Modules.WidgetManagement.findAndApplyWidgets();
          }
        }
      };

      WidgetManagement.prototype.findAndApplyWidgets = function() {
        this.loading = true;

        var widgets = getWidgetElements();

        if (!widgets || widgets.length < 1) {
          this.loading = false;
          return;
        }

        var widgetCount = widgets.length;
        for (var i = 0; i < widgetCount; i++) {
          new Widget(widgets[i]);
        }

        this.loading = false;
      };

      WidgetManagement.prototype.removeWidgets = function() {
        var elements = getWidgetElements();
        for (var i = 0; i < elements.length; ++i) {
          while (elements[i].firstChild) {
            elements[i].removeChild(elements[i].firstChild);
          }
        }
      };

      window.Trustsearch = window.Trustsearch || {};
      window.Trustsearch.Modules = window.Trustsearch.Modules || {};
      window.Trustsearch.Modules.WidgetManagement =
        window.Trustsearch.Modules.WidgetManagement || new WidgetManagement();
      window.Trustsearch.Modules.WidgetManagement.loading = true;

      window.Trustsearch.Modules.WidgetManagement.initializeOnPageLoad();
    })();
  } catch (e) {
    (function() {
      // function postError(message) {
      //   console.error("Error on bootstrap:" + message);

      //   var url = "//widget.trustsearch.com/feedback/report-error";
      //   var params =
      //     "error=" +
      //     encodeURIComponent(message) +
      //     "&uri=" +
      //     encodeURIComponent(document.URL);

      //   var img = document.createElement("img");
      //   img.src = url + "?" + params;
      // }

      try {
        // if (typeof e === "object") {
        //   postError(e.message);
        // } else {
        //   postError(e);
        // }
        console.error("Error unable to load trustsearch-widget:" + e);
      } catch (e) {
        console.error("Error on error reporting method:" + e);
      }
    })();
  }
})();
