import React, { useEffect, useState } from "react";
import Header from "../../../components/header";
import clsx from "clsx";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import routes from "../../../constants/routes";
import { getStudentBorrowHistory } from "../../../api/student_api";
import MyToolsTable from "./my_tools_table";
import { useStoreState } from "easy-peasy";
import { BORROW_STATUSES } from "../../../constants/enums";
import CustomSelect from "../../../components/custom_select";
import { capitalizeFirstLetter } from "../../../utils/common_utils";

export default function MyToolsPage() {
  const navigate = useNavigate();
  const user = useStoreState((state) => state.user);
  const [state, setState] = useState({
    history: [],
    status: BORROW_STATUSES.REQUESTED,
  });

  useEffect(() => {
    getStudentBorrowHistory({ student: user._id, status: state.status })
      .then((response) => {
        setState({ ...state, history: response.data });
      })
      .catch((err) => {});
    // eslint-disable-next-line
  }, [state.status]);

  const goToRequestTools = () => {
    navigate(routes.STUDENT.REQUEST_TOOLS);
  };

  const onChange = (value) => {
    setState({ ...state, status: value });
  };

  const actionButtons = (
    <>
      <Button color="info" variant="contained" onClick={goToRequestTools}>
        Request tools
      </Button>
    </>
  );

  return (
    <div className={clsx("relative", "full_height")}>
      <Header loggedIn buttons={actionButtons} />
      <div className="page_header">My tools</div>

      <CustomSelect
        label="Status filter"
        value={state.status}
        onChange={onChange}
        options={Object.keys(BORROW_STATUSES).map((key) => ({
          label: capitalizeFirstLetter(key),
          value: key,
        }))}
      />

      <div style={{ padding: 20 }}>
        <MyToolsTable history={state.history} />
      </div>
    </div>
  );
}
