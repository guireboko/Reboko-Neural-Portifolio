import { motion } from 'framer-motion'
import { skills } from '../../data/skills'

export function Skills() {
  return (
    <section className="section-shell skills" id="skills">
      <div className="section-heading">
        <span>Habilidades</span>
        <h2>Ferramentas que alimentam o sistema.</h2>
      </div>

      <div className="skills-cloud">
        {skills.map((skill, index) => (
          <motion.span
            key={skill}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: index * 0.045 }}
          >
            {skill}
          </motion.span>
        ))}
      </div>
    </section>
  )
}
