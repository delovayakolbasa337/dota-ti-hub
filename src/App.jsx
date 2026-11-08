import { useState, useEffect } from 'react';
import TournamentCard from './TournamentCard';
import DotaQuiz from './DotaQuiz';

// Принудительный импорт логотипов турниров
import ti2021 from './../public/ti2021.png';
import ti2022 from './../public/ti2022.png';
import ti2023 from './../public/ti2023.png';
import ti2024 from './../public/ti2024.png';
import ti2025 from './../public/ti2025.png';
import ti2026 from './../public/ti2026.png';

// Принудительный импорт размытых фонов карточек
import bg2021 from './../public/bg2021.png';
import bg2022 from './../public/bg2022.png';
import bg2023 from './../public/bg2023.png';
import bg2024 from './../public/bg2024.png';
import bg2025 from './../public/bg2025.png';
import bg2026 from './../public/bg2026.png';

// Принудительный импорт сеток плей-офф
import bracket2021 from './../public/bracket2021.png';
import bracket2022 from './../public/bracket2022.png';
import bracket2023 from './../public/bracket2023.png';
import bracket2024 from './../public/bracket2024.png';
import bracket2025 from './../public/bracket2025.png';
import bracket2026 from './../public/bracket2026.png';

const tournamentsData = [
    {
        id: 10, name: "The International 10", year: 2021, location: "Бухарест, Румыния", prizePool: "$40,018,195", winner: "Team Spirit", image: ti2021, bgImage: bg2021, bracketImage: bracket2021,
        teams: [
            { name: "Team Spirit", roster: ["Yatoro", "TORONTOTOKYO", "Collapse", "Mira", "Miposhka"] },
            { name: "PSG.LGD", roster: ["Ame", "NothingToSay", "Faith_bian", "XinQ", "y`"] }
        ]
    },
    {
        id: 11, name: "The International 11", year: 2022, location: "Сингапур", prizePool: "$18,930,775", winner: "Tundra Esports", image: ti2022, bgImage: bg2022, bracketImage: bracket2022,
        teams: [
            { name: "Tundra Esports", roster: ["skiter", "Nine", "33", "Saksa", "Sneyking"] },
            { name: "Team Secret", roster: ["Crystallis", "Nisha", "Resolut1on", "Zayac", "Puppey"] }
        ]
    },
    {
        id: 12, name: "The International 2023", year: 2023, location: "Сиэтл, США", prizePool: "$3,380,455", winner: "Team Spirit", image: ti2023, bgImage: bg2023, bracketImage: bracket2023,
        teams: [
            { name: "Team Spirit", roster: ["Yatoro", "Larl", "Collapse", "Mira", "Miposhka"] },
            { name: "Gaimin Gladiators", roster: ["dyrachyo", "Quinn", "Ace", "tOfu", "Seleri"] }
        ]
    },
    {
        id: 13, name: "The International 2024", year: 2024, location: "Копенгаген, Дания", prizePool: "$2,602,164", winner: "Team Liquid", image: ti2024, bgImage: bg2024, bracketImage: bracket2024,
        teams: [
            { name: "Team Liquid", roster: ["miCKe", "Nisha", "33", "Boxi", "Insania"] },
            { name: "Gaimin Gladiators", roster: ["dyrachyo", "Quinn", "Ace", "tOfu", "Seleri"] }
        ]
    },
    {
        id: 14, name: "The International 2025", year: 2025, location: "Гамбург, Германия", prizePool: "$2,881,791", winner: "Team Falcons", image: ti2025, bgImage: bg2025, bracketImage: bracket2025,
        teams: [
            { name: "Team Falcons", roster: ["skiter", "Malr1ne", "ATF", "Cr1t-", "Sneyking"] },
            { name: "Xtreme Gaming", roster: ["Lou", "Xm", "Xxs", "XinQ", "Dy"] }
        ]
    },
    {
        id: 15, name: "The International 2026", year: 2026, location: "Шанхай, Китай", prizePool: "$3,906,263", winner: "Team Spirit", image: ti2026, bgImage: bg2026, bracketImage: bracket2026,
        teams: [
            { name: "Team Spirit", roster: ["Yatoro", "Larl", "Collapse", "rue", "Miposhka"] },
            { name: "PARIVISION", roster: ["Crystallis", "No[o]ne-", "DM", "9Class", "Dukalis"] }
        ]
    }
];

export default function App() {
    const [favorites, setFavorites] = useState(() => {
        const saved = localStorage.getItem('dota_favorites');
        return saved ? JSON.parse(saved) : [];
    });
    const [searchWinner, setSearchWinner] = useState('');
    const [onlyFavorites, setOnlyFavorites] = useState(false);

    useEffect(() => {
        localStorage.setItem('dota_favorites', JSON.stringify(favorites));
    }, [favorites]);

    const toggleFavorite = (id) => {
        setFavorites(favorites.includes(id) ? favorites.filter(favId => favId !== id) : [...favorites, id]);
    };

    const filteredTournaments = tournamentsData.filter(t => {
        const matchesWinner = t.winner.toLowerCase().includes(searchWinner.toLowerCase());
        const matchesFavorite = onlyFavorites ? favorites.includes(t.id) : true;
        return matchesWinner && matchesFavorite;
    });

    return (
        <div style={{ minHeight: '100vh', background: '#111315', fontFamily: 'sans-serif', color: '#fff', padding: '20px' }}>
            <div style={{ maxWidth: '1150px', margin: '0 auto' }}>
                <header style={{ textAlign: 'center', borderBottom: '2px solid #22252a', paddingBottom: '20px', marginBottom: '25px' }}>
                    <h1 style={{ fontSize: '2.5em', margin: '10px 0 0 0', color: '#fff', letterSpacing: '1px', fontWeight: 'bold' }}>THE INTERNATIONAL HUB</h1>
                </header>

                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '25px' }}>
                    <div>
                        <div style={{ background: '#1b1d22', padding: '12px', borderRadius: '8px', display: 'flex', gap: '10px', marginBottom: '20px', border: '1px solid #2d3238' }}>
                            <input 
                                type="text" 
                                placeholder="Поиск по чемпиону (например, Spirit)..." 
                                value={searchWinner}
                                onChange={(e) => setSearchWinner(e.target.value)}
                                style={{ flexGrow: 1, padding: '10px', background: '#141619', border: '1px solid #383d44', color: '#fff', borderRadius: '4px', fontSize: '0.95em' }}
                            />
                            <button onClick={() => setOnlyFavorites(!onlyFavorites)} style={{ background: onlyFavorites ? '#ff4c29' : '#2d3238', color: '#fff', border: 'none', padding: '10px 15px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', fontSize: '0.95em' }}>
                                {onlyFavorites ? 'Все турниры' : '★ Избранное'}
                            </button>
                        </div>

                        {filteredTournaments.length === 0 ? (
                            <p style={{ textAlign: 'center', color: '#aaa' }}>Турниры не найдены.</p>
                        ) : (
                            filteredTournaments.map(t => (
                                <TournamentCard key={t.id} tournament={t} isFavorite={favorites.includes(t.id)} onToggleFavorite={toggleFavorite} />
                            ))
                        )}
                    </div>
                    
                    <div>
                        <div style={{ position: 'sticky', top: '20px' }}>
                            <DotaQuiz />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
