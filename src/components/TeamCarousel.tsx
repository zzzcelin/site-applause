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

  useEffect(() => {
    if (isPaused) return;
    const interval = window.setInterval(() => {
      next();
    }, 6000);
    return () => window.clearInterval(interval);
  }, [isPaused, next]);

  const member = teamMembers[current];

  return (
    <div className="team-carousel">
      <div className="team-slide" key={current}>
        <div className="team-photo-col">
          <div className="team-photo-wrap">
            <img src={member.image} alt={member.name} className="team-photo" />
            <span className="team-role-badge">{member.role}</span>
          </div>
        </div>
        <div className="team-info-col">
          <p className="team-eyebrow">Nossa História</p>
          <h3 className="team-name">{member.name}</h3>
          {member.bio.map((paragraph, i) => (
            <p className="team-bio" key={i}>{paragraph}</p>
          ))}
          <div className="team-tags">
            {member.tags.map((tag) => (
              <span className="team-tag" key={tag}>{tag}</span>
            ))}
          </div>
        </div>
      </div>
      <div className="team-controls">
        <button
          className="team-arrow"
          onClick={() => handleManualNav('prev')}
          aria-label="Membro anterior"
          type="button"
        >
          <ChevronLeft size={22} strokeWidth={1.5} />
        </button>
        <div className="team-indicators">
          {teamMembers.map((_, i) => (
            <span
              key={i}
              className={`team-dot ${i === current ? 'is-active' : ''}`}
            />
          ))}
        </div>
        <button
          className="team-arrow"
          onClick={() => handleManualNav('next')}
          aria-label="Próximo membro"
          type="button"
        >
          <ChevronRight size={22} strokeWidth={1.5} />
        </button>
      </div>
    </div>
  );
}
