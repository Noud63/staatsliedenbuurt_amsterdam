import IconsMenu from "@/components/hoofdmenu/praktisch/IconsMenu";
import SectionHeader from "@/components/SectionHeader";

export default function PraktischLayout({ children }) {
  return (
    <div className="mt-8 px-4 text-white max-sm:mt-4 max-md:mt-4 max-w-[1980px] mx-auto max-xsm:px-2">
      
        <SectionHeader title="Praktische Informatie" />
      

      <IconsMenu />

      <main>{children}</main>
    </div>
  );
}
