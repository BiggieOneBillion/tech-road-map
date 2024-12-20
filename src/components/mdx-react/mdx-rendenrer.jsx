import React from "react";
import { MDXProvider } from "@mdx-js/react";

// Custom components for MDX
const components = {
  h1: (props) => <h1 style={{ color: "blue" }} {...props} />,
  p: (props) => (
    <p style={{ fontSize: "18px", lineHeight: "1.6" }} {...props} />
  ),
  code: (props) => (
    <pre
      style={{ background: "#f4f4f4", padding: "10px", borderRadius: "5px" }}
    >
      <code {...props} />
    </pre>
  ),
};

const MdxRenderer = ({ children }) => {
  return <MDXProvider components={components}>{children}</MDXProvider>;
};

export default MdxRenderer;
