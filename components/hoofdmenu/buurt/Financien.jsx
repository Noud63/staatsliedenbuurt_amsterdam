import React from 'react'
import TitleBar from '@/components/TitleBar'

const Financien = () => {
  return (
    <section className="mt-8 ">
        <TitleBar
          title="Financiën"
          titleWidth={"ml-2 font-bold"}
          id="financien"
        />
        <p className="px-4 mt-4 max-xsm:pr-2 max-xsm:px-4">
          Iedereen kan met geldproblemen of schulden te maken krijgen.
          <br />
          Het is belangrijk om hier niet mee te blijven zitten. Schakel op tijd
          hulp in. Zo kunt u ergere problemen voorkomen.
          <br />
          Het buurtteam ondersteunt u daarbij. Samen met u kijken we naar uw
          geldzaken. En naar de mogelijkheden die het beste passen bij uw
          omstandigheden.
          <br />
          Soms blijkt bijvoorbeeld dat u recht heeft op een aanvulling van uw
          inkomen. Ook bij het aanvragen van voorzieningen staat het buurtteam u
          bij.
          <br />
          Hoe eerder u contact opneemt met een buurtteam, hoe beter wij kunnen
          helpen.
          <br />
          Kom langs en praat met één van onze medewerkers. Kijk waar u ons in de
          buurt kunt vinden.
        </p>

        <p className="px-4 mt-4 max-xsm:pr-2 max-xsm:px-4">
          <span className="mt-2 font-semibold border-b">Energiecrisis?</span>
          <br />
          Kunt u alles nog betalen? Energie, boodschappen, alles wordt duurder.
          Het buurtteam helpt bij vragen over geld. Er is vaak meer mogelijk dan
          u denkt.
          <br />
          Onze hulp is gratis.
          <br />
          Wacht niet te lang en maak een afspraak.
        </p>
        <p className="px-4 mt-4 max-xsm:pr-2 max-xsm:px-4">
          <span className="mt-2 font-semibold border-b">
            Te laat met betalen van uw huur?
          </span>
          <br />
          Bent u te laat met betalen van uw huur? Dan heeft u een
          huurachterstand.
          <br />
          Het is belangrijk om snel actie te ondernemen. Voordat het bedrag
          oploopt en u uit huis gezet kan worden. Het buurtteam kan u helpen.
          <br />
          Samen kijken we wat er als eerste moet gebeuren en wat u daarna kunt
          doen.
          <br />
          Ook als u te laat bent met betalen van andere rekeningen, kunt u bij
          het buurtteam terecht.
        </p>
      </section>
  )
}

export default Financien