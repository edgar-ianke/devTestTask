/* eslint-disable react/prop-types */
import { useState } from "react";
import { Select } from "antd";
import _ from "lodash";
import * as styles from "../styles.css";
import cn from "classnames";

const { Option, OptGroup } = Select;

export default function InputSelect({
  inputRef,
  className,
  style,
  theme,
  options,
  value,
  onChange,
  readOnly,
  ...props
}) {
  const [state, setState] = useState(value ?? "");

  const handleChange = (val) => {
    setState(val);
    onChange?.(val);
  };
  const onBlur = () => {
    localStorage.setItem("select", state);
  };
  const renderSelectOption = (o) => {
    return (
      <Option key={o.value} value={o.value} label={o.label}>
        {o.label}
        {o.subLabel && <span className={styles.optionSubLabel}>{o.subLabel}</span>}
      </Option>
    );
  };
  const valueInOptions = _.some(options, (o) => {
    if (o.value === value) {
      return true;
    }
    if (o.options && _.some(o.options, (o) => o.value === value)) {
      return true;
    }
  });
  const inputCN = cn(
    className,
    {
      [styles.inputReadOnly]: readOnly,
      [styles[theme]]: !!theme,
      [styles.readOnly]: readOnly,
    },
    !valueInOptions && value && styles.invalidValue
  );
  return (
    <Select
      ref={inputRef}
      className={inputCN}
      style={style}
      value={value ?? state}
      onChange={handleChange}
      onBlur={onBlur}
      showSearch={true}
      bordered={false}
      suffixIcon={null}
      popupMatchSelectWidth={300}
      {...props}
      filterOption={(input, option) => (option.label || "").toLowerCase().includes(input.toLowerCase())}
    >
      {options.map((o) => {
        if (_.isArray(o.options)) {
          return (
            <OptGroup key={o.value} label={o.label}>
              {o.options.map((o) => {
                return renderSelectOption(o);
              })}
            </OptGroup>
          );
        } else {
          return renderSelectOption(o);
        }
      })}
    </Select>
  );
}
