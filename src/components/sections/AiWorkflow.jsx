import { motion } from 'framer-motion'

const steps = [
  {
    title: 'Ideia',
    text: 'Transformo uma necessidade ou problema real em uma proposta clara de produto.',
  },
  {
    title: 'Planejamento com IA',
    text: 'Uso IA para organizar requisitos, pensar arquitetura, definir etapas e reduzir retrabalho.',
  },
  {
    title: 'Desenvolvimento',
    text: 'Construo a solução com foco em código simples, componentes reutilizáveis e evolução contínua.',
  },
  {
    title: 'Documentação',
    text: 'Registro decisões, estrutura do projeto e padrões para facilitar manutenção e reaproveitamento.',
  },
]

export function AiWorkflow() {
  return (
    <section className="section-shell ai-workflow" id="ai-workflow">
      <div className="section-heading">
        <span>IA no meu processo</span>
        <h2>Eu não apenas uso IA. Eu trabalho junto com IA.</h2>
      </div>

      <p className="section-lead">
        Minha forma de trabalho une raciocínio humano, contexto real e inteligência artificial como apoio para planejar,
        desenvolver, revisar e transformar ideias em entregas concretas.
      </p>

      <div className="workflow-grid">
        {steps.map((step, index) => (
          <motion.article
            className="workflow-card"
            key={step.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: index * 0.1 }}
          >
            <strong>{String(index + 1).padStart(2, '0')}</strong>
            <h3>{step.title}</h3>
            <p>{step.text}</p>
          </motion.article>
        ))}
      </div>
    </section>
  )
}
