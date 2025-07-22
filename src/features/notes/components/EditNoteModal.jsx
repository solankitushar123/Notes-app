import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateNote, clearSelectedNote, selectNoteById } from "../notesSlice";
import { createPortal } from "react-dom";
import toast from "react-hot-toast";

const EditNoteModal = ({ editingNoteId, setEditingNoteId }) => {
  const dispatch = useDispatch();
  const note = useSelector((state) => selectNoteById(state, editingNoteId));

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState("");

  useEffect(() => {
    if (note) {
      setTitle(note.title || "");
      setBody(note.body || "");
      setTags(note.tags?.join(", ") || "");
    }
  }, [note]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedNote = {
      ...note,
      title,
      body,
      tags: tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
    };
    dispatch(updateNote(updatedNote));
    toast.success("Note updated!");
    setEditingNoteId(null);
    dispatch(clearSelectedNote());
  };

  if (!note) return null;

  return createPortal(
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white w-[400px] h-[400px] rounded-2xl shadow-lg p-6 relative">
        <h2 className="text-xl font-semibold text-center text-blue-700 mb-4">
          ✏️ Edit Note
        </h2>
        <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
          <input
            className="border rounded px-4 py-2"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <textarea
            className="border rounded px-4 py-2 h-24 resize-none"
            placeholder="Content"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            required
          />
          <input
            className="border rounded px-4 py-2"
            placeholder="Tags (comma separated)"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          />
          <div className="flex justify-between">
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Update
            </button>
            <button
              type="button"
              onClick={() => {
                setEditingNoteId(null);
                dispatch(clearSelectedNote());
              }}
              className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.body
  );
};

export default EditNoteModal;
