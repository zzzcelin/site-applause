import { useEffect, useState, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

type TeamMember = {
  name: string;
  role: string;
  bio: string[];
  tags: string[];
  image: string;
};

const teamMembers: TeamMember[] = [
  {
    name: 'Wilson Camargos',
    role: 'Fundador & CEO',
    bio: [
      'Há mais de 22 anos conduzindo marcas ao topo. Wilson construiu sua trajetória transformando desafios complexos em estratégias de crescimento sustentável, sempre com foco em resultado e propósito.',
      'Lidera a Applause com a convicção de que marketing de excelência é aquele que une dados, criatividade e profundo entendimento humano — entregando valor real em cada decisão.',
    ],
    tags: ['Branding', 'Estratégia', 'Liderança'],
    image: 'https://images.pexels.com/photos/38453564/pexels-photo-38453564.jpeg?auto=compress&cs=tinysrgb&h=800&w=600',
  },
  {
    name: 'Marina Dantas',
    role: 'Diretora de Criação',
    bio: [
      'Com passagem por agências premiadas no Brasil e exterior, Marina traduz identidades de marca em narrativas visuais memoráveis, do conceito ao detalhe final.',
      'Sua abordagem une estética apurada e pensamento estratégico para criar experiências que emocionam e convertem em todos os pontos de contato.',
    ],
    tags: ['Direção de Arte', 'Conteúdo', 'Design'],
    image: 'https://images.pexels.com/photos/27015641/pexels-photo-27015641.jpeg?auto=compress&cs=tinysrgb&h=800&w=600',
  },
];

export default function TeamCarousel() {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % teamMembers.length);
  }, []);

  const prev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + teamMembers.length) % teamMembers.length);
  }, []);

  const handleManualNav = (direction: 'prev' | 'next') => {
    setIsPaused(true);
    if (direction === 'prev') prev();
    else next();
  };

  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (document.readyState === 'complete') {
      setIsReady(true);
    } else {
      const onLoad = () => setIsReady(true);
      window.addEventListener('load', onLoad, { once: true });
      return () => window.removeEventListener('load', onLoad);
    }
  }, []);


  useEffect(() => {
    if (!isReady || isPaused) return;
    const interval = window.setInterval(() => next(), 6000);
    return () => window.clearInterval(interval);
  }, [isReady, isPaused, next]);

  const member = teamMembers[current];

  return (
    <div className="team-carousel">
      <div className="team-shell" key={current}>
        <div className="team-photo-col">
          <div className="team-photo-wrap">
            <img src={member.image} alt={member.name} className="team-photo" />
          </div>
        </div>
        <article className="team-info-col">
          <div className="team-info-header">
            <p className="team-eyebrow">Nossa História</p>
            <h3 className="team-name">{member.name}</h3>
            <p className="team-role">{member.role}</p>
          </div>
          <div className="team-bio-block">
            {member.bio.map((paragraph, i) => (
              <p className={`team-bio ${i === 0 ? 'team-bio-lead' : ''}`} key={i}>{paragraph}</p>
            ))}
          </div>
          <div className="team-card-footer">
            <div className="team-tags">
              {member.tags.map((tag) => (
                <span className="team-tag" key={tag}>{tag}</span>
              ))}
            </div>
            <div className="team-card-controls">
              <button
                className="team-arrow"
                onClick={() => handleManualNav('prev')}
                aria-label="Membro anterior"
                type="button"
              >
                <ChevronLeft size={18} strokeWidth={1.5} />
              </button>
              <button
                className="team-arrow"
                onClick={() => handleManualNav('next')}
                aria-label="Próximo membro"
                type="button"
              >
                <ChevronRight size={18} strokeWidth={1.5} />
              </button>
            </div>
          </div>
        </article>
      </div>
      <div className="team-indicators" aria-label="Profissional ativo">
        {teamMembers.map((_, i) => (
          <span
            key={i}
            className={`team-dot ${i === current ? 'is-active' : ''}`}
          />
        ))}
      </div>
    </div>
  );
}
