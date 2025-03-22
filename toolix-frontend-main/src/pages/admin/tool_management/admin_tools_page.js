import React, { useCallback, useEffect, useState } from "react";
import Header from "../../../components/header";
import CustomButton from "../../../components/custom_button";
import clsx from "clsx";
import CreateToolModal from "./create_tool_modal";
import { getAdminToolsApi } from "../../../api/admin_api";
import ToolsTable from "./tools_table";
import { Button, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import routes from "../../../constants/routes";
import { debounce } from "lodash";

export default function AdminToolsPage() {
  const navigate = useNavigate();
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [state, setState] = useState({
    tools: [],
    search: "",
    refetch: false,
  });
  const refetch = state.refetch;

  const fetchTools = async (searchTerm) => {
    try {
      const response = await getAdminToolsApi({ search: searchTerm });
      setState({ ...state, tools: response.data, search: searchTerm });
    } catch (error) {}
  };
  // eslint-disable-next-line
  const debounced = useCallback(debounce(fetchTools, 500), []);

  useEffect(() => {
    fetchTools(state.search);
    // eslint-disable-next-line
  }, [refetch]);

  const onOpenCreateModal = () => {
    setCreateModalOpen(true);
  };

  const toggleRefetch = () => {
    setState({ ...state, refetch: !state.refetch });
  };

  const onSearch = (e) => {
    setState({ ...state, search: e.target.value });
    debounced(e.target.value, 1000);
  };

  const goToInstructorsHistory = () => {
    navigate(routes.ADMIN.INSTRUCTOR_HISTORY);
  };

  const goToBorrowList = () => {
    navigate(routes.ADMIN.BORROWING);
  };

  const actionButtons = (
    <>
      <Button color="info" variant="contained" onClick={goToInstructorsHistory}>
        Instructors' history
      </Button>

      <Button
        style={{
          marginLeft: "7px",
        }}
        color="info"
        variant="contained"
        onClick={goToBorrowList}
      >
        Request Details
      </Button>
    </>
  );

  return (
    <div className={clsx("relative", "full_height")}>
      <Header loggedIn buttons={actionButtons} />
      <div className="page_header">Tool Management</div>
      <div style={{ padding: 20 }}>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            marginBottom: 15,
            justifyContent: "space-between",
          }}
        >
          <div style={{ backgroundColor: "white", borderRadius: 10 }}>
            <TextField
              onChange={onSearch}
              variant="outlined"
              placeholder="Search tools..."
            />
          </div>

          <CustomButton
            title="Add new tool"
            variant="green"
            onClick={onOpenCreateModal}
          />
        </div>
        <ToolsTable tools={state.tools} refetch={toggleRefetch} />
      </div>

      <CreateToolModal
        open={createModalOpen}
        setOpen={setCreateModalOpen}
        refetch={toggleRefetch}
      />
    </div>
  );
}
