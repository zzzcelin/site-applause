import { useEffect, useState } from 'react';
import { ArrowDown, ArrowUpRight, Menu, X, Instagram, Linkedin, Music2 } from 'lucide-react';
import logoAgencia from './logo_png.png';
import ContactForm from '@/components/ContactForm';


const projects = [
  {
    title: 'Campanha de Escalonamento de Vendas',
    client: 'Varejo Horizonte',
    category: 'Performance 360°',
    image: 'https://images.pexels.com/photos/6834002/pexels-photo-6834002.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    tone: 'lime',
  },
  {
    title: 'Reposicionamento de Marca Nacional',
    client: 'Grupo Aurora',
    category: 'Branding estratégico',
    image: 'https://images.pexels.com/photos/6476257/pexels-photo-6476257.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    tone: 'blue',
  },
  {
    title: 'Lançamento que Gera Conversas',
    client: 'Casa Norte',
    category: 'Conteúdo & cultura',
    image: 'https://images.pexels.com/photos/20480963/pexels-photo-20480963.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    tone: 'orange',
  },
  {
    title: 'Crescimento em Todos os Canais',
    client: 'Nexa Tech',
    category: 'Estratégia digital',
    image: 'https://images.pexels.com/photos/39190479/pexels-photo-39190479.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    tone: 'pink',
  },
];

const services = [
  { title: 'Estratégia Digital', detail: 'Direção para transformar ambição em crescimento.' },
  { title: 'Gestão de Redes Sociais', detail: 'Presença relevante nas conversas que importam.' },
  { title: 'E-mail Marketing', detail: 'Relacionamentos que evoluem para resultados.' },
  { title: 'Tráfego Pago & Orgânico', detail: 'Performance orientada por dados e intenção.' },
  { title: 'Branding & Conteúdo', detail: 'Marcas consistentes, desejadas e memoráveis.' },
];

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setIsLoading(false), 1700);
    return () => window.clearTimeout(timer);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="site-shell">
      <div className={`intro-screen ${isLoading ? 'is-visible' : 'is-hidden'}`} aria-hidden={!isLoading}>
        <div className="intro-mark">APPLAUSE</div>
        <p>Agência de Marketing</p>
      </div>

      <header className="site-header">
        <a className="wordmark" href="#top" onClick={closeMenu} aria-label="Applause Marketing">
          APPLAUSE<span>MARKETING</span>
        </a>
        <div className="header-meta">
          <span>São Paulo / Brasil</span>
          <button className="menu-toggle" type="button" onClick={() => setMenuOpen(true)} aria-label="Abrir menu">
            <Menu size={19} strokeWidth={1.5} />
            <span>Menu</span>
          </button>
        </div>
      </header>

      <div className={`menu-panel ${menuOpen ? 'is-open' : ''}`}>
        <div className="menu-top">
          <img src={logoAgencia} alt="Applause Marketing" className="menu-logo" />
          <button className="menu-close" type="button" onClick={closeMenu} aria-label="Fechar menu">
            <X size={22} strokeWidth={1.4} />
          </button>
        </div>
        <p className="eyebrow">Navegação / 001</p>
        <nav className="menu-links" aria-label="Menu principal">
          <a href="#about" onClick={closeMenu}>Sobre a Applause <span>01</span></a>
          <a href="#work" onClick={closeMenu}>Cases <span>02</span></a>
          <a href="#contact" onClick={closeMenu}>Contato <span>03</span></a>
        </nav>
        <div className="menu-footer">
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="Instagram"><Instagram size={22} strokeWidth={1.5} /></a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="LinkedIn"><Linkedin size={22} strokeWidth={1.5} /></a>
          <a href="https://behance.net" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="Behance"><Music2 size={22} strokeWidth={1.5} /></a>
        </div>
      </div>

      <main id="top">
        <section className="hero section-pad">
          <div className="hero-copy">
            <p className="eyebrow">Estratégia, criatividade e resultado / Brasil</p>
            <h1>Transformamos ideias<br /><em>em REALIDADE.</em></h1>
            <div className="hero-bottom">
              <p>Estratégias digitais que conectam marcas às pessoas e transformam oportunidades em resultados de negócio.</p>
              <a className="round-link" href="#work" aria-label="Conheça nossos cases"><ArrowDown size={20} strokeWidth={1.2} /></a>
            </div>
          </div>
          <div className="hero-orbit animate-[spin_15s_linear_infinite]" aria-hidden="true" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
  <img src={logoAgencia} alt="Applause Logo" className="w-[115px] h-[115px] object-contain" />
</div>

          <div className="hero-index">01 <span>/ 05</span></div>
        </section>

        <section id="about" className="about section-pad">
          <div className="section-label"><span>02</span><span>Sobre nós</span></div>
          <div className="about-grid">
            <h2>Parceiros para<br /><span>crescer com propósito.</span></h2>
            <div className="about-text">
              <p className="large-copy">A Applause Marketing é a parceira estratégica de marcas que querem avançar com clareza, relevância e impacto.</p>
              <p>Unimos estratégia, criatividade e inteligência de dados para construir caminhos consistentes de crescimento — do posicionamento à performance.</p>
              <a className="text-link" href="#contact">Conheça nosso jeito <ArrowUpRight size={17} strokeWidth={1.3} /></a>
            </div>
          </div>
        </section>

        <section className="awards section-pad">
          <div className="section-label light"><span>03</span><span>Serviços</span></div>
          <div className="awards-heading"><h2>Soluções que<br /><em>geram impacto.</em></h2><span className="award-count">05 frentes</span></div>
          <div className="award-list">{services.map(({ title, detail }, index) => <div className="award-row" key={title}><span>0{index + 1}</span><strong>{title}</strong><small>{detail}</small><ArrowUpRight size={18} strokeWidth={1.2} /></div>)}</div>
        </section>

        <section id="work" className="work section-pad">
          <div className="work-heading"><div className="section-label"><span>04</span><span>Cases selecionados</span></div><h2>Marcas em<br /><em>movimento.</em></h2><p>Projetos que combinam visão de negócio, cultura e execução para gerar valor em cada ponto de contato.</p></div>
          <div className="project-grid">{projects.map((project, index) => <a className={`project-card ${project.tone} card-${index + 1}`} href="#contact" key={project.title}><div className="project-image"><img src={project.image} alt={project.title} /><span className="project-arrow"><ArrowUpRight size={20} strokeWidth={1.3} /></span></div><div className="project-info"><div><h3>{project.title}</h3><p>{project.client}</p></div><span>{project.category}</span></div></a>)}</div>
          <a className="all-work" href="#contact">Ver todos os cases <ArrowUpRight size={18} strokeWidth={1.3} /></a>
        </section>

        <section id="contact" className="contact section-pad">
          <div className="contact-grid">
            <div className="contact-copy-col">
              <p className="eyebrow">05 / Vamos conversar</p>
              <h2 className="contact-headline">Vamos criar uma<br /><em>estratégia de verdade?</em></h2>
              <p className="contact-support-copy">Está na hora de parar de fazer marketing comum e começar a construir resultados reais.</p>
              <div className="contact-seal">
                <span className="contact-seal-dot" />
                <span>Atendimento digital em todo território nacional</span>
              </div>
              <a href="mailto:contato@applause.com" className="contact-link">contato@applause.com <ArrowUpRight size={26} strokeWidth={1.2} /></a>
            </div>
            <div className="contact-form-col">
              <ContactForm />
            </div>
          </div>
          <div className="contact-bottom">
            <span>São Paulo · Brasil</span>
            <span>© 2026 Applause Marketing</span>
            <span>Estratégia que merece aplauso</span>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
