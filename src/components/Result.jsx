import React from "react";

const Results = (props) => {
  const { name, diagnosis } = props;
  return (
    <div>
      {diagnosis && diagnosis.reports && diagnosis.reports.length > 0 ? (
        <>
          <div>
            <em>
              {name}, We recommend you to please go through these pathological
              tests to help us diagnose you more accurately..
            </em>
          </div>
          <div>
            <table border="1">
              <tbody>
                <th>
                  <td>Tests to be undertaken:</td>
                </th>

                {diagnosis.reports.map((report) => {
                  return (
                    <tr>
                      <td>
                        <em>{report.testName}</em>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <></>
      )}
      <br />
      <br />
      {diagnosis && diagnosis.disease ? (
        <div>
          <em>
            But based on your inputs, you are diagnosed to have{" "}
            {diagnosis.disease}. Please take the following medications diligently.
          </em>
          <table border="1">
            <tbody>
              <th>
                <td>Name of medicine</td>
                <td>Dosage quantity</td>
                <td>Dosage schedule</td>
              </th>
              {diagnosis.medicines.map((item) => {
                return (
                  <tr>
                    <td>{item.name}</td>
                    <td>{item.dosageQuantity}</td>
                    <td>{item.dosageSchedule}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};
export default Results;
