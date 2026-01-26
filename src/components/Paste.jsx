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
            return (
              <div className="border relative" key={paste?._id}>
                <div>{paste.title}</div>
                <div>{paste.content}</div>
                <div className="absolute top-2 right-2 flex gap-1">
                  <button>
                    <a href={`/?pasteId=${paste?._id}`}>
                    <PencilIcon className="h-4 w-4" />
                    </a>
                  </button>
                  <button>
                    <a href={`/pastes/${paste?._id}`}>
                    <EyeIcon className="h-4 w-4" />
                    </a>
                  </button>
                  <button onClick={() => handleDelete(paste?._id)}>
                    <TrashIcon className="h-4 w-4" />
                  </button>
                  <button
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
                    <ClipboardIcon className="h-4 w-4" />
                  </button>
                  <button
                  onClick={() => {
                        window.open(`https://wa.me/?text=${paste?.content}`, "_blank");
                  }}
                  >
                    <ShareIcon className="h-4 w-4" />
                  </button>
                </div>
                <div>{paste.createdAt}</div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Paste;
