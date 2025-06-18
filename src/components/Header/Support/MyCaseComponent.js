import React, { useState, useEffect } from "react";
import DataTable from "../../DataTable";
import { GetSupportDataByEmail } from "../../../DevLinkApi/supportapi";
import authservice from "../../../appwrite/auth";
import Drawer from "../../Editors/Drawer";
import CaseDetails from "./CaseDetails";

function MyCaseComponent() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedCaseId, setSelectedCaseId] = useState(null);

  const openDrawer = (id) => {
    setSelectedCaseId(id);
    setDrawerOpen(true);
  };

  const columns = [
    {
      label: "Case ID",
      id: "caseId",
      type: "link",
      onClick: (data) => openDrawer(data.caseId),
    },
    { label: "Name", id: "name" },
    { label: "Email", id: "email" },
    { label: "Contact", id: "contact" },
    { label: "Issue", id: "issue" },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = await authservice.getCurrentUser();
        const email = user.email;
        const supportData = await GetSupportDataByEmail(email);
        if (supportData) {
          setData(supportData);
        }
      } catch (error) {
        console.error("Support Data was not fetched");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="mt-40">
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <DataTable
          columns={columns}
          data={data}
          loading={loading}
          baseLink="."
          rowkey="caseId"
        ></DataTable>
        {drawerOpen && (
          <Drawer
            isOpen={drawerOpen}
            onClose={() => setDrawerOpen(false)}
            label="Case Details"
          >
            {selectedCaseId && <CaseDetails caseId={selectedCaseId} />}
          </Drawer>
        )}
      </div>
    </div>
  );
}

export default MyCaseComponent;
