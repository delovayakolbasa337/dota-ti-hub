import { useState } from 'react';

export default function TournamentCard({ tournament, isFavorite, onToggleFavorite }) {
    const [selectedTeam, setSelectedTeam] = useState(null);
    // Состояние для отображения/скрытия сетки плей-офф
    const [showBracket, setShowBracket] = useState(false);

    return (
        <div style={{ 
            backgroundImage: `linear-gradient(rgba(34, 37, 42, 0.85), rgba(34, 37, 42, 0.95)), url("${tournament.bgImage}")`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            color: '#fff', 
            padding: '20px', 
            borderRadius: '12px', 
            border: '1px solid #383d44', 
            marginBottom: '25px',
            boxShadow: '0 6px 15px rgba(0,0,0,0.5)',
            transition: 'transform 0.2s, box-shadow 0.2s'
        }}>
            
            {/* Сетка: логотип слева, инфо справа */}
            <div style={{ display: 'grid', gridTemplateColumns: '150px 1fr', gap: '20px', alignItems: 'center' }}>
                
                {/* Левая колонка: Логотип турнира */}
                <div style={{ 
                    width: '150px', 
                    borderRadius: '8px', 
                    overflow: 'hidden', 
                    background: 'rgba(27, 29, 34, 0.8)', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    border: '1px solid #444',
                    padding: '4px',
                    boxSizing: 'border-box',
                    backdropFilter: 'blur(2px)'
                }}>
                    <img 
                        src={tournament.image} 
                        alt={tournament.name} 
                        style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'contain' }}
                        onError={(e) => {
                            e.target.style.display = 'none';
                        }}
                    />
                </div>

                {/* Правая колонка: Текстовая информация */}
                <div style={{ textShadow: '1px 1px 3px rgba(0,0,0,0.8)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                        <h2 style={{ margin: 0, color: '#ff4c29', fontSize: '1.6em' }}>{tournament.name} ({tournament.year})</h2>
                        <button 
                            onClick={() => onToggleFavorite(tournament.id)}
                            style={{ background: isFavorite ? '#ff4c29' : 'transparent', color: '#fff', border: '2px solid #ff4c29', borderRadius: '6px', padding: '6px 12px', cursor: 'pointer', fontWeight: 'bold', transition: '0.2s' }}
                        >
                            {isFavorite ? '★ В избранном' : '☆ В избранное'}
                        </button>
                    </div>
                    
                    <p style={{ margin: '6px 0', fontSize: '1.05em' }}>📍 <strong>Место проведения:</strong> {tournament.location}</p>
                    <p style={{ margin: '6px 0', fontSize: '1.05em' }}>💰 <strong>Призовой фонд:</strong> {tournament.prizePool}</p>
                    <p style={{ margin: '6px 0', fontSize: '1.05em' }}>🏆 <strong>Чемпион турнира:</strong> <span style={{ color: '#00d2c4', fontWeight: 'bold' }}>{tournament.winner}</span></p>
                </div>

            </div>

            {/* Блок команд и сетки плей-офф */}
            <div style={{ marginTop: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                    <h4 style={{ margin: 0, color: '#ccc', textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}>Команды (нажми для просмотра состава):</h4>
                    
                    {/* Кнопка переключения сетки плей-офф */}
                    <button 
                        onClick={() => setShowBracket(!showBracket)}
                        style={{ background: showBracket ? '#00d2c4' : '#2d3238', color: showBracket ? '#000' : '#fff', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '4px', padding: '6px 12px', cursor: 'pointer', fontWeight: 'bold', transition: '0.2s' }}
                    >
                        {showBracket ? 'Скрыть сетку плей-офф' : '📊 Сетка турнира (Плей-офф)'}
                    </button>
                </div>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '15px' }}>
                    {tournament.teams.map(team => (
                        <button 
                            key={team.name}
                            onClick={() => setSelectedTeam(selectedTeam?.name === team.name ? null : team)}
                            style={{ 
                                background: selectedTeam?.name === team.name ? '#00d2c4' : 'rgba(45, 50, 56, 0.85)', 
                                color: selectedTeam?.name === team.name ? '#000' : '#fff', 
                                border: '1px solid rgba(255,255,255,0.1)', 
                                borderRadius: '4px', 
                                padding: '6px 10px', 
                                cursor: 'pointer',
                                backdropFilter: 'blur(2px)',
                                transition: '0.2s'
                            }}
                        >
                            {team.name}
                        </button>
                    ))}
                </div>

                {/* Вывод состава команды */}
                {selectedTeam && (
                    <div style={{ background: 'rgba(27, 29, 34, 0.9)', padding: '12px', borderRadius: '6px', borderLeft: '4px solid #00d2c4', backdropFilter: 'blur(4px)', boxShadow: 'inset 0 0 10px rgba(0,0,0,0.5)', marginBottom: '15px' }}>
                        <h5 style={{ margin: '0 0 8px 0', color: '#00d2c4', fontSize: '1.05em' }}>Состав {selectedTeam.name}:</h5>
                        <ul style={{ margin: 0, paddingLeft: '20px' }}>
                            {selectedTeam.roster.map(player => (
                                <li key={player} style={{ color: '#ddd', marginBottom: '2px' }}>{player}</li>
                            ))}
                        </ul>
                    </div>
                )}

                {/* Вывод сетки плей-офф */}
                {showBracket && (
                    <div style={{ background: 'rgba(27, 29, 34, 0.95)', padding: '15px', borderRadius: '8px', border: '1px solid #444', marginTop: '15px', backdropFilter: 'blur(4px)' }}>
                        <h5 style={{ margin: '0 0 12px 0', color: '#ff4c29', fontSize: '1.1em', textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}>Сетка финальной стадии (Плей-офф):</h5>
                        <div style={{ width: '100%', borderRadius: '6px', overflow: 'hidden', border: '1px solid #333', background: '#141619' }}>
                            <img 
                                src={tournament.bracketImage} 
                                alt={`Сетка плей-офф ${tournament.name}`}
                                style={{ width: '100%', height: 'auto', display: 'block' }}
                                onError={(e) => {
                                    e.target.style.display = 'none';
                                }}
                            />
                        </div>
                    </div>
                )}
            </div>

        </div>
    );
}
