import { useEffect, useState } from 'react'

const formatCount = (num) => {
  if (!num) return '0'
  const n = parseInt(num)
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + 'M'
  if (n >= 1_000) return (n / 1_000).toFixed(1) + 'K'
  return n.toString()
}

const timeAgo = (dateStr) => {
  if (!dateStr) return ''
  const diff = Date.now() - new Date(dateStr).getTime()
  const days = Math.floor(diff / 86400000)
  if (days >= 365) return `${Math.floor(days / 365)} year${Math.floor(days / 365) > 1 ? 's' : ''} ago`
  if (days >= 30) return `${Math.floor(days / 30)} month${Math.floor(days / 30) > 1 ? 's' : ''} ago`
  if (days >= 1) return `${days} day${days > 1 ? 's' : ''} ago`
  return 'Today'
}

const SkeletonCard = () => (
  <div style={styles.card}>
    <div style={{ ...styles.thumbnail, background: '#272727', animation: 'pulse 1.5s ease-in-out infinite' }} />
    <div style={styles.cardBody}>
      <div style={{ display: 'flex', gap: 10 }}>
        <div style={{ width: 36, height: 36, borderRadius: '50%', background: '#272727', flexShrink: 0, animation: 'pulse 1.5s ease-in-out infinite' }} />
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div style={{ height: 14, background: '#272727', borderRadius: 4, width: '90%', animation: 'pulse 1.5s ease-in-out infinite' }} />
          <div style={{ height: 14, background: '#272727', borderRadius: 4, width: '60%', animation: 'pulse 1.5s ease-in-out infinite' }} />
          <div style={{ height: 12, background: '#272727', borderRadius: 4, width: '40%', animation: 'pulse 1.5s ease-in-out infinite' }} />
        </div>
      </div>
    </div>
  </div>
)

