import React from 'react'
import TitleBar from '@/components/TitleBar'

const Veiligheid = () => {
  return (
    <div className="mt-8">
        <TitleBar
          title="Veiligheid"
          titleWidth={"ml-2 font-bold"}
          id="veiligheid"
        />

        <div className="px-4 mt-4 max-xsm:pr-2 max-xsm:pl-0">
        <p>
          Geweld komt helaas vaak voor.
          <br />
          Misschien voelt u zich thuis niet veilig of op straat.
          <br />
          Of misschien maakt u zich zorgen om de veiligheid van iemand anders.
          <br />
          Dan is het fijn als u weet wat u kunt doen.
          <br />
          Kom naar uw buurtteam om over uw situatie en zorgen te praten.
          <br />
          Samen met u gaan we werken aan het stoppen van geweld tegen u, uw
          partner, uw kinderen of mensen in uw omgeving.
          <br />
          Het gaat erom dat u zich weer veilig voelt. In uw huis en in uw buurt.
          <br />
          Hulp nodig?
        </p>
        

        <p className="mt-4 ">
          <span className="mt-2 font-semibold border-b">Huiselijk geweld</span><br />
          U heeft te
          maken met huiselijk geweld als iemand in uw directe omgeving geweld
          tegen u gebruikt.<br />
          Bijvoorbeeld uw (ex)-partner, familielid, vriend of
          vriendin.<br />
          Geweld kan lichamelijk zijn, maar ook emotioneel of
          seksueel.<br />
          Het kan moeilijk zijn om daarover te praten.<br />
          Als dat niet
          kan met iemand in uw omgeving, kunt u hiervoor bij het buurtteam
          terecht.<br />
          Met iemand praten is een belangrijke eerste stap om geweld
          tegen u of tegen iemand anders te stoppen.
        </p>
      </div>
      </div>
  )
}

export default Veiligheid