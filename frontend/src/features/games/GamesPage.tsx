import { useAppSelector } from "../../store/store"

export default function GamesPage() {
    const { games } = useAppSelector(state => state.games)

    return (
        <div>
            <h2>Game Page</h2>
            <ul>
                {games && games.map(game => (
                    <li key={game._id}>
                        <h4>{game.address}</h4>
                    </li>
                ))}
            </ul>
        </div>
    )
}