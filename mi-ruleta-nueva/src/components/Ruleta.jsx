import React, { useState } from 'react';
import { Trophy, RotateCw, Sparkles, History, Gift } from 'lucide-react';
import confetti from 'canvas-confetti';

const PREMIOS = [
  { id: 1, nombre: 'Perro', icon: '🐶', color: '#ef4444' },
  { id: 2, nombre: 'Gato', icon: '🐱', color: '#3b82f6' },
  { id: 3, nombre: 'León', icon: '🦁', color: '#eab308' },
  { id: 4, nombre: 'Panda', icon: '🐼', color: '#64748b' },
  { id: 5, nombre: 'Mono', icon: '🐵', color: '#22c55e' },
  { id: 6, nombre: 'Zorro', icon: '🦊', color: '#a855f7' },
];

export default function Ruleta() {
  const [girando, setGirando] = useState(false);
  const [rotacion, setRotacion] = useState(0);
  const [resultado, setResultado] = useState(null);
  const [historial, setHistorial] = useState([]);
  const [flechaPulse, setFlechaPulse] = useState(false);

  const girarRuleta = () => {
    if (girando) return;
    setGirando(true);
    setResultado(null);
    setFlechaPulse(false);

    const vueltasBase = 2200;
    const anguloAleatorio = Math.floor(Math.random() * 360);
    const nuevaRotacion = rotacion + vueltasBase + anguloAleatorio;
    setRotacion(nuevaRotacion);

    setTimeout(() => {
      setGirando(false);

      const anguloFinalEfectivo = nuevaRotacion % 360;
      const tamanoSeccion = 360 / PREMIOS.length;
      const indice =
        Math.floor(((360 - anguloFinalEfectivo) % 360) / tamanoSeccion) %
        PREMIOS.length;

      const premioGanado = PREMIOS[indice];
      setResultado(premioGanado);
      setHistorial((prev) => [premioGanado, ...prev].slice(0, 5));
      setFlechaPulse(true);

      if (premioGanado.nombre !== 'SUERTE PRÓX.') {
        confetti({ particleCount: 180, spread: 70, origin: { y: 0.7 } });
        const audio = new Audio('/celebracion.mp3');
        audio.play().catch(() => {});
      }
    }, 4000);
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white font-sans flex flex-col items-center justify-center p-6 selection:bg-yellow-500/30">
      {/* Encabezado: reemplazar por este (usa las clases CSS nuevas) */}
      <header className="hero animate-fade-in">
        <div className="hero-icon" aria-hidden="true">
          <div className="inner">
            <Sparkles className="text-yellow-300 w-5 h-5" />
          </div>
        </div>

        <h1 className="hero-title">RULETA DE ANIMALITOS</h1>

        <p className="hero-sub">¡Gira la ruleta y descubre tu premio hoy!</p>
      </header>

      {/* Ruleta */}
      <div className="relative mb-12">
        {/* Flecha superior con rebote inicial y pulso al finalizar */}
        <div
          className={`absolute -top-10 left-1/2 z-40 animate-bounce-in arrow-center ${flechaPulse ? 'animate-pulse-arrow' : ''}`}
          aria-hidden="true"
          style={{ '--arrow-translate': 'translateX(-50%)' }}
        >
          {/* SVG flecha más visible y con borde */}
          <svg className="arrow-svg" width="72" height="72" viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M36 4 L60 36 H12 L36 4 Z" fill="#f59e0b" stroke="#92400e" strokeWidth="2" />
            {/* pequeño círculo base para apuntar al centro de la ruleta */}
            <circle cx="36" cy="48" r="6" fill="#0f172a" stroke="#000" strokeWidth="1" />
          </svg>
          {/* línea corta que conecta la punta con el borde de la ruleta para mayor claridad */}
          <div className="absolute top-[42px] left-1/2 z-10 arrow-center w-[3px] h-6 bg-yellow-500 rounded-sm shadow-sm" style={{ '--arrow-translate': 'translateX(-50%)' }} />
        </div>

        {/* Brillo exterior */}
        <div className="absolute inset-0 rounded-full bg-yellow-500/5 blur-[100px] -z-10"></div>

        {/* La Ruleta */}
        <div
          className="relative w-[420px] h-[420px] md:w-[520px] md:h-[520px] rounded-full border-[12px] border-gray-800 shadow-[0_0_80px_-15px_rgba(0,0,0,0.8)] overflow-hidden transition-transform duration-[4000ms] ease-out ring-4 ring-gray-900"
          style={{ transform: `rotate(${rotacion}deg)` }}
        >
          {PREMIOS.map((premio, index) => {
            const anguloSeccion = 360 / PREMIOS.length;
            const rotacionSeccion = index * anguloSeccion;
            return (
              <div
                key={premio.id}
                className="absolute top-0 left-0 w-full h-full origin-center"
                style={{
                  transform: `rotate(${rotacionSeccion}deg)`,
                  backgroundColor: premio.color,
                  clipPath: 'polygon(50% 50%, 0% 0%, 100% 0%)',
                }}
              >
                {/* icon container: colocado hacia el borde superior de la sección */}
                <div
                  className="absolute left-1/2 flex items-center justify-center"
                  style={{
                    top: '18%', // mover hacia el borde exterior para que el emoji quede dentro del sector
                    transform: `translateX(-50%) rotate(${anguloSeccion / 2}deg)`,
                    width: '36px',
                    height: '36px',
                    zIndex: 6,
                  }}
                >
                  <span
                    className="leading-none drop-shadow"
                    aria-hidden="true"
                    style={{
                      display: 'inline-block',
                      fontSize: 28,
                      transform: `rotate(${-(anguloSeccion / 2)}deg)`, // mantener legible
                      lineHeight: 1,
                    }}
                  >
                    {premio.icon}
                  </span>
                  <span className="sr-only">{premio.nombre}</span>
                </div>
              </div>
            );
          })}

          {/* divisores */}
          {PREMIOS.map((_, i) => (
            <div
              key={`line-${i}`}
              className="absolute top-0 left-1/2 w-1 h-1/2 bg-black/30 origin-bottom -translate-x-1/2"
              style={{ transform: `rotate(${i * (360 / PREMIOS.length)}deg)` }}
            />
          ))}
        </div>

        {/* Centro */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-gray-900 rounded-full z-20 shadow-2xl flex items-center justify-center border-4 border-gray-700">
          <div className="w-5 h-5 bg-yellow-500 rounded-full animate-pulse shadow-[0_0_15px_#eab308]"></div>
        </div>
      </div>

      {/* Botón: aspecto igual a la imagen, centrado y separado de la ruleta */}
      <button
        onClick={girarRuleta}
        disabled={girando}
        aria-label="Probar suerte"
        className={`btn-lucky mt-10 ${girando ? 'opacity-80' : ''}`}
      >
        <div className="btn-lucky__shadow" aria-hidden="true" />
        <div className="btn-lucky__content">
          <RotateCw className={girando ? 'animate-spin' : 'transition-transform duration-500'} />
          <span>{girando ? 'Girando...' : '¡PROBAR SUERTE!'}</span>
        </div>
      </button>

      {/* Resultado */}
      <div className="result-wrapper" style="margin-left: 40%; ">
        {resultado && (
          <div className="result-container animate-bounce-in" role="status" aria-live="polite">
            <p className="result-badge">¡Ganaste!</p>

            <div className="result-card">
              <div className="result-promo" aria-hidden="true">
                {resultado.icon ?? resultado.nombre}
              </div>
              <span className="sr-only">{resultado.nombre}</span>
            </div>
          </div>
        )}
      </div>

      {/* Historial */}
      <div className="history-panel">
        <div className="history-header">
          <h3 className="history-title"><History size={14} /> Historial Reciente</h3>
          <Trophy size={16} className="text-yellow-500" />
        </div>

        <div className="history-list">
          {historial.length === 0 ? (
            <div className="history-item">
              <div className="history-item__left">
                <div className="history-item__icon"><Gift size={16} /></div>
                <div className="history-item__label" style={{ color: 'rgba(255,255,255,0.55)', fontWeight: 700 }}>Aún no hay premios</div>
              </div>
              <div className="history-item__dot" style={{ background: 'transparent', boxShadow: 'none' }} />
            </div>
          ) : (
            historial.map((p, i) => (
              <div key={i} className="history-item animate-slide-in">
                <div className="history-item__left">
                  <div className="history-item__icon" aria-hidden="true" style={{ fontSize: 20 }}>
                    {p.icon ?? <Gift size={16} />}
                  </div>
                  <div className="history-item__label" style={{ fontWeight: 800 }}>
                    {p.nombre}
                  </div>
                </div>
                <div className="history-item__dot" style={{ background: p.color === '#22c55e' ? '#22c55e' : '#34d399' }} />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
