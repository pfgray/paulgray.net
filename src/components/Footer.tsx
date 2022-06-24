import * as React from "react";

export const Footer: React.FC<{}> = (props) => {
  return (
    <div className="footer" style={{ marginTop: "5rem" }}>
      {props.children}
    </div>
  );
};

export type SourceProps = {
  number: number;
  link: string;
};
export const Source = (props: SourceProps) => {
  return (
    <div
      className="source"
      id={"source-" + props.number}
      style={{ marginBottom: "0.5rem", wordBreak: "break-all" }}
    >
      [{props.number}] <a href={props.link}>{props.link}</a>
    </div>
  );
};

export type SourceRefProps = {
  number: number;
};
export const SourceRef = (props: SourceRefProps) => {
  return (
    <sup className="source-ref">
      [<a href={"#source-" + props.number}>{props.number}</a>]
    </sup>
  );
};
