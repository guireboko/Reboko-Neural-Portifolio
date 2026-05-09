import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { NeuralScene } from '../three/NeuralScene'
import { portfolioSections } from '../../data/portfolioSections'
import { experienceConfig } from '../../data/experienceConfig'

const transitionDuration = 1320

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const query = window.matchMedia('(max-width: 760px), (pointer: coarse)')
    const update = () => setIsMobile(query.matches)
    update()
    query.addEventListener?.('change', update)
    return () => query.removeEventListener?.('change', update)
  }, [])

  return isMobile
}

export function PortfolioExperience() {
  const [stage, setStage] = useState('avatar')
  const [activeSection, setActiveSection] = useState(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const isMobile = useIsMobile()

  const active = portfolioSections.find((section) => section.id === activeSection)
  const isBrain = stage === 'brain'
  const isEntering = stage === 'entering'

  useEffect(() => {
    const timer = window.setTimeout(() => setIsLoaded(true), 460)
    return () => window.clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (!isEntering) return undefined

    const timer = window.setTimeout(() => {
      setStage('brain')
      setActiveSection(null)
    }, transitionDuration)

    return () => window.clearTimeout(timer)
  }, [isEntering])

  function enterBrain() {
    if (isEntering) return
    setActiveSection(null)
    setStage('entering')
  }

  function backToAvatar() {
    setActiveSection(null)
    setStage('avatar')
  }

  function closePanel() {
    setActiveSection(null)
  }


  return (
    <main className={`experience-shell ${stage} ${isLoaded ? 'is-loaded' : 'is-loading'} ${isMobile ? 'is-mobile' : 'is-desktop'}`}>
      <div className="cosmos-gradient" />
      <div className="neural-noise" />
      <div className="scanlines" />

      <section className="scene-layer" aria-label="Experiência 3D do portfólio">
        <NeuralScene
          mode={isBrain ? 'brain' : 'avatar'}
          entering={isEntering}
          sections={portfolioSections}
          activeSection={activeSection}
          onSelectSection={setActiveSection}
          isMobile={isMobile}
        />
      </section>

      <AnimatePresence>
        {!isBrain && (
          <motion.section
            className="intro-ui"
            key="intro-ui"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.55 }}
          >
            <motion.div
              className="minimal-identity"
              initial={{ opacity: 0, x: -18, y: -52 }}
              animate={{ opacity: isLoaded ? 1 : 0, x: isLoaded ? 0 : -18, y: isLoaded ? 0 : -52 }}
              transition={{ type: 'spring', stiffness: 90, damping: 16, delay: 0.06 }}
            >
              <h1>{experienceConfig.intro.name}</h1>
              <p>{experienceConfig.intro.age}</p>
              <small>{experienceConfig.intro.role}</small>
            </motion.div>

            <motion.div
              className="enter-orbit-card robot-action-card"
              initial={{ opacity: 0, y: -38, scale: 0.96 }}
              animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : -38, scale: isLoaded ? 1 : 0.96 }}
              transition={{ type: 'spring', stiffness: 86, damping: 15, delay: 0.18 }}
            >
              <span className="orbit-icon" />
              <span>
                <strong>{isEntering ? 'Acessando o núcleo...' : experienceConfig.intro.hint}</strong>
                <small>{isEntering ? 'Zoom neural iniciado' : isMobile ? 'Toque em Ir para continuar.' : 'Use o mouse para ver o robô por outros ângulos.'}</small>
              </span>
            </motion.div>

            <motion.button
              className="go-cta-button"
              onClick={enterBrain}
              disabled={isEntering}
              initial={{ opacity: 0, y: -34, scale: 0.92 }}
              animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : -34, scale: isLoaded ? 1 : 0.92 }}
              transition={{ type: 'spring', stiffness: 95, damping: 15, delay: 0.3 }}
            >
              Ir
            </motion.button>
          </motion.section>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isEntering && (
          <motion.div
            className="eye-transition clean-transition"
            key="eye-transition"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.18, 0.62, 1] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.72, delay: 0.48, ease: 'easeInOut' }}
          >
            <motion.div
              className="transition-copy"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: [0, 0.38, 0], y: [8, 0, -4] }}
              transition={{ duration: 0.7, delay: 0.14 }}
            >
              Entrando no núcleo neural
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isBrain && (
          <motion.section
            className="brain-ui"
            key="brain-ui"
            initial={{ opacity: 0, filter: 'blur(10px)' }}
            animate={{ opacity: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.55 }}
          >
            <header className="brain-topbar compact">
              <button onClick={backToAvatar}>← Voltar</button>
            </header>

            {isMobile && (
              <nav className="mobile-brain-dock" aria-label="Áreas do portfólio">
                {portfolioSections.map((section) => (
                  <button
                    key={section.id}
                    className={activeSection === section.id ? 'active' : ''}
                    onClick={() => setActiveSection(section.id)}
                  >
                    {section.label}
                  </button>
                ))}
              </nav>
            )}

            <AnimatePresence>
              {active && (
                <motion.button
                  className="brain-dismiss-layer"
                  aria-label="Fechar painel"
                  onClick={closePanel}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                />
              )}
            </AnimatePresence>

            <AnimatePresence mode="wait">
              {active && (
                <motion.article
                  className="section-panel"
                  key={active.id}
                  onPointerDown={(event) => event.stopPropagation()}
                  initial={{ opacity: 0, y: 26, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 18, scale: 0.97 }}
                  transition={{ duration: 0.28 }}
                >
                  <div className="panel-topline">
                    <span>{active.label}</span>
                    <button onClick={closePanel}>Fechar</button>
                  </div>
                  <h2>{active.title}</h2>
                  <strong>{active.subtitle}</strong>
                  <p>{active.text}</p>
                  {active.details?.length > 0 && (
                    <div className="panel-details">
                      {active.details.map((detail) => (
                        <p key={detail}>{detail}</p>
                      ))}
                    </div>
                  )}
                  <ul>
                    {active.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                  {active.links?.length > 0 && (
                    <div className="panel-links">
                      {active.links.map((link) => (
                        <a key={link.href} href={link.href} target={link.external ? '_blank' : undefined} rel={link.external ? 'noreferrer' : undefined}>
                          {link.label}
                        </a>
                      ))}
                    </div>
                  )}
                </motion.article>
              )}
            </AnimatePresence>
          </motion.section>
        )}
      </AnimatePresence>
    </main>
  )
}
