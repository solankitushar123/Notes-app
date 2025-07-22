export const loadNotes = () => {
  try {
    const data = localStorage.getItem("notesAppData");
    if (!data) {
      return {
        notes: [],
        tags: [],
        selectedTags: [],
      };
    }

    const parsed = JSON.parse(data);

    return {
      notes: Array.isArray(parsed.notes) ? parsed.notes : [],
      tags: Array.isArray(parsed.tags) ? parsed.tags : [],
      selectedTags: Array.isArray(parsed.selectedTags)
        ? parsed.selectedTags
        : [],
    };
  } catch (error) {
    console.error("Error loading from localStorage:", error);
    return {
      notes: [],
      tags: [],
      selectedTags: [],
    };
  }
};

export const saveNotes = (state) => {
  try {
    const serialized = JSON.stringify(state);
    localStorage.setItem("notesAppData", serialized);
  } catch (error) {
    console.error("Error saving to localStorage:", error);
  }
};
