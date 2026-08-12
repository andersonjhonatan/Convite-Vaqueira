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

const art = {
  girl: 'https://cdn.pixabay.com/photo/2024/02/20/22/29/ai-generated-8586295_1280.jpg',
  pony: 'https://cdn.pixabay.com/photo/2025/01/04/10/09/ai-generated-9309573_1280.jpg',
  girl3d: 'https://cdn.pixabay.com/photo/2023/04/06/05/33/girl-character-7902894_1280.jpg',
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

function Flowers({ amount = 18 }: { amount?: number }) {
  return (
    <div className="floatingFlowers" aria-hidden="true">
      {Array.from({ length: amount }, (_, index) => (
        <i key={index} style={{ left: `${(index * 37 + 4) % 100}%`, animationDelay: `${-(index % 6) * 1.1}s` }} />
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
    window.setTimeout(() => setEntry('entered'), 1450);
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
    }, 700);
  };

  const submitRsvp = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setRsvpSent(true);
  };

  return (
    <main>
      <section className={`dreamOpening ${entry === 'opening' ? 'dreamOpening--opening' : ''} ${entry === 'entered' ? 'dreamOpening--gone' : ''}`} aria-hidden={entry === 'entered'}>
        <div className="openingSky" />
        <div className="openingSun" />
        <div className="openingCloud cloudA" />
        <div className="openingCloud cloudB" />
        <Flowers />

        <div className="openingMeadow" aria-hidden="true">
          <span className="hill hillBack" />
          <span className="hill hillFront" />
          <span className="flowerPatch fp1">✿ ✼ ✿ ✼</span>
          <span className="flowerPatch fp2">✿ ✼ ✿</span>
        </div>

        <motion.div className="openingCopy" initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .8 }}>
          <span className="openingKicker">UMA TARDE BEM FOFINHA ESTÁ CHEGANDO</span>
          <small>A fazendinha encantada de</small>
          <h1>Helena</h1>
          <div className="openingAge"><strong>6</strong><span>ANOS</span></div>
          <p>Flores, brincadeiras e um cavalinho especial estão esperando por você.</p>
          <button type="button" onClick={enterInvite} disabled={entry === 'opening'}>
            <strong>{entry === 'opening' ? 'ENTRANDO NA FAZENDINHA...' : 'COMEÇAR A AVENTURA'}</strong>
            <span>toque para entrar no aniversário</span>
          </button>
        </motion.div>

        <div className="openingArt" aria-hidden="true">
          <motion.div className="girlCutout" animate={entry === 'opening' ? { x: 58, y: 15, rotate: -2, scale: 1.04 } : { x: 0, y: 0, rotate: 0, scale: 1 }} transition={{ duration: 1.1, ease: 'easeInOut' }}>
            <img src={art.girl} alt="" />
          </motion.div>
          <motion.div className="ponyCutout" animate={entry === 'opening' ? { x: 92, y: -18, rotate: 2, scale: 1.06 } : { x: 0, y: 0, rotate: 0, scale: 1 }} transition={{ duration: 1.1, ease: 'easeInOut' }}>
            <img src={art.pony} alt="" />
          </motion.div>
          <div className="artRibbon">🎀</div>
        </div>

        <div className="openingCurtain openingCurtain--left" aria-hidden="true" />
        <div className="openingCurtain openingCurtain--right" aria-hidden="true" />
        <AnimatePresence>{entry === 'opening' && <motion.div className="openingWelcome" initial={{ opacity: 0, scale: .86 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}>✨ Pode entrar! A Helena está te esperando. ✨</motion.div>}</AnimatePresence>
      </section>

      <div className={`invite ${entry === 'entered' ? 'invite--visible' : ''}`} aria-hidden={entry !== 'entered'}>
        <header className="hero" id="inicio">
          <div className="heroBackdrop" />
          <Flowers amount={12} />
          <nav className="topbar">
            <a className="brand" href="#inicio">✿ Fazendinha da Helena</a>
            <div><a href="#missao">Brincadeira</a><a href="#presenca">Presença</a></div>
          </nav>
          <div className="heroCopy">
            <span className="eyebrow">A AVENTURA COMEÇOU</span>
            <h2>Um aniversário feito para uma <span>pequena vaqueirinha</span></h2>
            <p>Helena vai completar <strong>{party.age} anos</strong> e quer viver uma tarde cheia de carinho, cavalinho, flores e brincadeira com pessoas especiais.</p>
            <div className="heroActions"><a href="#missao" className="primaryAction">Começar a brincadeira</a><a href="#presenca" className="secondaryAction">Confirmar presença</a></div>
          </div>
          <div className="heroCharacter"><img src={art.girl} alt="Ilustração infantil de uma pequena vaqueirinha" /></div>
          <div className="heroPony"><img src={art.pony} alt="Ilustração infantil de um cavalinho jovem" /></div>
          <div className="heroBadge"><strong>{party.age}</strong><span>ANOS DE DOÇURA</span></div>
        </header>

        <section className="eventSection">
          <div className="sectionHeading"><span className="eyebrow brown">MARQUE NA FOLHINHA</span><h2>O grande dia está chegando</h2><p>Uma festa infantil com natureza, cavalinho e muita alegria.</p></div>
          <div className="detailGrid">
            <article className="detailCard"><CalendarDays/><small>QUANDO</small><h3>31 de outubro</h3><p>Sábado · {party.time}</p></article>
            <article className="detailCard featured"><MapPin/><small>ONDE</small><h3>{party.place}</h3><p>{party.address}</p></article>
            <article className="detailCard"><Heart/><small>CLIMA DA FESTA</small><h3>Doce e encantado</h3><p>Flores, brincadeiras e diversão de criança.</p></article>
          </div>
          <Countdown />
        </section>

        <section className="storySection">
          <div className="storyVisual"><div className="storyGirl"><img src={art.girl3d} alt="Ilustração de uma menina pequena em estilo 3D" /></div><div className="storyPony"><img src={art.pony} alt="Ilustração de um cavalinho" /></div><span className="storyLabel">A DONA DA FESTA · HELENA</span></div>
          <div className="storyCopy"><span className="eyebrow gold">UM RECADINHO PARA VOCÊ</span><h2>Minha aventura fica mais bonita quando você está pertinho.</h2><p>Helena escolheu seu chapéu preferido, separou seus lacinhos e já está contando os dias para brincar com todo mundo.</p><blockquote>“Vem conhecer meu cavalinho e fazer parte do meu dia mais feliz!”</blockquote><span className="signature">— Helena e família</span></div>
        </section>

        <section className="gallerySection">
          <div className="sectionHeading light"><span className="eyebrow">O MUNDINHO DA HELENA</span><h2>Delicadeza, campo e cavalinhos</h2><p>Uma pequena vaqueirinha vivendo uma aventura feita para criança.</p></div>
          <div className="galleryGrid">
            <figure className="galleryGirl"><img src={art.girl} alt="Pequena vaqueirinha em aquarela"/><figcaption>Minha roupa favorita</figcaption></figure>
            <figure><img src={art.pony} alt="Cavalinho jovem em campo de flores"/><figcaption>Meu companheiro de aventura</figcaption></figure>
            <figure><img src={art.girl3d} alt="Menina infantil em estilo 3D"/><figcaption>Um dia cheio de brincadeiras</figcaption></figure>
          </div>
        </section>

        <section className="gameSection" id="missao">
          <div className="sectionHeading light"><span className="eyebrow">MISSÃO DA PEQUENA VAQUEIRINHA</span><h2>Encontre os lacinhos perdidos</h2><p>Toque nos lacinhos escondidos e veja Helena ir buscar cada um.</p></div>
          <div className="gameShell">
            <div className="gameTop"><span>✿ BRINCADEIRA EM ANDAMENTO</span><strong>{found.length}/4 encontrados</strong></div>
            <div className="farmScene">
              <div className="gameSky"/><div className="gameHill one"/><div className="gameHill two"/><div className="gameBarn"><span>FESTA</span></div><div className="gameTree"/><div className="gameFence"/>
              {ribbons.map((ribbon) => <button key={ribbon.id} className={`ribbon ${found.includes(ribbon.id) ? 'found' : ''}`} style={{ left: `${ribbon.x}%`, top: `${ribbon.y}%` }} onClick={() => collectRibbon(ribbon)} aria-label={`Lacinho ${ribbon.label}`}><span>🎀</span></button>)}
              <motion.div className="gameAvatar" animate={{ left: `${activeRibbon?.x ?? 10}%`, top: `${activeRibbon?.y ?? 78}%` }} transition={{ type: 'spring', stiffness: 70, damping: 16 }}><div><img src={art.girl3d} alt=""/></div><span>Helena</span></motion.div>
              {found.length === ribbons.length && <div className="gameCelebration">✨ Você encontrou todos! ✨</div>}
            </div>
            <div className="gameStatus"><div>🐴</div><p>{gameMessage}</p><button type="button" onClick={() => { setFound([]); setActiveRibbon(null); setGameMessage('Helena perdeu quatro lacinhos pela fazendinha. Encontre o primeiro para ela ir buscar!'); }}>Recomeçar</button></div>
          </div>
        </section>

        <section className="locationSection"><div><span className="eyebrow brown">DESTINO DA AVENTURA</span><h2>{party.place}</h2><p>{party.address}</p></div><a href="https://www.google.com/maps/search/?api=1&query=Ibimirim%20Pernambuco" target="_blank" rel="noreferrer"><Navigation size={18}/>Abrir localização</a></section>

        <section className="rsvpSection" id="presenca">
          <div className="rsvpDecor"><img src={art.pony} alt="" aria-hidden="true" /></div>
          <div className="rsvpCard">
            <div className="rsvpCopy"><span className="eyebrow">CONFIRMAÇÃO DE PRESENÇA</span><h2>Vai ser lindo ter você com a gente!</h2><p>Confirme sua presença para a família preparar tudo com muito carinho.</p><ul><li>✓ {party.date}</li><li>✓ A partir das {party.time}</li><li>✓ Festa infantil na {party.place}</li></ul></div>
            {rsvpSent ? <div className="rsvpSuccess"><Sparkles/><h3>Presença confirmada!</h3><p>Seu nome já faz parte da aventura da Helena.</p><button onClick={() => setRsvpSent(false)}>Corrigir resposta</button></div> : <form className="rsvpForm" onSubmit={submitRsvp}><label>Nome do convidado<input name="name" required placeholder="Como podemos chamar você?"/></label><label>Quantas pessoas irão?<select name="guests" defaultValue="1"><option value="1">1 pessoa</option><option value="2">2 pessoas</option><option value="3">3 pessoas</option><option value="4">4 pessoas</option></select></label><label>Recadinho para a Helena <span>(opcional)</span><textarea name="message" rows={3} placeholder="Escreva uma mensagem carinhosa"/></label><button className="confirmButton" type="submit">Confirmar minha presença</button></form>}
          </div>
        </section>

        <section className="closingSection"><div className="closingArt"><img src={art.girl} alt="Pequena vaqueirinha"/><img src={art.pony} alt="Cavalinho"/></div><div className="closingCopy"><span className="eyebrow">ATÉ O GRANDE DIA</span><h2>Helena e seu cavalinho já estão esperando por você.</h2><p>Obrigada por fazer parte dessa aventura tão especial.</p><a href="#inicio">Voltar ao início</a></div></section>
        <footer><span>Feito com carinho para celebrar os {party.age} anos da Helena.</span><small>Desenvolvido por Anderson Jhonatan da K2 Tech</small></footer>
      </div>
    </main>
  );
}
