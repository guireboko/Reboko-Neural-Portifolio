import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { projects } from '../../data/projects'

export function Projects() {
  return (
    <section className="section-shell projects" id="projects">
      <div className="section-heading">
        <span>Projetos</span>
        <h2>Cada projeto é uma área ativa desse cérebro digital.</h2>
      </div>

      <div className="projects-grid">
        {projects.map((project, index) => (
          <motion.article
            className="project-card"
            key={project.id}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, delay: index * 0.14 }}
          >
            <div className="project-card-top">
              <span>{project.category}</span>
              <ArrowUpRight size={20} />
            </div>
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            <strong>Impacto:</strong>
            <p>{project.impact}</p>
            <div className="stack-list">
              {project.stack.map((tech) => (
                <span key={tech}>{tech}</span>
              ))}
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  )
}
