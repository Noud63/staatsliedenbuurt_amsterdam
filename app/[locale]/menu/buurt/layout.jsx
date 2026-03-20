export default function BuurtLayout({ children }) {
  return (
    <div className="mt-8 px-4 text-white max-sm:mt-4 max-md:mt-4">
      <div className="flex justify-center border-b-2 text-2xl font-semibold tracking-wide max-xsm:justify-start">
        <div className="px-4 pb-4 max-xsm:px-0 flex">Buurtteam Staatsliedenbuurt</div>
      </div>
             <main>{children}</main>
    </div>
  );
}
