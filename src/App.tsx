import { useEffect, useRef, useState } from 'react';
import { ArrowDown, ArrowUpRight, Menu, X, Instagram, Linkedin } from 'lucide-react';
import logoAgencia from './logo_png.png';
import ContactForm from '@/components/ContactForm';
import TeamCarousel from '@/components/TeamCarousel';
import imgRenata from './cases/1.png';    // Case: Renata Vyanna
import imgWebsite from './cases/2.png';   // Case: Proposta de site / e-commerce
import imgSocial from './cases/3.png';    // Case: Social media
import imgAdvanced from './cases/4.png';  // Case: Advanced Aesthetic

/* ==========================================================================
   CONFIGURAÇÃO — edite aqui textos, links e contatos sem mexer no layout
   ========================================================================== */

// TODO: troque pelos perfis reais da agência (LinkedIn e Behance estão genéricos)
const CONTACT_EMAIL = 'contato@applause.com';
const SOCIAL_LINKS = {
  instagram: 'https://www.instagram.com/applausemkt/',
  linkedin: 'https://linkedin.com',
  behance: 'https://behance.net',
};

// Classe reutilizável: área de toque mínima de 48x48px + foco visível por teclado
const TOUCH_TARGET =
  'inline-flex min-h-[48px] min-w-[48px] items-center justify-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4';

// Cases do portfólio.
// ATENÇÃO: confira se cada imagem corresponde ao projeto (antes estavam trocadas).
const projects = [
  {
    title: 'Transformando cliques em faturamento real',
    client: 'E-commerce de Moda',
    category: 'Desenvolvimento Web',
    image: imgWebsite,
    tone: 'gold',
  },
  {
    title: 'A tradução visual do autocuidado de alto padrão',
    client: 'Renata Vyanna',
    category: 'Identidade Visual & Branding',
    image: imgRenata,
    tone: 'gold',
  },
  {
    title: 'Narrativas visuais que geram desejo imediato',
    client: 'Moda & Lifestyle',
    category: 'Gestão de Redes Sociais',
    image: imgSocial,
    tone: 'gold',
  },
  {
    title: 'Performance digital desenhada para líderes de mercado',
    client: 'Advanced Aesthetic',
    category: 'Estratégia Digital 360°',
    image: imgAdvanced,
    tone: 'gold',
  },
];

const services = [
  { title: 'Estratégia Digital', detail: 'Direção para transformar ambição em crescimento.' },
  { title: 'Gestão de Redes Sociais', detail: 'Presença relevante nas conversas que importam.' },
  { title: 'E-mail Marketing', detail: 'Relacionamentos que evoluem para resultados.' },
  { title: 'Tráfego Pago & Orgânico', detail: 'Performance orientada por dados e intenção.' },
  { title: 'Branding & Conteúdo', detail: 'Marcas consistentes, desejadas e memoráveis.' },
];

const menuItems = [
  { label: 'Início', href: '#top' },
  { label: 'Sobre nós', href: '#about' },
  { label: 'Serviços', href: '#services' },
  { label: 'Portfólio', href: '#work' },
  { label: 'Vamos conversar', href: '#contact' },
];

/* ==========================================================================
   COMPONENTES AUXILIARES
   ========================================================================== */

function BehanceIcon() {
  return (
    <svg viewBox="0 0 32 20" width="22" height="14" aria-hidden="true" focusable="false">
      <path fill="currentColor" d="M2 2h7.2c3.5 0 5.8 1.5 5.8 4.2 0 1.5-.8 2.7-2.2 3.4 1.9.6 3 1.9 3 3.8 0 3.1-2.5 4.6-6.2 4.6H2V2Zm4 3.1v3.1h2.8c1.4 0 2.1-.5 2.1-1.6s-.7-1.5-2.1-1.5H6Zm0 6.1v3.7h3.2c1.5 0 2.4-.6 2.4-1.9s-.9-1.8-2.4-1.8H6ZM23.1 5.8c4 0 6.2 2.8 6.2 6.8v.8h-9.6c.2 1.8 1.3 2.8 3 2.8 1.2 0 2.2-.5 2.7-1.5h3.6c-.8 2.3-3 3.7-6.3 3.7-4.3 0-6.9-2.5-6.9-6.3s2.9-6.3 7.3-6.3Zm-3.3 5h5.6c-.3-1.5-1.1-2.4-2.7-2.4-1.6 0-2.6.8-2.9 2.4ZM21.1 2h5v1.8h-5V2Z" />
    </svg>
  );
}

