import React from "react";
import { useDispatch } from "react-redux";
import { deleteNote, selectNote } from "../notesSlice";
import ReactMarkdown from "react-markdown";

const NoteCard = ({ note, onSelect }) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteNote(note.id));
  };

  const handleEdit = () => {
    dispatch(selectNote(note.id));
    onSelect(note.id); // pass ID only
  };

  const markdownPreview = note.body?.slice(0, 200) || "_No content_";

  return (
    <tr className="group hover:bg-gray-50 hover:shadow-md hover:ring-1 hover:ring-blue-100 rounded-md bg-white transition-all text-sm table-fixed">
      <td className="px-4 py-4 w-[5%] text-center align-middle">
        <input
          type="checkbox"
          className="accent-blue-600 h-4 w-4 rounded cursor-pointer"
        />
      </td>
      <td
        className="px-4 py-4 w-[25%] align-middle whitespace-nowrap"
        title={note.title}
      >
        <div className="flex items-center gap-2">
          <span className="text-lg">{note.icon || "📝"}</span>
          <span className="truncate max-w-[180px] font-medium text-gray-800">
            {note.title}
          </span>
        </div>
      </td>
      <td className="px-4 py-4 w-[45%] align-middle text-gray-600">
        <ReactMarkdown
          components={{
            a: ({ node, ...props }) => (
              <a
                {...props}
                className="text-blue-600 hover:text-blue-800 no-underline"
              />
            ),
            p: ({ node, ...props }) => <p {...props} className="inline" />,
          }}
        >
          {markdownPreview}
        </ReactMarkdown>
      </td>
      <td className="px-4 py-4 w-[25%] align-middle text-right space-x-2">
        <button
          onClick={handleEdit}
          className="text-xs text-blue-600 hover:text-white bg-blue-100 hover:bg-blue-600 px-3 py-1 rounded-md transition"
        >
          ✏️ Edit
        </button>
        <button
          onClick={handleDelete}
          className="text-xs text-red-500 hover:text-white bg-red-100 hover:bg-red-600 px-3 py-1 rounded-md transition"
        >
          🗑️ Delete
        </button>
      </td>
    </tr>
  );
};

export default NoteCard;
