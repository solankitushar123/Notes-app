import { configureStore } from "@reduxjs/toolkit";
import notesReducer from "../features/notes/notesSlice";
import { loadNotes, saveNotes } from "../utils/localStorage";

// Load the full notes state object
const persistedState = loadNotes();

const store = configureStore({
  reducer: {
    notes: notesReducer,
  },
  preloadedState: {
    notes: {
      notes: persistedState.notes || [],
      tags: persistedState.tags || [],
      selectedTags: persistedState.selectedTags || [],
    },
  },
});

// Persist the full notes state to localStorage on every update
store.subscribe(() => {
  const state = store.getState().notes;
  saveNotes(state);
});

export { store };
