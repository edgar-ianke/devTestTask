/* eslint-disable react/prop-types */
import { useState } from "react";
import { Input } from "antd";
import * as styles from "../styles.css";
import cn from "classnames";

const { TextArea } = Input;

export default function InputMultiline({
  className,
  style,
  value,
  theme,
  minRows = 1,
  maxRows = 20,
  allowTabs,
  onChange,
  inputRef,
  readOnly,
  ...props
}) {
  const [state, setState] = useState(value ?? '');

   const handleChange = (e) => {
    const value = e.target.value;
    setState(value);
    onChange?.(value)
  };


  const onKeyDown = (e) => {
    props.onKeyDown && props.onKeyDown(e);

    if (!allowTabs) {
      return;
    }

    if (e.key === "Tab" && !e.shiftKey) {
      e.preventDefault();
      document.execCommand("insertText", false, "\t");
      return;
    }
  };

  const inputCN = cn(
    className,
    {
      [styles.inputReadOnly]: readOnly,
      [styles[theme]]: !!theme,
      [styles.readOnly]: readOnly,
    },
    styles.textArea
  );
  return (
    <TextArea
      ref={inputRef}
      value={value ?? state}
      spellCheck="false"
      rows={4}
      autoSize={{
        minRows: props.readOnly ? 1 : minRows,
        maxRows: maxRows,
      }}
      className={inputCN}
      style={style}
      onChange={handleChange}
      onKeyDown={onKeyDown}
      {...props}
    />
  );
}
