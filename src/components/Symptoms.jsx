import React from "react";
import styled from "@emotion/styled";

const StyledTextArea = styled("input")`
  border: solid 1px;
  border-bottom: 1px solid;
  padding: 12px;
  font-size: 14px;
  height: 38px;
  box-sizing: border-box;
  border-radius: 4px;
  width: 50%;
`;

const Symptoms = (props) => {
  const {
    commonSymptoms,
    updateName,
    selectedCommonSymptoms,
    setSelectedCommonSymptoms,
  } = props;
  const updateText = (e) => {
    e.preventDefault();
    updateName(e.target.value);
  };
  const handleOnChange = (e) => {
    let item = e.target.value;
    const index = selectedCommonSymptoms.indexOf(item);
    if (index > -1) {
      selectedCommonSymptoms.splice(index, 1);
    } else {
      selectedCommonSymptoms.push(item);
    }
    setSelectedCommonSymptoms(selectedCommonSymptoms);
  };
  return (
    <div>
      <div className="question">
        <br />
        <em>Hey, Help us know you a little better.</em>
        <br />
        <StyledTextArea
          type="text"
          placeholder="What do you want us to call u by?"
          aria-label="What do you want us to call u by?"
          onChange={updateText}
        />
        <br />
        <br />
        <em> Now, tell us how you are feeling today.</em>
      </div>
      <div className="symptoms">
        <table border="0">
          <tbody>
            <tr>
              {commonSymptoms &&
                commonSymptoms.map((item, index) => {
                  return (
                    <td>
                      <div className="checkbox">
                        <input
                          type="checkbox"
                          name={item}
                          value={item}
                          id={`checkboxFourInput${index}`}
                          onChange={handleOnChange}
                        />
                        <label for={`checkboxFourInput${index}`}>{item}</label>
                      </div>
                    </td>
                  );
                })}
            </tr>
          </tbody>
        </table>
      </div>
      <div></div>
    </div>
  );
};
export default Symptoms;
