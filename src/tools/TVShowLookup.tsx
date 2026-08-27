import { useState } from 'react'
import ToolSidebar from '../components/ToolSidebar'
import { Link } from 'react-router-dom'

function TVShowLookup() {
  
    const TMDB_TOKEN = import.meta.env.VITE_TMDB_TOKEN

    const [search, setSearch] = useState('')
    const [shows, setShows] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [hasSearched, setHasSearched] = useState(false)

    const genres = {
    10759: 'Action & Adventure',
    16: 'Animation',
    35: 'Comedy',
    80: 'Crime',
    99: 'Documentary',
    18: 'Drama',
    10751: 'Family',
    10762: 'Kids',
    9648: 'Mystery',
    10763: 'News',
    10764: 'Reality',
    10765: 'Sci-Fi & Fantasy',
    10766: 'Soap',
    10767: 'Talk',
    10768: 'War & Politics',
    37: 'Western',
    }

async function searchShows() {
  if (!search.trim()) return

    setShows([])
    setError('')
    setLoading(true)
    setHasSearched(true)

  console.log('Searching for:', search)

  try {
    const response = await fetch(
              `https://api.themoviedb.org/3/search/tv?query=${encodeURIComponent(search)}`,
      {
        headers: {
          Authorization: `Bearer ${TMDB_TOKEN}`,
          accept: 'application/json',
        },
      }
    )

    if (!response.ok) {
        throw new Error(`TMDB request failed: ${response.status}`)
    }

    const data = await response.json()

    const detailedShows = await Promise.all(
         data.results.map(async (show) => {

        const response = await fetch(
        `https://api.themoviedb.org/3/tv/${show.id}`,
        {
            headers: {
            Authorization: `Bearer ${TMDB_TOKEN}`,
            accept: 'application/json',
        },
      }
    )

    if (!response.ok) {
        throw new Error(`TMDB detail request failed: ${response.status}`)
    }

    const details = await response.json()

    return {
      ...show,
      ...details,
    }
  })
)

    console.log('First detailed show:', detailedShows[0])

    setShows(detailedShows)

    console.log('Detailed shows:', detailedShows)

    } catch (error) {
    console.error('TMDB request failed:', error)
    setError('Something went wrong. Please try again.')
    } finally {
    setLoading(false)
    }
}

  return (
    <div className="tool-layout">
      <ToolSidebar />

      <main className="tool-main">
        <h1>TV Show Lookup</h1>

        <p className="tool-description">
          Lookup TV show information.
        </p>

        <div className="tool-panel">
            <input
            type='search'
            className='tool-input'
            placeholder="Enter TV show name"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => {
                if (e.key === 'Enter') {
                searchShows()
                }
            }}
            />

            <div className="search-actions">
              <button
                type="button"
                className="encode-button"
                onClick={searchShows}
                disabled={loading}
              >
                {loading ? 'Searching...' : 'Search'}
              </button>

              {(search || shows.length > 0 || error) && (
                <button
                  type="button"
                  className="encode-button"
                  onClick={() => {
                    setSearch('')
                    setShows([])
                    setError('')
                    setHasSearched(false)
                  }}
                >
                  Clear
                </button>
              )}
            </div>
            <div className="show-results">

                {!loading && !error && shows.length === 0 && hasSearched && (
                  <p>No TV shows found.</p>
                )}

                {error && (
                <p className="error-message">
                    {error}
                </p>
                )}

                {shows.map((show) => (
                <Link 
                  to={`/tv/${show.id}`}
                    className="show-card"
                    key={show.id}
                >
                    {show.poster_path && (
                    <img
                        src={`https://image.tmdb.org/t/p/w200${show.poster_path}`}
                        alt={show.name}
                    />
                    )}

                    <div className="show-info">
                    <h2>{show.name}</h2>

                    <p>
                    {show.first_air_date?.slice(0, 4)} -{' '}
                    {show.last_air_date?.slice(0, 4)} ({show.status})
                    </p>

                    <p>
                    {show.genre_ids.map((id) => genres[id]).join(', ')}
                    </p>

                    <p>Rating: {show.vote_average.toFixed(1)} / 10</p>

                    <p>{show.overview}</p>
                    </div>
                </Link>
                ))}
            </div>
        </div>

      </main>
    </div>
  )
}
export default TVShowLookup