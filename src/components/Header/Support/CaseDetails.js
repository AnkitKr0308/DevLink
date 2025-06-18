import React, { useEffect, useRef, useState } from "react";
import Input from "../../Editors/Input";
import { GetSupportDataBySupportId } from "../../../DevLinkApi/supportapi";
import { useParams } from "react-router-dom";

function CaseDetails({ caseId }) {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  // const [data, setData] = useState({});
  const inputRef = useRef();

  const fields = [
    { name: "CaseId", label: "Case ID", id: "caseId", readOnly: true },
    { name: "Name", label: "Name", id: "name", readOnly: true },
    { name: "Email", label: "Email", id: "email", readOnly: true },
    { name: "Contact", label: "Contact", id: "contact", readOnly: true },
    {
      name: "Issue",
      label: "Issue",
      id: "issue",
      readOnly: true,
      // size: "large",
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await GetSupportDataBySupportId(caseId);
        const caseData = Array.isArray(data) ? data[0] : data;
        if (inputRef.current && inputRef.current.setFormData) {
          inputRef.current.setFormData(caseData);
        }
        console.log("Called setFormData with", data);
      } catch (error) {
        // <div className="bg-blue-50 border border-blue-200 p-4 rounded-xl shadow-sm text-center max-w-xl mx-auto mt-6">
        //   <p className="text-gray-800 text-lg font-medium">
        //     Error fetching Case Details
        //   </p>
        // </div>;
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [caseId]);

  if (loading) {
    return <p>Loading Case Details...</p>;
  } else {
    return (
      <div>
        <Input fields={fields} ref={inputRef} />
      </div>
    );
  }
}

export default CaseDetails;
