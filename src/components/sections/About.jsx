import { motion } from 'framer-motion'
import { profile } from '../../data/profile'

const items = [
  {
    icon: '▣',
    title: 'Formação em tecnologia',
    text: 'Estudante de Análise e Desenvolvimento de Sistemas na SPTech, com foco em desenvolvimento, APIs, banco de dados e soluções digitais.',
  },
  {
    icon: '◇',
    title: 'Experiência corporativa',
    text: 'Atuação em Gestão de Identidade e Acessos na Stefanini, com vivência em chamados, ServiceNow, SAP e rotinas de suporte.',
  },
  {
    icon: '✦',
    title: 'IA como parceira de criação',
    text: 'Uso inteligência artificial para planejar, construir, revisar, documentar e evoluir projetos de forma mais rápida e organizada.',
  },
]

export function About() {
  return (
    <section className="section-shell about" id="about">
      <div className="section-heading">
        <span>Sobre mim</span>
        <h2>Minha mente funciona como um laboratório de ideias aplicadas.</h2>
      </div>

      <p className="section-lead">{profile.summary}</p>

      <div className="about-grid">
        {items.map((item, index) => (
          <motion.article
            className="glass-card"
            key={item.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.12 }}
          >
            <span className="card-symbol" aria-hidden="true">{item.icon}</span>
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </motion.article>
        ))}
      </div>

      <div className="timeline-grid">
        <motion.article
          className="glass-card profile-card"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span>Experiência atual</span>
          <h3>{profile.experience[0].role} — {profile.experience[0].company}</h3>
          <p>{profile.experience[0].period}</p>
          <p>{profile.experience[0].description}</p>
        </motion.article>

        <motion.article
          className="glass-card profile-card"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.12 }}
        >
          <span>Formação principal</span>
          <h3>{profile.education[0].course}</h3>
          <p>{profile.education[0].institution}</p>
          <p>{profile.education[0].period}</p>
        </motion.article>
      </div>
    </section>
  )
}