const VideoCard = ({ video }) => {
  const [hovered, setHovered] = useState(false)
  const snippet = video.items?.snippet || {}
  const stats = video.items?.statistics || {}
  const thumb = snippet.thumbnails?.medium?.url || snippet.thumbnails?.default?.url || ''
  const initials = (snippet.channelTitle || 'C').slice(0, 2).toUpperCase()

  return (
    <div
      style={{ ...styles.card, transform: hovered ? 'translateY(-2px)' : 'translateY(0)', transition: 'transform 0.2s ease' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={{ position: 'relative' }}>
        {thumb ? (
          <img src={thumb} alt={snippet.title} style={styles.thumbnail} />
        ) : (
          <div style={{ ...styles.thumbnail, background: '#272727', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ color: '#717171', fontSize: 24 }}>▶</span>
          </div>
        )}
      </div>

      <div style={styles.cardBody}>
        <div style={{ display: 'flex', gap: 10 }}>
          <div style={styles.avatar}>{initials}</div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <p style={styles.title} title={snippet.title}>
              {snippet.title?.length > 72 ? snippet.title.slice(0, 72) + '…' : snippet.title}
            </p>
            <p style={styles.channel}>{snippet.channelTitle}</p>
            <p style={styles.meta}>
              {formatCount(stats.viewCount)} views · {timeAgo(snippet.publishedAt)}
            </p>
          </div>
        </div>

        <div style={styles.statsRow}>
          <span style={styles.statBadge}>
            <span style={{ color: '#aaa', fontSize: 13 }}>👍</span> {formatCount(stats.likeCount)}
          </span>
          <span style={styles.statBadge}>
            <span style={{ color: '#aaa', fontSize: 13 }}>💬</span> {formatCount(stats.commentCount)}
          </span>
          <span style={styles.statBadge}>
            <span style={{ color: '#aaa', fontSize: 13 }}>👁</span> {formatCount(stats.viewCount)}
          </span>
        </div>
      </div>
    </div>
  )
}

function App() {
  const [videos, setVideos] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    const controller = new AbortController()
    const fetchVideos = async () => {
      try {
        const response = await fetch('https://api.freeapi.app/api/v1/public/youtube/videos', { signal: controller.signal })
        const data = await response.json()
        setVideos(data.data.data)
      } catch (error) {
        if (error.name === 'AbortError') return
        setError(error)
      }
    }
    fetchVideos()
    return () => controller.abort()
  }, [])

  return (
    <div style={styles.page}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #0f0f0f; }
        @keyframes pulse { 0%,100% { opacity: 1 } 50% { opacity: 0.4 } }
      `}</style>

      <header style={styles.header}>
        <div style={styles.headerInner}>
          <div style={styles.logo}>
            <svg width="90" height="20" viewBox="0 0 90 20" fill="none">
              <rect width="24" height="20" rx="4" fill="#FF0000"/>
              <polygon points="10,5 10,15 18,10" fill="white"/>
              <text x="28" y="15" fill="white" fontSize="14" fontWeight="700" fontFamily="Roboto, sans-serif">YouTube</text>
            </svg>
          </div>
          <div style={styles.searchBar}>
            <input
              type="text"
              placeholder="Search"
              style={styles.searchInput}
            />
            <button style={styles.searchBtn}>🔍</button>
          </div>
          <div style={{ width: 90 }} />
        </div>
      </header>

      <main style={styles.main}>
        {error && (
          <div style={styles.error}>
            ⚠️ Failed to load videos. Please try again.
          </div>
        )}

        <div style={styles.grid}>
          {!videos
            ? Array.from({ length: 12 }).map((_, i) => <SkeletonCard key={i} />)
            : videos.map((video) => <VideoCard key={video.id} video={video} />)
          }
        </div>
      </main>
    </div>
  )
}

const styles = {
  page: {
    minHeight: '100vh',
    background: '#0f0f0f',
    fontFamily: "'Roboto', sans-serif",
    color: '#fff',
  },
  header: {
    position: 'sticky',
    top: 0,
    zIndex: 100,
    background: '#0f0f0f',
    borderBottom: '1px solid #272727',
    height: 56,
    display: 'flex',
    alignItems: 'center',
    padding: '0 16px',
  },
  headerInner: {
    width: '100%',
    maxWidth: 1400,
    margin: '0 auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 16,
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    width: 90,
  },
  searchBar: {
    display: 'flex',
    flex: 1,
    maxWidth: 540,
    height: 36,
    borderRadius: 20,
    overflow: 'hidden',
    border: '1px solid #303030',
  },
  searchInput: {
    flex: 1,
    background: '#121212',
    border: 'none',
    outline: 'none',
    color: '#fff',
    padding: '0 16px',
    fontSize: 14,
    fontFamily: "'Roboto', sans-serif",
  },
  searchBtn: {
    background: '#272727',
    border: 'none',
    borderLeft: '1px solid #303030',
    color: '#fff',
    padding: '0 16px',
    cursor: 'pointer',
    fontSize: 14,
  },
  main: {
    maxWidth: 1400,
    margin: '0 auto',
    padding: '24px 16px',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: '20px 16px',
  },
  card: {
    background: 'transparent',
    borderRadius: 8,
    overflow: 'hidden',
    cursor: 'pointer',
  },
  thumbnail: {
    width: '100%',
    aspectRatio: '16/9',
    objectFit: 'cover',
    display: 'block',
    borderRadius: 8,
  },
  cardBody: {
    padding: '10px 4px 4px',
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: '50%',
    background: '#FF0000',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 12,
    fontWeight: 700,
    color: '#fff',
    flexShrink: 0,
    letterSpacing: 0.5,
  },
  title: {
    fontSize: 14,
    fontWeight: 500,
    color: '#fff',
    lineHeight: 1.4,
    marginBottom: 2,
  },
  channel: {
    fontSize: 13,
    color: '#aaa',
    marginBottom: 2,
  },
  meta: {
    fontSize: 13,
    color: '#aaa',
  },
  statsRow: {
    display: 'flex',
    gap: 8,
    marginTop: 4,
  },
  statBadge: {
    fontSize: 12,
    color: '#aaa',
    background: '#272727',
    borderRadius: 20,
    padding: '3px 10px',
    display: 'flex',
    alignItems: 'center',
    gap: 4,
  },
  error: {
    textAlign: 'center',
    color: '#ff4444',
    padding: '40px',
    fontSize: 15,
  },
}

export default App