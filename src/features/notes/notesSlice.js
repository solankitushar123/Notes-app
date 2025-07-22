import { createSlice } from "@reduxjs/toolkit";
import { loadNotes, saveNotes } from "../../utils/localStorage";
import { nanoid } from "nanoid";

const initialState = {
  notes: loadNotes(),
  selectedNoteId: null,
  filterTag: null,
  selectedTags: [],
  tags: [],
};

const notesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    addNote: (state, action) => {
      const newNote = {
        id: nanoid(),
        title: action.payload.title,
        body: action.payload.content, // ✅ fixed key name
        tags: action.payload.tags,
      };
      state.notes.push(newNote);

      const updatedTags = new Set();
      state.notes.forEach((note) => {
        note.tags?.forEach((tag) => updatedTags.add(tag));
      });
      state.tags = Array.from(updatedTags);

      saveNotes(state.notes);
    },

    deleteNote: (state, action) => {
      const noteId = action.payload;
      state.notes = state.notes.filter((note) => note.id !== noteId);

      const updatedTags = new Set();
      state.notes.forEach((note) => {
        note.tags?.forEach((tag) => updatedTags.add(tag));
      });
      state.tags = Array.from(updatedTags);

      if (state.selectedNoteId === noteId) {
        state.selectedNoteId = null;
      }

      saveNotes(state.notes);
    },

    updateNote: (state, action) => {
      const updatedNote = action.payload;
      const index = state.notes.findIndex((note) => note.id === updatedNote.id);
      if (index !== -1) {
        state.notes[index] = {
          ...updatedNote,
          body: updatedNote.content, // ✅ ensure consistent structure
        };

        const updatedTags = new Set();
        state.notes.forEach((note) => {
          note.tags?.forEach((tag) => updatedTags.add(tag));
        });
        state.tags = Array.from(updatedTags);

        saveNotes(state.notes);
      }
    },

    selectNote: (state, action) => {
      state.selectedNoteId = action.payload;
    },

    clearSelectedNote: (state) => {
      state.selectedNoteId = null;
    },

    setFilterTag: (state, action) => {
      state.filterTag = action.payload;
    },

    clearFilterTag: (state) => {
      state.filterTag = null;
    },

    setSelectedTags: (state, action) => {
      state.selectedTags = action.payload;
    },
  },
});

export const {
  addNote,
  deleteNote,
  updateNote,
  selectNote,
  clearSelectedNote,
  setFilterTag,
  clearFilterTag,
  setSelectedTags,
} = notesSlice.actions;

export const selectNoteById = (state, id) =>
  state.notes.notes.find((note) => note.id === id);

export default notesSlice.reducer;
