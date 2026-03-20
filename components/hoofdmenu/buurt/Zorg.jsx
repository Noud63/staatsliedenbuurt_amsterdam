import React from "react";
import TitleBar from "@/components/TitleBar";

const Zorg = () => {
  return (
    <section className="mt-8">
      <TitleBar title="Zorg" titleWidth={"ml-2 font-bold"} id="zorg" />
      <p className="px-4 mt-4 max-xsm:pr-2 max-xsm:pl-0">
        <span className="mt-2 font-semibold border-b">Mantelzorg</span>
        <br />
        Zorgt u langdurig voor een naaste met een beperking of ziekte en doet u
        dit onbetaald? Dan bent u mantelzorger.
        <br />
        Soms kan mantelzorgen te veel of te zwaar worden.
        <br />
        Bijvoorbeeld als het lastig is om de zorg voor iemand anders te
        combineren met werk en uw eigen gezin.
        <br />
        Het buurtteam kan u dan verder helpen.
        <br />
        Samen met u gaan we op zoek naar manieren om u te ontlasten.
      </p>

      <p className="px-4 mt-4 max-xsm:pr-2 max-xsm:pl-0">
        <span className="mt-2 font-semibold border-b">
          Parkeerregeling voor mantelzorgers
        </span>
        <br />
        De gemeente Amsterdam heeft een speciale parkeerregeling om
        mantelzorgers te ondersteunen.
        <br />
        Met deze vergunning kunt u als mantelzorger goedkoper bij uw naasten
        parkeren.
        <br />
        Voor deze mantelzorg-parkeervergunning heeft u een mantelzorgverklaring
        nodig.
        <br />
        Onze buurtteammedewerkers kunnen u helpen met deze mantelzorgverklaring.
        <br />
        Hiermee kun u zelf de parkeervergunning voor mantelzorgers aanvragen via
        de website van de gemeente Amsterdam of bij het Stadsloket.
      </p>
    </section>
  );
};

export default Zorg;
