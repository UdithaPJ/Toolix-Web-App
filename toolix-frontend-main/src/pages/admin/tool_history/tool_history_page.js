import React, { useEffect, useState } from "react";
import Header from "../../../components/header";
import clsx from "clsx";
import { getBorrowHistory } from "../../../api/admin_api";
import ToolHistoryTable from "./tool_history_table";
import { useParams } from "react-router-dom";

export default function AdminToolHistoryPage() {
  const { toolId } = useParams();
  const [state, setState] = useState({
    history: [],
  });

  const tool = state?.history?.[0]?.tool;

  useEffect(() => {
    if (toolId) {
      getBorrowHistory({ tool: toolId }).then((response) => {
        setState({ ...state, history: response.data });
      });
    }
    // eslint-disable-next-line
  }, [toolId]);

  return (
    <div className={clsx("relative", "full_height")}>
      <Header loggedIn />
      <div className="page_header">Tool History</div>
      {tool && (
        <div
          style={{
            marginLeft: 20,
            fontSize: 20,
            fontWeight: "bold",
            color: "white",
            backgroundColor: "#00000075",
            padding: "5px 20px",
            width: "fit-content",
            borderRadius: 4,
          }}
        >
          <span>Tool name: {tool.name}</span>
        </div>
      )}
      <div style={{ padding: 20 }}>
        <ToolHistoryTable history={state.history} />
      </div>
    </div>
  );
}
