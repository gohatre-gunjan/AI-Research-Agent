import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [topic, setTopic] = useState('')
  const [result, setResult] = useState('')
  const [sources, setSources] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [history, setHistory] = useState([])
  const [showHistory, setShowHistory] = useState(false)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    const savedHistory = localStorage.getItem('researchHistory')

    if (savedHistory) {
      try {
        setHistory(JSON.parse(savedHistory))
      } catch (err) {
        console.error('Failed to load research history:', err)
        localStorage.removeItem('researchHistory')
      }
    }
  }, [])

  const handleResearch = async () => {
    if (!topic.trim()) {
      alert('Please enter a research topic.')
      return
    }

    setLoading(true)
    setResult('')
    setSources([])
    setError('')
    setCopied(false)
    setShowHistory(false)

    try {
      const backendUrl = import.meta.env.VITE_BACKEND_URL?.replace(/\/$/, '')

      if (!backendUrl) {
        throw new Error(
          'VITE_BACKEND_URL is missing. Check the Vercel environment variable.'
        )
      }

      const response = await fetch(
        `${backendUrl}/research?topic=${encodeURIComponent(topic)}`,
        {
          method: 'POST',
        }
      )

      if (!response.ok) {
        let errorMessage = `Backend returned HTTP ${response.status}`

        try {
          const errorData = await response.json()

          if (errorData.detail) {
            errorMessage = errorData.detail
          }
        } catch {
          // Ignore JSON parsing errors
        }

        throw new Error(errorMessage)
      }

      const data = await response.json()

      setResult(data.result || '')
      setSources(data.sources || [])

      const newResearch = {
        topic: topic,
        result: data.result || '',
        sources: data.sources || [],
        date: new Date().toLocaleString(),
      }

      const updatedHistory = [
        newResearch,
        ...history.filter(
          (item) => item.topic.toLowerCase() !== topic.toLowerCase()
        ),
      ].slice(0, 10)

      setHistory(updatedHistory)

      localStorage.setItem(
        'researchHistory',
        JSON.stringify(updatedHistory)
      )
    } catch (err) {
      console.error('Research request failed:', err)

      setError(`Backend error: ${err.message}`)
    } finally {
      setLoading(false)
    }
  }

  const openHistoryItem = (item) => {
    setTopic(item.topic)
    setResult(item.result)
    setSources(item.sources || [])
    setShowHistory(false)
    setError('')
    setCopied(false)
  }

  const clearHistory = () => {
    localStorage.removeItem('researchHistory')
    setHistory([])
  }

  const copyResearch = async () => {
    try {
      await navigator.clipboard.writeText(result)
      setCopied(true)

      setTimeout(() => {
        setCopied(false)
      }, 2000)
    } catch (err) {
      console.error('Copy failed:', err)
    }
  }

  return (
    <div className="app">

      <nav className="navbar">
        <div className="logo">
          🔬 ResearchAI
        </div>

        <div className="nav-links">
          <span
            onClick={() => setShowHistory(!showHistory)}
            className="nav-button"
          >
            History
          </span>

          <span>About</span>
        </div>
      </nav>

      {showHistory && (
        <div className="history-panel">

          <div className="history-header">
            <h2>📜 Research History</h2>

            {history.length > 0 && (
              <button onClick={clearHistory}>
                Clear History
              </button>
            )}
          </div>

          {history.length === 0 ? (
            <p className="empty-history">
              No research history yet.
            </p>
          ) : (
            <div className="history-list">

              {history.map((item, index) => (
                <div
                  key={index}
                  className="history-item"
                  onClick={() => openHistoryItem(item)}
                >
                  <strong>{item.topic}</strong>
                  <span>{item.date}</span>
                </div>
              ))}

            </div>
          )}

        </div>
      )}

      <main className="main-content">

        <div className="badge">
          ✨ AI-Powered Research Assistant
        </div>

        <h1>
          Research anything.
          <br />
          <span>Get answers with sources.</span>
        </h1>

        <p className="subtitle">
          Enter a topic and let AI search, analyze, and summarize
          information for you.
        </p>

        <div className="research-box">

          <input
            type="text"
            placeholder="What do you want to research?"
            value={topic}
            onChange={(event) => setTopic(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                handleResearch()
              }
            }}
          />

          <button
            onClick={handleResearch}
            disabled={loading}
          >
            {loading
              ? '⏳ Researching...'
              : '🔍 Start Research'}
          </button>

        </div>

        {error && (
          <div className="error-message">
            ❌ {error}
          </div>
        )}

        {result && (
          <div className="result-box">

            <div className="result-header">

              <h2>📚 Research Results</h2>

              <button
                className="copy-button"
                onClick={copyResearch}
              >
                {copied ? '✅ Copied!' : '📋 Copy'}
              </button>

            </div>

            <div className="result-text">
              {result}
            </div>

            {sources.length > 0 && (
              <div className="sources-section">

                <h2>🔗 Sources</h2>

                <div className="sources-list">

                  {sources.map((source, index) => (
                    <a
                      key={index}
                      href={source.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="source-card"
                    >

                      <span className="source-number">
                        {index + 1}
                      </span>

                      <span className="source-title">
                        {source.title || source.url}
                      </span>

                      <span className="source-arrow">
                        ↗
                      </span>

                    </a>
                  ))}

                </div>

              </div>
            )}

          </div>
        )}

        <div className="features">

          <div className="feature">
            <div className="feature-icon">🔎</div>
            <h3>Search</h3>
            <p>
              Find information from multiple sources.
            </p>
          </div>

          <div className="feature">
            <div className="feature-icon">🤖</div>
            <h3>Analyze</h3>
            <p>
              AI understands and organizes the information.
            </p>
          </div>

          <div className="feature">
            <div className="feature-icon">📚</div>
            <h3>Cite</h3>
            <p>
              Get your research with useful sources.
            </p>
          </div>

        </div>

      </main>

      <footer>
        <p>ResearchAI • AI Research Assistant</p>
      </footer>

    </div>
  )
}

export default App