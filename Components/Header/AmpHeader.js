import React, {useEffect} from "react";
// import styles from './styles.css';
export const config = { amp: "true" };

//https://github.com/zeit/styled-jsx

const AmpHeader = () => {

  return (
    <>
      <h1>This is an AMP Header</h1>
    </>
  );
};

export default AmpHeader;


// Gotchas:

// We do not want to create a new Tech stack to serve Amp pages.

// The core and AMP stacks have to be in sync in terms of features.

// We solved it by doing two things: 
// 1. Writing a new server.js file and added a new node job.
// 2. Components are organised in a way, where views are not connected components.
// 3. Developed a HOC and chose the template AMP vs React in the cases when your React template contains stuff which is not supported by AMP.

// AMP pages are purely server-side rendered. So, server.js generates a new file (index.html) with the root component which we mention in the render method.

// which internally consumes necessary components, as we proceed there were issues with the amount of CSS and HTML which React components generate.

// we have taken it as an opportunity to clean up the CSS and wrote separate AMP only when needed.
