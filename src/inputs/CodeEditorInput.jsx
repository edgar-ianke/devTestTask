/* eslint-disable react/prop-types */
import { useState } from "react";
import { Input } from "antd";
const { TextArea } = Input;
import * as styles from "../styles.css";
import cn from "classnames";

export default function InputCodeEditor({
  className,
  style,
  value,
  theme,
  config,
  subType,
  readOnly,
  inputRef,
  onChange,
  ...props
}) {
  const [state, setState] = useState(value ?? '');
  const handleChange = (e) => {
    const value = e.target.value;
    setState(value);
    onChange?.(value)
  };

  const inputCN = cn(className, {
    [styles.inputReadOnly]: readOnly,
    [styles[theme]]: !!theme,
    [styles.readOnly]: readOnly,
  });

  return (
    <TextArea
      ref={inputRef}
      rows={config.get("rows")}
      value={value ?? state}
      onChange={handleChange}
      className={inputCN}
      style={style}
      subType={subType}
      {...props}
    />
  );
}
