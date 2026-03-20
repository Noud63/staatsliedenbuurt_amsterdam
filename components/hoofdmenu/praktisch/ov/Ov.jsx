import React from "react";
import AlleHaltesBus21 from "./AllehaltesBus21";
import AlleHaltesTram5 from "./AlleHaltesTram5";
import Tramlijn5 from "./Tramlijn5";
import Buslijn21 from "./Buslijn21";
import TitleBar from "@/components/TitleBar";

const Ov = () => {
  return (
    <div className="mt-8">

      <TitleBar title="Openbaar vervoer" />

      <div className="py-8 pl-4 max-xsm:pl-2">
        <p>
          Hier vindt je alle bus en tramlijnen van en naar de Staatsliedenbuurt
          met alle haltes. Het zijn er twee, te weten tramlijn 5 en buslijn 21.
        </p>
      </div>

      <TitleBar title="Tramlijnen" />

      <div className="pb-4 pl-4 pt-8 max-xsm:pl-0">
        <div className="mb-4 flex max-w-[330px] flex-row items-center border-b pb-2 max-xsm:max-w-full">
          <span className="text-lg font-semibold">Tramlijn</span>
          <div className="mx-2 flex h-[28px] w-[28px] items-center justify-center rounded-full bg-white pr-[2px] font-bold text-yellow-900">
            5
          </div>
        </div>

        <Tramlijn5 />

        <div>Route: Van Hallstraat - Amstelveen Stadshart</div>
        <div>
          Voor actuele vertrektijden{" "}
          <a
            href="https://gvb.nl/reisinformatie/lijn/GVB/5"
            target="_blank"
            alt="lijn5"
            className="underline"
          >
            klik hier
          </a>
        </div>
      </div>

      <AlleHaltesTram5 />

      <TitleBar title="Buslijnen" />
      
      <div className="pb-4 pl-4 pt-8 max-xsm:pl-0">
        <div className="mb-4 flex max-w-[330px] flex-row items-center border-b pb-2 max-xsm:max-w-full">
          <span className="text-lg font-semibold">Buslijn</span>
          <div className="mx-2 flex h-[28px] w-[28px] items-center justify-center rounded-full bg-white pl-[1px] font-bold text-yellow-900">
            21
          </div>
        </div>

        <Buslijn21 />

        <div>Route: De Sav. Lohmanstraat - Centraal Station</div>
        <div>
          Voor actuele vertrektijden{" "}
          <a
            href="https://gvb.nl/reisinformatie/lijn/GVB/21"
            target="_blank"
            alt="lijn21"
            className="underline"
          >
            klik hier
          </a>
        </div>
      </div>

      <AlleHaltesBus21 />
    </div>
  );
};

export default Ov;
