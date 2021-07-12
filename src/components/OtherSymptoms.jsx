import React from "react";

const OtherSymptoms = (props) => {
  const {
    probableDiseases,
    name,
    selectedExtraSymptoms,
    setSelectedExtraSymptoms,
  } = props;
  let merged = [];
  if (probableDiseases && probableDiseases.probableDiseases) {
    probableDiseases.probableDiseases.forEach((disease) => {
      disease.extraSymptoms.forEach((extraSymptom) => {
        let symptom = extraSymptom.symptom;
        if (merged.indexOf(symptom) === -1) merged.push(symptom);
      });
    });
  }
  const handleOnChange = (e) => {
    let item = e.target.value;
    const index = selectedExtraSymptoms.indexOf(item);
    if (index > -1) {
      selectedExtraSymptoms.splice(index, 1);
    } else {
      selectedExtraSymptoms.push(item);
    }
    setSelectedExtraSymptoms(selectedExtraSymptoms);
  };
  return (
    <div>
      <div className="question">
        <em>
          So {name}, 
          {merged && merged.length > 0
            ? "What else is bothering you?"
            : "Let's see..."}
        </em>
      </div>
      <div className="symptoms nom">
        <form>
          {merged &&
            merged.map((item, index) => {
              return (
                <div className="checkbox">
                  <input
                    type="checkbox"
                    id={`checkboxFourInput${index}`}
                    name={item}
                    value={item}
                    onChange={handleOnChange}
                  />
                  <label for={`checkboxFourInput${index}`}>{item}</label>
                </div>
              );
            })}
        </form>
      </div>
      <div></div>
    </div>
  );
};
export default OtherSymptoms;
