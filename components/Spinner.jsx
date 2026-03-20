"use client";
import React from "react";
import { Grid } from "react-loader-spinner";

// const override = {
//   display: "block",
//   margin: "180px auto",
// };

const Spinner = ({ loading, height, width }) => {
  return (
    <>
    {loading && <Grid
      visible={true}
      height={height}
      width={width}
      color="#fff"
      ariaLabel="grid-loading"
      radius="12.5"
      wrapperStyle={{}}
      wrapperClass="grid-wrapper w-full flex justify-center items-center"
    />}
    
    </>
    
  );
};

export default Spinner;
