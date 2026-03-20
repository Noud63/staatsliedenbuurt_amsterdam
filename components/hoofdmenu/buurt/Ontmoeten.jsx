import React from "react";
import TitleBar from "@/components/TitleBar";

const Ontmoeten = () => {
  return (
    <div className="mt-8">
      <TitleBar
        title="Ontmoeten"
        titleWidth={"ml-2 font-bold"}
        id="ontmoeten"
      />

      <p className="px-4 mt-4 max-xsm:pr-2 max-xsm:pl-0">
        Houdt u ervan om mensen te ontmoeten?
        <br />
        Of vindt u het leuk om iets bij te dragen in de buurt?
        <br />
        Meedoen aan sociale, leuke of leerzame activiteiten zou voor iedere
        Amsterdammer heel normaal moeten zijn.
        <br />
        Toch is meedoen lang niet voor iedereen vanzelfsprekend.
        <br />
        Daarom is het buurtteam er voor u.
        <br />
        Er zijn in Amsterdam allerlei activiteiten, trainingen en cursussen die
        gratis zijn. En waar u zonder verwijzing kunt binnenstappen.
        <br />
        Of u nu andere mensen wilt ontmoeten, steun zoekt bij uw administratie,
        vrijwilligerswerk wilt doen of iets nieuws wilt leren.
        <br />
        Wij helpen u de eerste stap te zetten.
      </p>

      <p className="px-4 mt-4 max-xsm:pr-2 max-xsm:pl-0">
        <span className="mt-2 font-semibold border-b">Activiteiten in de buurt</span>
        <br />
        In uw buurt worden veel activiteiten georganiseerd.
        <br />
        Hieraan meedoen is een goede manier om buurtgenoten te ontmoeten, actief
        te zijn, een nieuwe taal te leren of een leuke invulling aan uw dag te
        geven.
        <br />
        U kunt op verschillende plekken in de buurt terecht.
        <br />
        Van buurthuizen tot wijkcentra, van scholen tot kerken of moskeeën.
        <br />
        De medewerkers van het buurtteam weten welke activiteiten er bij u in de
        buurt zijn.
        <br />
        Zij kijken graag met u naar passende activiteiten voor u.
        <br />
        Het buurtteam organiseert zelf ook veel voor de buurt.
      </p>

      <div className="px-4 mt-4 max-xsm:pr-2 max-xsm:pl-0">
        <span className="mt-2 font-semibold border-b">
          Voorbeelden van Activiteiten:
        </span>
        <ul className="ml-5 mt-2 list-disc">
          <li>Samen eten en koken: met buurtgenoten in een buurtrestaurant</li>
          <li>Koffie inloop: een kopje koffiedrinken bij u in de buurt</li>
          <li>Ontmoet uw buren: ga samen op pad</li>
          <li>
            Kunst, cultuur en muziek: kom bij een schilderclub, vrouwengroep of
            zangkoor
          </li>
          <li>
            Bewegen en lekker in uw vel: wandelen met buurtbewoners, pilates,
            yoga
          </li>
          <li>
            Creativiteit en spel: knutselen, naaien, mahjong spelen, dammen,
            schaken
          </li>
          <li>Leren: taalles, computerles, een cursus solliciteren</li>
        </ul>
      </div>

      <div className="px-4 mt-4 max-xsm:pr-2 max-xsm:pl-0">
        <span className="mt-2 font-semibold border-b">
          Meedoen met een ziekte of beperking
        </span>
        <br />
        Ook als u een ziekte of beperking heeft, zijn er passende activiteiten
        waaraan u kunt deelnemen.
        <br />
        Het buurtteam weet welke activiteiten er zijn en voor wie ze geschikt
        zijn. <br />
        We bespreken graag de mogelijkheden met u.
        <p className="mt-4">
          <span className="mt-2 font-semibold border-b">Zelf iets organiseren</span>
          <br />
          Heeft u een idee voor een activiteit waar uw buurt van opknapt,
          veiliger of gezelliger wordt?
          <br />
          Of waarbij mensen elkaar gemakkelijk kunnen ontmoeten?
          <br />
          Alle ideeën zijn welkom.
          <br />
          Neem contact op met uw buurtteam om uw idee te bespreken.
          <br />
          Samen kijken wij graag naar de mogelijkheden.
          <br />
          En of er bijvoorbeeld bewonersbudget of subsidie is voor uw voorstel.
        </p>
      </div>

      
    </div>
  );
};

export default Ontmoeten;
