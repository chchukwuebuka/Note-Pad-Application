import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function NotePad() {
  const dispatch = useDispatch();
  const { notes, newNote, bold, italic, underline } = useSelector((state) => state);
  const [mediaURL, setMediaURL] = useState('');
  const [selectedNoteIndex, setSelectedNoteIndex] = useState(null);
  const [editedNote, setEditedNote] = useState('');

  const handleAddNote = () => {
    if (newNote.trim() !== '') {
      dispatch({ type: 'ADD_NOTE', payload: { text: newNote, mediaURL: mediaURL } });
      setMediaURL('');
    }
  };

  const handleEditNote = (index) => {
    setSelectedNoteIndex(index);
    setEditedNote(notes[index].text);
  };

  const handleUpdateNote = () => {
    if (editedNote.trim() !== '') {
      dispatch({ type: 'EDIT_NOTE', payload: { index: selectedNoteIndex, newText: editedNote } });
      setSelectedNoteIndex(null);
      setEditedNote('');
    }
  };

  const handleDeleteNote = (index) => {
    dispatch({ type: 'DELETE_NOTE', payload: { index } });
  };

  const handleToggleBold = () => {
    dispatch({ type: 'UPDATE_NOTE', payload: { field: 'bold', value: !bold } });
  };

  const handleToggleItalic = () => {
    dispatch({ type: 'UPDATE_NOTE', payload: { field: 'italic', value: !italic } });
  };

  const handleToggleUnderline = () => {
    dispatch({ type: 'UPDATE_NOTE', payload: { field: 'underline', value: !underline } });
  };

  const handleMediaUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setMediaURL(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className='main'>
       <div className='BTN'>
        
        <button onClick={handleToggleBold} className='BTN-1' >Bold</button>
        <button onClick={handleToggleItalic} className='BTN-1'>Italic</button>
        <button onClick={handleToggleUnderline} className='BTN-1'>Underline</button>
        <button onClick={handleAddNote} className='BTN-1' >Add Note</button>
      </div>
     
    <div>
      <textarea
        value={newNote}
        onChange={(e) => dispatch({ type: 'UPDATE_NOTE', payload: { field: 'newNote', value: e.target.value } })}
        style={{
          fontWeight: bold ? 'bold' : 'normal',
          fontStyle: italic ? 'italic' : 'normal',
          textDecoration: underline ? 'underline' : 'none',
        }}
        />
        
        <input type="file" accept="image/*, video/*" onChange={handleMediaUpload} className='videos' />


          <div  className='h2'>
        <h2>Notes:</h2>
        <ul>
          {notes.map((note, index) => (
            <li key={index}>
              {selectedNoteIndex === index ? (
                <div>
                  <textarea
                    value={editedNote}
                    onChange={(e) => setEditedNote(e.target.value)}
                    className='edited-note'
                  />
                  <button onClick={handleUpdateNote} className='BTN-2'>Save</button>
                  <button onClick={() => setSelectedNoteIndex(null)} className='BTN-2'>Cancel</button>
                </div>
              ) : (
                <div>
                  <p style={{ fontWeight: note.formatting.bold ? 'bold' : 'normal', fontStyle: note.formatting.italic ? 'italic' : 'normal', textDecoration: note.formatting.underline ? 'underline' : 'none' }}>
                    {note.text}
                  </p>
                  {note.mediaURL && (
                    <div>
                      {note.mediaURL.startsWith('data:image') ? (
                        <img src={note.mediaURL} alt="note-media" />
                      ) : note.mediaURL.startsWith('data:video') && (
                        <video controls>
                          <source src={note.mediaURL} type="video/mp4" />
                          Your browser does not support the video tag.
                        </video>
                      )}
                    </div>
                  )}
                  <button onClick={() => handleEditNote(index)} className='BTN-2'>Edit</button>
                  <button onClick={() => handleDeleteNote(index)} className='BTN-2'>Delete</button>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
    </div>
  );
}

export default NotePad;