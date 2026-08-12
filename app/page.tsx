'use client';

import { FormEvent, useEffect, useMemo, useState, type CSSProperties } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CalendarDays, Heart, MapPin, Navigation, Sparkles } from 'lucide-react';

const party = {
  child: 'Helena',
  age: 6,
  date: '31 de outubro de 2026',
  time: '16:00',
  place: 'Fazendinha Jardim do Sol',
  address: 'Estrada das Flores, km 2 · Ibimirim – PE',
};

const ribbons = [
  { id: 'flores', label: 'no jardim de flores', x: 18, y: 72 },
  { id: 'celeiro', label: 'pertinho do celeiro', x: 76, y: 42 },
  { id: 'arvore', label: 'embaixo da árvore', x: 50, y: 35 },
  { id: 'cerca', label: 'junto da cercinha', x: 86, y: 72 },
];

function Countdown() {
  const eventDate = useMemo(() => new Date('2026-10-31T16:00:00-03:00'), []);
  const [remaining, setRemaining] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const update = () => {
      const distance = Math.max(0, eventDate.getTime() - Date.now());
      setRemaining({
        days: Math.floor(distance / 86_400_000),
        hours: Math.floor((distance / 3_600_000) % 24),
        minutes: Math.floor((distance / 60_000) % 60),
        seconds: Math.floor((distance / 1_000) % 60),
      });
    };
    update();
    const timer = window.setInterval(update, 1000);
    return () => window.clearInterval(timer);
  }, [eventDate]);

  return (
    <div className="countdown" aria-label="Contagem regressiva para a festa">
      {([
        ['days', 'dias'],
        ['hours', 'horas'],
        ['minutes', 'min'],
        ['seconds', 'seg'],
      ] as const).map(([key, label]) => (
        <div className="countdownUnit" key={key}>
          <strong>{String(remaining[key]).padStart(2, '0')}</strong>
          <span>{label}</span>
        </div>
      ))}
    </div>
  );
}

function Petals({ count = 18 }: { count?: number }) {
  return (
    <div className="petals" aria-hidden="true">
      {Array.from({ length: count }, (_, index) => (
        <i
          key={index}
          style={{
            '--petal-left': `${(index * 31 + 8) % 100}%`,
            '--petal-delay': `${(index % 7) * -0.8}s`,
            '--petal-speed': `${7 + (index % 5)}s`,
          } as CSSProperties}
        />
      ))}
    </div>
  );
}