// Ícones sociais reutilizados no menu e no rodapé (evita código duplicado)
function SocialLinks({ size }: { size: number }) {
  return (
    <>
      <a href={SOCIAL_LINKS.instagram} target="_blank" rel="noopener noreferrer" className={`social-icon ${TOUCH_TARGET}`} aria-label="Instagram da Applause (abre em nova aba)">
        <Instagram size={size} strokeWidth={1.5} />
      </a>
      <a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noopener noreferrer" className={`social-icon ${TOUCH_TARGET}`} aria-label="LinkedIn da Applause (abre em nova aba)">
        <Linkedin size={size} strokeWidth={1.5} />
      </a>
      <a href={SOCIAL_LINKS.behance} target="_blank" rel="noopener noreferrer" className={`social-icon ${TOUCH_TARGET}`} aria-label="Behance da Applause (abre em nova aba)">
        <BehanceIcon />
      </a>
    </>
  );
}

/* ==========================================================================
   APP
   ========================================================================== */

function App() {
  // Tela de abertura: aparece em toda visita, por 2,2s
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => setIsLoading(false), 2200);
    return () => window.clearTimeout(timer);
  }, []);

  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  // Título da página (o ideal é também definir title/description no index.html)
  useEffect(() => {
    document.title = 'Applause Marketing | Agência de Marketing Digital em São Paulo';
  }, []);

  // Menu: trava o scroll, fecha com Esc e remove do foco quando fechado
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    const panel = menuRef.current;
    if (panel) {
      if (menuOpen) panel.removeAttribute('inert');
      else panel.setAttribute('inert', '');
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMenuOpen(false);
        toggleRef.current?.focus();
      }
    };
    if (menuOpen) window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [menuOpen, isLoading]);

  /* ---------- TELA DE ABERTURA ---------- */
  if (isLoading) {
    return (
      <div className="intro-screen" role="status" aria-label="Carregando Applause Marketing">
        <div className="intro-mark">APPLAUSE</div>
        <p>Agência de Marketing</p>
      </div>
    );
  }

  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="site-shell">
      {/* Link para pular direto ao conteúdo (acessibilidade por teclado) */}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-black focus:px-4 focus:py-3 focus:text-white"
      >
        Pular para o conteúdo
      </a>

      {/* ---------- CABEÇALHO ---------- */}
      <header className="site-header">
        <a className={`wordmark ${TOUCH_TARGET}`} href="#top" onClick={closeMenu} aria-label="Applause Marketing — início">
          APPLAUSE<span>MARKETING</span>
        </a>
        <div className="header-meta">
          <span>São Paulo / Brasil</span>
        </div>
      </header>

      {/* ---------- MENU (botão + painel lateral) ---------- */}
      <button
        ref={toggleRef}
        className={`menu-toggle ${TOUCH_TARGET} gap-2`}
        type="button"
        onClick={() => setMenuOpen(true)}
        aria-label="Abrir menu"
        aria-expanded={menuOpen}
        aria-controls="menu-panel"
      >
        <Menu size={19} strokeWidth={1.5} aria-hidden="true" />
        <span>Menu</span>
      </button>

      <div
        id="menu-panel"
        ref={menuRef}
        className={`menu-panel ${menuOpen ? 'is-open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Menu principal"
        aria-hidden={!menuOpen}
      >
        <div className="menu-top">
          <img src={logoAgencia} alt="Applause Marketing" className="menu-logo" />
          <button className={`menu-close ${TOUCH_TARGET}`} type="button" onClick={closeMenu} aria-label="Fechar menu">
            <X size={24} strokeWidth={1.5} aria-hidden="true" />
          </button>
        </div>
        <p className="eyebrow">Navegação / Informações</p>
        <nav className="menu-links" aria-label="Navegação principal">
          {menuItems.map(({ label, href }, index) => (
            <a key={href} href={href} onClick={closeMenu} className="min-h-[48px]">
              {label} <span>{String(index + 1).padStart(2, '0')}</span>
            </a>
          ))}
        </nav>
        <div className="menu-footer">
          <SocialLinks size={22} />
        </div>
      </div>

      <main id="main">
        <span id="top" />

        {/* ---------- 01 · HERO ---------- */}
        <section className="hero section-pad" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="eyebrow">Estratégia, criatividade e resultado / Brasil</p>
            <h1 id="hero-title">
              Transformamos ideias<br />
              <em>em realidade.</em>
            </h1>
            <div className="hero-bottom">
              <p>Estratégias digitais que conectam marcas às pessoas e transformam oportunidades em resultados de negócio.</p>
              <a className={`round-link ${TOUCH_TARGET}`} href="#work" aria-label="Ver nossos cases">
                <ArrowDown size={20} strokeWidth={1.2} aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Logo giratório decorativo (para de girar se o usuário preferir menos movimento) */}
          <div className="hero-orbit" aria-hidden="true">
            <img src={logoAgencia} alt="" className="hero-orbit-logo" />
          </div>

          <div className="hero-index">01 <span>/ 05</span></div>
        </section>

        {/* ---------- 02 · SOBRE NÓS ---------- */}
        <section id="about" className="about section-pad scroll-mt-20" aria-labelledby="about-title">
          <div className="section-label"><span>02</span><span>Sobre nós</span></div>
          <div className="about-grid">
            <h2 id="about-title">
              Parceiros para<br />
              <span>crescer com propósito.</span>
            </h2>
            <div className="about-text">
              <p className="large-copy">A Applause Marketing é a parceira estratégica de marcas que querem avançar com clareza, relevância e impacto.</p>
              <p>Unimos estratégia, criatividade e inteligência de dados para construir caminhos consistentes de crescimento, do posicionamento à performance.</p>
              <a className={`text-link ${TOUCH_TARGET} gap-2`} href="#services">
                Conheça nossas soluções <ArrowUpRight size={17} strokeWidth={1.3} aria-hidden="true" />
              </a>
            </div>
          </div>
          <TeamCarousel />
        </section>

        {/* ---------- 03 · SERVIÇOS ---------- */}
        <section id="services" className="awards section-pad scroll-mt-20" aria-labelledby="services-title">
          <div className="section-label light"><span>03</span><span>Serviços</span></div>
          <div className="awards-heading">
            <h2 id="services-title">
              Soluções que<br />
              <em>geram impacto.</em>
            </h2>
            <span className="award-count">{String(services.length).padStart(2, '0')} frentes</span>
          </div>
          <ul className="award-list">
            {services.map(({ title, detail }, index) => (
              <li key={title}>
                {/* Cada serviço leva ao contato, já que a seta indica ação */}
                <a className="award-row min-h-[48px]" href="#contact">
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <strong>{title}</strong>
                  <small>{detail}</small>
                  <ArrowUpRight size={18} strokeWidth={1.2} aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
        </section>

        {/* ---------- 04 · PORTFÓLIO ---------- */}
        <section id="work" className="work section-pad scroll-mt-20" aria-labelledby="work-title">
          <div className="work-heading">
            <div className="section-label"><span>04</span><span>Cases selecionados</span></div>
            <h2 id="work-title">
              Marcas em<br />
              <em>movimento.</em>
            </h2>
            <p>Projetos que combinam visão de negócio, cultura e execução para gerar valor em cada ponto de contato.</p>
          </div>

          <div className="project-grid">
            {projects.map((project, index) => (
              <a
                className={`project-card ${project.tone} card-${index + 1}`}
                href="#contact"
                key={project.client}
                aria-label={`${project.client}: ${project.title}. Fale com a gente sobre um projeto parecido.`}
              >
                <div className="project-image">
                  <img
                    src={project.image}
                    alt={`Case ${project.client} — ${project.category}`}
                    loading={index === 0 ? 'eager' : 'lazy'}
                    decoding="async"
                  />
                  <span className="project-arrow" aria-hidden="true"><ArrowUpRight size={20} strokeWidth={1.3} /></span>
                </div>
                <div className="project-info">
                  <div>
                    <h3>{project.title}</h3>
                    <p>{project.client}</p>
                  </div>
                  <span>{project.category}</span>
                </div>
              </a>
            ))}
          </div>

          <a className={`all-work ${TOUCH_TARGET} gap-2`} href="#contact">
            Quero um projeto como esses <ArrowUpRight size={18} strokeWidth={1.3} aria-hidden="true" />
          </a>
        </section>

        {/* ---------- 05 · CONTATO + RODAPÉ ---------- */}
        <section id="contact" className="contact section-pad scroll-mt-20" aria-labelledby="contact-title">
          <div className="contact-grid">
            <div className="contact-copy-col">
              <p className="eyebrow">05 / Vamos conversar</p>
              <h2 id="contact-title" className="contact-headline">
                Vamos criar uma<br />
                <em>estratégia de verdade?</em>
              </h2>
              <p className="contact-support-copy">Está na hora de parar de fazer marketing comum e começar a construir resultados reais.</p>
              <div className="contact-seal">
                <span className="contact-seal-dot" aria-hidden="true" />
                <span>Atendimento digital em todo o território nacional</span>
              </div>
              <div className="contact-email">
                <a href={`mailto:${CONTACT_EMAIL}`} className={`contact-link ${TOUCH_TARGET} gap-2`}>
                  {CONTACT_EMAIL} <ArrowUpRight size={26} strokeWidth={1.2} aria-hidden="true" />
                </a>
              </div>
            </div>
            <div className="contact-form-col">
              <ContactForm />
            </div>
          </div>

          <footer className="contact-bottom">
            <span className="footer-copyright">© {new Date().getFullYear()} Applause Marketing</span>
            <div className="footer-socials" aria-label="Redes sociais">
              <SocialLinks size={20} />
            </div>
            <span className="footer-tagline">Estratégia que merece aplauso</span>
          </footer>
        </section>
      </main>
    </div>
  );
}

export default App;
