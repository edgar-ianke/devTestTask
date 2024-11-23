/* eslint-disable react/prop-types */
import { useState } from "react";
import { Input } from "antd";
import { formatCharsInput } from "../maskFormat";
import MaskedInput from "react-input-mask";
import cn from "classnames";
import * as styles from "../styles.css";
import _ from "lodash";

export default function InputMasked({ className, theme, style, mask, value, readOnly, onChange, inputRef, ...props }) {
  const [state, setState] = useState(value ?? '');

  const handleChange = (e) => {
    const value = e.target.value;
    setState(value);
    onChange?.(value);
  };
  const getPlaceHolderMask = (mask) => {
    const charsEditableMask = _.keys(formatCharsInput).join("");
    let placeholder = "";
    let shielding = false;

    for (let i = 0; i < mask.length; i++) {
      if (shielding) {
        shielding = false;
        placeholder += mask[i];
        continue;
      }

      if (mask[i] == "\\") {
        shielding = true;
        continue;
      }

      if (charsEditableMask.includes(mask[i])) {
        placeholder += "_";
        continue;
      }

      placeholder += mask[i];
    }

    return placeholder;
  };
  const inputCN = cn(className, {
    [styles.inputReadOnly]: readOnly,
    [styles[theme]]: !!theme,
    [styles.readOnly]: readOnly,
  });
  return (
    <MaskedInput
      formatChars={formatCharsInput}
      mask={mask}
      placeholder={getPlaceHolderMask(mask)}
      value={value ?? state}
      style={style}
      className={inputCN}
      onChange={handleChange}
      disabled={readOnly}
      {...props}
    >
      {(inputProps) => <Input {...inputProps} ref={inputRef} />}
    </MaskedInput>
  );
}
