import React from "react";
import Horeca from "@/components/hoofdmenu/praktisch/horeca/Horeca";
import TitleBar from "@/components/TitleBar";

const HorecaPage = () => {
  return (
    <div className="mt-8">
      
      <TitleBar title="Horeca" />
     
      <div className="py-8 pl-4 max-xsm:pl-2">
        <p>
          Hier vindt je alle horecagelegenheden zoals restaurants en
          café&apos;s.
        </p>
      </div>
      <Horeca />
    </div>
  );
};

export default HorecaPage;