function CuteCowgirlPony({ compact = false }: { compact?: boolean }) {
  return (
    <svg className={`cutePair ${compact ? 'cutePair--compact' : ''}`} viewBox="0 0 760 590" role="img" aria-label="Helena, uma pequena vaqueirinha, com seu cavalinho">
      <defs>
        <linearGradient id="ponyBody" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#d9a06f" />
          <stop offset=".55" stopColor="#c38259" />
          <stop offset="1" stopColor="#a86448" />
        </linearGradient>
        <linearGradient id="ponyMane" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#fff0db" />
          <stop offset="1" stopColor="#e8c39f" />
        </linearGradient>
        <linearGradient id="dress" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#f6b8c8" />
          <stop offset="1" stopColor="#d97c98" />
        </linearGradient>
        <linearGradient id="hat" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#d7a46e" />
          <stop offset="1" stopColor="#aa734a" />
        </linearGradient>
        <filter id="softShadow" x="-30%" y="-30%" width="160%" height="180%">
          <feDropShadow dx="0" dy="18" stdDeviation="16" floodColor="#785949" floodOpacity=".18" />
        </filter>
      </defs>

      <ellipse cx="400" cy="538" rx="270" ry="28" fill="#855f4d" opacity=".12" />
      <g filter="url(#softShadow)">
        <path d="M270 355c42-83 127-112 220-81 54 18 91 15 133-12 35 35 43 82 20 126-28 52-86 71-158 57-52 44-143 52-206 14-48-30-52-70-9-104z" fill="url(#ponyBody)" />
        <path d="M526 318c3-98 45-174 109-197 54-19 106 17 111 77 5 62-28 112-84 141l-75 36z" fill="url(#ponyBody)" />
        <path d="M620 144l-3-65 34 49M687 134l30-51-5 69" fill="#a86448" />
        <path d="M570 182c26-57 65-88 111-91-16 28-19 59-9 91-38-15-72-15-102 0z" fill="url(#ponyMane)" />
        <ellipse cx="658" cy="208" rx="72" ry="80" fill="#c78359" />
        <ellipse cx="681" cy="251" rx="60" ry="43" fill="#e8b58d" />
        <ellipse cx="630" cy="202" rx="19" ry="22" fill="#fff9ef" />
        <ellipse cx="681" cy="202" rx="19" ry="22" fill="#fff9ef" />
        <ellipse cx="634" cy="205" rx="8" ry="11" fill="#3b2a24" />
        <ellipse cx="677" cy="205" rx="8" ry="11" fill="#3b2a24" />
        <circle cx="637" cy="201" r="3" fill="#fff" />
        <circle cx="680" cy="201" r="3" fill="#fff" />
        <ellipse cx="666" cy="252" rx="5" ry="4" fill="#9c6653" />
        <ellipse cx="696" cy="252" rx="5" ry="4" fill="#9c6653" />
        <path d="M664 272c12 10 30 10 43 0" fill="none" stroke="#9b6755" strokeWidth="5" strokeLinecap="round" />
        <path d="M601 194c26 7 58 8 93 2M618 226c29 7 58 7 84 0" fill="none" stroke="#f3d5b2" strokeWidth="7" strokeLinecap="round" opacity=".95" />
        <circle cx="716" cy="225" r="7" fill="#e7b85c" />
        <path d="M278 365c-66 2-115 34-147 90 45-27 85-33 128-14" fill="none" stroke="url(#ponyMane)" strokeWidth="28" strokeLinecap="round" />
        <path d="M337 439l-24 76M416 445l-3 73M500 435l27 80M581 407l42 91" stroke="#ad704f" strokeWidth="23" strokeLinecap="round" />
        <path d="M292 518h45M389 520h47M511 518h45M606 501h44" stroke="#7a4e3c" strokeWidth="12" strokeLinecap="round" />
        <path d="M349 320c54-28 111-27 162 2l-16 58H361z" fill="#8f624f" />
        <path d="M367 327h119l20 30H357z" fill="#f0c874" opacity=".95" />

        <g transform="translate(330 52)">
          <path d="M32 243c5-68 34-105 84-105 51 0 79 38 85 105l-8 105H41z" fill="url(#dress)" />
          <path d="M58 221l58 44 57-44 3 73-60 36-61-36z" fill="#fff1dc" opacity=".9" />
          <rect x="91" y="137" width="52" height="62" rx="24" fill="#efad86" />
          <ellipse cx="117" cy="91" rx="79" ry="83" fill="#f5b992" />
          <ellipse cx="40" cy="101" rx="13" ry="18" fill="#e79b77" />
          <ellipse cx="194" cy="101" rx="13" ry="18" fill="#e79b77" />
          <path d="M46 78C54 22 81-8 117-8c42 0 70 33 76 90-43-27-99-29-147-4z" fill="#6b4335" />
          <path d="M66 57c28-24 66-29 102-10-9 14-20 24-31 31-23-8-47-8-71 1z" fill="#8a5944" opacity=".55" />
          <ellipse cx="88" cy="99" rx="17" ry="20" fill="#fffaf2" />
          <ellipse cx="145" cy="99" rx="17" ry="20" fill="#fffaf2" />
          <ellipse cx="91" cy="103" rx="8" ry="11" fill="#42302a" />
          <ellipse cx="142" cy="103" rx="8" ry="11" fill="#42302a" />
          <circle cx="94" cy="98" r="3" fill="#fff" />
          <circle cx="145" cy="98" r="3" fill="#fff" />
          <path d="M88 134c17 20 39 20 57 0" fill="#9f4d55" />
          <path d="M98 135c12 9 25 9 37 0" fill="#fff" />
          <circle cx="67" cy="126" r="12" fill="#e9768a" opacity=".24" />
          <circle cx="167" cy="126" r="12" fill="#e9768a" opacity=".24" />
          <circle cx="73" cy="117" r="2" fill="#c97986" /><circle cx="78" cy="121" r="2" fill="#c97986" /><circle cx="159" cy="117" r="2" fill="#c97986" /><circle cx="154" cy="122" r="2" fill="#c97986" />

          <path d="M11 35C43 7 78-5 117-5c39 0 75 13 108 40-21 24-45 32-70 28-28-5-54-5-80 0-26 4-47-5-64-28z" fill="url(#hat)" />
          <path d="M52 27c9-59 36-84 65-84 32 0 58 27 68 86-47-22-88-22-133-2z" fill="#c18c5d" />
          <path d="M66 17c33-13 67-13 101 0" fill="none" stroke="#f2d690" strokeWidth="8" />
          <path d="M173 14c21-10 34-7 41 6-10 15-23 19-40 10 8 13 6 25-5 36-17-7-23-19-18-35z" fill="#e987a0" />

          <path d="M48 247c-31-1-56-16-74-40" fill="none" stroke="#efad86" strokeWidth="16" strokeLinecap="round" />
          <circle cx="-28" cy="204" r="12" fill="#f0af88" />
          <path d="M170 248l80 21" stroke="#9b6b50" strokeWidth="8" strokeLinecap="round" />
          <path d="M62 344l-11 82M160 344l14 80" stroke="#8d6a55" strokeWidth="22" strokeLinecap="round" />
          <path d="M40 430h38M157 429h40" stroke="#7f523d" strokeWidth="13" strokeLinecap="round" />
        </g>
      </g>
    </svg>
  );
}

