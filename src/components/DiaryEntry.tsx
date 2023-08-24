import React, { useState } from 'react';
import '../css/Diary.css'

// Gives the wanted structure to the entry object where date and the content of the diary entry will be visible
interface Entry {
    date: string;
    title: string;
    content: string;
  }

function DiaryEntry() {
  // State management variables which will be modified and updated
  const [value, setValue] = useState('');
  const [entries, setEntries] = useState<Entry[]>([]);
  const [title, setTitle] = useState('');

  // Creates the diary entry and adds the entries to array
  const handleSubmit = () => {
    const newEntry: Entry = {
        date: new Date().toLocaleString(),
        title: title,
        content: value
      };
  
    setEntries(previousEntries => [...previousEntries, newEntry]);
    setValue('');
    setTitle('');
  }
  
  // 
  const DiaryEntryComponent: React.FC<{ entry: Entry }> = ({ entry }) => (
    <div>
      <div className='entryDate'>{entry.date}</div>
      <div className='entryTitle'>• {entry.title} •</div>
      <div className='entryText'>{entry.content}</div>
      <hr />
    </div>
  );

  return (
    <div className='textEditor'>
        <h1 className="diaryDesc">Diary.</h1>
        <input type="text" 
            className='diaryTitleInput'
            placeholder='Diary title'
            value={title}
            onChange={(e) => setTitle(e.target.value)}>
        </input>
        <textarea 
            className="writingSpace" 
            placeholder='Write your thoughts here'
            value={value}
            onChange={(e) => setValue(e.target.value)}>
        </textarea>
        <button className='submitButton' onClick={handleSubmit}>Submit</button>
        
        <div className='entriesContainer'>
            {entries.map((entry, index) => (
                <DiaryEntryComponent key={index} entry={entry} />
            ))}
        </div>
    </div>
    
);

}

export default DiaryEntry;