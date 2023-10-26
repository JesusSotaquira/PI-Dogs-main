import { Link } from 'react-router-dom';

const Landing = () => {
     // Una lista de frases y sus respectivas posiciones en la pantalla.
    const phrases = [
        { text: "!¡Amor de perro,\namor eterno!¡", position: { top: '10%', left: '10%' } },
        { text: "!¡Las patas dejan huellas,\nlos perros dejan recuerdos!¡", position: { top: '10%', right: '-1%' } },
        { text: "!¡Sonrisas con\ncuatro patas!¡", position: { bottom: '10%', left: '10%' } },
        { text: "!¡Amor a primera\nlamida!¡", position: { bottom: '10%', right: '2%' } },
        { text: "!¡Ladridos llenos\nde amor!¡", position: { top: '42%', left: '13%' } }, // Ajustado aún más a la derecha
        { text: "!¡Conectando corazones\ncon patas!¡", position: { bottom: '40%', right: '4%' } }
    ];

    return (
        // Estableces un fondo de imagen que cubre toda la pantalla.
        <div style={{
            backgroundImage: 'url("https://w.wallhaven.cc/full/4d/wallhaven-4d5xwg.jpg")',
            backgroundSize: 'cover',
            height: '100vh',
            position: 'relative'
        }}>
            {phrases.map((phrase, index) => (
                <h2 key={index} style={{
                    position: 'absolute',
                    color: 'white',
                    ...phrase.position,
                    transform: 'translate(-50%, -50%)',
                    fontSize: '1.5em',
                    fontWeight: '600',
                    whiteSpace: 'pre-line'
                }}>
                    {phrase.text}
                </h2>
            ))}

            <div style={{ position: 'absolute', bottom: '10%', left: '50%', transform: 'translateX(-50%)', textAlign: 'center' }}>
                <p style={{ color: 'white', fontSize: '20px', marginBottom: '10px' }}>
                    ¿Quieres conocer más de estos hermosos animales?
                </p>
                <Link to="/home">
                    <button style={{
                        padding: '12px 24px',
                        border: 'none',
                        borderRadius: '20px',
                        background: 'rgba(255, 255, 255, 0.3)',
                        color: 'white',
                        fontSize: '18px',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease'
                    }}
                    onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.5)'}
                    onMouseOut={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.3)'}
                    >Home</button>
                </Link>
            </div>
        </div>
    );
}

export default Landing;
