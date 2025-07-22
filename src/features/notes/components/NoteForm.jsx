import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNote, updateNote } from "../notesSlice";
import toast from "react-hot-toast";

const NoteForm = ({ editingNoteId, cancelEdit }) => {
  const dispatch = useDispatch();
  const notes = useSelector((state) => state.notes.notes);

  const editingNote = notes.find((n) => n.id === editingNoteId);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tagsInput, setTagsInput] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editingNote) {
      setTitle(editingNote.title);
      setContent(editingNote.body);
      setTagsInput(editingNote.tags.join(", "));
    } else {
      // Reset form when editingNote is cleared (e.g., deleted)
      setTitle("");
      setContent("");
      setTagsInput("");
      setErrors({});
    }
  }, [editingNote]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!title.trim()) newErrors.title = "Title is required.";
    if (!content.trim()) newErrors.content = "Content is required.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const tags = tagsInput
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean);

    if (editingNoteId) {
      dispatch(updateNote({ id: editingNoteId, title, body: content, tags }));
      toast.success("✏️ Note updated successfully!");
    } else {
      dispatch(addNote({ title, content, tags }));
      toast.success("✅ Note added successfully!");
    }

    // Clear form
    setTitle("");
    setContent("");
    setTagsInput("");
    setErrors({});
    cancelEdit?.();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-8 space-y-5 border border-gray-200"
    >
      <h2 className="text-2xl font-semibold text-blue-700 flex items-center gap-2">
        {editingNoteId ? "✏️ Edit Note" : "➕ Add New Note"}
      </h2>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Note Title
        </label>
        <input
          type="text"
          placeholder="Enter a descriptive title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />
        {errors.title && (
          <p className="text-red-500 text-sm mt-1">{errors.title}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Content
        </label>
        <textarea
          placeholder="Write your note here..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full h-40 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none transition"
        ></textarea>
        {errors.content && (
          <p className="text-red-500 text-sm mt-1">{errors.content}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Tags <span className="text-xs text-gray-400">(comma separated)</span>
        </label>
        <input
          type="text"
          placeholder="e.g. exam, revision"
          value={tagsInput}
          onChange={(e) => setTagsInput(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />
      </div>

      <div className="text-right space-x-2">
        {editingNoteId && (
          <button
            type="button"
            onClick={cancelEdit}
            className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300"
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-all shadow-sm"
        >
          {editingNoteId ? "Update Note" : "Add Note"}
        </button>
      </div>
    </form>
  );
};

export default NoteForm;
