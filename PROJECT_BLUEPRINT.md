# Blueprint técnico — Reboko Neural Portfolio

## Visão geral

O Reboko Neural Portfolio é um portfólio interativo com estética futurista, construído para destacar projetos reais e mostrar domínio de IA aplicada, desenvolvimento web e criatividade visual.

A proposta é que o portfólio seja mais do que uma página estática. Ele deve parecer uma experiência de entrada na mente do criador.

## Arquitetura visual

### Abertura

1. Tela escura com gradientes suaves.
2. Frase de impacto.
3. Cena neural em 3D.
4. Botão principal: "Entrar no cérebro".

### Cena 3D inicial

A primeira versão usa uma esfera neural abstrata com:

- núcleo em wireframe;
- partículas/nós ao redor;
- feixe de energia;
- rotação suave;
- luzes azuladas e roxas;
- fundo com estrelas.

### Evolução futura da cena

A cena deve evoluir para:

```txt
Avatar 3D → luz no olho → zoom interno → cérebro 3D → áreas clicáveis → seções do portfólio
```

## Organização dos componentes

### `src/components/sections`

Contém as seções principais do site:

- `Hero.jsx`
- `About.jsx`
- `Projects.jsx`
- `Skills.jsx`
- `Contact.jsx`

### `src/components/three`

Contém elementos 3D:

- `NeuralScene.jsx`
- futuramente: `AvatarModel.jsx`
- futuramente: `BrainHub.jsx`
- futuramente: `EyeLight.jsx`
- futuramente: `CameraRig.jsx`

### `src/data`

Contém dados editáveis sem mexer no layout:

- `profile.js`
- `projects.js`
- `skills.js`

## Padrão de atualização dos dados

Para adicionar novo projeto, editar `src/data/projects.js`:

```js
{
  id: 'novo-projeto',
  title: 'Nome do projeto',
  category: 'Categoria',
  description: 'Descrição objetiva do projeto.',
  stack: ['React', 'API', 'IA'],
  impact: 'Impacto real do projeto.'
}
```

## Direção de design

### Paleta

- Fundo principal: azul muito escuro
- Destaques: ciano e roxo
- Cards: vidro escuro translúcido
- Texto principal: branco azulado
- Texto secundário: cinza azulado

### Estilo

- Futurista
- Limpo
- Profissional
- Cinematográfico
- Com sensação de tecnologia e IA

## Boas práticas desejadas

- Separar dados de componentes visuais.
- Evitar código gigante em um único arquivo.
- Manter componentes reutilizáveis.
- Usar animações com propósito, não apenas enfeite.
- Priorizar performance no mobile.
- Documentar decisões importantes no README.

## Próximas implementações recomendadas

1. Trocar dados genéricos por dados reais.
2. Criar seção "Como eu trabalho com IA".
3. Adicionar páginas ou modais para detalhes de cada projeto.
4. Criar modelo 3D de avatar ou importar de ferramenta externa.
5. Adicionar animação de câmera com estados: intro, eye, brain, projects.
6. Fazer deploy na Vercel.
