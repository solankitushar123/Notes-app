import React from "react";
import NoteForm from "../features/notes/components/NoteForm";
import NoteCard from "../features/notes/components/NoteCard";
import { useSelector } from "react-redux";

const Home = () => {
  const notes = useSelector((state) => state.notes.notes);

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-semibold text-center text-gray-800 mb-8">
          📝 Notes
        </h1>

        {/* Note creation form */}
        <div className="mb-8 bg-white shadow-md rounded-lg p-6">
          <NoteForm />
        </div>

        {/* Notes list */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {notes.map((note) => (
            <NoteCard key={note.id} note={note} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
