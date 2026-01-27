import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromPastes } from "../redux/pasteSlice";
import { toast } from "react-toastify";
import { PencilIcon, EyeIcon, TrashIcon, ClipboardIcon, ShareIcon } from '@heroicons/react/24/solid';


const Paste = () => {
  const pastes = useSelector((state) => state.paste.pastes);

  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();

  const filteredData = pastes.filter((paste) =>
    paste.title.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  function handleDelete(pasteId) {
    dispatch(removeFromPastes(pasteId));
  }

  function formatDate(dateString) {
  const date = new Date(dateString);

  const d = date.getDate().toString().padStart(2, "0"); // day with leading zero
  const m = date.toLocaleString("default", { month: "short" }); // short month name
  const y = date.getFullYear();

  return `${d}/${m}/${y}`;
}

  return (
    <div>
      <input
        className="p-2 rounded-2xl min-w-[600px] mt-5"
        type="search"
        placeholder="Search here"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="flex flex-col gap-5 mt-5">
        {filteredData.length > 0 &&
          filteredData.map((paste) => {
            const formattedDate = formatDate(paste.createdAt);
            return (
              <div className="border relative" key={paste?._id}>
                <div className="font-bold text-3xl text-left pl-2"
                >{paste.title}</div>
                <div className=" h-18 p-2 mt-2 text-left truncate"
                >{paste.content}</div>
                

                <div className="flex flex-col items-end gap-1">
                  <div className="absolute top-2 right-2 flex gap-1">
                  <button className="px-2 text-blue-600 hover:text-white">
                    <a href={`/?pasteId=${paste?._id}`} className="[#646CF1] hover:text-white">
                    <PencilIcon className="h-4 w-4" />
                    </a>
                  </button>
                  <button className="px-2">
                    <a href={`/pastes/${paste?._id}`} className="text-[#646CF1] hover:text-white">
                    <EyeIcon className="h-4 w-4" />
                    </a>
                  </button>
                  <button className="px-2 text-[#646CF1] hover:text-white" 
                  onClick={() => handleDelete(paste?._id)}>
                    <TrashIcon className="h-4 w-4" />
                  </button>
                  <button className="px-2 text-[#646CF1] hover:text-white"
                    onClick={() => {
                      navigator.clipboard.writeText(paste?.content);
                      toast.success("Copied to Clipboard", {
                        position: "top-right",
                        autoClose: 2000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        style: { color: "black" },
                      });
                    }}
                  >
                    <ClipboardIcon className="h-4 w-4 " />
                  </button>
                  <button className="px-2 text-[#646CF1] hover:text-white"
                  onClick={() => {
                        window.open(`https://wa.me/?text=${paste?.content}`, "_blank");
                  }}
                  >
                    <ShareIcon className="h-4 w-4 text-[#646CF1]e hover:text-white" />
                  </button>
                </div>
                    <div className="text-sm mb-3 mr-3">{formattedDate}</div>
                </div>
                
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Paste;
