import { useState, useEffect } from 'react'
import ToolSidebar from '../components/ToolSidebar'
import { Link, useSearchParams} from 'react-router-dom'

function TVShowLookup() {
  
    const TMDB_TOKEN = import.meta.env.VITE_TMDB_TOKEN

    const [search, setSearch] = useState('')
    const [shows, setShows] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [searchParams, setSearchParams] = useSearchParams()

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

async function searchShows(query) {
  if (!query.trim()) return

    setShows([])
    setError('')
    setLoading(true)

  try {
    const response = await fetch(
              `https://api.themoviedb.org/3/search/tv?query=${encodeURIComponent(query)}`,
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

    setShows(detailedShows)

    } catch (error) {
    console.error('TMDB request failed:', error)
    setError('Something went wrong. Please try again.')
    } finally {
    setLoading(false)
    }
}

    useEffect(() => {
      const query = searchParams.get('search')

      if (!query) {
        setSearch('')
        return
      }

      setSearch(query)
      searchShows(query)
    }, [searchParams])

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
                if (!search.trim()) return

                setSearchParams({ search: search.trim() })
              }
            }}
            />

            <div className="search-actions">
              <button
                type="button"
                className="encode-button"
                onClick={() => {
                  if (!search.trim()) return

                  setSearchParams({ search: search.trim() })
                }}
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
                    setSearchParams({})
                  }}
                >
                  Clear
                </button>
              )}
            </div>
            <div className="show-results">

                {!loading &&
                  !error &&
                  shows.length === 0 &&
                  searchParams.get('search') && (
                    <p>No TV shows found.</p>
                )}

                {error && (
                <p className="error-message">
                    {error}
                </p>
                )}

                {shows.map((show) => (
                <Link 
                  to={`/tv-show-lookup-details/${show.id}`}
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
            <section className="tool-about">
            <h2>About TV Show Lookup</h2>

            <h3>What is TV Show Lookup?</h3>
            <p>
                TV Show Lookup is a tool that allows you to search for and find information about your favorite TV shows.
            </p>

            <h3>How does TV Show Lookup work?</h3>
            <p>
                TV Show Lookup uses the {<a href="https://www.themoviedb.org/" target="_blank" rel="noopener noreferrer">
                TMDB (The Movie Database)</a>} API to fetch information about TV shows. 
                You can search for shows by name, and the tool will display relevant results with details 
                like ratings, genres, and overviews.
            </p>
            </section>
      </main>
    </div>
  )
}
export default TVShowLookup