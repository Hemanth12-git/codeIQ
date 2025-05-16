import { useState, useEffect } from 'react'
import "prismjs/themes/prism-tomorrow.css"
import Editor from "react-simple-code-editor"
import prism from "prismjs"
import Markdown from "react-markdown"
import rehypeHighlight from "rehype-highlight"
import "highlight.js/styles/github-dark.css"
import axios from 'axios'
import './App.css'

function App() {
  const [loading, setLoading] = useState(false)
  const [code, setCode] = useState(`function sum() {
  return 1 + 1
}`)
  const [review, setReview] = useState(``)

  useEffect(() => {
    prism.highlightAll()
  }, [])

  async function reviewCode() {
    setLoading(true)
    setReview("")
    try {
      const response = await axios.post('http://localhost:3000/ai/get-review', { code })
      setReview(response.data)
    } catch {
      setReview("Error fetching review")
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <header className="app-header">
        <h1>CodeIQ 🧠</h1>
        <p className="app-subtitle">Smart reviews. Smarter code</p>
      </header>
      <main>
        <div className="left">
          <Editor
            value={code}
            onValueChange={setCode}
            highlight={c => prism.highlight(c, prism.languages.javascript, "javascript")}
            padding={10}
            style={{
              fontFamily: '"Fira Code", monospace',
              fontSize: 16,
              border: "1px solid #ddd",
              borderRadius: "5px",
              height: "100%",
              width: "100%"
            }}
          />
          <div onClick={reviewCode} className="review">Review</div>
        </div>
        <div className="right">
          {loading
            ? <div className="loading-spinner">Reviewing your code...</div>
            : <Markdown rehypePlugins={[rehypeHighlight]}>{review}</Markdown>
          }
        </div>
      </main>
    </>
  )
}

export default App
