import { useEffect, useState, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import fotoAnderson from '../anderson.png';
import fotoMarcello from '../marcello.png';
// Quando tiver a foto do Marcello, salve como src/marcello.png, descomente a linha abaixo
// e troque `image: undefined` do Marcello por `image: fotoMarcello`:

type TeamMember = {
  name: string;
  role: string;
  subtitle?: string; // Frase fixa logo abaixo do nome (opcional)
  bio: string[];     // Cada item é um parágrafo; todos aparecem sempre, sem "Ver mais"
  tags: string[];
  image?: string;    // Sem foto, o card mostra um monograma com as iniciais
};

// Tempo de cada slide na troca automática (biografias completas pedem mais tempo de leitura)
const AUTOPLAY_MS = 12000;

const teamMembers: TeamMember[] = [
  {
    name: 'Anderson Rodrigues',
    role: 'Fundador & CEO',
    subtitle: 'Estratégia, comunicação e inteligência jurídica para impulsionar negócios.',
    bio: [
      'Com mais de 22 anos de experiência profissional, sou formado em Marketing, Jornalismo e Direito, reunindo uma visão multidisciplinar que conecta posicionamento de marca, comunicação estratégica, desenvolvimento de negócios e análise jurídica.',
      'Fundada em 2016, a Applause Marketing nasceu com o propósito de ajudar empresas a fortalecerem sua presença no mercado, ampliarem oportunidades comerciais e construírem marcas relevantes e competitivas.',
      'Ao longo dessa trajetória, desenvolvi projetos para clientes no Brasil e no exterior, incluindo mercados como Estados Unidos e Europa, atuando em diferentes segmentos e desafios de negócio.',
      'Minha formação em Marketing, Jornalismo e Direito, tudo isso agrega uma perspectiva estratégica às soluções desenvolvidas, com atenção à propriedade intelectual, proteção de marca, segurança jurídica e gestão de riscos, aspectos cada vez mais relevantes para empresas que buscam crescer de forma estruturada e sustentável.',
      'À frente da Applause, uno experiência, criatividade, comunicação e visão jurídica para desenvolver estratégias personalizadas, fortalecer o posicionamento de marcas e transformar oportunidades em resultados consistentemente.',
    ],
    tags: ['Branding', 'Estratégia', 'Liderança'],
    image: fotoAnderson,
  },
  {
    name: 'Marcello Augustho',
    role: 'Sócio',
    subtitle: 'Desenvolvimento Front-end, design de interface e estratégia digital.',
    bio: [
      'Formado em Design Gráfico e especializado em Análise e Desenvolvimento de Sistemas, uno o domínio técnico da programação Front-end com uma sólida bagagem em UI, UX e identidade visual. Minha abordagem multidisciplinar conecta estética de alto padrão à performance, desenvolvendo interfaces modernas, fluidas e totalmente focadas na experiência do usuário.',
      'Ao longo da minha trajetória, acumulei experiência em frentes administrativas e no marketing digital, atuando como Social Media e estrategista de conteúdo para marcas no Brasil e no exterior, incluindo o mercado norte-americano. Essa visão mercadológica me permite alinhar perfeitamente o design de interface aos objetivos comerciais e de conversão de cada negócio.',
      'Na Applause Marketing, lidero a arquitetura de soluções digitais e o desenvolvimento de interfaces utilizando tecnologias modernas como React, TypeScript e Tailwind CSS. Uno criatividade, usabilidade e precisão técnica para transformar conceitos complexos em plataformas eficientes e de alto impacto visual.',
    ],
    tags: ['Front-end', 'UI/UX', 'Marketing'],
    image: fotoMarcello, // TODO: foto do Marcello (veja o import comentado no topo)
  },
];

// Iniciais para o monograma (ex.: "Marcello Augustho" → "MA")
const getInitials = (name: string) => {
  const parts = name.trim().split(/\s+/);
  return (parts[0][0] + (parts.length > 1 ? parts[parts.length - 1][0] : '')).toUpperCase();
};

export default function TeamCarousel() {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const member = teamMembers[current];

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % teamMembers.length);
  }, []);

  const prev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + teamMembers.length) % teamMembers.length);
  }, []);

  const handleManualNav = (direction: 'prev' | 'next') => {
    setIsPaused(true); // se o usuário navegou, a troca automática para
    if (direction === 'prev') prev();
    else next();
  };

  // Troca automática (para depois da primeira navegação manual)
  useEffect(() => {
    if (isPaused) return;
    const interval = window.setInterval(() => next(), AUTOPLAY_MS);
    return () => window.clearInterval(interval);
  }, [isPaused, next]);

  return (
    <div className="team-carousel">
      {/* Setas nas extremidades opostas da seção (posição definida no index.css) */}
      <button
        className="team-arrow team-arrow-prev"
        onClick={() => handleManualNav('prev')}
        aria-label="Membro anterior"
        type="button"
      >
        <ChevronLeft size={20} strokeWidth={1.5} aria-hidden="true" />
      </button>
      <button
        className="team-arrow team-arrow-next"
        onClick={() => handleManualNav('next')}
        aria-label="Próximo membro"
        type="button"
      >
        <ChevronRight size={20} strokeWidth={1.5} aria-hidden="true" />
      </button>

      <div className="team-shell" key={current}>
        {/* Foto (ou monograma enquanto não houver foto) */}
        <div className="team-photo-col">
          <div className="team-photo-wrap">
            {member.image ? (
              <img src={member.image} alt={member.name} className="team-photo" loading="lazy" decoding="async" />
            ) : (
              <div
                className="team-photo flex items-center justify-center bg-[#191a19] text-[#ffc400] text-[clamp(72px,12vw,140px)] font-semibold tracking-[-0.08em]"
                role="img"
                aria-label={`Foto de ${member.name} em breve`}
              >
                {getInitials(member.name)}
              </div>
            )}
          </div>
        </div>

        {/* Informações */}
        <article className="team-info-col">
          <div className="team-info-header">
            <p className="team-eyebrow">Nossa História</p>
            {/* Nome em uma linha no desktop; no celular pode quebrar para não estourar a tela */}
            <h3 className="team-name min-[801px]:whitespace-nowrap">{member.name}</h3>
            {/* Subtítulo fixo, logo abaixo do nome */}
            {member.subtitle && <p className="team-subtitle">{member.subtitle}</p>}
            <p className="team-role">{member.role}</p>
          </div>

          {/* Biografia completa, sempre visível */}
          <div className="team-bio-block">
            {member.bio.map((paragraph, i) => (
              <p className={`team-bio ${i === 0 ? 'team-bio-lead' : ''}`} key={i}>{paragraph}</p>
            ))}
          </div>

          {/* Tags */}
          <div className="team-card-footer">
            <div className="team-tags">
              {member.tags.map((tag) => (
                <span className="team-tag" key={tag}>{tag}</span>
              ))}
            </div>
          </div>
        </article>
      </div>

      {/* Indicadores */}
      <div className="team-indicators" aria-label="Profissional ativo">
        {teamMembers.map((_, i) => (
          <span key={i} className={`team-dot ${i === current ? 'is-active' : ''}`} />
        ))}
      </div>
    </div>
  );
}
