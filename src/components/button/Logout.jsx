"use client";
import { deleteCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import React from "react";

const Logout = () => {
  const router = useRouter();

  return (
    <button
      onClick={() => {
      
      }}
    >
      Çıkış yap
    </button>
  );
};

export default Logout;
