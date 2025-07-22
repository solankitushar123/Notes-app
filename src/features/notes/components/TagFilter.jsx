import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedTags } from "../redux/notesSlice";

const TagFilter = () => {
  const dispatch = useDispatch();
  const { notes, selectedTags } = useSelector((state) => state.notes);

  // Get unique tags from all notes
  const allTags = Array.from(new Set(notes.flatMap((note) => note.tags)));

  const toggleTag = (tag) => {
    const updatedTags = selectedTags.includes(tag)
      ? selectedTags.filter((t) => t !== tag)
      : [...selectedTags, tag];

    dispatch(setSelectedTags(updatedTags));
  };

  return (
    <div className="flex flex-wrap gap-2 mb-4 justify-center">
      {allTags.map((tag) => (
        <button
          key={tag}
          onClick={() => toggleTag(tag)}
          className={`px-3 py-1 text-sm rounded-full border font-medium transition ${
            selectedTags.includes(tag)
              ? "bg-blue-600 text-white border-blue-700"
              : "bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200"
          }`}
        >
          #{tag}
        </button>
      ))}
    </div>
  );
};

export default TagFilter;
