import { motion } from 'framer-motion'
import { Code2, Cpu, Rocket } from 'lucide-react'

const items = [
  {
    icon: Cpu,
    title: 'IA como parceira de criação',
    text: 'Uso inteligência artificial para planejar, construir, revisar e documentar soluções reais.',
  },
  {
    icon: Code2,
    title: 'Desenvolvimento com propósito',
    text: 'Transformo problemas práticos em sistemas úteis, com foco em clareza, impacto e evolução.',
  },
  {
    icon: Rocket,
    title: 'Projetos com entrega real',
    text: 'Meus projetos não são apenas estudos: eles resolvem dores de operação, clientes e usuários.',
  },
]

export function About() {
  return (
    <section className="section-shell about" id="about">
      <div className="section-heading">
        <span>Sobre mim</span>
        <h2>Minha mente funciona como um laboratório de ideias.</h2>
      </div>

      <div className="about-grid">
        {items.map((item, index) => {
          const Icon = item.icon
          return (
            <motion.article
              className="glass-card"
              key={item.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.12 }}
            >
              <Icon size={26} />
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </motion.article>
          )
        })}
      </div>
    </section>
  )
}
