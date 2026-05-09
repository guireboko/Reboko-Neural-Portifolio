import { profile } from '../../data/profile'

export function Contact() {
  return (
    <section className="section-shell contact" id="contact">
      <div>
        <span className="contact-label">Contato</span>
        <h2>Vamos construir a próxima ideia?</h2>
        <p>
          Este portfólio representa minha forma de trabalhar: unir criatividade, tecnologia,
          inteligência artificial, documentação e entrega prática para resolver problemas reais.
        </p>
        <p className="contact-meta">
          {profile.location} · {profile.languages.join(' · ')}
        </p>
      </div>
      <a href={`mailto:${profile.contact.email}`} className="primary-button">
        <span aria-hidden="true">✉</span> Entrar em contato
      </a>
    </section>
  )
}
