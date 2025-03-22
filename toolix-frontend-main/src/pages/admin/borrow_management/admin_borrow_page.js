import React, { useEffect, useState } from "react";
import Header from "../../../components/header";
import clsx from "clsx";
import { getBorrowHistory } from "../../../api/admin_api";
import { BORROW_STATUSES } from "../../../constants/enums";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import routes from "../../../constants/routes";
import CustomSelect from "../../../components/custom_select";
import { capitalizeFirstLetter } from "../../../utils/common_utils";
import BorrowingsTable from "../../../components/borrowings_table/borrowings_table";

export default function AdminBorrowingPage() {
  const navigate = useNavigate();
  const [state, setState] = useState({
    borrows: [],
    status: BORROW_STATUSES.REQUESTED,
    refetch: false,
  });

  const refetch = state.refetch;

  const toggleRefetch = () => {
    setState({ ...state, refetch: !state.refetch });
  };

  useEffect(() => {
    if (state.status) {
      getBorrowHistory({ status: state.status }).then((response) => {
        setState({ ...state, borrows: response.data });
      });
    }
    // eslint-disable-next-line
  }, [state.status, refetch]);

  const onChangeSelectStatus = (value) => {
    setState({ ...state, status: value });
  };

  const goToToolManagementHistory = () => {
    navigate(routes.ADMIN.TOOLS);
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
      <div className="page_header">Request Management</div>

      <CustomSelect
        label="Select Status"
        value={state.status}
        onChange={onChangeSelectStatus}
        options={Object.keys(BORROW_STATUSES).map((key) => ({
          label: capitalizeFirstLetter(key),
          value: key,
        }))}
      />

      <div style={{ padding: 20 }}>
        <BorrowingsTable
          borrows={state.borrows}
          status={state.status}
          refetch={toggleRefetch}
        />
      </div>
    </div>
  );
}
