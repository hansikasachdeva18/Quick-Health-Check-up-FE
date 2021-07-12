import React, { useState } from "react";
import Symptoms from "./Symptoms";
import OtherSymptoms from "./OtherSymptoms";
import Result from "./Result";
import { connect } from "react-redux";
import { useEffect } from "react";
import { fetchCommonSymptoms, probableDiagnosis, diagnose } from "../action";

const MainPage = (props) => {
  const { fetchCommonSymptoms, probableDiagnosis, diagnose } = props;
  const [count, setCount] = useState(1);
  const [name, setName] = useState("");
  const { commonSymptoms, loading, probableDiseases, diagnosis } = props;
  useEffect(() => {
    fetchCommonSymptoms();
  }, []);
  const [selectedCommonSymptoms, setSelectedCommonSymptoms] = useState([]);
  const getProbableDiagnosis = () => {
    let payload = {
      selectedSymptoms: selectedCommonSymptoms,
      name,
    };
    probableDiagnosis(payload);
  };
  const [selectedExtraSymptoms, setSelectedExtraSymptoms] = useState([]);
  const diagnoseUser = () => {
    let payload ={
      selectedExtraSymptoms: selectedExtraSymptoms,
      userId: probableDiseases.userId
    };
    diagnose(payload);
  };
  return (
    <form>
      <div className="quiz-wrapper">
        {loading === true ? (
          <em>Please have patience, we are working on your request..</em>
        ) : (
          <>
            {count === 1 ? (
              <Symptoms
                commonSymptoms={commonSymptoms}
                updateName={setName}
                selectedCommonSymptoms={selectedCommonSymptoms}
                setSelectedCommonSymptoms={setSelectedCommonSymptoms}
              />
            ) : null}
            {count === 2 ? (
              <OtherSymptoms
                probableDiseases={probableDiseases}
                name={name}
                selectedExtraSymptoms={selectedExtraSymptoms}
                setSelectedExtraSymptoms={setSelectedExtraSymptoms}
              />
            ) : null}
            {count === 3 ? <Result name={name} diagnosis={diagnosis} /> : null}
            <button
              type="submit"
              style={{ float: "right" }}
              onClick={() => {
                setCount(count + 1);
                diagnoseUser();
              }}
              className={count === 2 ? "" : "hidden"}
            >
              Diagnose Me
            </button>
            <button
              type="submit"
              onClick={() => {
                setCount(count + 1);
                getProbableDiagnosis();
              }}
              className={count === 1 ? "" : "hidden"}
            >
              Next
            </button>
            <button
              type="button"
              onClick={() => navigator.clipboard.writeText(diagnosis.reportLink)}
              className={count === 3 ? "" : "hidden"}
            >
              Copy URL
            </button>
            <button
              type="button"
              onClick={() => navigator.clipboard.writeText(diagnosis.reportPassword)}
              className={count === 3 ? "" : "hidden"}
            >
              Copy Password
            </button>
          </>
        )}
      </div>
    </form>
  );
};

const mapStateToProps = (state) => {
  return {
    commonSymptoms: state.Common,
    loading: state.loading,
    probableDiseases: state.probableDiagnosis,
    diagnosis: state.diagnose
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchCommonSymptoms: fetchCommonSymptoms(dispatch),
    probableDiagnosis: probableDiagnosis(dispatch),
    diagnose: diagnose(dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
