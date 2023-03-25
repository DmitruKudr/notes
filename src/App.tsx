import React, { FC, useState, useEffect } from 'react';
import './App.css';
import NoteCard from './components/NoteCard';
import data from './data.json'
import Note from './interfaces/iNote'

const App: FC = () => {
  const [notes, setNotes] = useState<Note[]>(data.notes);
  const [tags, setTags] = useState<string[]>(data.tags);
  const [filterTags, setFilterTags] = useState<string[]>([]);
  const [filterNotes, setFileterNotes] = useState<Note[]>(notes);
  const [inputText, setInputText] = useState<string>('')

  const addNewNote = () => {
    let id = Date.now();
    const newNote: Note = {
      id: id,
      title: 'new note',
      text: 'add some text... ' + filterTags.join(' '),
      tags: filterTags
    };
    setNotes([...notes, newNote]);
  }

  useEffect(() => {
      setFileterNotes(notes.filter(note => 
          note.tags.filter(tag => filterTags.includes(tag)).length === filterTags.length ? true : false
      ));
  }, [filterTags, notes]);

  const checkFilter = (tag: string) => {
      filterTags.includes(tag) ? setFilterTags(filterTags.filter(item => item !== tag)) : setFilterTags([...filterTags, tag]);
  }

  const onNoteEdit = (currentNote: Note) => {
      setNotes(notes.map(note => note.id === currentNote.id ? currentNote : note));
  }

  const onNoteDelete = (id: number) => {
      setNotes(notes.filter(note => note.id !== id))
  }

  return (
    <div className="App">
      <div className='hashtag-list'>
      {tags.map((tag, i) =>
          <>
            <input
              key={i} 
              id={`tag${i}`} 
              type='checkbox' 
              onChange={e => checkFilter(e.target.value)} 
              value={tag}
              className='checkbox'
            />
            <label htmlFor={`tag${i}`} className='hashtag-label'>
              {tag}
              <button 
                className='hashtag-button'
                value={tag}
                onClick={e => setTags(tags.filter(tag => tag !== e.currentTarget.value))}  
              >
                <i className="fa-solid fa-xmark fa-lg"/>
              </button>
            </label>
          </>
      )}
      <div className='input-wrapper'>
        <input 
          className='input' 
          placeholder='add new #tag' 
          value={inputText} 
          onChange={e => setInputText(e.target.value)}
          maxLength={15}
        />
        <button 
          className='input-button'
          onClick={() => setTags([...tags, inputText.startsWith('#') ? inputText : '#' + inputText])}
        >
          <i className="fa-solid fa-plus fa-lg" />
        </button>
      </div>
      </div>

      <div className='note-list'>
      {filterNotes.map(note => 
          <NoteCard key={note.id} note={note} onNoteEdit={onNoteEdit} onNoteDelete={onNoteDelete} />
      )}
      <button 
        className='add-newcard' 
        onClick={addNewNote}
      >
        <i className="fa-solid fa-plus"></i>
      </button>
      </div>
    </div>
  );
}

export default App;
