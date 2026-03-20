import React from "react";
import Winkelbestand from "@/components/hoofdmenu/praktisch/winkels/Winkelbestand";
import TitleBar from "@/components/TitleBar";

const WinkelsPage = () => {
  return (
    <div className="mt-8">
      <TitleBar title="Winkelbestand" />
      <div className="py-8 pl-4 max-xsm:pl-2">
        <p>Hier vindt je het hele winkelbestand.</p>
      </div>
      <Winkelbestand />
    </div>
  );
};

export default WinkelsPage;
