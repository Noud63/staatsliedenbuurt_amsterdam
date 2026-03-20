import AllZorgInstanties from "@/components/hoofdmenu/praktisch/zorg/AlleZorgInstanties";
import TitleBar from "@/components/TitleBar";

const ZorgPage = () => {

  return (
    <div className="mt-8">

      <TitleBar title="Zorg" />
      
      <div className="py-8 pl-4 max-xsm:pl-2">
        <p>
          Hier vindt je alle mogelijke zorginstellingen in de Staatsliedenbuurt
          zoals huisartsen, tandartsen en fysiotherapeuten.
        </p>
      </div>

      <AllZorgInstanties />
      
    </div>
  );
};

export default ZorgPage;
