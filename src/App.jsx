import { useState } from "react";
import "./App.css";
import { UniversalInput } from "./UniversalInput";
const App = () => {
  const [numberInput, setNumberInput] = useState(localStorage.getItem("number") ?? "");
  const [textInput, setTextInput] = useState(localStorage.getItem("text") ?? "");
  const [multiLineInput, setMultiLineInput] = useState(localStorage.getItem("multiline") ?? "");
  const [maskInput, setMaskInput] = useState(localStorage.getItem("masked") ?? "");
  const [selectInput, setSelectInput] = useState(localStorage.getItem("select") ?? "");

  return (
    <div className="main">
      <h1 className="title">THIS IS NOT A TEST TASK</h1>
      <div className="inputItems">
        <UniversalInput
          inputType={"number"}
          value={numberInput}
          onChange={(value) => setNumberInput(value)}
          placeholder="Number type"
          className="inputItem"
        />
        <UniversalInput
          value={textInput}
          onChange={(value) => {
            setTextInput(value);
          }}
          placeholder="Text type"
          className="inputItem"
        />
        <UniversalInput
          inputType={"multiline"}
          value={multiLineInput}
          onChange={(value) => setMultiLineInput(value)}
          placeholder="Text multiline type"
          className="inputItem"
        />
        <UniversalInput
          theme={true}
          inputType={"masked"}
          autoFocus={true}
          value={maskInput}
          onChange={(value) => setMaskInput(value)}
          mask={"111-111"}
          placeholder="With mask"
          className="inputItem inputItem__round"
        />
        <UniversalInput
          inputType={"select"}
          value={selectInput}
          onChange={(value) => setSelectInput(value)}
          options={[
            { value: "first element", label: "first element" },
            { value: "second element", label: "second element" },
            { value: "third element", label: "third element" },
          ]}
          placeholder="Another type"
          className="inputItem inputItem__round"
        />
      </div>
    </div>
  );
};

export default App;
