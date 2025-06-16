import React, { useEffect, useState } from "react";
import Input from "../../Editors/Input";
import { GetSupportDataBySupportId } from "../../../DevLinkApi/supportapi";
import { useParams } from "react-router-dom";

function CaseDetails() {
  const id = useParams();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const fields = [
    { name: "CaseId", label: "Case ID", id: "caseId", readOnly: true },
    { name: "Name", label: "Name", id: "Name", readOnly: true },
    { name: "Email", label: "Email", id: "email", readOnly: true },
    { name: "Contact", label: "Contact", id: "contact", readOnly: true },
    {
      name: "Issue",
      label: "Issue",
      id: "issue",
      readOnly: "true",
      size: "large",
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await GetSupportDataBySupportId(id);
        setData(data);
      } catch (error) {
        <div className="bg-blue-50 border border-blue-200 p-4 rounded-xl shadow-sm text-center max-w-xl mx-auto mt-6">
          <p className="text-gray-800 text-lg font-medium">
            Error fetching Case Details
          </p>
        </div>;
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  return (
    <div>
      <Input field={fields} />
    </div>
  );
}

export default CaseDetails;
