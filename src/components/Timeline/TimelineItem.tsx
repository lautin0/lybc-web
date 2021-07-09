import React from "react";
import clsx from "clsx";

type TimelineItemPropType = {
  invert: boolean,
  src: string,
  imageAlt?: string,
  imageContent: any,
  header: string,
  subheader: string,
  content: string,
};

const TimelineItem = ({
  invert = false,
  src = "",
  imageAlt = "",
  imageContent = null,
  header = "",
  subheader = "",
  content = "",
}: TimelineItemPropType) => {
  const headerPart = header ? <h4>{header}</h4> : null;
  const subheaderPart = subheader ? <h4 className="subheading">{subheader}</h4> : null;

  const liClassName = clsx("timeline-item", { "timeline-inverted": invert });

  return (
    <li className={liClassName}>
      <div className="timeline-image">
        {imageContent || (
          <img
            className="rounded-circle img-fluid"
            style={{ height: '100%' }}
            src={src}
            alt={imageAlt || header || subheader}
          />
        )}
      </div>
      <div className="timeline-panel">
        <div className="timeline-heading">
          {headerPart}
          {subheaderPart}
        </div>
        <div className="timeline-body">
          <p className="text-muted">{content}</p>
        </div>
      </div>
    </li>
  );
};

export default TimelineItem;
