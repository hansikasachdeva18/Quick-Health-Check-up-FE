import { call, put, takeEvery } from "redux-saga/effects";

let activatedSagas = false;

const baseURL = "http://localhost:8097/docBot";
const commonSymptomsURL = "/commonSymptoms";
const probableDiagnosisURL = "/probableDiagnosis";
const diagnoseURL = "/diagnose";

export const checkHttpErrors = (response) => {
  if (!response.ok) {
    throw response;
  }
  return response;
};
function* fetchCommonSymptoms(action) {
  yield put({ type: "LOADING", payload: true });
  const data = yield call(fetchCommonSymptomsApi, action);
  yield put({ type: "LOADING", payload: false });
  yield put({ type: "COMMON_SUCCESS", payload: data });
}
const fetchCommonSymptomsApi = (action) =>
  fetch(`${baseURL}${commonSymptomsURL}`, {
    method: "GET",
  })
    .then((res) => checkHttpErrors(res))
    .then((res) => res.json())
    .then((data) => data);

function* probableDiagnosis(action) {
  const { payload } = action;
  yield put({ type: "LOADING", payload: true });
  const data = yield call(probableDiagnosisAPI, payload);
  yield put({ type: "LOADING", payload: false });
  yield put({
    type: "PD_SUCCESS",
    payload: data,
  });
}
const probableDiagnosisAPI = (payload) =>
  fetch(`${baseURL}${probableDiagnosisURL}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  })
    .then((res) => checkHttpErrors(res))
    .then((res) => res.json())
    .then((data) => data);
function* diagnose(action) {
  const { payload } = action;
  yield put({ type: "LOADING", payload: true });
  const data = yield call(diagnosisAPI, payload);
  yield put({ type: "LOADING", payload: false });
  yield put({
    type: "DG_SUCCESS",
    payload: data,
  });
}
const diagnosisAPI = (payload) =>
  fetch(`${baseURL}${diagnoseURL}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  })
    .then((res) => checkHttpErrors(res))
    .then((res) => res.json())
    .then((data) => data);
export default function* rootSaga() {
  if (!activatedSagas) {
    yield takeEvery("Common", fetchCommonSymptoms);
    yield takeEvery("PD", probableDiagnosis);
    yield takeEvery("DG", diagnose);
    activatedSagas = true;
  }
}
