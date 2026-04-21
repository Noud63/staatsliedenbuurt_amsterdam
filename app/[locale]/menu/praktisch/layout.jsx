import IconsMenu from "@/components/hoofdmenu/praktisch/IconsMenu";
import SectionHeader from "@/components/SectionHeader";

export default function PraktischLayout({ children }) {
  return (
    <div className="mx-auto mt-8 w-full px-4 text-white max-xl:max-w-[850px] max-md:mt-4 max-sm:mt-4 max-sm:px-4 max-xsm:px-2 xl:max-w-[1280px]">
      <SectionHeader title="Praktische Informatie" />

      <IconsMenu />

      <main>{children}</main>
    </div>
  );
}
