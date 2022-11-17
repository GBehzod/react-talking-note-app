import React from 'react';
import NoteForm from "../components/NoteForm";
import {NoteData, Tag} from "../App";
import {useNote} from "../hooks/useNote";

type EditNoteProps = {
    onSubmit: (id: string, data: NoteData) => void
    onAddTag: (tag: Tag) => void
    availableTags: Tag[]
}

const EditNoteView = ({onSubmit, onAddTag, availableTags}: EditNoteProps) => {
    const note = useNote()
    return (
        <div>
            <h1 className="mb-4">Edit Note</h1>
            <NoteForm
                title={note.title}
                markdown={note.markdown}
                tags={note.tags}
                onSubmit={data => onSubmit(note.id, data)}
                availableTags={availableTags}
                onAddTag={onAddTag}
            />
        </div>
    );
};

export default EditNoteView;
