import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Input } from '../components/ui/input'
import { Textarea } from '../components/ui/textarea'
import { Button } from '../components/ui/button'
import { Trash2, Plus } from 'lucide-react'

interface Note {
  id: string
  title: string
  content: string
  createdAt: Date
  updatedAt: Date
}

export function Notes() {
  const [notes, setNotes] = useState<Note[]>([])
  const [currentNote, setCurrentNote] = useState<Note | null>(null)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  // Load notes from localStorage on mount
  useEffect(() => {
    const savedNotes = localStorage.getItem('notes')
    if (savedNotes) {
      const parsedNotes = JSON.parse(savedNotes)
      // Convert date strings back to Date objects
      const notesWithDates = parsedNotes.map((note: Note) => ({
        ...note,
        createdAt: new Date(note.createdAt),
        updatedAt: new Date(note.updatedAt),
      }))
      setNotes(notesWithDates)
    }
  }, [])

  // Save notes to localStorage whenever they change
  useEffect(() => {
    if (notes.length > 0) {
      localStorage.setItem('notes', JSON.stringify(notes))
    }
  }, [notes])

  const handleNewNote = () => {
    setCurrentNote(null)
    setTitle('')
    setContent('')
  }

  const handleSaveNote = () => {
    if (!title.trim() && !content.trim()) {
      return
    }

    if (currentNote) {
      // Update existing note
      setNotes(notes.map(note =>
        note.id === currentNote.id
          ? { ...note, title, content, updatedAt: new Date() }
          : note
      ))
    } else {
      // Create new note
      const newNote: Note = {
        id: Date.now().toString(),
        title: title || 'Untitled',
        content,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
      setNotes([newNote, ...notes])
    }

    handleNewNote()
  }

  const handleSelectNote = (note: Note) => {
    setCurrentNote(note)
    setTitle(note.title)
    setContent(note.content)
  }

  const handleDeleteNote = (id: string) => {
    setNotes(notes.filter(note => note.id !== id))
    if (currentNote?.id === id) {
      handleNewNote()
    }
  }

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    }).format(date)
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Notes App</h1>
        <p className="text-muted-foreground">
          Create and manage your notes
        </p>
      </div>

      <div className="grid md:grid-cols-[300px_1fr] gap-6">
        {/* Notes List */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Your Notes</CardTitle>
              <Button size="icon" variant="outline" onClick={handleNewNote}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <CardDescription>
              {notes.length} {notes.length === 1 ? 'note' : 'notes'}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            {notes.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-8">
                No notes yet. Create your first note!
              </p>
            ) : (
              notes.map(note => (
                <div
                  key={note.id}
                  className={`p-3 rounded-lg border cursor-pointer transition-colors group ${
                    currentNote?.id === note.id
                      ? 'bg-accent border-primary'
                      : 'hover:bg-accent/50'
                  }`}
                  onClick={() => handleSelectNote(note)}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium truncate">{note.title}</h3>
                      <p className="text-sm text-muted-foreground truncate">
                        {note.content || 'Empty note'}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {formatDate(note.updatedAt)}
                      </p>
                    </div>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleDeleteNote(note.id)
                      }}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </div>
              ))
            )}
          </CardContent>
        </Card>

        {/* Note Editor */}
        <Card>
          <CardHeader>
            <CardTitle>
              {currentNote ? 'Edit Note' : 'New Note'}
            </CardTitle>
            <CardDescription>
              {currentNote
                ? `Last updated ${formatDate(currentNote.updatedAt)}`
                : 'Create a new note'
              }
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="title" className="text-sm font-medium">
                Title
              </label>
              <Input
                id="title"
                placeholder="Enter note title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="content" className="text-sm font-medium">
                Content
              </label>
              <Textarea
                id="content"
                placeholder="Write your note here..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="min-h-[300px] resize-none"
              />
            </div>

            <div className="flex gap-2">
              <Button onClick={handleSaveNote} className="flex-1">
                {currentNote ? 'Update Note' : 'Save Note'}
              </Button>
              <Button onClick={handleNewNote} variant="outline">
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
