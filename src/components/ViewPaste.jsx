import React, { useState, useEffect } from "react";
import { createPath, useParams, useSearchParams } from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux'
import { AddToPastes, updateToPaste } from "../redux/pasteSlice";

const ViewPaste = () => {
  const {id} = useParams();
  const allPastes = useSelector((state) => state.paste.pastes);
  const paste = allPastes.filter((p) => p._id === id)[0];
  return (
    <div>
     <div className="flex flex-row gap-7 place-content-between">
      <input
        className="p-1 rounded-2xl mt-2 w-[66%] pl-4"
        type="text"
        placeholder="Enter title here"
        disabled
        value={paste.title}
        onChange={(e) => setTitle(e.target.value)}
      />

      {/* <button className="p-2 rounded-2xl mt-2"
      onClick={createPaste}>
        {pasteId? "Update paste": "Create paste"}
      </button> */}
    </div>

    <div>
      <textarea 
      className="rounded-2xl mt-4 min-w-[400px] p-4"
      value={paste.content}
      placeholder="Enter text here"
      disabled
      onChange={(e) => setValue(e.target.value)}
      rows={20}
      >
      </textarea>
    </div>
   </div>
  )
}

export default ViewPaste
