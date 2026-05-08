import { Mail } from 'lucide-react'
import { profile } from '../../data/profile'

export function Contact() {
  return (
    <section className="section-shell contact" id="contact">
      <div>
        <span className="contact-label">Contato</span>
        <h2>Vamos construir a próxima ideia?</h2>
        <p>
          Este portfólio foi criado para representar minha forma de trabalhar: unir criatividade,
          tecnologia, inteligência artificial e entrega prática.
        </p>
      </div>
      <a href={`mailto:${profile.contact.email}`} className="primary-button">
        <Mail size={18} /> Entrar em contato
      </a>
    </section>
  )
}
