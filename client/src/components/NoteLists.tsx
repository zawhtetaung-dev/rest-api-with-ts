import { useEffect, useState } from "react"
import { createNote, deleteNote, getNotes, updateNote } from "../services/note";
import type { Note } from "../types/note";

const NoteLists = () => {

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [notes, setNotes] = useState<Note[]>([]);
    const [msg, setMsg] = useState("");
    const [refresh, setRefresh] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [editId, setEditId] = useState("");

    const makeRefresh = () =>{
      setRefresh(!refresh);
    }

    useEffect(()=>{
        const fetchNotes = async()=>
        {
            const data = await getNotes();
            setNotes(data);
            // console.log("Response Data : " , data);  
        }
        fetchNotes();
    }
,[refresh]);

    const submitHandler = async( e: React.FormEvent)=>{
      e.preventDefault();
      if (msg.trim().length === 0) {
        return
      }
      try {
        if (editMode) {
          await updateNote(editId, msg);
          setEditMode(false);
        }else{
        await createNote(msg);
        }
        setMsg("");
        makeRefresh();
      } catch (error) {
        console.error("Failed to add note:", error);
        throw new Error("Failed to Add new note.")
      }
    }

    const handlerEditMode = async(id : string, title : string) =>{
      setEditMode(true);
      setMsg(title);
      setEditId(id);
    }

    const handelDeleteNote = async(id : string)=>{
      await deleteNote(id);
      makeRefresh();
    }

  return (
    <div>
      <h2>NoteLists</h2>
      <ul>
        {notes.map((note,index)=>
          (<li key={index}>{note.title} 
          <button type="button" onClick={()=>handelDeleteNote(note._id)}>Delete</button>
          <button type="button" onClick={()=>handlerEditMode(note._id, note.title)}>Update</button>
          </li>))}
      </ul>
      <form onSubmit={submitHandler}>
        <input type="text" value={msg} onChange={(e)=>setMsg(e.target.value)} />
        <button>{ editMode? "Update" : "Create" }</button>
      </form>
    </div>
  )
}

export default NoteLists