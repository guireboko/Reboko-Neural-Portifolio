import { motion } from 'framer-motion'

const principles = [
  {
    code: '01',
    title: 'Contexto antes do código',
    text: 'Entendo a regra, o usuário e o problema antes de escolher a tecnologia. Isso evita solução bonita para problema errado.',
  },
  {
    code: '02',
    title: 'IA como copiloto, não piloto automático',
    text: 'Uso IA para acelerar raciocínio, documentação, arquitetura e revisão, mas mantenho decisão, critério e validação humana.',
  },
  {
    code: '03',
    title: 'Produto reaproveitável',
    text: 'Projeto pensando em manutenção: dados separados da interface, componentes reutilizáveis e documentação para evoluir sem refazer tudo.',
  },
  {
    code: '04',
    title: 'Entrega com história',
    text: 'Cada projeto precisa explicar o problema, a solução, as escolhas técnicas e o impacto. Portfólio não é vitrine; é prova de raciocínio.',
  },
]

export function OperatingSystem() {
  return (
    <section className="section-shell operating-system" id="operating-system">
      <div className="os-panel">
        <div className="section-heading">
          <span>Guilherme.OS</span>
          <h2>Meu portfólio não é uma página. É o mapa do meu jeito de construir.</h2>
        </div>

        <p className="section-lead">
          A proposta desta interface é fugir do “site bonito genérico” e mostrar um método: como eu penso,
          como uso IA, como organizo projetos e como transformo aprendizado em entrega real.
        </p>

        <div className="principles-grid">
          {principles.map((principle, index) => (
            <motion.article
              className="principle-card"
              key={principle.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: index * 0.08 }}
            >
              <strong>{principle.code}</strong>
              <h3>{principle.title}</h3>
              <p>{principle.text}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
