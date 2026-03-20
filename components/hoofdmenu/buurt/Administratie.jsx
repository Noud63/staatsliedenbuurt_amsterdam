import React from 'react'
import TitleBar from '@/components/TitleBar'

const Administratie = () => {
  return (
    <div className="mt-8">
        <TitleBar
          title="Administratie"
          titleWidth={"ml-2 font-bold"}
          id="administratie"
        />
        <p className="px-4 mt-4 max-xsm:pr-2 max-xsm:pl-0">
          Heeft u steun nodig bij uw administratie? Het buurtteam staat voor u
          klaar.
          <br />
          Samen met u brengen we uw administratie en post op orde, zodat u een
          goed overzicht krijgt.
          <br />
        </p>
        <div className="px-4 mt-4 max-xsm:pr-2 max-xsm:pl-0">
          <span className="mt-2 font-semibold border-b">Uw geldzaken op orde</span>
          <br />
          Het buurtteam kan u ook helpen om een overzicht te maken van uw
          financiën. Dat gaat zo:
          <br />
          <ul className="ml-5 mt-2 list-disc">
            <li>Samen kijkt u alle post na. Ook oude en ongeopende brieven.</li>
            <li>
              Als het nodig is, maakt u samen een overzicht met inkomsten en
              uitgaven.
            </li>
            <li>We maken een lijst met betalingen die gedaan moeten worden.</li>
            <li>En we zetten andere taken die moeten gebeuren op een rij.</li>
            <li>En we zetten andere taken die moeten gebeuren op een rij.</li>
          </ul>
        </div>
        <p className="px-4 mt-4 max-xsm:pr-2 max-xsm:pl-0">
          Dat lucht op en geeft een goede start. Zo krijgt u stap voor stap weer
          de controle over uw geldzaken.
        </p>
        <p className="px-4 mt-4 max-xsm:pr-2 max-xsm:pl-0">
          <span className="mt-2 font-semibold border-b">
            Wat moet u meenemen naar uw afspraak?
          </span>
          <br />
          Neem zoveel mogelijk mee. Dan gaan we het samen ordenen.
          <br />
          Een DigiD heeft u nodig om allerlei zaken te regelen die met de
          overheid te maken hebben.
          <br />
          Zoals een toeslag of uitkering aanvragen of aangifte
          inkomstenbelasting doen.
        </p>
      </div>
  )
}

export default Administratie