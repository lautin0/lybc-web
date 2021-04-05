import React from "react";
import clsx from "clsx";
import PropTypes from "prop-types";

const TimelineItem = ({
  invert,
  src,
  imageAlt,
  imageContent,
  header,
  subheader,
  content,
}: any) => {
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

TimelineItem.propTypes = {
  invert: PropTypes.bool,
  src: PropTypes.string,
  imageAlt: PropTypes.string,
  imageContent: PropTypes.any,
  header: PropTypes.string,
  subheader: PropTypes.string,
  content: PropTypes.string,
};

TimelineItem.defaultProps = {
  invert: false,
  src: "",
  imageAlt: "",
  imageContent: null,
  header: "",
  subheader: "",
  content: "",
};

export default TimelineItem;
