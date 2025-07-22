import { useSelector, useDispatch } from "react-redux";
import NoteForm from "./features/notes/components/NoteForm";
import NoteCard from "./features/notes/components/NoteCard";
import EditNoteModal from "./features/notes/components/EditNoteModal";
import {
  setSelectedTags,
  clearSelectedNote,
} from "./features/notes/notesSlice";
import { Toaster } from "react-hot-toast";
import { useState } from "react";

export default function App() {
  const dispatch = useDispatch();
  const notes = useSelector((state) => state.notes.notes);
  const selectedTags = useSelector((state) => state.notes.selectedTags);
  const [editingNoteId, setEditingNoteId] = useState(null);

  const allTags = [...new Set(notes.flatMap((note) => note.tags || []))];

  const handleTagClick = (tag) => {
    if (selectedTags.includes(tag)) {
      dispatch(setSelectedTags(selectedTags.filter((t) => t !== tag)));
    } else {
      dispatch(setSelectedTags([...selectedTags, tag]));
    }
  };

  const handleCloseModal = () => {
    setEditingNoteId(null);
    dispatch(clearSelectedNote());
  };

  const handleEdit = (note) => {
    setEditingNoteId(note.id);
    dispatch(setSelectedNote(note));
  };

  const filteredNotes =
    selectedTags.length > 0
      ? notes.filter((note) =>
          note.tags?.some((tag) => selectedTags.includes(tag))
        )
      : notes;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f7f9fc] to-[#eef1f7] py-10 px-4 flex justify-center">
      <Toaster position="top-right" toastOptions={{ duration: 3000 }} />

      <div className="w-full max-w-5xl bg-white p-8 rounded-3xl shadow-xl border border-gray-200 relative">
        <h1 className="text-4xl font-bold mb-8 text-center text-blue-800 tracking-tight">
          📝 Notes Manager
        </h1>

        {/* Tag Filter */}
        {allTags.length > 0 && (
          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-3 text-gray-700">
              Filter by Tag
            </h2>
            <div className="flex flex-wrap gap-3">
              {allTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => handleTagClick(tag)}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition border ${
                    selectedTags.includes(tag)
                      ? "bg-blue-600 text-white border-blue-600 shadow-sm"
                      : "bg-gray-100 text-gray-700 border-gray-300 hover:bg-blue-100 hover:border-blue-300"
                  }`}
                >
                  #{tag}
                </button>
              ))}
              {selectedTags.length > 0 && (
                <button
                  onClick={() => dispatch(setSelectedTags([]))}
                  className="text-sm text-red-500 underline ml-2"
                >
                  Clear
                </button>
              )}
            </div>
          </div>
        )}

        {/* Note Form (Create Only) */}
        <NoteForm />

        {/* Notes Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-semibold mb-5 text-gray-800">
            🗂️ Notes List
          </h2>

          {filteredNotes.length === 0 ? (
            <p className="text-center text-gray-500 mt-10 text-lg">
              No notes found
              {selectedTags.length > 0
                ? ` with tag(s): ${selectedTags.map((t) => "#" + t).join(", ")}`
                : "."}
            </p>
          ) : (
            <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-md">
              <table className="min-w-full text-sm text-left">
                <thead className="bg-gray-100 border-b border-gray-200 text-gray-700">
                  <tr>
                    <th className="px-6 py-4 text-center font-medium">#</th>
                    <th className="px-6 py-4 font-medium">Title</th>
                    <th className="px-6 py-4 font-medium">Content</th>
                    <th className="px-6 py-4 text-right font-medium">Action</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredNotes.map((note, index) => (
                    <NoteCard
                      key={note.id}
                      note={note}
                      index={index + 1}
                      onSelect={() => handleEdit(note)}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Edit Modal */}
      {editingNoteId && (
        <EditNoteModal
          editingNoteId={editingNoteId}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
}
