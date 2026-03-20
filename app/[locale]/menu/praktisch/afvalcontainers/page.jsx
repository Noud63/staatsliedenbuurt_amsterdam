import React from 'react'
import TitleBar from "@/components/TitleBar";

const AfvalContainersPage = () => {
  return (
    <div className="mt-8">
      <TitleBar title="Afval containers" titleWidth={"ml-2 font-bold"}/>
      <div className="pt-4 pb-2 pl-4 max-xsm:pl-2">
        Als u klikt op onderstaande link kunt u op de getoonde kaart zien waar welk type afvalcontainers zich bij u in buurt bevinden.<br />
        Het gaat om de volgende afvalcontainers:<br />
        <ul className="list-disc list-inside mt-2 mb-4">
          <li>Restafval</li>
          <li>Glas</li>
          <li>Papier en karton</li>
          <li>Textiel</li>
        </ul>
      </div>
      <a href="https://kaart.amsterdam.nl/afvalcontainers#52.3803/4.8628/52.3859/4.8834/topo/12491,12492,12493,12495//" target="_blank">
        <span className="underline pl-4">Klik hier om de kaart met afvalcontainers te bekijken.</span>
      </a>

    </div>
  );
}

export default AfvalContainersPage
