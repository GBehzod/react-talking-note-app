import React from 'react';
import NoteForm from "../components/NoteForm";
import {NoteData, Tag} from "../App";

type NewNoteProps = {
    onSubmit: (data: NoteData) => void
    onAddTag: (tag: Tag) => void
    availableTags: Tag[]
}

const NewNoteView = ({onSubmit, onAddTag, availableTags}: NewNoteProps) => {
    return (
        <div>
            <h1 className="mb-4">New Note</h1>
            <NoteForm onSubmit={onSubmit} availableTags={availableTags} onAddTag={onAddTag}/>
        </div>
    );
};

export default NewNoteView;
