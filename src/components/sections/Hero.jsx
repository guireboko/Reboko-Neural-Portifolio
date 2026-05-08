import { motion } from 'framer-motion'
import { Brain, Github, Linkedin, Sparkles } from 'lucide-react'
import { profile } from '../../data/profile'
import { NeuralScene } from '../three/NeuralScene'

export function Hero() {
  return (
    <section className="hero section-shell">
      <div className="hero-content">
        <motion.div
          className="eyebrow"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <Sparkles size={16} /> Portfólio interativo com IA e 3D
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          {profile.headline}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {profile.description}
        </motion.p>

        <motion.div
          className="hero-actions"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <a href="#projects" className="primary-button">
            <Brain size={18} /> Entrar no cérebro
          </a>
          <a href={profile.contact.github} className="ghost-button" target="_blank" rel="noreferrer">
            <Github size={18} /> GitHub
          </a>
          <a href={profile.contact.linkedin} className="ghost-button" target="_blank" rel="noreferrer">
            <Linkedin size={18} /> LinkedIn
          </a>
        </motion.div>
      </div>

      <motion.div
        className="hero-visual"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.1, delay: 0.2 }}
      >
        <NeuralScene />
      </motion.div>
    </section>
  )
}
