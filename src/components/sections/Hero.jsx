import { motion } from 'framer-motion'
import { profile } from '../../data/profile'
import { NeuralScene } from '../three/NeuralScene'

const metrics = [
  { value: 'IAM', label: 'operação real' },
  { value: 'SAP', label: 'ambiente corporativo' },
  { value: 'IA', label: 'processo aumentado' },
]

export function Hero() {
  return (
    <section className="hero hero-neural-fullscreen" id="home">
      <div className="hero-neural-backdrop" aria-hidden="true" />

      <motion.div
        className="hero-visual hero-visual-signature hero-neural-stage"
        initial={{ opacity: 0, scale: 0.985 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.1 }}
      >
        <div className="scanline" />
        <NeuralScene />
      </motion.div>

      <div className="hero-content hero-neural-content">
        <motion.div
          className="eyebrow"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          <span aria-hidden="true">●</span> Guilherme.OS / neural portfolio
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.18 }}
        >
          {profile.headline}
        </motion.h1>

        <motion.p
          className="hero-description"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.28 }}
        >
          {profile.description}
        </motion.p>

        <motion.div
          className="hero-actions"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.38 }}
        >
          <a href="#about" className="primary-button">
            <span aria-hidden="true">↳</span> Entrar no cérebro
          </a>
          <a href="#projects" className="ghost-button">
            <span aria-hidden="true">▣</span> Ver projetos
          </a>
        </motion.div>
      </div>

      <motion.div
        className="neural-command-panel"
        initial={{ opacity: 0, x: 24 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.48 }}
      >
        <span>mapa neural</span>
        <strong>clique nas áreas do cérebro</strong>
        <p>Sobre · Método · Projetos · Skills · IA · Contato</p>
      </motion.div>

      <motion.div
        className="hero-metrics hero-neural-metrics"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.56 }}
      >
        {metrics.map((metric) => (
          <div key={metric.value}>
            <strong>{metric.value}</strong>
            <span>{metric.label}</span>
          </div>
        ))}
      </motion.div>

      <div className="scroll-cue" aria-hidden="true">
        <span />
        role para explorar
      </div>
    </section>
  )
}
