/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { Input } from "antd";
import * as styles from "../styles.css";
import cn from "classnames";
import useDebounce from "../utils/useDebounce";

export default function InputDefault({ className, style, value, theme, config, onChange, readOnly, inputRef, ...props }) {
  const [state, setState] = useState(value ?? '');
  const debouncedValue = useDebounce(state, 2000);
  const handleChange = (e) => {
    const value = e.target.value;
    setState(value);
    onChange?.(value);
  };
  const inputCN = cn(className, {
    [styles.inputReadOnly]: readOnly,
    [styles[theme]]: !!theme,
    [styles.readOnly]: readOnly,
  });

  useEffect(() => {
    debouncedValue && console.log("можем выполнить запрос к бэку с value = ", debouncedValue);
  }, [debouncedValue]);

  return (
    <Input
      ref={inputRef}
      config={config}
      value={value ?? state}
      style={style}
      className={inputCN}
      onChange={handleChange}
      {...props}
    />
  );
}
