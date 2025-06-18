import React from "react";
// import Container from "../components/container/Container";
import CaseDetails from "../components/Header/Support/CaseDetails";
// import Drawer from "../components/Editors/Drawer";

function CaseDetailspage() {
  // const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  return (
    <div className="mt-40">
      {/* <h1 className="font-semibold font-serif underline">Case Details</h1> */}
      {/* <Drawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)}> */}
      <CaseDetails />
      {/* </Drawer> */}
    </div>
  );
}

export default CaseDetailspage;
