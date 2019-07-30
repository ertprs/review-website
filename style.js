import css from "styled-jsx/css";
import { global } from "styled-jsx/css";
export const layoutStyles = css.global`
    :root {
            --blue: #007bff;
            --indigo: #6610f2;
            --purple: #6f42c1;
            --pink: #e83e8c;
            --red: #dc3545;
            --orange: #fd7e14;
            --yellow: #ffc107;
            --green: #28a745;
            --teal: #20c997;
            --cyan: #17a2b8;
            --white: #fff;
            --gray: #6c757d;
            --gray-dark: #343a40;
            --primary: #007bff;
            --secondary: #6c757d;
            --success: #28a745;
            --info: #17a2b8;
            --warning: #ffc107;
            --danger: #dc3545;
            --light: #f8f9fa;
            --dark: #343a40;
            --breakpoint-xs: 0;
            --breakpoint-sm: 576px;
            --breakpoint-md: 768px;
            --breakpoint-lg: 992px;
            --breakpoint-xl: 1200px;
            --font-family-sans-serif: -apple-system, BlinkMacSystemFont, "Segoe UI",
              Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif,
              "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
            --font-family-monospace: SFMono-Regular, Menlo, Monaco, Consolas,
              "Liberation Mono", "Courier New", monospace;
          }
          *,
          ::after,
          ::before {
            box-sizing: border-box;
          }
          html {
            font-family: sans-serif;
            line-height: 1.15;
            -webkit-text-size-adjust: 100%;
            -webkit-tap-highlight-color: transparent;
          }
          article,
          aside,
          figcaption,
          figure,
          footer,
          header,
          hgroup,
          main,
          nav,
          section {
            display: block;
          }
          body {
            margin: 0;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
              "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji",
              "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
            font-size: 1rem;
            font-weight: 400;
            line-height: 1.5;
            color: #212529;
            text-align: left;
            background-color: #fff;
          }
          [tabindex="-1"]:focus {
            outline: 0 ;
          }
          hr {
            box-sizing: content-box;
            height: 0;
            overflow: visible;
          }
          h1,
          h2,
          h3,
          h4,
          h5,
          h6 {
            margin-top: 0;
            margin-bottom: 0.5rem;
          }
          p {
            margin-top: 0;
            margin-bottom: 1rem;
          }
          abbr[data-original-title],
          abbr[title] {
            text-decoration: underline;
            -webkit-text-decoration: underline dotted;
            text-decoration: underline dotted;
            cursor: help;
            border-bottom: 0;
            -webkit-text-decoration-skip-ink: none;
            text-decoration-skip-ink: none;
          }
          address {
            margin-bottom: 1rem;
            font-style: normal;
            line-height: inherit;
          }
          dl,
          ol,
          ul {
            margin-top: 0;
            margin-bottom: 1rem;
          }
          ol ol,
          ol ul,
          ul ol,
          ul ul {
            margin-bottom: 0;
          }
          dt {
            font-weight: 700;
          }
          dd {
            margin-bottom: 0.5rem;
            margin-left: 0;
          }
          blockquote {
            margin: 0 0 1rem;
          }
          b,
          strong {
            font-weight: bolder;
          }
          small {
            font-size: 80%;
          }
          sub,
          sup {
            position: relative;
            font-size: 75%;
            line-height: 0;
            vertical-align: baseline;
          }
          sub {
            bottom: -0.25em;
          }
          sup {
            top: -0.5em;
          }
          a {
            color: #007bff;
            text-decoration: none;
            background-color: transparent;
          }
          a:hover {
            color: #0056b3;
            text-decoration: underline;
          }
          a:not([href]):not([tabindex]) {
            color: inherit;
            text-decoration: none;
          }
          a:not([href]):not([tabindex]):focus,
          a:not([href]):not([tabindex]):hover {
            color: inherit;
            text-decoration: none;
          }
          a:not([href]):not([tabindex]):focus {
            outline: 0;
          }
          code,
          kbd,
          pre,
          samp {
            font-family: SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono",
              "Courier New", monospace;
            font-size: 1em;
          }
          pre {
            margin-top: 0;
            margin-bottom: 1rem;
            overflow: auto;
          }
          figure {
            margin: 0 0 1rem;
          }
          img {
            vertical-align: middle;
            border-style: none;
          }
          svg {
            overflow: hidden;
            vertical-align: middle;
          }
          table {
            border-collapse: collapse;
          }
          caption {
            padding-top: 0.75rem;
            padding-bottom: 0.75rem;
            color: #6c757d;
            text-align: left;
            caption-side: bottom;
          }
          th {
            text-align: inherit;
          }
          label {
            display: inline-block;
            margin-bottom: 0.5rem;
          }
          input[type="checkbox"],
          input[type="radio"] {
            box-sizing: border-box;
            padding: 0;
          }
          input[type="date"],
          input[type="datetime-local"],
          input[type="month"],
          input[type="time"] {
            -webkit-appearance: listbox;
          }
          textarea {
            overflow: auto;
            resize: vertical;
          }
          fieldset {
            min-width: 0;
            padding: 0;
            margin: 0;
            border: 0;
          }
          legend {
            display: block;
            width: 100%;
            max-width: 100%;
            padding: 0;
            margin-bottom: 0.5rem;
            font-size: 1.5rem;
            line-height: inherit;
            color: inherit;
            white-space: normal;
          }
          progress {
            vertical-align: baseline;
          }
          [type="number"]::-webkit-inner-spin-button,
          [type="number"]::-webkit-outer-spin-button {
            height: auto;
          }
          [type="search"] {
            outline-offset: -2px;
            -webkit-appearance: none;
          }
          [type="search"]::-webkit-search-decoration {
            -webkit-appearance: none;
          }
          ::-webkit-file-upload-button {
            font: inherit;
            -webkit-appearance: button;
          }
          output {
            display: inline-block;
          }
          summary {
            display: list-item;
            cursor: pointer;
          }
          template {
            display: none;
          }
          [hidden] {
            display: none ;
          }
          .h1,
          .h2,
          .h3,
          .h4,
          .h5,
          .h6,
          h1,
          h2,
          h3,
          h4,
          h5,
          h6 {
            margin-bottom: 0.5rem;
            font-weight: 500;
            line-height: 1.2;
          }
          .h1,
          h1 {
            font-size: 2.5rem;
          }
          .h2,
          h2 {
            font-size: 2rem;
          }
          .h3,
          h3 {
            font-size: 1.75rem;
          }
          .h4,
          h4 {
            font-size: 1.5rem;
          }
          .h5,
          h5 {
            font-size: 1.25rem;
          }
          .h6,
          h6 {
            font-size: 1rem;
          }
          .lead {
            font-size: 1.25rem;
            font-weight: 300;
          }
          .display-1 {
            font-size: 6rem;
            font-weight: 300;
            line-height: 1.2;
          }
          .display-2 {
            font-size: 5.5rem;
            font-weight: 300;
            line-height: 1.2;
          }
          .display-3 {
            font-size: 4.5rem;
            font-weight: 300;
            line-height: 1.2;
          }
          .display-4 {
            font-size: 3.5rem;
            font-weight: 300;
            line-height: 1.2;
          }
          hr {
            margin-top: 1rem;
            margin-bottom: 1rem;
            border: 0;
            border-top: 1px solid rgba(0, 0, 0, 0.1);
          }
          .small,
          small {
            font-size: 80%;
            font-weight: 400;
          }
          .mark,
          mark {
            padding: 0.2em;
            background-color: #fcf8e3;
          }
          .list-unstyled {
            padding-left: 0;
            list-style: none;
          }
          .list-inline {
            padding-left: 0;
            list-style: none;
          }
          .list-inline-item {
            display: inline-block;
          }
          .list-inline-item:not(:last-child) {
            margin-right: 0.5rem;
          }
          .initialism {
            font-size: 90%;
            text-transform: uppercase;
          }
          .blockquote {
            margin-bottom: 1rem;
            font-size: 1.25rem;
          }
          .blockquote-footer {
            display: block;
            font-size: 80%;
            color: #6c757d;
          }
          
          .img-fluid {
            max-width: 100%;
            height: auto;
          }
          .img-thumbnail {
            padding: 0.25rem;
            background-color: #fff;
            border: 1px solid #dee2e6;
            border-radius: 0.25rem;
            max-width: 100%;
            height: auto;
          }
          .figure {
            display: inline-block;
          }
          .figure-img {
            margin-bottom: 0.5rem;
            line-height: 1;
          }
          .figure-caption {
            font-size: 90%;
            color: #6c757d;
          }
          code {
            font-size: 87.5%;
            color: #e83e8c;
            word-break: break-word;
          }
          a > code {
            color: inherit;
          }
          kbd {
            padding: 0.2rem 0.4rem;
            font-size: 87.5%;
            color: #fff;
            background-color: #212529;
            border-radius: 0.2rem;
          }
          kbd kbd {
            padding: 0;
            font-size: 100%;
            font-weight: 700;
          }
          pre {
            display: block;
            font-size: 87.5%;
            color: #212529;
          }
          pre code {
            font-size: inherit;
            color: inherit;
            word-break: normal;
          }
          .pre-scrollable {
            max-height: 340px;
            overflow-y: scroll;
          }
          .container {
            width: 100%;
            padding-right: 15px;
            padding-left: 15px;
            margin-right: auto;
            margin-left: auto;
          }
          @media (min-width: 576px) {
            .container {
              max-width: 540px;
            }
          }
          @media (min-width: 768px) {
            .container {
              max-width: 720px;
            }
          }
          @media (min-width: 992px) {
            .container {
              max-width: 960px;
            }
          }
          @media (min-width: 1200px) {
            .container {
              max-width: 1140px;
            }
          }
          .container-fluid {
            width: 100%;
            padding-right: 15px;
            padding-left: 15px;
            margin-right: auto;
            margin-left: auto;
          }
          .row {
            display: -ms-flexbox;
            display: flex;
            -ms-flex-wrap: wrap;
            flex-wrap: wrap;
            margin-right: -15px;
            margin-left: -15px;
          }
          .no-gutters {
            margin-right: 0;
            margin-left: 0;
          }
          .no-gutters > .col,
          .no-gutters > [class*="col-"] {
            padding-right: 0;
            padding-left: 0;
          }
          .col,
          .col-1,
          .col-10,
          .col-11,
          .col-12,
          .col-2,
          .col-3,
          .col-4,
          .col-5,
          .col-6,
          .col-7,
          .col-8,
          .col-9,
          .col-auto,
          .col-lg,
          .col-lg-1,
          .col-lg-10,
          .col-lg-11,
          .col-lg-12,
          .col-lg-2,
          .col-lg-3,
          .col-lg-4,
          .col-lg-5,
          .col-lg-6,
          .col-lg-7,
          .col-lg-8,
          .col-lg-9,
          .col-lg-auto,
          .col-md,
          .col-md-1,
          .col-md-10,
          .col-md-11,
          .col-md-12,
          .col-md-2,
          .col-md-3,
          .col-md-4,
          .col-md-5,
          .col-md-6,
          .col-md-7,
          .col-md-8,
          .col-md-9,
          .col-md-auto,
          .col-sm,
          .col-sm-1,
          .col-sm-10,
          .col-sm-11,
          .col-sm-12,
          .col-sm-2,
          .col-sm-3,
          .col-sm-4,
          .col-sm-5,
          .col-sm-6,
          .col-sm-7,
          .col-sm-8,
          .col-sm-9,
          .col-sm-auto,
          .col-xl,
          .col-xl-1,
          .col-xl-10,
          .col-xl-11,
          .col-xl-12,
          .col-xl-2,
          .col-xl-3,
          .col-xl-4,
          .col-xl-5,
          .col-xl-6,
          .col-xl-7,
          .col-xl-8,
          .col-xl-9,
          .col-xl-auto {
            position: relative;
            width: 100%;
            padding-right: 15px;
            padding-left: 15px;
          }
          .col {
            -ms-flex-preferred-size: 0;
            flex-basis: 0;
            -ms-flex-positive: 1;
            flex-grow: 1;
            max-width: 100%;
          }
          .col-auto {
            -ms-flex: 0 0 auto;
            flex: 0 0 auto;
            width: auto;
            max-width: 100%;
          }
          .col-1 {
            -ms-flex: 0 0 8.333333%;
            flex: 0 0 8.333333%;
            max-width: 8.333333%;
          }
          .col-2 {
            -ms-flex: 0 0 16.666667%;
            flex: 0 0 16.666667%;
            max-width: 16.666667%;
          }
          .col-3 {
            -ms-flex: 0 0 25%;
            flex: 0 0 25%;
            max-width: 25%;
          }
          .col-4 {
            -ms-flex: 0 0 33.333333%;
            flex: 0 0 33.333333%;
            max-width: 33.333333%;
          }
          .col-5 {
            -ms-flex: 0 0 41.666667%;
            flex: 0 0 41.666667%;
            max-width: 41.666667%;
          }
          .col-6 {
            -ms-flex: 0 0 50%;
            flex: 0 0 50%;
            max-width: 50%;
          }
          .col-7 {
            -ms-flex: 0 0 58.333333%;
            flex: 0 0 58.333333%;
            max-width: 58.333333%;
          }
          .col-8 {
            -ms-flex: 0 0 66.666667%;
            flex: 0 0 66.666667%;
            max-width: 66.666667%;
          }
          .col-9 {
            -ms-flex: 0 0 75%;
            flex: 0 0 75%;
            max-width: 75%;
          }
          .col-10 {
            -ms-flex: 0 0 83.333333%;
            flex: 0 0 83.333333%;
            max-width: 83.333333%;
          }
          .col-11 {
            -ms-flex: 0 0 91.666667%;
            flex: 0 0 91.666667%;
            max-width: 91.666667%;
          }
          .col-12 {
            -ms-flex: 0 0 100%;
            flex: 0 0 100%;
            max-width: 100%;
          }
          .offset-1 {
            margin-left: 8.333333%;
          }
          .offset-2 {
            margin-left: 16.666667%;
          }
          .offset-3 {
            margin-left: 25%;
          }
          .offset-4 {
            margin-left: 33.333333%;
          }
          .offset-5 {
            margin-left: 41.666667%;
          }
          .offset-6 {
            margin-left: 50%;
          }
          .offset-7 {
            margin-left: 58.333333%;
          }
          .offset-8 {
            margin-left: 66.666667%;
          }
          .offset-9 {
            margin-left: 75%;
          }
          .offset-10 {
            margin-left: 83.333333%;
          }
          .offset-11 {
            margin-left: 91.666667%;
          }
          @media (min-width: 576px) {
            .col-sm {
              -ms-flex-preferred-size: 0;
              flex-basis: 0;
              -ms-flex-positive: 1;
              flex-grow: 1;
              max-width: 100%;
            }
            .col-sm-auto {
              -ms-flex: 0 0 auto;
              flex: 0 0 auto;
              width: auto;
              max-width: 100%;
            }
            .col-sm-1 {
              -ms-flex: 0 0 8.333333%;
              flex: 0 0 8.333333%;
              max-width: 8.333333%;
            }
            .col-sm-2 {
              -ms-flex: 0 0 16.666667%;
              flex: 0 0 16.666667%;
              max-width: 16.666667%;
            }
            .col-sm-3 {
              -ms-flex: 0 0 25%;
              flex: 0 0 25%;
              max-width: 25%;
            }
            .col-sm-4 {
              -ms-flex: 0 0 33.333333%;
              flex: 0 0 33.333333%;
              max-width: 33.333333%;
            }
            .col-sm-5 {
              -ms-flex: 0 0 41.666667%;
              flex: 0 0 41.666667%;
              max-width: 41.666667%;
            }
            .col-sm-6 {
              -ms-flex: 0 0 50%;
              flex: 0 0 50%;
              max-width: 50%;
            }
            .col-sm-7 {
              -ms-flex: 0 0 58.333333%;
              flex: 0 0 58.333333%;
              max-width: 58.333333%;
            }
            .col-sm-8 {
              -ms-flex: 0 0 66.666667%;
              flex: 0 0 66.666667%;
              max-width: 66.666667%;
            }
            .col-sm-9 {
              -ms-flex: 0 0 75%;
              flex: 0 0 75%;
              max-width: 75%;
            }
            .col-sm-10 {
              -ms-flex: 0 0 83.333333%;
              flex: 0 0 83.333333%;
              max-width: 83.333333%;
            }
            .col-sm-11 {
              -ms-flex: 0 0 91.666667%;
              flex: 0 0 91.666667%;
              max-width: 91.666667%;
            }
            .col-sm-12 {
              -ms-flex: 0 0 100%;
              flex: 0 0 100%;
              max-width: 100%;
            }
            .offset-sm-0 {
                margin-left: 0;
              }
              .offset-sm-1 {
                margin-left: 8.333333%;
              }
              .offset-sm-2 {
                margin-left: 16.666667%;
              }
              .offset-sm-3 {
                margin-left: 25%;
              }
              .offset-sm-4 {
                margin-left: 33.333333%;
              }
              .offset-sm-5 {
                margin-left: 41.666667%;
              }
              .offset-sm-6 {
                margin-left: 50%;
              }
              .offset-sm-7 {
                margin-left: 58.333333%;
              }
              .offset-sm-8 {
                margin-left: 66.666667%;
              }
              .offset-sm-9 {
                margin-left: 75%;
              }
              .offset-sm-10 {
                margin-left: 83.333333%;
              }
              .offset-sm-11 {
                margin-left: 91.666667%;
              }
            }
            @media (min-width: 768px) {
              .col-md {
                -ms-flex-preferred-size: 0;
                flex-basis: 0;
                -ms-flex-positive: 1;
                flex-grow: 1;
                max-width: 100%;
              }
              .col-md-auto {
                -ms-flex: 0 0 auto;
                flex: 0 0 auto;
                width: auto;
                max-width: 100%;
              }
              .col-md-1 {
                -ms-flex: 0 0 8.333333%;
                flex: 0 0 8.333333%;
                max-width: 8.333333%;
              }
              .col-md-2 {
                -ms-flex: 0 0 16.666667%;
                flex: 0 0 16.666667%;
                max-width: 16.666667%;
              }
              .col-md-3 {
                -ms-flex: 0 0 25%;
                flex: 0 0 25%;
                max-width: 25%;
              }
              .col-md-4 {
                -ms-flex: 0 0 33.333333%;
                flex: 0 0 33.333333%;
                max-width: 33.333333%;
              }
              .col-md-5 {
                -ms-flex: 0 0 41.666667%;
                flex: 0 0 41.666667%;
                max-width: 41.666667%;
              }
              .col-md-6 {
                -ms-flex: 0 0 50%;
                flex: 0 0 50%;
                max-width: 50%;
              }
              .col-md-7 {
                -ms-flex: 0 0 58.333333%;
                flex: 0 0 58.333333%;
                max-width: 58.333333%;
              }
              .col-md-8 {
                -ms-flex: 0 0 66.666667%;
                flex: 0 0 66.666667%;
                max-width: 66.666667%;
              }
              .col-md-9 {
                -ms-flex: 0 0 75%;
                flex: 0 0 75%;
                max-width: 75%;
              }
              .col-md-10 {
                -ms-flex: 0 0 83.333333%;
                flex: 0 0 83.333333%;
                max-width: 83.333333%;
              }
              .col-md-11 {
                -ms-flex: 0 0 91.666667%;
                flex: 0 0 91.666667%;
                max-width: 91.666667%;
              }
              .col-md-12 {
                -ms-flex: 0 0 100%;
                flex: 0 0 100%;
                max-width: 100%;
              }
              .order-md-first {
                -ms-flex-order: -1;
                order: -1;
              }
              .order-md-last {
                -ms-flex-order: 13;
                order: 13;
              }
              .order-md-0 {
                -ms-flex-order: 0;
                order: 0;
              }
              .order-md-1 {
                -ms-flex-order: 1;
                order: 1;
              }
              .order-md-2 {
                -ms-flex-order: 2;
                order: 2;
              }
              .order-md-3 {
                -ms-flex-order: 3;
                order: 3;
              }
              .order-md-4 {
                -ms-flex-order: 4;
                order: 4;
              }
              .order-md-5 {
                -ms-flex-order: 5;
                order: 5;
              }
              .order-md-6 {
                -ms-flex-order: 6;
                order: 6;
              }
              .order-md-7 {
                -ms-flex-order: 7;
                order: 7;
              }
              .order-md-8 {
                -ms-flex-order: 8;
                order: 8;
              }
              .order-md-9 {
                -ms-flex-order: 9;
                order: 9;
              }
              .order-md-10 {
                -ms-flex-order: 10;
                order: 10;
              }
              .order-md-11 {
                -ms-flex-order: 11;
                order: 11;
              }
              .order-md-12 {
                -ms-flex-order: 12;
                order: 12;
              }
              .offset-md-0 {
                margin-left: 0;
              }
              .offset-md-1 {
                margin-left: 8.333333%;
              }
              .offset-md-2 {
                margin-left: 16.666667%;
              }
              .offset-md-3 {
                margin-left: 25%;
              }
              .offset-md-4 {
                margin-left: 33.333333%;
              }
              .offset-md-5 {
                margin-left: 41.666667%;
              }
              .offset-md-6 {
                margin-left: 50%;
              }
              .offset-md-7 {
                margin-left: 58.333333%;
              }
              .offset-md-8 {
                margin-left: 66.666667%;
              }
              .offset-md-9 {
                margin-left: 75%;
              }
              .offset-md-10 {
                margin-left: 83.333333%;
              }
              .offset-md-11 {
                margin-left: 91.666667%;
              }
            }
            @media (min-width: 992px) {
              .col-lg {
                -ms-flex-preferred-size: 0;
                flex-basis: 0;
                -ms-flex-positive: 1;
                flex-grow: 1;
                max-width: 100%;
              }
              .col-lg-auto {
                -ms-flex: 0 0 auto;
                flex: 0 0 auto;
                width: auto;
                max-width: 100%;
              }
              .col-lg-1 {
                -ms-flex: 0 0 8.333333%;
                flex: 0 0 8.333333%;
                max-width: 8.333333%;
              }
              .col-lg-2 {
                -ms-flex: 0 0 16.666667%;
                flex: 0 0 16.666667%;
                max-width: 16.666667%;
              }
              .col-lg-3 {
                -ms-flex: 0 0 25%;
                flex: 0 0 25%;
                max-width: 25%;
              }
              .col-lg-4 {
                -ms-flex: 0 0 33.333333%;
                flex: 0 0 33.333333%;
                max-width: 33.333333%;
              }
              .col-lg-5 {
                -ms-flex: 0 0 41.666667%;
                flex: 0 0 41.666667%;
                max-width: 41.666667%;
              }
              .col-lg-6 {
                -ms-flex: 0 0 50%;
                flex: 0 0 50%;
                max-width: 50%;
              }
              .col-lg-7 {
                -ms-flex: 0 0 58.333333%;
                flex: 0 0 58.333333%;
                max-width: 58.333333%;
              }
              .col-lg-8 {
                -ms-flex: 0 0 66.666667%;
                flex: 0 0 66.666667%;
                max-width: 66.666667%;
              }
              .col-lg-9 {
                -ms-flex: 0 0 75%;
                flex: 0 0 75%;
                max-width: 75%;
              }
              .col-lg-10 {
                -ms-flex: 0 0 83.333333%;
                flex: 0 0 83.333333%;
                max-width: 83.333333%;
              }
              .col-lg-11 {
                -ms-flex: 0 0 91.666667%;
                flex: 0 0 91.666667%;
                max-width: 91.666667%;
              }
              .col-lg-12 {
                -ms-flex: 0 0 100%;
                flex: 0 0 100%;
                max-width: 100%;
              }
              .order-lg-first {
                -ms-flex-order: -1;
                order: -1;
              }
              .order-lg-last {
                -ms-flex-order: 13;
                order: 13;
              }
              .order-lg-0 {
                -ms-flex-order: 0;
                order: 0;
              }
              .order-lg-1 {
                -ms-flex-order: 1;
                order: 1;
              }
              .order-lg-2 {
                -ms-flex-order: 2;
                order: 2;
              }
              .order-lg-3 {
                -ms-flex-order: 3;
                order: 3;
              }
              .order-lg-4 {
                -ms-flex-order: 4;
                order: 4;
              }
              .order-lg-5 {
                -ms-flex-order: 5;
                order: 5;
              }
              .order-lg-6 {
                -ms-flex-order: 6;
                order: 6;
              }
              .order-lg-7 {
                -ms-flex-order: 7;
                order: 7;
              }
              .order-lg-8 {
                -ms-flex-order: 8;
                order: 8;
              }
              .order-lg-9 {
                -ms-flex-order: 9;
                order: 9;
              }
              .order-lg-10 {
                -ms-flex-order: 10;
                order: 10;
              }
              .order-lg-11 {
                -ms-flex-order: 11;
                order: 11;
              }
              .order-lg-12 {
                -ms-flex-order: 12;
                order: 12;
              }
              .offset-lg-0 {
                margin-left: 0;
              }
              .offset-lg-1 {
                margin-left: 8.333333%;
              }
              .offset-lg-2 {
                margin-left: 16.666667%;
              }
              .offset-lg-3 {
                margin-left: 25%;
              }
              .offset-lg-4 {
                margin-left: 33.333333%;
              }
              .offset-lg-5 {
                margin-left: 41.666667%;
              }
              .offset-lg-6 {
                margin-left: 50%;
              }
              .offset-lg-7 {
                margin-left: 58.333333%;
              }
              .offset-lg-8 {
                margin-left: 66.666667%;
              }
              .offset-lg-9 {
                margin-left: 75%;
              }
              .offset-lg-10 {
                margin-left: 83.333333%;
              }
              .offset-lg-11 {
                margin-left: 91.666667%;
              }
            }
            @media (min-width: 1200px) {
              .col-xl {
                -ms-flex-preferred-size: 0;
                flex-basis: 0;
                -ms-flex-positive: 1;
                flex-grow: 1;
                max-width: 100%;
              }
              .col-xl-auto {
                -ms-flex: 0 0 auto;
                flex: 0 0 auto;
                width: auto;
                max-width: 100%;
              }
              .col-xl-1 {
                -ms-flex: 0 0 8.333333%;
                flex: 0 0 8.333333%;
                max-width: 8.333333%;
              }
              .col-xl-2 {
                -ms-flex: 0 0 16.666667%;
                flex: 0 0 16.666667%;
                max-width: 16.666667%;
              }
              .col-xl-3 {
                -ms-flex: 0 0 25%;
                flex: 0 0 25%;
                max-width: 25%;
              }
              .col-xl-4 {
                -ms-flex: 0 0 33.333333%;
                flex: 0 0 33.333333%;
                max-width: 33.333333%;
              }
              .col-xl-5 {
                -ms-flex: 0 0 41.666667%;
                flex: 0 0 41.666667%;
                max-width: 41.666667%;
              }
              .col-xl-6 {
                -ms-flex: 0 0 50%;
                flex: 0 0 50%;
                max-width: 50%;
              }
              .col-xl-7 {
                -ms-flex: 0 0 58.333333%;
                flex: 0 0 58.333333%;
                max-width: 58.333333%;
              }
              .col-xl-8 {
                -ms-flex: 0 0 66.666667%;
                flex: 0 0 66.666667%;
                max-width: 66.666667%;
              }
              .col-xl-9 {
                -ms-flex: 0 0 75%;
                flex: 0 0 75%;
                max-width: 75%;
              }
              .col-xl-10 {
                -ms-flex: 0 0 83.333333%;
                flex: 0 0 83.333333%;
                max-width: 83.333333%;
              }
              .col-xl-11 {
                -ms-flex: 0 0 91.666667%;
                flex: 0 0 91.666667%;
                max-width: 91.666667%;
              }
              .col-xl-12 {
                -ms-flex: 0 0 100%;
                flex: 0 0 100%;
                max-width: 100%;
              }
              .order-xl-first {
                -ms-flex-order: -1;
                order: -1;
              }
              .order-xl-last {
                -ms-flex-order: 13;
                order: 13;
              }
              .order-xl-0 {
                -ms-flex-order: 0;
                order: 0;
              }
              .order-xl-1 {
                -ms-flex-order: 1;
                order: 1;
              }
              .order-xl-2 {
                -ms-flex-order: 2;
                order: 2;
              }
              .order-xl-3 {
                -ms-flex-order: 3;
                order: 3;
              }
              .order-xl-4 {
                -ms-flex-order: 4;
                order: 4;
              }
              .order-xl-5 {
                -ms-flex-order: 5;
                order: 5;
              }
              .order-xl-6 {
                -ms-flex-order: 6;
                order: 6;
              }
              .order-xl-7 {
                -ms-flex-order: 7;
                order: 7;
              }
              .order-xl-8 {
                -ms-flex-order: 8;
                order: 8;
              }
              .order-xl-9 {
                -ms-flex-order: 9;
                order: 9;
              }
              .order-xl-10 {
                -ms-flex-order: 10;
                order: 10;
              }
              .order-xl-11 {
                -ms-flex-order: 11;
                order: 11;
              }
              .order-xl-12 {
                -ms-flex-order: 12;
                order: 12;
              }
              .offset-xl-0 {
                margin-left: 0;
              }
              .offset-xl-1 {
                margin-left: 8.333333%;
              }
              .offset-xl-2 {
                margin-left: 16.666667%;
              }
              .offset-xl-3 {
                margin-left: 25%;
              }
              .offset-xl-4 {
                margin-left: 33.333333%;
              }
              .offset-xl-5 {
                margin-left: 41.666667%;
              }
              .offset-xl-6 {
                margin-left: 50%;
              }
              .offset-xl-7 {
                margin-left: 58.333333%;
              }
              .offset-xl-8 {
                margin-left: 66.666667%;
              }
              .offset-xl-9 {
                margin-left: 75%;
              }
              .offset-xl-10 {
                margin-left: 83.333333%;
              }
              .offset-xl-11 {
                margin-left: 91.666667%;
              }
            }
            .modal-open {
                overflow: hidden;
              }
              .modal-open .modal {
                overflow-x: hidden;
                overflow-y: auto;
              }
              .modal {
                position: fixed;
                top: 0;
                left: 0;
                z-index: 1050;
                display: none;
                width: 100%;
                height: 100%;
                overflow: hidden;
                outline: 0;
              }
              .modal-dialog {
                position: relative;
                width: auto;
                margin: 0.5rem;
                pointer-events: none;
              }
              .modal.fade .modal-dialog {
                transition: -webkit-transform 0.3s ease-out;
                transition: transform 0.3s ease-out;
                transition: transform 0.3s ease-out, -webkit-transform 0.3s ease-out;
                -webkit-transform:;
                transform: translate(0, -50px);
                -webkit-transition: -webkit-transform 0.3s ease-out;
                -moz-transition: -webkit-transform 0.3s ease-out;
                -ms-transition: -webkit-transform 0.3s ease-out;
                -o-transition: -webkit-transform 0.3s ease-out;
                -moz-transform:;
                -ms-transform:;
                -o-transform:;
              }
              @media (prefers-reduced-motion: reduce) {
                .modal.fade .modal-dialog {
                  transition: none;
                }
              }
              .modal.show .modal-dialog {
                -webkit-transform: none;
                transform: none;
              }
              .modal-dialog-scrollable {
                display: -ms-flexbox;
                display: flex;
                max-height: calc(100% - 1rem);
              }
              .modal-dialog-scrollable .modal-content {
                max-height: calc(100vh - 1rem);
                overflow: hidden;
              }
              .modal-dialog-scrollable .modal-footer,
              .modal-dialog-scrollable .modal-header {
                -ms-flex-negative: 0;
                flex-shrink: 0;
              }
              .modal-dialog-scrollable .modal-body {
                overflow-y: auto;
              }
              .modal-dialog-centered {
                display: -ms-flexbox;
                display: flex;
                -ms-flex-align: center;
                align-items: center;
                min-height: calc(100% - 1rem);
              }
              .modal-dialog-centered::before {
                display: block;
                height: calc(100vh - 1rem);
                content: "";
              }
              .modal-dialog-centered.modal-dialog-scrollable {
                -ms-flex-direction: column;
                flex-direction: column;
                -ms-flex-pack: center;
                justify-content: center;
                height: 100%;
              }
              .modal-dialog-centered.modal-dialog-scrollable .modal-content {
                max-height: none;
              }
              .modal-dialog-centered.modal-dialog-scrollable::before {
                content: none;
              }
              .modal-content {
                position: relative;
                display: -ms-flexbox;
                display: flex;
                -ms-flex-direction: column;
                flex-direction: column;
                width: 100%;
                pointer-events: auto;
                background-color: #fff;
                background-clip: padding-box;
                border: 1px solid rgba(0, 0, 0, 0.2);
                border-radius: 0.3rem;
                outline: 0;
              }
              .modal-backdrop {
                position: fixed;
                top: 0;
                left: 0;
                z-index: 1040;
                width: 100vw;
                height: 100vh;
                background-color: #000;
              }
              .modal-backdrop.fade {
                opacity: 0;
              }
              .modal-backdrop.show {
                opacity: 0.5;
              }
              .modal-header {
                display: -ms-flexbox;
                display: flex;
                -ms-flex-align: start;
                align-items: flex-start;
                -ms-flex-pack: justify;
                justify-content: space-between;
                padding: 1rem 1rem;
                border-bottom: 1px solid #dee2e6;
                border-top-left-radius: 0.3rem;
                border-top-right-radius: 0.3rem;
              }
              .modal-header .close {
                padding: 1rem 1rem;
                margin: -1rem -1rem -1rem auto;
              }
              .modal-title {
                margin-bottom: 0;
                line-height: 1.5;
              }
              .modal-body {
                position: relative;
                -ms-flex: 1 1 auto;
                flex: 1 1 auto;
                padding: 1rem;
              }
              .modal-footer {
                display: -ms-flexbox;
                display: flex;
                -ms-flex-align: center;
                align-items: center;
                -ms-flex-pack: end;
                justify-content: flex-end;
                padding: 1rem;
                border-top: 1px solid #dee2e6;
                border-bottom-right-radius: 0.3rem;
                border-bottom-left-radius: 0.3rem;
              }
              .modal-footer > :not(:first-child) {
                margin-left: 0.25rem;
              }
              .modal-footer > :not(:last-child) {
                margin-right: 0.25rem;
              }
              .modal-scrollbar-measure {
                position: absolute;
                top: -9999px;
                width: 50px;
                height: 50px;
                overflow: scroll;
              }
              @media (min-width: 576px) {
                .modal-dialog {
                  max-width: 500px;
                  margin: 1.75rem auto;
                }
                .modal-dialog-scrollable {
                  max-height: calc(100% - 3.5rem);
                }
                .modal-dialog-scrollable .modal-content {
                  max-height: calc(100vh - 3.5rem);
                }
                .modal-dialog-centered {
                  min-height: calc(100% - 3.5rem);
                }
                .modal-dialog-centered::before {
                  height: calc(100vh - 3.5rem);
                }
                .modal-sm {
                  max-width: 300px;
                }
              }
              @media (min-width: 992px) {
                .modal-lg,
                .modal-xl {
                  max-width: 800px;
                }
              }
              @media (min-width: 1200px) {
                .modal-xl {
                  max-width: 1140px;
                }
              }

              .spinner-border {
                display: inline-block;
                width: 2rem;
                height: 2rem;
                vertical-align: text-bottom;
                border: 0.25em solid currentColor;
                border-right-color: transparent;
                border-radius: 50%;
                -webkit-animation: spinner-border 0.75s linear infinite;
                animation: spinner-border 0.75s linear infinite;
                -webkit-border-radius:;
                -moz-border-radius:;
                -ms-border-radius:;
                -o-border-radius:;
              }
              .spinner-border-sm {
                width: 1rem;
                height: 1rem;
                border-width: 0.2em;
              }
              .d-block {
                display: block ;
              }
              .d-table {
                display: table ;
              }
              .d-table-row {
                display: table-row ;
              }
              .d-table-cell {
                display: table-cell ;
              }
              .d-flex {
                display: -ms-flexbox ;
                display: flex ;
              }
              .d-inline-flex {
                display: -ms-inline-flexbox ;
                display: inline-flex ;
              }
              @media (min-width: 576px) {
                .d-sm-none {
                  display: none ;
                }
                .d-sm-inline {
                  display: inline ;
                }
                .d-sm-inline-block {
                  display: inline-block ;
                }
                .d-sm-block {
                  display: block ;
                }
                .d-sm-table {
                  display: table ;
                }
                .d-sm-table-row {
                  display: table-row ;
                }
                .d-sm-table-cell {
                  display: table-cell ;
                }
                .d-sm-flex {
                  display: -ms-flexbox ;
                  display: flex ;
                }
                .d-sm-inline-flex {
                  display: -ms-inline-flexbox ;
                  display: inline-flex ;
                }
              }
              @media (min-width: 768px) {
                .d-md-none {
                  display: none ;
                }
                .d-md-inline {
                  display: inline ;
                }
                .d-md-inline-block {
                  display: inline-block ;
                }
                .d-md-block {
                  display: block ;
                }
                .d-md-table {
                  display: table ;
                }
                .d-md-table-row {
                  display: table-row ;
                }
                .d-md-table-cell {
                  display: table-cell ;
                }
                .d-md-flex {
                  display: -ms-flexbox ;
                  display: flex ;
                }
                .d-md-inline-flex {
                  display: -ms-inline-flexbox ;
                  display: inline-flex ;
                }
              }
              @media (min-width: 992px) {
                .d-lg-none {
                  display: none ;
                }
                .d-lg-inline {
                  display: inline ;
                }
                .d-lg-inline-block {
                  display: inline-block ;
                }
                .d-lg-block {
                  display: block ;
                }
                .d-lg-table {
                  display: table ;
                }
                .d-lg-table-row {
                  display: table-row ;
                }
                .d-lg-table-cell {
                  display: table-cell ;
                }
                .d-lg-flex {
                  display: -ms-flexbox ;
                  display: flex ;
                }
                .d-lg-inline-flex {
                  display: -ms-inline-flexbox ;
                  display: inline-flex ;
                }
              }
              @media (min-width: 1200px) {
                .d-xl-none {
                  display: none ;
                }
                .d-xl-inline {
                  display: inline ;
                }
                .d-xl-inline-block {
                  display: inline-block ;
                }
                .d-xl-block {
                  display: block ;
                }
                .d-xl-table {
                  display: table ;
                }
                .d-xl-table-row {
                  display: table-row ;
                }
                .d-xl-table-cell {
                  display: table-cell ;
                }
                .d-xl-flex {
                  display: -ms-flexbox ;
                  display: flex ;
                }
                .d-xl-inline-flex {
                  display: -ms-inline-flexbox ;
                  display: inline-flex ;
                }
                .card {
                  position: relative;
                  display: -ms-flexbox;
                  display: flex;
                  -ms-flex-direction: column;
                  flex-direction: column;
                  min-width: 0;
                  word-wrap: break-word;
                  background-color: #fff;
                  background-clip: border-box;
                  border: 1px solid rgba(0, 0, 0, 0.125);
                  border-radius: 0.25rem;
                }
                .card > hr {
                  margin-right: 0;
                  margin-left: 0;
                }
                .card > .list-group:first-child .list-group-item:first-child {
                  border-top-left-radius: 0.25rem;
                  border-top-right-radius: 0.25rem;
                }
                .card > .list-group:last-child .list-group-item:last-child {
                  border-bottom-right-radius: 0.25rem;
                  border-bottom-left-radius: 0.25rem;
                }
                .card-body {
                  -ms-flex: 1 1 auto;
                  flex: 1 1 auto;
                  padding: 1.25rem;
                }
                .card-title {
                  margin-bottom: 0.75rem;
                }
                .card-subtitle {
                  margin-top: -0.375rem;
                  margin-bottom: 0;
                }
                .card-text:last-child {
                  margin-bottom: 0;
                }
                .card-link:hover {
                  text-decoration: none;
                }
                .card-link + .card-link {
                  margin-left: 1.25rem;
                }
                .card-header {
                  padding: 0.75rem 1.25rem;
                  margin-bottom: 0;
                  background-color: rgba(0, 0, 0, 0.03);
                  border-bottom: 1px solid rgba(0, 0, 0, 0.125);
                }
                .card-header:first-child {
                  border-radius: calc(0.25rem - 1px) calc(0.25rem - 1px) 0 0;
                }
                .card-header + .list-group .list-group-item:first-child {
                  border-top: 0;
                }
                .card-footer {
                  padding: 0.75rem 1.25rem;
                  background-color: rgba(0, 0, 0, 0.03);
                  border-top: 1px solid rgba(0, 0, 0, 0.125);
                }
                .card-footer:last-child {
                  border-radius: 0 0 calc(0.25rem - 1px) calc(0.25rem - 1px);
                }
                .card-header-tabs {
                  margin-right: -0.625rem;
                  margin-bottom: -0.75rem;
                  margin-left: -0.625rem;
                  border-bottom: 0;
                }
                .card-header-pills {
                  margin-right: -0.625rem;
                  margin-left: -0.625rem;
                }
                .card-img-overlay {
                  position: absolute;
                  top: 0;
                  right: 0;
                  bottom: 0;
                  left: 0;
                  padding: 1.25rem;
                }
                .card-img {
                  width: 100%;
                  border-radius: calc(0.25rem - 1px);
                }
                .card-img-top {
                  width: 100%;
                  border-top-left-radius: calc(0.25rem - 1px);
                  border-top-right-radius: calc(0.25rem - 1px);
                }
                .card-img-bottom {
                  width: 100%;
                  border-bottom-right-radius: calc(0.25rem - 1px);
                  border-bottom-left-radius: calc(0.25rem - 1px);
                }
                .card-deck {
                  display: -ms-flexbox;
                  display: flex;
                  -ms-flex-direction: column;
                  flex-direction: column;
                }
                .card-deck .card {
                  margin-bottom: 15px;
                }
                @media (min-width: 576px) {
                  .card-deck {
                    -ms-flex-flow: row wrap;
                    flex-flow: row wrap;
                    margin-right: -15px;
                    margin-left: -15px;
                  }
                  .card-deck .card {
                    display: -ms-flexbox;
                    display: flex;
                    -ms-flex: 1 0 0%;
                    flex: 1 0 0%;
                    -ms-flex-direction: column;
                    flex-direction: column;
                    margin-right: 15px;
                    margin-bottom: 0;
                    margin-left: 15px;
                  }
                }
                .card-group {
                  display: -ms-flexbox;
                  display: flex;
                  -ms-flex-direction: column;
                  flex-direction: column;
                }
                .card-group > .card {
                  margin-bottom: 15px;
                }
                @media (min-width: 576px) {
                  .card-group {
                    -ms-flex-flow: row wrap;
                    flex-flow: row wrap;
                  }
                  .card-group > .card {
                    -ms-flex: 1 0 0%;
                    flex: 1 0 0%;
                    margin-bottom: 0;
                  }
                  .card-group > .card + .card {
                    margin-left: 0;
                    border-left: 0;
                  }
                  .card-group > .card:not(:last-child) {
                    border-top-right-radius: 0;
                    border-bottom-right-radius: 0;
                  }
                  .card-group > .card:not(:last-child) .card-header,
                  .card-group > .card:not(:last-child) .card-img-top {
                    border-top-right-radius: 0;
                  }
                  .card-group > .card:not(:last-child) .card-footer,
                  .card-group > .card:not(:last-child) .card-img-bottom {
                    border-bottom-right-radius: 0;
                  }
                  .card-group > .card:not(:first-child) {
                    border-top-left-radius: 0;
                    border-bottom-left-radius: 0;
                  }
                  .card-group > .card:not(:first-child) .card-header,
                  .card-group > .card:not(:first-child) .card-img-top {
                    border-top-left-radius: 0;
                  }
                  .card-group > .card:not(:first-child) .card-footer,
                  .card-group > .card:not(:first-child) .card-img-bottom {
                    border-bottom-left-radius: 0;
                  }
                }
                .card-columns .card {
                  margin-bottom: 0.75rem;
                }
                @media (min-width: 576px) {
                  .card-columns {
                    -webkit-column-count: 3;
                    -moz-column-count: 3;
                    column-count: 3;
                    -webkit-column-gap: 1.25rem;
                    -moz-column-gap: 1.25rem;
                    column-gap: 1.25rem;
                    orphans: 1;
                    widows: 1;
                  }
                  .card-columns .card {
                    display: inline-block;
                    width: 100%;
                  }F
                  }
            `;