function IllustratedFarm({ soft = false }: { soft?: boolean }) {
  return (
    <div className={`illustratedFarm ${soft ? 'illustratedFarm--soft' : ''}`} aria-hidden="true">
      <div className="farmSky" />
      <div className="farmSun" />
      <div className="farmCloud cloudOne" />
      <div className="farmCloud cloudTwo" />
      <div className="farmHill hillBack" />
      <div className="farmHill hillFront" />
      <div className="farmTree"><i/><i/><i/><i/></div>
      <div className="farmBarn"><span>HELENA</span><i className="barnDoor"/><i className="barnWindow"/></div>
      <div className="farmFence"><i/><i/><i/><i/></div>
      <div className="flowerBed">✿　✿　✿　✿　✿</div>
    </div>
  );
}

export default function Home() {
  const [entry, setEntry] = useState<'locked' | 'opening' | 'entered'>('locked');
  const [found, setFound] = useState<string[]>([]);
  const [activeRibbon, setActiveRibbon] = useState<{ x: number; y: number } | null>(null);
  const [gameMessage, setGameMessage] = useState('Quatro lacinhos se esconderam pela fazendinha. Ajude Helena a encontrar o primeiro!');
  const [rsvpSent, setRsvpSent] = useState(false);

  useEffect(() => {
    const locked = entry !== 'entered';
    document.documentElement.style.overflow = locked ? 'hidden' : '';
    document.body.style.overflow = locked ? 'hidden' : '';
    return () => {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
    };
  }, [entry]);

  const enterInvite = () => {
    if (entry !== 'locked') return;
    setEntry('opening');
    window.setTimeout(() => setEntry('entered'), 1500);
  };

  const collectRibbon = (ribbon: (typeof ribbons)[number]) => {
    if (found.includes(ribbon.id)) return;
    setActiveRibbon({ x: ribbon.x, y: ribbon.y });
    setGameMessage(`Helena viu um lacinho ${ribbon.label}. Olha ela indo buscar!`);
    window.setTimeout(() => {
      setFound((items) => {
        const next = [...items, ribbon.id];
        setGameMessage(next.length === ribbons.length ? 'Você achou todos! Helena e Florzinha estão prontas para a festa!' : 'Achou! Agora procure o próximo lacinho.');
        return next;
      });
    }, 720);
  };

  const resetGame = () => {
    setFound([]);
    setActiveRibbon(null);
    setGameMessage('Quatro lacinhos se esconderam pela fazendinha. Ajude Helena a encontrar o primeiro!');
  };

  const submitRsvp = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setRsvpSent(true);
  };

  return (
    <main>
      <section className={`storybookOpening ${entry === 'opening' ? 'storybookOpening--opening' : ''} ${entry === 'entered' ? 'storybookOpening--gone' : ''}`} aria-hidden={entry === 'entered'}>
        <div className="storybookWorld"><IllustratedFarm soft/><Petals count={14}/><div className="openingPair"><CuteCowgirlPony/></div></div>
        <div className="storybookBook" aria-label="Livrinho da Fazendinha Encantada de Helena">
          <div className="bookBack" />
          <div className={`bookCover ${entry !== 'locked' ? 'bookCover--open' : ''}`}>
            <div className="coverStitch" />
            <div className="coverFlowers">✿　✿　✿</div>
            <span className="coverKicker">UM CONVITE MUITO ESPECIAL</span>
            <h1>A Fazendinha<br/><em>Encantada</em></h1>
            <div className="coverName">de {party.child}</div>
            <div className="coverSeal"><strong>{party.age}</strong><span>ANOS</span></div>
            <div className="coverHorseshoe">♡</div>
          </div>
          <div className="bookPage">
            <span className="pageKicker">O LIVRINHO DA HELENA</span>
            <h2>Tem uma aventura<br/>esperando por você!</h2>
            <p>Helena e a cavalinha Florzinha querem te levar para uma tarde cheia de flores, carinho e brincadeiras.</p>
            <button className="storybookButton" type="button" onClick={enterInvite} disabled={entry !== 'locked'}>
              <span>{entry === 'opening' ? 'ABRINDO O MUNDINHO...' : 'ABRIR MEU LIVRINHO'}</span>
              <small>toque para entrar na fazendinha</small>
            </button>
          </div>
        </div>
        <AnimatePresence>{entry === 'opening' && <motion.div className="storybookWelcome" initial={{opacity:0,scale:.8}} animate={{opacity:1,scale:1}} exit={{opacity:0}}>✨ Era uma vez… a festa da Helena! ✨</motion.div>}</AnimatePresence>
      </section>

      <div className={`invite ${entry === 'entered' ? 'invite--visible' : ''}`} aria-hidden={entry !== 'entered'}>
        <header className="hero" id="inicio">
          <IllustratedFarm />
          <Petals count={12}/>
          <nav className="topbar"><a className="brand" href="#inicio">✿ Fazendinha da Helena</a><div><a href="#missao">Brincadeira</a><a href="#presenca">Presença</a></div></nav>
          <div className="heroCopy">
            <span className="eyebrow">VOCÊ ENTROU NO MUNDINHO DELA</span>
            <h2>Uma aventura bem fofinha para a nossa <span>pequena vaqueirinha</span></h2>
            <p>Helena vai completar <strong>{party.age} anos</strong> e quer passar uma tarde encantada com você, Florzinha e toda a turminha da fazenda.</p>
            <div className="heroActions"><a href="#missao" className="primaryAction">Começar a brincadeira</a><a href="#presenca" className="secondaryAction">Confirmar presença</a></div>
          </div>
          <div className="heroPair"><CuteCowgirlPony/></div>
          <div className="heroBadge"><strong>{party.age}</strong><span>ANOS DE DOÇURA</span></div>
        </header>

        <section className="eventSection">
          <div className="sectionHeading"><span className="eyebrow brown">MARQUE NA FOLHINHA</span><h2>O grande dia está chegando</h2><p>Uma festa feita para criança: cavalinha, flores, brincadeiras e muita alegria.</p></div>
          <div className="detailGrid">
            <article className="detailCard"><CalendarDays/><small>QUANDO</small><h3>31 de outubro</h3><p>Sábado · {party.time}</p></article>
            <article className="detailCard featured"><MapPin/><small>ONDE</small><h3>{party.place}</h3><p>{party.address}</p></article>
            <article className="detailCard"><Heart/><small>CLIMA DA FESTA</small><h3>Fofo e encantado</h3><p>Natureza, cavalinha, flores e diversão de criança.</p></article>
          </div>
          <Countdown />
        </section>

        <section className="storySection">
          <div className="storyArt"><IllustratedFarm soft/><div className="storyPair"><CuteCowgirlPony/></div><div className="storyLabel"><small>A DONA DA FESTA</small><strong>Helena</strong></div></div>
          <div className="storyCopy"><span className="eyebrow gold">UM RECADINHO PARA VOCÊ</span><h2>Minha aventura fica mais bonita quando você está pertinho.</h2><p>Helena separou seu chapéu preferido, colocou um laço novo na Florzinha e já está contando os dias para receber todo mundo.</p><blockquote>“Vem brincar comigo e conhecer a Florzinha. Eu vou ficar muito feliz!”</blockquote><span className="signature">— Helena e família</span></div>
        </section>

        <section className="gallerySection">
          <div className="sectionHeading light"><span className="eyebrow">O MUNDINHO DA HELENA</span><h2>Flores, cavalinha e imaginação</h2><p>Três pequenas cenas da Fazendinha Encantada.</p></div>
          <div className="illustrationGrid">
            <article className="sceneCard sceneCard--large"><IllustratedFarm/><div className="scenePair"><CuteCowgirlPony/></div><span>Meu passeio com a Florzinha</span></article>
            <article className="sceneCard sceneCard--pony"><div className="ponyClose"><CuteCowgirlPony compact/></div><span>Minha melhor amiga</span></article>
            <article className="sceneCard sceneCard--flowers"><div className="flowerScene"><i>✿</i><i>✿</i><i>✿</i><i>✿</i><b>🎀</b></div><span>Meu jardim de lacinhos</span></article>
          </div>
        </section>

        <section className="gameSection" id="missao">
          <div className="sectionHeading light"><span className="eyebrow">MISSÃO DA PEQUENA VAQUEIRINHA</span><h2>Encontre os lacinhos da Florzinha</h2><p>Toque nos lacinhos escondidos. Helena vai até cada um para colocar tudo na cestinha.</p></div>
          <div className="gameShell">
            <div className="gameTop"><span>✿ BRINCADEIRA EM ANDAMENTO</span><strong>{found.length}/4 encontrados</strong></div>
            <div className="farmScene">
              <IllustratedFarm />
              {ribbons.map((ribbon) => <button key={ribbon.id} className={`ribbon ${found.includes(ribbon.id) ? 'found' : ''}`} style={{left:`${ribbon.x}%`,top:`${ribbon.y}%`}} onClick={() => collectRibbon(ribbon)} aria-label={`Lacinho ${ribbon.label}`}><span>🎀</span></button>)}
              <motion.div className="gameAvatar" animate={{left:`${activeRibbon?.x ?? 12}%`,top:`${activeRibbon?.y ?? 78}%`}} transition={{type:'spring',stiffness:70,damping:15}}><CuteCowgirlPony compact/><span>Helena</span></motion.div>
              {found.length === ribbons.length && <div className="gameCelebration">✨ Florzinha ficou toda enfeitada! ✨</div>}
            </div>
            <div className="gameStatus"><div>🎀</div><p>{gameMessage}</p><button type="button" onClick={resetGame}>Recomeçar</button></div>
          </div>
        </section>

        <section className="locationSection"><div><span className="eyebrow brown">DESTINO DA AVENTURA</span><h2>{party.place}</h2><p>{party.address}</p></div><a href="https://www.google.com/maps/search/?api=1&query=Ibimirim%20Pernambuco" target="_blank" rel="noreferrer"><Navigation size={18}/>Abrir localização</a></section>

        <section className="rsvpSection" id="presenca">
          <IllustratedFarm soft/><div className="rsvpPair"><CuteCowgirlPony/></div>
          <div className="rsvpCard">
            <div className="rsvpCopy"><span className="eyebrow">CONFIRMAÇÃO DE PRESENÇA</span><h2>Vai ser lindo ter você com a gente!</h2><p>Confirme sua presença para a família preparar tudo com muito carinho.</p><ul><li>✓ {party.date}</li><li>✓ A partir das {party.time}</li><li>✓ Festa infantil na {party.place}</li></ul></div>
            {rsvpSent ? <div className="rsvpSuccess"><Sparkles/><h3>Presença confirmada!</h3><p>Seu nome já faz parte da Fazendinha Encantada da Helena.</p><button onClick={() => setRsvpSent(false)}>Corrigir resposta</button></div> : <form className="rsvpForm" onSubmit={submitRsvp}><label>Nome do convidado<input name="name" required placeholder="Como podemos chamar você?"/></label><label>Quantas pessoas irão?<select name="guests" defaultValue="1"><option value="1">1 pessoa</option><option value="2">2 pessoas</option><option value="3">3 pessoas</option><option value="4">4 pessoas</option></select></label><label>Recadinho para a Helena <span>(opcional)</span><textarea name="message" rows={3} placeholder="Escreva uma mensagem carinhosa"/></label><button className="confirmButton" type="submit">Confirmar minha presença</button></form>}
          </div>
        </section>

        <section className="closingSection"><IllustratedFarm/><Petals count={10}/><div className="closingPair"><CuteCowgirlPony/></div><div className="closingCopy"><span className="eyebrow">ATÉ O GRANDE DIA</span><h2>Helena e Florzinha já estão esperando por você.</h2><p>Obrigada por fazer parte dessa aventura tão fofinha.</p><a href="#inicio">Voltar ao início</a></div></section>
        <footer><span>Feito com carinho para celebrar os {party.age} anos da Helena.</span><small>Desenvolvido por Anderson Jhonatan da K2 Tech</small></footer>
      </div>
    </main>
  );
}
