import Notes from "../Notes/Notes";

export default function NoteList(props) {
  const pinnedNotes = props.notes.filter(function (note) {
    if (props.search.length > 0 && note.pin) {
      return (
        note.title.includes(props.search) ||
        note.description.includes(props.search)
      );
    }
    return note.pin;
  });

  const unpinnedNotes = props.notes.filter(function (note) {
    if (props.search.length > 0 && !note.pin) {
      return (
        note.title.includes(props.search) ||
        note.description.includes(props.search)
      );
    }
    return !note.pin;
  });

  return (
    <div>
      <Notes
        label={"PINNED"}
        notes={props.notes}
        setNotes={props.setNotes}
        filterednotes={pinnedNotes}
        layout={props.layout}
      />
      <Notes
        label={"OTHERS"}
        notes={props.notes}
        setNotes={props.setNotes}
        filterednotes={unpinnedNotes}
        layout={props.layout}
      />
    </div>
  );
}
