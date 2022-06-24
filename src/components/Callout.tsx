import * as React from "react";

// hsla(0, 0%, 0%, .04)

export const Callout = (props: {children: React.ReactNode}) => (
  <div className="callout">
    {props.children}
  </div>
)
