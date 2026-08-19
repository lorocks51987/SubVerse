# SUBVERSE

> **PARA OS QUE NÃO SE ENCAIXAM.**  
> Marca brasileira de streetwear underground.

---

## 🏛️ Arquitetura do Projeto

O projeto está organizado em três camadas complementares:

1. **Universo SubVerse** (`src/routes/`, `src/data/drops.ts`):
   - Drops conceituais limitados com narrativa completa: _Conceito_, _História_, _Símbolo_, _Ouroboros_, _Processo_, _Artefato_, _Edição_ e _Aquisição_.
   - Manifesto, Universo e Arquivo histórico.
2. **Current Commerce** (`src/routes/products.tsx`, `src/data/products.ts`):
   - Catálogo comercial com fotografias reais das camisetas oversized (Algodão 240g e Suedine Premium) para geração de caixa.
3. **Legacy Beta** (`legacy/beta/`):
   - Protótipo histórico em HTML/CSS/JS mantido para preservação de referências.

---

## 🛠️ Stack Tecnológica

- **React 19**
- **Vite 8**
- **TanStack Start & TanStack Router** (File-based routing com strict types)
- **Tailwind CSS v4** (Design system com variáveis tipográficas Anton, Archivo, JetBrains Mono)
- **Motion** (Framer Motion v13)
- **Radix UI**
- **TypeScript 5.8**

---

## 🚀 Como Executar

Dentro do diretório `subverse-ouroboros-unbound`:

```bash
# 1. Instalar dependências
npm install

# 2. Executar em modo desenvolvimento
npm run dev

# 3. Gerar build de produção
npm run build

# 4. Checagem de tipos
npx tsc --noEmit
```

---

## 📂 Estrutura de Pastas

```
/
├── docs/
│   ├── brand/
│   └── development/
├── legacy/
│   └── beta/
└── subverse-ouroboros-unbound/
    ├── public/
    │   ├── favicon.ico
    │   └── ouroboros.svg
    ├── src/
    │   ├── assets/
    │   │   ├── brand/
    │   │   ├── editorial/
    │   │   └── products/
    │   ├── components/
    │   │   ├── Ouroboros.tsx
    │   │   └── site/
    │   ├── data/
    │   │   ├── drops.ts
    │   │   └── products.ts
    │   ├── routes/
    │   │   ├── __root.tsx
    │   │   ├── index.tsx
    │   │   ├── drops.$slug.tsx
    │   │   ├── products.tsx
    │   │   ├── universe.tsx
    │   │   ├── manifesto.tsx
    │   │   └── archive.tsx
    │   └── styles.css
```

---

© SUBVERSE — Todos os direitos reservados.
