import React, { useState } from "react";
import ProjectsFilter from "./ProjectsFilter";
import TableCard from "../layout/TableCard";
import { Button, Table, Progress } from "reactstrap";
import { ReactComponent as Done } from "../../Icons/done.svg";
import { ReactComponent as Edit } from "../../Icons/edit.svg";
import { ReactComponent as Close } from "../../Icons/close.svg";
import { ReactComponent as Attachment } from "../../Icons/attachment.svg";
import { ReactComponent as Complete } from "../../Icons/completed.svg";
import { ReactComponent as UnComplete } from "../../Icons/uncomplete.svg";
import Spinner from "../layout/Spinner";
import { Link } from "react-router-dom";

function Projects({ project = {} }) {
  const [loading, setLoading] = useState(false);

  const [filterData, setFilterData] = useState({});
  const [step, setStep] = useState(1);
  return (
    <div>
      {step === 1 ? (
        <ProjectsFilter
          setFilterData={setFilterData}
          nextStep={() => setStep(2)}
        />
      ) : (
        <div>
          <h3>
            <small>Project P&L</small>
          </h3>

          <TableCard>
            <div className="d-flex justify-content-between table_card_header">
              <div className="d-flex">
                <Button
                  size="lg"
                  className={`btn-circle table-card-button mr-2 `}
                >
                  <Edit />
                </Button>
                <Button
                  size="lg"
                  className={`btn-circle table-card-button mr-2 `}
                >
                  <Done />
                </Button>
              </div>
              <div>
                <Link to="/reports">
                  <Close />
                </Link>
              </div>
            </div>

            <Table borderless hover className="table_card_table">
              <thead>
                <tr>
                  <th>client</th>
                  <th>project</th>
                  <th>date Range</th>
                  <th>budget</th>
                </tr>
              </thead>

              {!loading ? (
                <tbody>
                  <tr>
                    <td>{project.client}</td>
                    <td>{project.project_name}</td>
                    <td>Date Range</td>
                    <td>999 hours/99.000 usd</td>
                  </tr>
                </tbody>
              ) : null}
            </Table>

            <Table borderless className="table_card_table">
              <thead>
                <tr>
                  <th>income</th>
                  <th></th>
                  <th></th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>

              {!loading ? (
                <tbody>
                  <tr>
                    <td>labor</td>
                    <td>Expenses</td>
                    <td>Total billed</td>
                    <td>total recived</td>
                  </tr>
                  <tr>
                    <td>90.00 USD</td>
                    <td>90.00 USD</td>
                    <td>90.00 USD</td>
                    <td>90.00 USD</td>
                  </tr>
                </tbody>
              ) : null}
            </Table>
            <Table borderless className="table_card_table">
              <thead>
                <tr>
                  <th>income</th>
                  <th></th>
                  <th></th>
                  <th></th>
                  <th></th>
                  <th>Profitability</th>
                </tr>
              </thead>

              {!loading ? (
                <tbody>
                  <tr>
                    <td>labor</td>
                    <td>Expenses</td>
                    <td>Total billed</td>
                    <td>total recived</td>
                    <td>60%</td>
                  </tr>
                  <tr>
                    <td>90.00 USD</td>
                    <td>90.00 USD</td>
                    <td>90.00 USD</td>
                    <td>90.00 USD</td>
                  </tr>
                </tbody>
              ) : null}
            </Table>
            {loading ? <Spinner /> : null}
          </TableCard>
        </div>
      )}
    </div>
  );
}

export default Projects;
