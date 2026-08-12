'use client';

import { FormEvent, useEffect, useMemo, useState } from 'react';
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

const photos = {
  opening: 'https://images.pexels.com/photos/32418894/pexels-photo-32418894.jpeg?auto=compress&cs=tinysrgb&w=1800',
  farm: 'https://images.pexels.com/photos/15990622/pexels-photo-15990622.jpeg?auto=compress&cs=tinysrgb&w=1800',
  girlHorse: 'https://images.pexels.com/photos/7447106/pexels-photo-7447106.jpeg?auto=compress&cs=tinysrgb&w=1500',
  meadow: 'https://images.pexels.com/photos/36153988/pexels-photo-36153988.jpeg?auto=compress&cs=tinysrgb&w=1600',
};

const ribbons = [
  { id: 'roseira', label: 'perto das flores', x: 17, y: 70 },
  { id: 'cerca', label: 'junto da cerca', x: 73, y: 60 },
  { id: 'capim', label: 'escondido no capim', x: 49, y: 42 },
  { id: 'porteira', label: 'na porteira', x: 84, y: 30 },
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

function Petals() {
  return (
    <div className="petals" aria-hidden="true">
      {Array.from({ length: 18 }, (_, index) => (
        <i
          key={index}
          style={{
            '--petal-left': `${(index * 31 + 8) % 100}%`,
            '--petal-delay': `${(index % 7) * -0.8}s`,
            '--petal-speed': `${7 + (index % 5)}s`,
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
}

export default function Home() {
  const [entry, setEntry] = useState<'locked' | 'opening' | 'entered'>('locked');
  const [found, setFound] = useState<string[]>([]);
  const [activeRibbon, setActiveRibbon] = useState<{ x: number; y: number } | null>(null);
  const [gameMessage, setGameMessage] = useState('Helena perdeu quatro lacinhos pela fazendinha. Encontre o primeiro para ela ir buscar!');
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
    setEntry('opening');
    window.setTimeout(() => setEntry('entered'), 1300);
  };

  const collectRibbon = (ribbon: (typeof ribbons)[number]) => {
    if (found.includes(ribbon.id)) return;
    setActiveRibbon({ x: ribbon.x, y: ribbon.y });
    setGameMessage(`Helena viu um lacinho ${ribbon.label}. Ela está indo buscar!`);
    window.setTimeout(() => {
      setFound((items) => [...items, ribbon.id]);
      setGameMessage(
        found.length + 1 === ribbons.length
          ? 'Você encontrou todos os lacinhos! Helena e o cavalinho ficaram prontos para a festa!'
          : 'Lacinho encontrado! Continue procurando pela fazendinha.',
      );
    }, 650);
  };

  const resetGame = () => {
    setFound([]);
    setActiveRibbon(null);
    setGameMessage('Helena perdeu quatro lacinhos pela fazendinha. Encontre o primeiro para ela ir buscar!');
  };

  const submitRsvp = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setRsvpSent(true);
  };

  return (
    <main>
      <section className={`opening ${entry !== 'locked' ? 'opening--active' : ''} ${entry === 'entered' ? 'opening--gone' : ''}`} aria-hidden={entry === 'entered'}>
        <img className="openingPhoto" src={photos.opening} alt="" aria-hidden="true" />
        <div className="openingOverlay" />
        <Petals />
        <div className="openingGlow" />
        <motion.div className="openingCard" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <span className="kicker">UMA AVENTURA CHEIA DE CARINHO</span>
          <small className="openingSmall">A cavalgada encantada de</small>
          <h1>{party.child}</h1>
          <div className="ageSeal"><strong>{party.age}</strong><span>ANOS</span></div>
          <p>Flores no caminho, um cavalinho especial e uma pequena vaqueira esperando por você.</p>
          <button className="enterButton" type="button" onClick={enterInvite} disabled={entry === 'opening'}>
            <span>{entry === 'opening' ? 'ABRINDO A PORTEIRA...' : 'ENTRAR NESSA AVENTURA'}</span>
            <small>toque para entrar no aniversário</small>
          </button>
        </motion.div>
        <div className="gate" aria-hidden="true">
          <div className={`gateLeaf gateLeafLeft ${entry === 'opening' || entry === 'entered' ? 'open' : ''}`}><i></i><i></i><i></i></div>
          <div className={`gateLeaf gateLeafRight ${entry === 'opening' || entry === 'entered' ? 'open' : ''}`}><i></i><i></i><i></i></div>
        </div>
        <AnimatePresence>{entry === 'opening' && <motion.div className="welcome" initial={{ opacity: 0, scale: .8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}>✨ Bem-vindo ao mundo da Helena ✨</motion.div>}</AnimatePresence>
      </section>

      <div className={`invite ${entry === 'entered' ? 'invite--visible' : ''}`} aria-hidden={entry !== 'entered'}>
        <header className="hero" id="inicio">
          <img src={photos.meadow} alt="" className="heroPhoto" aria-hidden="true" />
          <div className="heroOverlay" />
          <Petals />
          <nav className="topbar">
            <a className="brand" href="#inicio">✿ Helena na Fazendinha</a>
            <div><a href="#missao">Brincadeira</a><a href="#presenca">Presença</a></div>
          </nav>
          <div className="heroCopy">
            <span className="eyebrow">A PORTEIRA SE ABRIU</span>
            <h2>Uma tarde encantada para a nossa <span>pequena vaqueira</span></h2>
            <p>Helena vai completar <strong>{party.age} anos</strong> e quer viver essa aventura pertinho de quem faz seus dias mais felizes.</p>
            <div className="heroActions"><a href="#missao" className="primaryAction">Começar a aventura</a><a href="#presenca" className="secondaryAction">Confirmar presença</a></div>
          </div>
          <div className="heroBadge"><strong>{party.age}</strong><span>ANOS DE DOÇURA</span></div>
        </header>

        <section className="eventSection">
          <div className="sectionHeading">
            <span className="eyebrow brown">MARQUE NA FOLHINHA</span>
            <h2>O grande dia está chegando</h2>
            <p>Uma festa infantil com cavalo, flores, brincadeiras e muita alegria.</p>
          </div>
          <div className="detailGrid">
            <article className="detailCard"><CalendarDays/><small>QUANDO</small><h3>31 de outubro</h3><p>Sábado · {party.time}</p></article>
            <article className="detailCard featured"><MapPin/><small>ONDE</small><h3>{party.place}</h3><p>{party.address}</p></article>
            <article className="detailCard"><Heart/><small>CLIMA DA FESTA</small><h3>Doce e encantado</h3><p>Natureza, cavalinho, flores e diversão de criança.</p></article>
          </div>
          <Countdown />
        </section>

        <section className="storySection">
          <div className="storyPhoto"><img src={photos.opening} alt="Menina pequena interagindo com um cavalo em uma fazenda"/><div><small>A DONA DA FESTA</small><strong>Helena</strong></div></div>
          <div className="storyCopy"><span className="eyebrow gold">UM RECADINHO PARA VOCÊ</span><h2>Minha aventura fica mais bonita quando você está pertinho.</h2><p>Helena separou seu chapéu, escolheu seus lacinhos preferidos e já está contando os dias para encontrar todo mundo na fazendinha.</p><blockquote>“Vem conhecer meu cavalinho, brincar comigo e fazer parte desse dia tão especial!”</blockquote><span className="signature">— Helena e família</span></div>
        </section>

        <section className="gallerySection">
          <div className="sectionHeading light"><span className="eyebrow">O UNIVERSO DA HELENA</span><h2>Infância, flores e cavalinhos</h2><p>Uma pequena vaqueira vivendo momentos doces no campo.</p></div>
          <div className="galleryGrid">
            <figure className="wide"><img src={photos.opening} alt="Menina com cavalo em uma fazenda"/><figcaption>Minha aventura preferida</figcaption></figure>
            <figure><img src={photos.girlHorse} alt="Menina sorrindo ao lado de um cavalo"/><figcaption>Meu companheiro de brincadeiras</figcaption></figure>
            <figure><img src={photos.farm} alt="Menina pequena perto de um cavalo na fazenda"/><figcaption>Um dia cheio de descobertas</figcaption></figure>
          </div>
        </section>

        <section className="gameSection" id="missao">
          <div className="sectionHeading light"><span className="eyebrow">MISSÃO DA PEQUENA VAQUEIRA</span><h2>Encontre os lacinhos perdidos</h2><p>Toque nos lacinhos escondidos e veja Helena ir até cada um.</p></div>
          <div className="gameShell">
            <div className="gameTop"><span>✿ BRINCADEIRA EM ANDAMENTO</span><strong>{found.length}/4 encontrados</strong></div>
            <div className="farmScene">
              <img src={photos.farm} alt="" aria-hidden="true"/>
              <div className="farmOverlay" />
              {ribbons.map((ribbon) => (
                <button key={ribbon.id} className={`ribbon ${found.includes(ribbon.id) ? 'found' : ''}`} style={{ left: `${ribbon.x}%`, top: `${ribbon.y}%` }} onClick={() => collectRibbon(ribbon)} aria-label={`Lacinho ${ribbon.label}`}><span>🎀</span></button>
              ))}
              <motion.div className="gameAvatar" animate={{ left: `${activeRibbon?.x ?? 10}%`, top: `${activeRibbon?.y ?? 78}%` }} transition={{ type: 'spring', stiffness: 75, damping: 16 }}>
                <div><img src={photos.opening} alt=""/></div><span>Helena</span>
              </motion.div>
              {found.length === ribbons.length && <div className="gameCelebration">✨ Você encontrou todos! ✨</div>}
            </div>
            <div className="gameStatus"><div>🐴</div><p>{gameMessage}</p><button type="button" onClick={resetGame}>Recomeçar</button></div>
          </div>
        </section>

        <section className="locationSection"><div><span className="eyebrow brown">DESTINO DA AVENTURA</span><h2>{party.place}</h2><p>{party.address}</p></div><a href="https://www.google.com/maps/search/?api=1&query=Ibimirim%20Pernambuco" target="_blank" rel="noreferrer"><Navigation size={18}/>Abrir localização</a></section>

        <section className="rsvpSection" id="presenca">
          <img className="rsvpPhoto" src={photos.girlHorse} alt="" aria-hidden="true"/><div className="rsvpOverlay"/>
          <div className="rsvpCard">
            <div className="rsvpCopy"><span className="eyebrow">CONFIRMAÇÃO DE PRESENÇA</span><h2>Vai ser lindo ter você com a gente!</h2><p>Confirme sua presença para a família preparar tudo com muito carinho.</p><ul><li>✓ {party.date}</li><li>✓ A partir das {party.time}</li><li>✓ Festa infantil na {party.place}</li></ul></div>
            {rsvpSent ? <div className="rsvpSuccess"><Sparkles/><h3>Presença confirmada!</h3><p>Seu nome já faz parte da aventura da Helena.</p><button onClick={() => setRsvpSent(false)}>Corrigir resposta</button></div> : <form className="rsvpForm" onSubmit={submitRsvp}><label>Nome do convidado<input name="name" required placeholder="Como podemos chamar você?"/></label><label>Quantas pessoas irão?<select name="guests" defaultValue="1"><option value="1">1 pessoa</option><option value="2">2 pessoas</option><option value="3">3 pessoas</option><option value="4">4 pessoas</option></select></label><label>Recadinho para a Helena <span>(opcional)</span><textarea name="message" rows={3} placeholder="Escreva uma mensagem carinhosa"/></label><button className="confirmButton" type="submit">Confirmar minha presença</button></form>}
          </div>
        </section>

        <section className="closingSection"><img src={photos.opening} alt="Menina pequena com cavalo na fazenda"/><div className="closingOverlay"/><div className="closingCopy"><span className="eyebrow">ATÉ O GRANDE DIA</span><h2>Helena e seu cavalinho já estão esperando por você.</h2><p>Obrigada por fazer parte dessa aventura tão especial.</p><a href="#inicio">Voltar ao início</a></div></section>
        <footer><span>Feito com carinho para celebrar os {party.age} anos da Helena.</span><small>Desenvolvido por Anderson Jhonatan da K2 Tech</small></footer>
      </div>
    </main>
  );
}
