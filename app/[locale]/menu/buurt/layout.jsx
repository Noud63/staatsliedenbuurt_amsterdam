import SectionHeader from "@/components/SectionHeader";

export default function BuurtLayout({ children }) {
  return (
    <div className="mt-8 px-4 text-white max-sm:mt-4 max-md:mt-4 max-w-[1980px] mx-auto max-xsm:px-2">

        <SectionHeader title="Het Buurtteam" />
     
             <main>{children}</main>
    </div>
  );
}
