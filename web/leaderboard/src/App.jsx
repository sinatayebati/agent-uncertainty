import { useState, useEffect } from 'react'
import './App.css'
import TrajectoryVisualizer from './components/TrajectoryVisualizer'
import Leaderboard from './components/Leaderboard'

function App() {
  
  // Initialize currentView based on URL hash
  const getInitialView = () => {
    const hash = window.location.hash.slice(1) // Remove the '#'
    if (hash === 'leaderboard') return 'leaderboard'
    if (hash === 'trajectory-visualizer') return 'trajectory-visualizer'
    // Redirect deprecated routes to home
    if (hash === 'results' || hash === 'docs') {
      window.history.replaceState(null, '', '#home')
      return 'home'
    }
    return 'home'
  }
  
  const [currentView, setCurrentView] = useState(getInitialView())
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Handle navigation with URL updates
  const navigateTo = (view) => {
    setCurrentView(view)
    setMobileMenuOpen(false) // Close mobile menu when navigating
    if (view === 'home') {
      window.history.pushState(null, '', '#home')
    } else if (view === 'leaderboard') {
      window.history.pushState(null, '', '#leaderboard')
    } else if (view === 'trajectory-visualizer') {
      window.history.pushState(null, '', '#trajectory-visualizer')
    }
  }

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }



  // Listen for browser back/forward button clicks and handle mobile menu
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1)
      if (hash === 'leaderboard') {
        setCurrentView('leaderboard')
      } else if (hash === 'trajectory-visualizer') {
        setCurrentView('trajectory-visualizer')
      } else if (hash === 'results' || hash === 'docs') {
        // Redirect deprecated routes to home
        window.history.replaceState(null, '', '#home')
        setCurrentView('home')
      } else {
        setCurrentView('home')
      }
    }

    const handlePopState = () => {
      handleHashChange()
    }

    // Close mobile menu when clicking outside
    const handleClickOutside = (event) => {
      if (mobileMenuOpen && !event.target.closest('.nav-container')) {
        setMobileMenuOpen(false)
      }
    }

    // Listen to events
    window.addEventListener('hashchange', handleHashChange)
    window.addEventListener('popstate', handlePopState)
    document.addEventListener('click', handleClickOutside)

    // Set initial URL if none exists
    if (!window.location.hash) {
      window.history.replaceState(null, '', '#home')
    }

    return () => {
      window.removeEventListener('hashchange', handleHashChange)
      window.removeEventListener('popstate', handlePopState)
      document.removeEventListener('click', handleClickOutside)
    }
  }, [mobileMenuOpen])

  return (
    <div className="App">
      {/* Navigation */}
      <nav className="navbar">
        <div className="nav-container">
          <div className="nav-logo">
            <div className="logo-main" onClick={() => navigateTo('home')}>
              <span className="tau-symbol">τ</span>
              <span className="bench-text">-bench</span>
            </div>
            <a href="https://sierra.ai" target="_blank" rel="noopener noreferrer" className="logo-attribution">
              <img src={`${import.meta.env.BASE_URL}sierra_logo.jpeg`} alt="Sierra" className="sierra-logo" />
              <span className="from-text">from Sierra</span>
            </a>
          </div>
          <button className="mobile-menu-toggle" onClick={toggleMobileMenu}>
            <span></span>
            <span></span>
            <span></span>
          </button>
          <div className={`nav-links ${mobileMenuOpen ? '' : 'mobile-hidden'}`}>
            <button onClick={() => navigateTo('home')} className={`nav-link ${currentView === 'home' ? 'active' : ''}`}>Overview</button>
            <button onClick={() => navigateTo('leaderboard')} className={`nav-link ${currentView === 'leaderboard' ? 'active' : ''}`}>Leaderboard</button>
            <button onClick={() => navigateTo('trajectory-visualizer')} className={`nav-link ${currentView === 'trajectory-visualizer' ? 'active' : ''}`}>Visualizer</button>
            <a href="https://github.com/sierra-research/tau2-bench" target="_blank" rel="noopener noreferrer" onClick={() => setMobileMenuOpen(false)}>GitHub</a>
          </div>
        </div>
      </nav>

      {/* Update Notification */}
      <div className="update-notification">
        <div className="notification-container">
          <span className="notification-badge">NEW</span>
          <span className="notification-text">
            τ-bench now supports telecom domain, introduced by the{' '}
            <a href="https://arxiv.org/abs/2506.07982" target="_blank" rel="noopener noreferrer" className="notification-link">τ²-bench paper</a>.
          </span>
        </div>
      </div>

      {/* Conditional Content Rendering */}
      {currentView === 'home' ? (
        <>
          {/* Hero Section */}
          <section className="hero">
            <div className="hero-container-vertical">
              <div className="hero-content-vertical">
                <div className="hero-title-section">
                  <h1 className="hero-main-title">
                    <span className="tau-symbol">τ</span>
                    <span className="bench-text">-bench</span>
                  </h1>
                </div>
                
                <div className="hero-image-section">
                  <img src={`${import.meta.env.BASE_URL}traj.png`} alt="Sample τ-bench Trajectories" className="trajectory-image" />
                </div>
                
                <div className="hero-description-section">
                  <p className="hero-description">
                    Benchmarking AI agents in collaborative real-world scenarios. 
                    τ-bench challenges agents to coordinate, guide, and assist users 
                    in achieving shared objectives across complex enterprise domains.
                  </p>
                  <div className="hero-actions">
                    <div className="button-row">
                      <a href="https://github.com/sierra-research/tau2-bench" target="_blank" rel="noopener noreferrer">
                        <button className="btn-primary">View on GitHub</button>
                      </a>
                      <button onClick={() => navigateTo('leaderboard')} className="btn-secondary">
                        View Leaderboard
                      </button>
                      <a href="https://github.com/sierra-research/tau2-bench?tab=readme-ov-file#leaderboard-submission" target="_blank" rel="noopener noreferrer">
                        <button className="btn-secondary">Submit Results</button>
                      </a>
                    </div>
                    <div className="button-row">
                      <a href="https://arxiv.org/abs/2506.07982" target="_blank" rel="noopener noreferrer">
                        <button className="btn-secondary">Read Paper</button>
                      </a>
                      <a href="https://sierra.ai/uk/blog/benchmarking-ai-agents" target="_blank" rel="noopener noreferrer">
                        <button className="btn-secondary">Read Blog Post</button>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

      {/* News Section */}
      <section className="news">
        <div className="container">
          <div className="news-block">
            <div className="news-header">
              <h3>Recent News</h3>
            </div>
            
            <div className="news-content">
              <div className="news-list">
                <a href="https://sierra.ai/resources/research/tau-squared-bench" target="_blank" rel="noopener noreferrer" className="news-item">
                  <div className="news-icon">🎉</div>
                  <div className="news-text">
                    <strong>τ-bench leaderboard released: Track model performance and submit your results across retail, airline, and telecom domains</strong>
                    <span>October 3, 2025</span>
                  </div>
                  <div className="news-arrow">→</div>
                </a>
                <a href="https://openai.com/gpt-5" target="_blank" rel="noopener noreferrer" className="news-item">
                  <div className="news-icon">🏆</div>
                  <div className="news-text">
                    <strong>GPT-5 achieves state-of-the-art performance on τ-bench, setting new records with 96% on telecom, 82% on retail, and 63% on airline</strong>
                    <span>January 15, 2025</span>
                  </div>
                  <div className="news-arrow">→</div>
                </a>
                <a href="https://sierra.ai/resources/research/tau-squared-bench" target="_blank" rel="noopener noreferrer" className="news-item">
                  <div className="news-icon">🚀</div>
                  <div className="news-text">
                    <strong>τ-bench launched: Evaluating agents in dual-control environments, testing coordination and collaboration with tool-accessing user simulators</strong>
                    <span>June 11, 2025</span>
                  </div>
                  <div className="news-arrow">→</div>
                </a>
                <a href="https://openreview.net/forum?id=roNSXZpUDN" target="_blank" rel="noopener noreferrer" className="news-item">
                  <div className="news-icon">📊</div>
                  <div className="news-text">
                    <strong>τ-bench paper accepted to ICLR 2025!</strong>
                    <span>December 22, 2024</span>
                  </div>
                  <div className="news-arrow">→</div>
                </a>
                <a href="https://sierra.ai/blog/benchmarking-ai-agents" target="_blank" rel="noopener noreferrer" className="news-item">
                  <div className="news-icon">🏢</div>
                  <div className="news-text">
                    <strong>Original τ-bench released: Comprehensive benchmark for evaluating AI agents in realistic dynamic environments with users and tools</strong>
                    <span>June 20, 2024</span>
                  </div>
                  <div className="news-arrow">→</div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

        </>
      ) : currentView === 'leaderboard' ? (
        <Leaderboard />
      ) : currentView === 'trajectory-visualizer' ? (
        <TrajectoryVisualizer />
      ) : null}

      {/* Simple Footer */}
      <footer className="simple-footer">
        <div className="container">
          <p>
            For questions or feedback, contact{' '}
            <a href="mailto:victor@sierra.ai" className="footer-email">
              victor@sierra.ai
            </a>
            {' '}or{' '}
            <a href="mailto:ben.s@sierra.ai" className="footer-email">
              ben.s@sierra.ai
            </a>
          </p>
        </div>
      </footer>

    </div>
  )
}

export default App
