import React from 'react'
import TitleBar from '@/components/TitleBar'

const Gezondheid = () => {
  return (
     <div className="mt-8">
        <TitleBar
          title="Gezondheid"
          titleWidth={"ml-2 font-bold"}
          id="gezondheid"
        />
        <div className="px-4 mt-4 max-xsm:pr-2 max-xsm:pl-0">
          <p className="mb-4">
            Een gezonde leefstijl betekent goed zorgen voor uzelf.
            <br />
            Daarbij spelen veel dingen uit uw dagelijks leven een rol.
            <br />
            Gezond eten. Tevreden zijn. Lekker in uw vel zitten. Kunnen omgaan
            met een ziekte of beperking.
            <br />
            Maar gezond leven en u gezond voelen, kan soms moeilijk zijn. <br />
            Gelukkig zijn er in Amsterdam veel activiteiten en cursussen over
            voeding, beweging en omgaan met stress. <br />
            Het buurtteam helpt u met een plan maken om uw gezondheid te
            verbeteren en die van uw gezin.
          </p>
          <p className="mb-4">
            <span className="mt-2 font-semibold border-b">Geestelijk fit</span>
            <br />
            Voelt u zich vaak gespannen? Zit u niet lekker in uw vel of slaapt u
            slecht?
            <br />
            Vaak is dit een teken van stress. Als u al langer veel stress hebt,
            kunt u klachten krijgen.
            <br />
            Het buurtteam kan u helpen als u problemen hebt die u stress geven.
            Ook als u klachten hebt, zoals somberheid, onzekerheid en
            eenzaamheid.
            <br />
            Heeft u door geestelijke klachten meer ondersteuning nodig? U krijgt
            een vaste contactpersoon bij het buurtteam.
            <br />
            Met uw contactpersoon bespreekt u welke hulp er mogelijk is. Uw
            contactpersoon regelt dan deskundige hulp voor u.
          </p>
          <p className="mb-4">
            <span className="mt-2 font-semibold border-b">Mensen ontmoeten</span>
            <br />
            Er zijn verschillende mogelijkheden om mensen in de buurt te
            ontmoeten.
            <br />
            Buurthuizen organiseren vaak leuke sociale activiteiten. Ga eens
            langs en kijk wat er te doen is.
            <br />
            Er zijn veel organisaties die met vrijwilligers of maatjes werken.
            <br />
            Of kijk eens in de regionale krant of buurtkrant welke activiteiten
            er zijn waarbij u zich kan aansluiten.
            <br />
            We helpen u daar graag bij.
          </p>

          <p className="mb-4">
            <span className="mt-2 font-semibold border-b">Verlies van een dierbare</span>
            <br />
            Het verlies van een dierbare kan u veel verdriet doen.
            <br />
            Verdriet verwerken kan u helpen om het beter te verdragen. <br />
            Er zijn verschillende activiteiten in de buurt die u daarbij kunnen
            ondersteunen.
            <br />
            Zoals een cursus rouwverwerking of een rouwcafé. U vindt ze in elk
            stadsdeel.
            <br />
            Vraag ernaar bij het buurtteam of bij uw huisarts.
            <br />
            Het buurtteam en de huisarts zijn veilige plekken waar zonder
            oordeel wordt geluisterd.
            <br />
            Ook kunt u zo andere mensen leren kennen die een dierbare hebben
            verloren.
          </p>
        </div>
      </div>
  )
}

export default Gezondheid