import type React from "react";
import "./card.css";

type CardHeaderProps = {
  title: string;
  subTitle?: string;
};

export const CardHeader: React.FC<CardHeaderProps> = ({ title, subTitle }) => {
  return (
    <div className="card__header">
      <div className="card__header-text">
        <h3 className="card__title">{title}</h3>
        {subTitle && <p className="card__subtitle">{subTitle}</p>}
      </div>
    </div>
  );
};
