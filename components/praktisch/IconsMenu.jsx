import React from 'react'
import Image from 'next/image';
import Link from 'next/link';

const IconsMenu = () => {
  return (
    <div className="w-full border-b-2 pb-4">
      <div className="flex flex-col gap-2 px-2 pt-4 text-lg max-xsm:px-0">
        <Link
          href="/menu/praktisch/grofvuil"
          className="w-full max-w-[220px]"
        >
          <div className="flex items-center gap-2">
            <div className="flex h-[24px] w-[40px] justify-center">
              <Image
                src={"/icons/grofvuil.png"}
                alt="grofvuil"
                width={30}
                height={24}
                style={{ width: "30px", height: "auto" }}
              />
            </div>
            <div className="pl-2">Grofvuil</div>
          </div>
        </Link>

        <Link
          href="/menu/praktisch/afvalcontainers"
          className="w-full max-w-[220px]"
        >
          <div className="flex items-center gap-2">
            <div className="flex h-[24px] w-[40px] justify-center">
              <Image
                src={"/icons/afvalcontainer.png"}
                alt="afval"
                width={26}
                height={20}
                className="h-[24px] w-[22px] object-cover"
              />
            </div>
            <div className="pl-2">Afvalcontainers</div>
          </div>
        </Link>

        <Link href="/menu/praktisch/ov" className="w-full max-w-[220px]">
          <div className="flex items-center gap-2">
            <div className="flex h-[20px] w-[40px] justify-center">
              <Image
                src={"/icons/ov.png"}
                alt="ov"
                width={26}
                height={20}
                className="h-[20px] w-[26px] object-cover"
              />
            </div>
            <div className="pl-2">Openbaar vervoer</div>
          </div>
        </Link>

        <Link
          href="/menu/praktisch/winkels"
          className="w-full max-w-[220px]"
        >
          <div className="flex items-center gap-2">
            <div className="flex h-[24px] w-[40px] justify-center">
              <Image
                src={"/icons/winkels.png"}
                alt="winkels"
                width={100}
                height={0}
                className="h-[24px] w-[24px] object-cover"
              />
            </div>
            <div className="pl-2">Winkelbestand</div>
          </div>
        </Link>

        <Link
          href="/menu/praktisch/horeca"
          className="w-full max-w-[220px]"
        >
          <div className="flex items-center gap-2">
            <div className="flex h-[24px] w-[40px] justify-center">
              <Image
                src={"/icons/horeca.png"}
                alt="horeca"
                width={100}
                height={0}
                className="h-[24px] w-[30px] object-cover"
              />
            </div>
            <div className="pl-2">Horeca</div>
          </div>
        </Link>

        <Link
          href="/menu/praktisch/dienstverlening"
          className="w-full max-w-[220px]"
        >
          <div className="flex items-center gap-2">
            <div className="flex h-[24px] w-[40px] justify-center">
              <Image
                src={"/icons/dienstverlening.png"}
                alt="diensten"
                width={100}
                height={0}
                className="h-[24px] w-[24px] object-cover"
              />
            </div>
            <div className="pl-2">Dienstverlening</div>
          </div>
        </Link>

        <Link
          href="/menu/praktisch/zorg"
          className="w-full max-w-[220px]"
        >
          <div className="flex items-center gap-2">
            <div className="flex h-[24px] w-[40px] justify-center">
              <Image
                src={"/icons/zorg.png"}
                alt="horeca"
                width={100}
                height={0}
                className="h-[26px] w-[26px] object-cover"
              />
            </div>
            <div className="pl-2">Zorg</div>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default IconsMenu
