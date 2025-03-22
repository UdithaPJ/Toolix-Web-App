import React, { useEffect, useState } from "react";
import Header from "../../../components/header";
import clsx from "clsx";
import { getBorrowHistory } from "../../../api/admin_api";
import { BORROW_INSTRUCTOR_ALLOWED_STATUSES } from "../../../constants/enums";
import CustomSelect from "../../../components/custom_select";
import { capitalizeFirstLetter } from "../../../utils/common_utils";
import BorrowingsTable from "../../../components/borrowings_table/borrowings_table";

export default function InstructorBorrowingPage() {
  const [state, setState] = useState({
    borrows: [],
    status: BORROW_INSTRUCTOR_ALLOWED_STATUSES[0],
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

  return (
    <div className={clsx("relative", "full_height")}>
      <Header loggedIn />
      <div className="page_header">Request Management</div>

      <CustomSelect
        label="Select Status"
        value={state.status}
        onChange={onChangeSelectStatus}
        options={BORROW_INSTRUCTOR_ALLOWED_STATUSES.map((status) => ({
          label: capitalizeFirstLetter(status),
          value: status,
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
