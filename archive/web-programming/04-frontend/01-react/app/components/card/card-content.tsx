import type React from "react";
import type { PropsWithChildren } from "react";

type CardContentProps = PropsWithChildren<{}>;

export const CardContent: React.FC<CardContentProps> = ({ children }) => {
  return <div className="card__content">{children}</div>;
};
