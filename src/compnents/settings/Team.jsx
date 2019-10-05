import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import history from "../../history";
import { connect } from "react-redux";
import { getTeamMembers } from "../../actions/usersActions";
import { Table, Button, Badge, CustomInput } from "reactstrap";

import TableCard from "../layout/TableCard";
import CardSearch from "../layout/CardSearch";
import CardPagination from "../layout/CardPagination";
import Spinner from "../layout/Spinner";

function Team({ getTeamMembers, team }) {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      await getTeamMembers();
      setLoading(false);
    };
    getData();
  }, [getTeamMembers]);
  return (
    <div>
      <h3>Settings - team</h3>
      <TableCard>
        <div className="d-flex">
          <CardSearch />
          <Button
            tag={Link}
            to="/settings/team/new"
            size="lg"
            className="btn-circle table-card-button mr-2"
            style={{
              fontSize: "2rem"
            }}
          >
            +
          </Button>
        </div>

        <Table borderless hover className="table_card_table">
          <thead>
            <tr>
              <th>name</th>
              <th>e-mail</th>
              <th>role</th>
              <th>team</th>
              <th>departement</th>
              <th className="text-center">TOGGL</th>
              <th className="text-center">ASANA</th>
              <th className="text-center">GREENINVOICE</th>
            </tr>
          </thead>

          {!loading ? (
            <tbody>
              {team.map(
                ({
                  id,
                  name,
                  email,
                  role,
                  team,
                  departement,
                  toggl,
                  asana,
                  greeInVoice
                }) => (
                  <tr
                    key={id}
                    // onClick={() => redirectToClientDetails(id)}
                    style={{
                      cursor: "pointer"
                    }}
                  >
                    <td>{name}</td>
                    <td>{email}</td>
                    <td>{role}</td>
                    <td>{team}</td>
                    <td>{departement}</td>

                    <td className="text-center">
                      <CustomInput type="checkbox" defaultChecked={toggl} />
                    </td>
                    <td className="text-center">
                      <CustomInput type="checkbox" defaultChecked={asana} />
                    </td>
                    <td className="text-center">
                      <CustomInput
                        type="checkbox"
                        defaultChecked={greeInVoice}
                      />
                    </td>
                  </tr>
                )
              )}
            </tbody>
          ) : null}
        </Table>
        {loading ? <Spinner /> : null}
        <div className="d-flex justify-content-end">
          <CardPagination />
        </div>
      </TableCard>
    </div>
  );
}
const mapStateToProps = state => ({
  team: state.users.team
});
export default connect(
  mapStateToProps,
  { getTeamMembers }
)(Team);
