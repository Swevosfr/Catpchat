import React from "react";
import Ghost from "../../../images/reshot-icon-ghost-WV9UDSQTY2.svg";

export default function Home() {
  return (
    <div className="max-w-screen-xl mx-auto px-4 py-28 gap-1 md:px-8">
      <div className="space-y-5 max-w-4xl mx-auto text-center">
        <p className="text-gray-900 mt-10 text-center text-4xl font-bold leading-9 tracking-tight ">
          <span className="text-transparent bg-clip-text mt-10 text-center text-4xl font-bold leading-9 tracking-tight  bg-gradient-to-r from-[#f5f5f5] to-[#f1f1f1]">
            Projet captcha
          </span>
        </p>
        <div>
          <img src={Ghost} className="" alt="Captcha" />
        </div>
      </div>
    </div>
  );
}
