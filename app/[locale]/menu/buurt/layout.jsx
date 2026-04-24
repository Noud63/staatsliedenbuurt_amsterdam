import SectionHeader from "@/components/SectionHeader";

export default function BuurtLayout({ children }) {
  return (
    <div className="mx-auto mt-8 w-full max-w-[1280px] px-4 text-white max-md:mt-4 max-sm:mt-4 max-xsm:px-2">
      <SectionHeader title="Het Buurtteam" />

      <main>{children}</main>
    </div>
  );
}
