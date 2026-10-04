import { type PropsWithChildren } from "react";
import type React from "react";

type CardProps = PropsWithChildren<{
  elevated?: boolean;
}>;

export const Card: React.FC<CardProps> = ({ elevated = true, children }) => {
  return (
    <article className={`card ${elevated ? "card--elevated" : ""}`}>
      <div className="card__body">{children}</div>
    </article>
  );
};
