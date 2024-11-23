/* eslint-disable react/prop-types */
import * as styles from "../styles.css";
import cn from "classnames";

export default function InputWithChildren({ className, readOnly, style, theme, children }) {
  const inputCN = cn(className, {
    [styles.inputReadOnly]: readOnly,
    [styles[theme]]: !!theme,
    [styles.readOnly]: readOnly,
  });

  return (
    <div style={style} className={cn("ant-input", inputCN)}>
      {children}
    </div>
  );
}
