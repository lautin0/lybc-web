import * as React from "react";
import classNames from "classnames";
import { ReactComponent as CheckCircleFilled } from "../../assets/img/checked-circle.svg";
import { ReactComponent as CloseCircleFilled } from "../../assets/img/close-circle.svg";
import { ReactComponent as ExclamationCircleFilled } from "../../assets/img/exclamation-circle.svg";
import { ReactComponent as WarningFilled } from "../../assets/img/warning.svg";

import noFound from "./noFound";
import serverError from "./serverError";
import unauthorized from "./unauthorized";

export const IconMap = {
  success: CheckCircleFilled,
  error: CloseCircleFilled,
  info: ExclamationCircleFilled,
  warning: WarningFilled,
};

export const ExceptionMap = {
  "404": noFound,
  "500": serverError,
  "403": unauthorized,
};

export type ExceptionStatusType = 403 | 404 | 500 | "403" | "404" | "500";
export type ResultStatusType = ExceptionStatusType | keyof typeof IconMap;

export interface ResultProps {
  icon?: React.ReactNode;
  status?: ResultStatusType;
  title?: React.ReactNode;
  subTitle?: React.ReactNode;
  extra?: React.ReactNode;
  prefixCls?: string;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

// ExceptionImageMap keys
const ExceptionStatus = Object.keys(ExceptionMap);

/**
 * Render icon if ExceptionStatus includes ,render svg image else render iconNode
 *
 * @param prefixCls
 * @param {status, icon}
 */
const renderIcon = (prefixCls: string, { status, icon }: ResultProps) => {
  const className = classNames(`${prefixCls}-icon`);

  if (ExceptionStatus.includes(`${status}`)) {
    const SVGComponent = ExceptionMap[status as ExceptionStatusType];
    return (
      <div className={`${className} ${prefixCls}-image`}>
        <SVGComponent />
      </div>
    );
  }
  const iconNode = React.createElement(
    IconMap[status as Exclude<ResultStatusType, ExceptionStatusType>]
  );

  return (
    <div className={className}>
      <span role="img" className="anticon">
        {icon || iconNode}
      </span>
    </div>
  );
};

const renderExtra = (prefixCls: string, { extra }: ResultProps) =>
  extra && <div className={`${prefixCls}-extra`}>{extra}</div>;

export interface ResultType extends React.FC<ResultProps> {
  PRESENTED_IMAGE_404: React.ReactNode;
  PRESENTED_IMAGE_403: React.ReactNode;
  PRESENTED_IMAGE_500: React.ReactNode;
}

const AntdResult: ResultType = ({
  prefixCls: customizePrefixCls,
  className: customizeClassName,
  subTitle,
  title,
  style,
  children,
  status = "info",
  icon,
  extra,
}) => {
  const prefixCls = "ant-result";
  const className = classNames(
    prefixCls,
    `${prefixCls}-${status}`,
    customizeClassName,
    {
      [`${prefixCls}-rtl`]: false,
    }
  );
  return (
    <div className={className} style={style}>
      {renderIcon(prefixCls, { status, icon })}
      <div className={`${prefixCls}-title`}>{title}</div>
      {subTitle && <div className={`${prefixCls}-subtitle`}>{subTitle}</div>}
      {renderExtra(prefixCls, { extra })}
      {children && <div className={`${prefixCls}-content`}>{children}</div>}
    </div>
  );
};

AntdResult.PRESENTED_IMAGE_403 = ExceptionMap["403"] as any;
AntdResult.PRESENTED_IMAGE_404 = ExceptionMap["404"] as any;
AntdResult.PRESENTED_IMAGE_500 = ExceptionMap["500"] as any;

export default AntdResult;
