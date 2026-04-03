import type React from "react";
import type { PropsWithChildren } from "react";

type CardFooterProps = PropsWithChildren<{}>;

export const CardFooter: React.FC<CardFooterProps> = ({ children }) => {
  return <div className="card__footer">{children}</div>;
};
