# Admin Sage

<a alt="Angular logo" href="https://angular.dev" target="_blank" rel="noreferrer"><img src="https://angular.dev/assets/images/press-kit/angular_wordmark_gradient.png" width="120"></a>

**Admin Sage** é uma aplicação moderna em [Angular 20](https://angular.dev) construída com melhores práticas atuais. Este projeto fornece uma interface de multi-step forms (sage) para coleta de dados administrativos, incluindo informações pessoais, endereços e dados profissionais.

O workspace é **Nx standalone**, com foco em modularidade, testes robustos e gerenciamento de estado moderno usando **NgRx Signal Store** e **rxResource**.

---

## Tech Stack

- **Framework**: Angular 20
- **Workspace**: Nx standalone
- **Estado**: NgRx Signal Store + rxResource
- **Bundler**: esbuild
- **Styling**: SCSS
- **Testing**: Jest (unitário)
- **Cobertura de testes unitários**: >80%

---

## Getting Started

### Development Server

```sh
npx nx serve admin-sage
```

### Build

```sh
npx nx build admin-sage
```

### Testing

```sh
# Unit tests (Jest)
npx nx test admin-sage

```

### Linting

```sh
npx nx lint admin-sage
```

---

## Features

- Multi-step form (sage) para coleta de dados administrativos
- Server-Side Rendering (SSR) e Static Site Generation (SSG)
- Angular moderno com **standalone components**
- Gerenciamento de estado com **NgRx Signal Store** + **rxResource**
- Estilização SCSS responsiva
- Testes unitários com **Jest** (cobertura mínima de 80%)

---

## Development Tools

### Nx Console

Instale [Nx Console](https://nx.dev/getting-started/editor-setup) para VSCode ou IntelliJ para executar tarefas e gerar código de forma visual.

### Nx Graph

Visualize dependências do workspace:

```sh
npx nx graph
```

---

## Resources

- [Angular Documentation](https://angular.dev)
- [NgRx Signals](https://ngrx.io/guide/signals)
- [RxResource](https://ngrx.io/guide/resource)
- [Nx Documentation](https://nx.dev)
