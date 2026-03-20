"use client";
import dynamic from "next/dynamic";

const ClientSpinner = dynamic(() => import("./Spinner"), { ssr: false });
export default ClientSpinner;