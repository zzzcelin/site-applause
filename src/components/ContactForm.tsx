import { useState, type FormEvent } from 'react';
import { ArrowUpRight, Check, Loader as Loader2, CircleAlert as AlertCircle } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { maskWhatsApp } from '@/lib/mask';

type Status = 'idle' | 'loading' | 'success' | 'error';

export default function ContactForm() {
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (status === 'loading') return;

    setStatus('loading');
    setErrorMsg('');

    const { error } = await supabase.from('contact_submissions').insert({
      name: name.trim(),
      company: company.trim(),
      email: email.trim(),
      whatsapp: whatsapp.trim(),
    });

    if (error) {
      setStatus('error');
      setErrorMsg('Não foi possível enviar agora. Tente novamente em instantes.');
      return;
    }

    setStatus('success');
    setName('');
    setCompany('');
    setEmail('');
    setWhatsapp('');
  };

  if (status === 'success') {
    return (
      <div className="form-success">
        <div className="form-success-icon">
          <Check size={42} strokeWidth={1.5} />
        </div>
        <h3>Recebemos seu contato!</h3>
        <p>Em breve um especialista da nossa equipe entrará em contato pelo WhatsApp.</p>
        <button type="button" onClick={() => setStatus('idle')} className="form-back-btn">
          Enviar nova mensagem
        </button>
      </div>
    );
  }

  return (
    <form className="contact-form-card" onSubmit={handleSubmit} noValidate>
      <div className="form-card-header">
        <span className="form-card-badge">Falar com Especialista!</span>
      </div>

      <div className="form-field">
        <label htmlFor="f-name">Nome completo</label>
        <input
          id="f-name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Seu nome"
          required
          autoComplete="name"
        />
      </div>

      <div className="form-field">
        <label htmlFor="f-company">Empresa</label>
        <input
          id="f-company"
          type="text"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          placeholder="Nome da empresa"
          required
          autoComplete="organization"
        />
      </div>

      <div className="form-field">
        <label htmlFor="f-email">E-mail</label>
        <input
          id="f-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="seu@email.com"
          required
          autoComplete="email"
        />
      </div>

      <div className="form-field">
        <label htmlFor="f-whatsapp">WhatsApp</label>
        <input
          id="f-whatsapp"
          type="tel"
          value={whatsapp}
          onChange={(e) => setWhatsapp(e.target.value)}
          placeholder="(11) 99999-9999"
          required
          autoComplete="tel"
        />
      </div>

      {status === 'error' && (
        <div className="form-error">
          <AlertCircle size={16} strokeWidth={1.5} />
          <span>{errorMsg}</span>
        </div>
      )}

      <button type="submit" className="form-submit-btn" disabled={status === 'loading'}>
        {status === 'loading' ? (
          <>
            <Loader2 size={20} className="animate-spin" strokeWidth={1.5} />
            Enviando...
          </>
        ) : (
          <>
            RECEBER ANÁLISE DE PERFORMANCE GRATUITA
            <ArrowUpRight size={20} strokeWidth={1.5} />
          </>
        )}
      </button>
    </form>
  );
}
