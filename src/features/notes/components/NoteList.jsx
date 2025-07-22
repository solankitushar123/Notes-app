import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteNote, setSelectedTags } from "../redux/notesSlice";

const NoteList = ({ onSelect }) => {
  const dispatch = useDispatch();
  const { notes, selectedTags } = useSelector((state) => state.notes);

  const filteredNotes = selectedTags?.length
    ? notes.filter((note) =>
        selectedTags.every((tag) => note.tags.includes(tag))
      )
    : notes;

  useEffect(() => {
    if (selectedTags.length > 0) {
      const allUsedTags = new Set(notes.flatMap((note) => note.tags));
      const validTags = selectedTags.filter((tag) => allUsedTags.has(tag));
      if (validTags.length !== selectedTags.length) {
        dispatch(setSelectedTags(validTags));
      }
    }
  }, [notes, selectedTags, dispatch]);

  return (
    <div className="w-full max-w-3xl mx-auto bg-white p-6 rounded-2xl shadow-lg border border-gray-200">
      <h2 className="text-2xl font-bold text-neutral-800 mb-6">🗂️ All Notes</h2>

      {filteredNotes.length === 0 ? (
        <p className="text-center text-gray-500">No notes found.</p>
      ) : (
        <div className="grid gap-4">
          {filteredNotes.map((note) => (
            <div
              key={note.id}
              className="relative bg-gray-50 border border-gray-200 p-5 rounded-xl hover:shadow-xl hover:border-blue-400 transition duration-200 space-y-3"
            >
              <div className="absolute top-2 right-2 flex gap-2">
                <button
                  onClick={() => onSelect(note)}
                  className="text-blue-500 hover:text-blue-700"
                  title="Edit Note"
                >
                  ✏️
                </button>
                <button
                  onClick={() => dispatch(deleteNote(note.id))}
                  className="text-red-500 hover:text-red-700"
                  title="Delete Note"
                >
                  🗑️
                </button>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 truncate">
                {note.title}
              </h3>
              <p className="text-sm text-gray-600 line-clamp-2">
                {note?.body?.trim() ? (
                  note.body
                ) : (
                  <span className="italic text-gray-400">No content</span>
                )}
              </p>
              <div className="flex flex-wrap gap-2 pt-1">
                {note.tags.map((tag, index) => (
                  <span
                    key={tag + index}
                    className="text-xs px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full font-medium"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NoteList;
