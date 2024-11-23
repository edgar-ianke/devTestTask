/* eslint-disable react/prop-types */
import { useState } from "react";
import * as styles from "../styles.css";
import cn from "classnames";
import { InputNumber } from "antd";

export default function InputNumbered({
  className,
  style,
  value,
  theme,
  onChange,
  readOnly,
  formatter,
  prepareNumber,
  inputRef,
  ...props
}) {
  const [state, setState] = useState(value ?? "");

  const handleChange = (inputValue) => {
    const value = prepareNumber ? prepareNumber(inputValue) : inputValue;
    setState(value);
    onChange?.(value);
  };

  const inputCN = cn(className, {
    [styles.inputReadOnly]: readOnly,
    [styles[theme]]: !!theme,
    [styles.readOnly]: readOnly,
  });

  const control = readOnly ? (
    <span className={inputCN}>{formatter && formatter(value)}</span>
  ) : (
    <InputNumber
      ref={inputRef}
      className={inputCN}
      value={value ?? state}
      onChange={handleChange}
      style={style}
      {...props}
    />
  );
  return control;
}
