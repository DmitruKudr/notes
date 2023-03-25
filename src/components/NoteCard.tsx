import React, { FC, useState, useEffect } from 'react';
import Note from '../interfaces/iNote'

const NoteCard: FC<{note: Note, onNoteEdit: (note: Note) => void, onNoteDelete: (id: number) => void}> = ({note, onNoteEdit, onNoteDelete}) => {
    const [title, setTitle] = useState<string>(note.title)
    const [text, setText] = useState<string>(note.text);
    const [tags, setTags] = useState<string[]>(note.tags);

    useEffect(() => {
        onNoteEdit({...note, title, text, tags});
        // eslint-disable-next-line
    }, [tags])

    const saveTags = () => {
        setTags([...text.split(' ').filter(tag => tag.startsWith('#'))]);
    }

    return (
        <div className='note-card'>
          
          <div className='note-title-wrapper'>
            <input 
              className='note-title'
              value={title}
              onChange={e => setTitle(e.target.value)}
              maxLength={15}
            />
            <button 
              className='save-button'
              onClick={saveTags}
            >
              <i className="fa-regular fa-floppy-disk" />
            </button>
            <button 
              className='delete-button'
              onClick={() => onNoteDelete(note.id)}
            >
              <i className="fa-solid fa-trash" />
            </button>
          </div>

          <div className='note-textfield-wrapper'>

            <div className='note-text'>
              {text.split(' ').map((word, i) => 
                  word.startsWith('#') ? <><span className='hashtag' key={i}>{word}</span> </> : <>{word} </>
              )}
            </div>

            <textarea
              className='note-textfield'
              value={text}
              maxLength={154}
              onChange={e => setText(e.target.value)}
            />

          </div>

          <div className='note-tags'>
            {tags.map((tag, i) =>
                <><span className='hashtag' key={i}>{tag}</span> </>
            )}
          </div>

        </div>
    )
}

export default NoteCard