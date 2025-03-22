import React, { useCallback, useEffect, useState } from "react";
import Header from "../../../components/header";
import clsx from "clsx";
import { Button, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import routes from "../../../constants/routes";
import StudentRequestToolsTable from "./student_request_tools_table";
import { getStudentToolsApi } from "../../../api/student_api";
import debounce from "lodash.debounce";

export default function StudentRequestToolsPage() {
  const navigate = useNavigate();
  const [state, setState] = useState({
    tools: [],
    search: "",
    refetch: false,
  });

  const refetch = state.refetch;

  const fetchTools = async (searchTerm) => {
    try {
      const response = await getStudentToolsApi({ search: searchTerm });
      setState({ ...state, tools: response.data, search: searchTerm });
    } catch (error) {}
  };
  // eslint-disable-next-line
  const debounced = useCallback(debounce(fetchTools, 500), []);

  useEffect(() => {
    fetchTools(state.search);
    // eslint-disable-next-line
  }, [refetch]);


  const toggleRefetch = () => {
    setState({ ...state, refetch: !state.refetch });
  };

  const onSearch = (e) => {
    setState({ ...state, search: e.target.value });
    debounced(e.target.value, 1000);
  };

  const goToMyTools = () => {
    navigate(routes.STUDENT.MY_TOOLS);
  };

  const actionButtons = (
    <>
      <Button color="info" variant="contained" onClick={goToMyTools}>
        My tools
      </Button>
    </>
  );

  return (
    <div className={clsx("relative", "full_height")}>
      <Header loggedIn buttons={actionButtons} />
      <div className="page_header">Request tools</div>
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
        </div>
        <StudentRequestToolsTable tools={state.tools} refetch={toggleRefetch} />
      </div>
    </div>
  );
}
