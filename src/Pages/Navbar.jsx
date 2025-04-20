import React from "react";
import { FiEye } from "react-icons/fi";

const Navbar = () => {
  return (
    <div className="flex   p-5  justify-between">
      <div className="flex gap-3">
        <div className="w-10 h-10">
          <img
            className="w-full h-full object-cover"
            src="https://th.bing.com/th/id/R.880f4e55565c98818d9e9bb920d3ff32?rik=vtSP1nYty4p%2f7w&pid=ImgRaw&r=0"
            alt="Logo"
          />
        </div>
        <div className="flex flex-col text-start">
          <h2 className="text-xl">Formify</h2>
          <p className="text-sm text-gray-400">
            Add and customize forms for your needs
          </p>
        </div>
      </div>
      <div className="flex items-center gap-5">
        <p className="text-gray-400">Changed Saved 2 mins ago</p>
        <p>
          <FiEye></FiEye>
        </p>
      </div>
    </div>
  );
};

export default Navbar;
