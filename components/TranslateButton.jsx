"use client"
import { useLanguage } from "@/context/LanguageContext";

const TranslateButton = () => {

    const { language, toggleLanguage } = useLanguage();

return (<div className="flex h-full pt-1 max-md:w-full max-md:justify-end max-md:pt-0">
  <button
    onClick={toggleLanguage}
    className={`${
      language === "nl"
        ? "bg-[url('../public/icons/english_flag.png')]" 
        : "bg-[url('../public/icons/dutch_flag.png')]"
    } h-[20px] w-[35px] bg-cover bg-center bg-no-repeat`}
  ></button>
</div>)
}
    
export default TranslateButton;