import React, { useState, useEffect } from "react";

const NoteEditor = ({ selectedNote, onSave }) => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState("");
  const [material, setMaterial] = useState("");
  const [type, setType] = useState("");
  const [noteClass, setNoteClass] = useState("");

  useEffect(() => {
    if (selectedNote) {
      setTitle(selectedNote.title || "");
      setBody(selectedNote.body || "");
      setTags(selectedNote.tags?.join(", ") || "");
      setMaterial(selectedNote.material || "");
      setType(selectedNote.type || "");
      setNoteClass(selectedNote.class || "");
    }
  }, [selectedNote]);

  const handleSubmit = () => {
    if (!title.trim()) return;
    const updatedNote = {
      ...selectedNote,
      title,
      body,
      tags: tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
      material,
      type,
      class: noteClass,
    };
    onSave(updatedNote);
  };

  return (
    <div className="w-full max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
      <h2 className="text-2xl font-bold text-neutral-800 mb-6">📝 Edit Note</h2>

      <div className="space-y-4">
        <input
          className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Note title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          className="w-full h-40 px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          placeholder="Write your note..."
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />

        <input
          className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Tags (comma-separated)"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />

        <input
          className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Material (URL or markdown)"
          value={material}
          onChange={(e) => setMaterial(e.target.value)}
        />

        <div className="flex flex-col sm:flex-row gap-4">
          <input
            className="flex-1 px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Class"
            value={noteClass}
            onChange={(e) => setNoteClass(e.target.value)}
          />
          <input
            className="flex-1 px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Type (Lecture, Lab...)"
            value={type}
            onChange={(e) => setType(e.target.value)}
          />
        </div>

        <div className="text-right mt-6">
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-xl transition"
            onClick={handleSubmit}
          >
            💾 Save Note
          </button>
        </div>
      </div>
    </div>
  );
};

export default NoteEditor;
