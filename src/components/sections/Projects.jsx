import { motion } from 'framer-motion'
import { projects } from '../../data/projects'

export function Projects() {
  return (
    <section className="section-shell projects" id="projects">
      <div className="section-heading split-heading">
        <div>
          <span>Projetos</span>
          <h2>Não são cards. São evidências de evolução.</h2>
        </div>
        <p>
          Cada projeto abaixo mostra um tipo de problema diferente: operação corporativa, demanda freelance,
          documentação, integração e apresentação profissional.
        </p>
      </div>

      <div className="projects-grid">
        {projects.map((project, index) => (
          <motion.article
            className="project-card"
            key={project.id}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
          >
            <div className="project-card-top">
              <span>{project.category}</span>
              <strong>{String(index + 1).padStart(2, '0')}</strong>
            </div>

            <h3>{project.title}</h3>
            <p>{project.description}</p>

            <div className="impact-block">
              <span>Impacto</span>
              <p>{project.impact}</p>
            </div>

            <div className="stack-list">
              {project.stack.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  )
}
