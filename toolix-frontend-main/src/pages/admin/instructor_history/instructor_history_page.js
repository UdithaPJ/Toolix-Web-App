import React, { useEffect, useState } from "react";
import Header from "../../../components/header";
import clsx from "clsx";
import {
  getBorrowHistoryByInstructorId,
  getUsersApi,
} from "../../../api/admin_api";
import AdminInstructorHistoryTable from "./instructor_history_table";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import routes from "../../../constants/routes";
import { USER_ROLES } from "../../../constants/enums";
import CustomSelect from "../../../components/custom_select";

export default function AdminInstructorHistoryPage() {
  const navigate = useNavigate();
  const [state, setState] = useState({
    history: [],
    users: [],
    instructorId: null,
  });

  useEffect(() => {
    getUsersApi({ role: USER_ROLES.INSTRUCTOR }).then((response) => {
      setState({ ...state, users: response.data });
    });
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (state.instructorId) {
      getBorrowHistoryByInstructorId({ instructorId: state.instructorId }).then(
        (response) => {
          setState({ ...state, history: response.data });
        }
      );
    }
    // eslint-disable-next-line
  }, [state.instructorId]);

  const goToToolManagementHistory = () => {
    navigate(routes.ADMIN.TOOLS);
  };

  const onChangeSelectUser = (value) => {
    setState({ ...state, instructorId: value });
  };

  const actionButtons = (
    <>
      <Button
        color="info"
        variant="contained"
        onClick={goToToolManagementHistory}
      >
        Tool management
      </Button>
    </>
  );

  return (
    <div className={clsx("relative", "full_height")}>
      <Header loggedIn buttons={actionButtons} />
      <div className="page_header">Instructors' History</div>

      <CustomSelect
        label="Select instructor"
        value={state.instructorId}
        onChange={onChangeSelectUser}
        options={state.users.map((u) => ({ label: u.name, value: u._id }))}
      />

      <div style={{ padding: 20 }}>
        <AdminInstructorHistoryTable
          history={state.history}
          instructorId={state.instructorId}
        />
      </div>
    </div>
  );
}
