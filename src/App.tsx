import React, {useMemo} from 'react';
import "bootstrap/dist/css/bootstrap.min.css"
import {Navigate, Route, Routes} from "react-router-dom";
import {Container} from "react-bootstrap";
import NewNoteView from "./views/NewNoteView";
import useLocalStorage from "./hooks/useLocalStorage";
import {v4 as uuidV4} from "uuid"
import NoteListView from "./views/NoteListView";
import NoteLayout from "./layout/NoteLayout";
import NoteView from "./views/NoteView";
import EditNoteView from "./views/EditNoteView";


export type Note = {
    id: string
} & NoteData

export type RawNote = {
    id: string
} & RawNoteData

export type RawNoteData = {
    title: string,
    markdown: string,
    tagIds: string[]
}

export type NoteData = {
    title: string,
    markdown: string,
    tags: Tag[]
}

export type Tag = {
    id: string,
    label: string
}

const App = () => {
    const [notes, setNotes] = useLocalStorage<RawNote[]>("NOTES", []);
    const [tags, setTags] = useLocalStorage<Tag[]>("TAGS", []);

    const notesWithTags = useMemo(() => {
        return notes.map(note => (
            {...note, tags: tags.filter(tag => note.tagIds.includes(tag.id))}
        ))
    }, [notes, tags]);

    const onCreateNote = ({tags, ...data}: NoteData) => {
        setNotes(prevNotes => ([
            ...prevNotes, {...data, id: uuidV4(), tagIds: tags.map(tag => tag.id)}
        ]))
    }

    const onUpdateNote = (id: string, {tags, ...data}: NoteData) => {
        setNotes(prevState => {
            return prevState.map(note => {
                if (note.id === id) {
                    return {...note, ...data, tagIds: tags.map(tag => tag.id)}
                } else {
                    return note
                }
            })
        })
    }

    const onDeleteNote = (id: string) => {
        setNotes(prevNote => prevNote.filter(note => note.id !== id))
    }

    const addTag = (tag: Tag) => {
        setTags(prev => [...prev, tag])
    }

    const updateTag = (id: string, label: string) => {
        setTags(prev => (
            prev.map(tag => {
                    if (tag.id === id) {
                        return {...tag, label}
                    } else {
                        return tag
                    }
                }
            )
        ))
    }

    const deleteTag = (id: string) => {
        setTags(prev => prev.filter(tag => tag.id !== id))
    }

    return (
        <Container className="my-4">
            <Routes>
                <Route index element={
                    <NoteListView
                        updateTag={updateTag}
                        deleteTag={deleteTag}
                        notes={notesWithTags}
                        availableTags={tags}
                    />}/>
                <Route path="/new"
                       element={<NewNoteView onSubmit={onCreateNote} onAddTag={addTag} availableTags={tags}/>}/>
                <Route path="/:id" element={<NoteLayout notes={notesWithTags}/>}>
                    <Route index element={<NoteView onDelete={onDeleteNote}/>}/>
                    <Route path="edit"
                           element={<EditNoteView onSubmit={onUpdateNote} onAddTag={addTag} availableTags={tags}/>}/>
                </Route>
                <Route path="*" element={<Navigate to="/"/>}/>
            </Routes>
        </Container>
    )
}

export default App
