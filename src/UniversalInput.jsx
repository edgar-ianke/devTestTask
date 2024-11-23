/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import InputCodeEditor from "./inputs/CodeEditorInput";
import InputMasked from "./inputs/MaskedInput";
import InputMultiline from "./inputs/MultiLineInput";
import InputNumber from "./inputs/NumberInput";
import InputSelect from "./inputs/SelectInput";
import InputDefault from "./inputs/Input";
import * as styles from "./styles.css";
import cn from "classnames";
import InputWithChildren from "./inputs/ChildrenInput";
import { theme } from "antd";

export function UniversalInput({
  inputType = "text",
  eventable,
  className,
  style,
  wrapperClassName,
  actions,
  actionsClassName,
  actionsStyle,
  updateProcess,
  onChange,
  readOnly,
  children,
  ...props
}) {
  const [shouldProcess, setShouldProcess] = useState();
  const [actionsWidth, setActionsWidth] = useState();
  const ref = useRef();
  const actionsNodeRef = useRef(null);
  const recalcActionsWidth = () => {
    if (!actionsNodeRef.current) {
      return;
    }

    const currentActionsWidth = actionsNodeRef.current.clientWidth;
    if (currentActionsWidth !== actionsWidth) {
      setActionsWidth(currentActionsWidth);
    }
  };

  useEffect(() => {
    recalcActionsWidth();
  });
  useEffect(() => {
    if (props.autoFocus) {
      ref.current?.focus();
    }
  }, []);
  const handleChange = (value) => {
    if (readOnly) return;
    onChange?.(value);
    if (eventable) setShouldProcess(true);
  };

  const handleBlur = (e) => {
    props.onBlur?.(e.target.value);
    e.target.value && localStorage.setItem(inputType, e.target.value);
  };

  const textInputContainer = inputType === "number" ? "" : styles.textInputContainer;
  const containerCN = cn(wrapperClassName, textInputContainer, {
    [styles.inputMask]: inputType === "masked",
  });
  const newActions = [...(actions || [])];
  const inProcess = updateProcess && updateProcess.get("inProcess");
  if (shouldProcess && inProcess) {
    newActions.push(
      <span
        className={cn(styles.actionIcon, {
          [styles.actionIconGray]: inProcess,
        })}
        title={inProcess ? "" : "ready to send"}
      ></span>
    );
  }

  const renderContent = () => {
    switch (inputType) {
      case "script":
        return (
          <InputCodeEditor
            inputRef={ref}
            onBlur={handleBlur}
            className={className}
            style={style}
            readOnly={readOnly}
            onChange={handleChange}
            {...props}
          />
        );
      case "masked":
        return (
          <InputMasked
            inputRef={ref}
            onBlur={handleBlur}
            className={className}
            style={style}
            readOnly={readOnly}
            onChange={handleChange}
            {...props}
          />
        );
      case "multiline":
        return (
          <InputMultiline
            inputRef={ref}
            onBlur={handleBlur}
            className={className}
            style={style}
            readOnly={readOnly}
            onChange={handleChange}
            {...props}
          />
        );
      case "number":
        return (
          <InputNumber
            inputRef={ref}
            onBlur={handleBlur}
            className={className}
            style={style}
            readOnly={readOnly}
            onChange={handleChange}
            {...props}
          />
        );
      case "select":
        return (
          <InputSelect onChange={handleChange} className={className} style={style} readOnly={readOnly} {...props} />
        );
      case "text":
        return (
          <InputDefault
            onBlur={handleBlur}
            className={className}
            style={style}
            readOnly={readOnly}
            onChange={handleChange}
            inputRef={ref}
            {...props}
          />
        );
      default:
        return children ? (
          <InputWithChildren className={className} readOnly={readOnly} theme={theme} style={style}>
            {children}
          </InputWithChildren>
        ) : null;
    }
  };

  return (
    <div className={containerCN}>
      {renderContent()}
      {(actions && actions.length && (
        <ul className={cn(actionsClassName, styles.inputWithActions)} ref={actionsNodeRef} style={actionsStyle}>
          {actions.map((node, i) => (
            <li key={i}>{node}</li>
          ))}
        </ul>
      )) ||
        null}
    </div>
  );
}
