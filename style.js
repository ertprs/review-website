import css from "styled-jsx/css";
import { global } from "styled-jsx/css";
export const layoutStyles = css.global`
    :root {
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
          img {
            vertical-align: middle;
            border-style: none;
          }
          svg {
            overflow: hidden;
            vertical-align: middle;
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
          .container {
            width: 100%;
            padding-right: 15px;
            padding-left: 15px;
            margin-right: auto;
            margin-left: auto;
          }
          .dynamicImport {
            width: 100%;
            height: 80vh;
            display: flex;
            align-items: center;
            justify-content: center;
          .text-center {
            text-align: center;
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
              }
              .spinner-border-sm {
                width: 1rem;
                height: 1rem;
                border-width: 0.2em;
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
              }
            `;
