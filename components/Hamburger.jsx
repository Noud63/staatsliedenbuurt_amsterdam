import React,{useState} from 'react'
import { RxHamburgerMenu } from "react-icons/rx";
import MenuOverlay from './MenuOverlay';

const Hamburger = () => {

const [openModal, setOpenModal] = useState(false)

const openMenu = () => {
     setOpenModal(true)
}

return (
  <>
    <div className="hidden cursor-pointer max-md:flex">
      <RxHamburgerMenu size={30} color="white" onClick={openMenu} />
    </div>
    <MenuOverlay  openModal={openModal} setOpenModal={setOpenModal}/>
  </>
);
}

export default Hamburger
