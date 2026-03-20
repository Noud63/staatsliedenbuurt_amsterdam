import React from 'react'
import TitleBar from '@/components/TitleBar'

const Huisvesting = () => {
  return (
    <div className="mt-8">
        <TitleBar
          title="Huisvesting"
          titleWidth={"ml-2 font-bold"}
          id="huisvesting"
        />
        <div className="px-4 mt-4 max-xsm:pr-2 max-xsm:pl-0">
          <p className="mb-4">
            Een fijne plek om te wonen is belangrijk voor uw gezondheid en uw
            welzijn.
            <br />
            Niet voor iedereen is dat het geval.
            <br />
            Bijvoorbeeld als u binnenkort uw huis uit moet. Of uw huis is niet
            geschikt. Of door een beperking moet het huis aangepast worden.
            <br />
            Het buurtteam denkt met u mee en helpt u verder.
            <br />
            Het buurtteam heeft geen woningen en kan zelf geen woonruimte
            regelen. We kunnen wel samen met u kijken naar wat u nodig heeft en
            wat mogelijk is.
          </p>
          <span className="mt-2 font-semibold border-b">Langer thuis</span>
          <br />U bent 65+ en woont zelfstandig in uw huis en u wilt dat met de
          juiste steun blijven doen.
          <br />
          Het buurtteam kijkt graag samen met u hoe wij u het beste kunnen
          helpen met praktische zaken. Zodat u zich thuis goed kunt redden, in
          een woning die aansluit bij uw persoonlijke behoeften.
          <br />
          Bijvoorbeeld met een of meerdere aanpassingen aan uw woning. Of met
          hulp bij het huishouden of bij de administratie.
          <br />
          Er zijn veel mogelijkheden om het voor u in en rondom uw huis
          gemakkelijker te maken.
          <br />
          Het buurtteam kan u bijvoorbeeld ook helpen bij het aanvragen van een
          scootmobiel of een Wmo-taxi. Of bij de aanvraag van allerlei
          hulpmiddelen en aanpassingen om uw woning beter begaanbaar te maken.
          <br />
          Dat gaat via de ergotherapeut of de gemeente. Neem hiervoor contact op
          met uw buurtteam.
        </div>
      </div>
  )
}

export default Huisvesting