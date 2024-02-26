import React from "react";

export const Footer = () => {
  return (
    <div className="min-h-0 py-5 px-1 mb-11 lg:mb-0">
      <div className="w-full">
        <ul className="menu menu-horizontal w-full">
          <div className="flex justify-center items-center gap-2 text-sm w-full">
            <div className="text-center">
              <a href="https://github.com/gugasanchez/starknet-mac" target="_blank" rel="noreferrer" className="link">
                GitHub Repo
              </a>
            </div>
            <span>·</span>
            <div className="flex justify-center items-center gap-2">
              <p className="m-0 text-center">A project by RGB Group</p>
            </div>
            <span>·</span>
            <div className="text-center">
              <a
                href="https://wa.me/5519997391955?text=Hi%2C%20Gustavo!%20I%20came%20from%20Starknet%20MAC%20and%20want%20to%20talk%20to%20you%20about%20your%20platform!"
                target="_blank"
                rel="noreferrer"
                className="link"
              >
                Talk to us
              </a>
            </div>
          </div>
        </ul>
      </div>
    </div>
  );
};
