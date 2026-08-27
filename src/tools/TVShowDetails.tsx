import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ToolSidebar from '../components/ToolSidebar'

function TVShowDetails() {
    const { id } = useParams()

    const [show, setShow] = useState(null)
    const [episodes, setEpisodes] = useState([])
    const [selectedSeason, setSelectedSeason] = useState(null)
    const [loadingEpisodes, setLoadingEpisodes] = useState(false)

        useEffect(() => {
    async function getShowDetails() {
        const response = await fetch(
        `https://api.themoviedb.org/3/tv/${id}`,
        {
            headers: {
            Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
            accept: 'application/json',
            },
        }
        )

        const data = await response.json()

        console.log('Show details:', data)

        setShow(data)
    }

    getShowDetails()
    }, [id])

    if (!show) {
        return <p>Loading...</p>
    }

    async function getSeasonEpisodes(seasonNumber) {
    setLoadingEpisodes(true)

    const response = await fetch(
        `https://api.themoviedb.org/3/tv/${id}/season/${seasonNumber}`,
        {
        headers: {
            Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
            accept: 'application/json',
        },
        }
    )

    const data = await response.json()

    console.log('Season details:', data)

    setEpisodes(data.episodes)
    setLoadingEpisodes(false)
    }

    return (
        <div className='tool-layout'>
            <ToolSidebar />
            <main className="tool-main">
                <h1>TV Lookup Show Details</h1>
                <p className="tool-description">
                Lookup TV show information.
                </p>
                <h3>{show.name}</h3>

                <div className="show-details">
                <img
                    src={`https://image.tmdb.org/t/p/w500${show.poster_path}`}
                    alt={show.name}
                />

                <div className="show-info">
                    <p>First aired: {show.first_air_date}</p>
                    <p>Last aired: {show.last_air_date}</p>
                    <p>Status: {show.status}</p>
                    <p>Rating: {show.vote_average.toFixed(1)} / 10</p>
                    <p>
                    Genres: {show.genres.map((genre) => genre.name).join(', ')}
                    </p>
                    <p>{show.overview}</p>
                </div>
                </div>
                <section className='seasons-section'>
                    <h2>Seasons</h2>
                    <div className="seasons">

                        {show.seasons
                        .filter((season) => season.season_number !== 0)
                        .map((season) => (
                        <div className="season-card" key={season.id}>
                        {season.poster_path && (
                            <img
                            src={`https://image.tmdb.org/t/p/w200${season.poster_path}`}
                            alt={season.name}
                            />
                        )}

                        <div>
                            <button
                            type="button"
                            onClick={() => {
                                setEpisodes([])
                                setSelectedSeason(season)
                                getSeasonEpisodes(season.season_number)
                            }}
                            >
                            {season.name}
                            </button>

                            <p>Episodes: {season.episode_count}</p>
                            <p>Air date: {season.air_date}</p>
                        </div>
                        </div>
                        ))}
                        
                    </div>
                </section>
                    {selectedSeason && (
                    <div className="season-modal">
                    <div className="season-modal-content">

                        <div className="season-modal-header">
                        <h2>{selectedSeason.name}</h2>

                        <button
                            type="button"
                            className="close-button"
                            onClick={() => setSelectedSeason(null)}
                            aria-label="Close"
                        >
                            ×
                        </button>
                        </div>

                        <div className="episode-list">
                        {loadingEpisodes ? (
                            <p>Loading episodes...</p>
                        ) : (
                            episodes.map((episode) => (
                            <div className="episode-card" key={episode.id}>
                                {episode.still_path && (
                                <img
                                    src={`https://image.tmdb.org/t/p/w500${episode.still_path}`}
                                    alt={episode.name}
                                />
                                )}

                                <div className="episode-info">
                                <h3>
                                    Episode {episode.episode_number}: {episode.name}
                                </h3>

                                <p>{episode.air_date}</p>
                                <p>{episode.overview}</p>
                                </div>
                            </div>
                            ))
                        )}
                        </div>

                    </div>
                    </div>
                    )}
            </main>
        </div>
    )
}

export default TVShowDetails