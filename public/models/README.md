# Modelos 3D do Guilherme.OS

Esta pasta está preparada para receber modelos 3D reais em formato `.glb`.

Arquivos esperados futuramente:

```txt
public/models/avatar.glb
public/models/brain.glb
```

No momento, o projeto usa modelos placeholder criados em código para evitar quebrar a aplicação.
Quando tivermos os arquivos finais, basta ativar `useExternalModels: true` em:

```txt
src/data/experienceConfig.js
```

Recomendação visual:

- `avatar.glb`: busto do peito para cima, rosto voltado para frente, origem centralizada.
- `brain.glb`: cérebro isolado, sem fundo, preferencialmente com material emissivo ou pronto para receber luzes.
- Formato: `.glb` comprimido e otimizado para web.
