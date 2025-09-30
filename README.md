# Admin Sage

<a alt="Angular logo" href="https://angular.dev" target="_blank" rel="noreferrer"><img src="https://angular.dev/assets/images/press-kit/angular_wordmark_gradient.png" width="120"></a>

**Admin Sage** é uma aplicação moderna em [Angular 21 (next)](https://angular.dev) construída com melhores práticas atuais.  
Este projeto fornece uma interface de multi-step forms para coleta de dados administrativos, incluindo informações pessoais, endereços e dados profissionais.

O workspace é **Nx standalone**, com foco em modularidade, testes robustos e gerenciamento de estado moderno usando **NgRx Signal Store**, **Resource API** e o novo **Signal Forms** do Angular.

---

## Tech Stack

- **Framework**: Angular 21 (21.0.0-next.5)
- **Workspace**: Nx standalone
- **Forms**: Angular **Signal Forms**
- **Estado**: NgRx Signal Store + Resource API (httpResource)
- **Bundler**: esbuild
- **Styling**: SCSS + Tailwind CSS + Angular Material
- **Testing**: Jest (unitário)
- **Cobertura de testes unitários**: >80%

---

## Getting Started

### Installation

```sh
npm i -f
```

> [!NOTE]
> A flag -f (ou --force)é necessária porque estamos utilizando a versão next (pré-lançamento) do
> Angular 21.
> Como ela ainda não é considerada estável, alguns pacotes de terceiros podem não declarar
> compatibilidade total em seus peerDependencies.
> Essa flag permite instalar as dependências mesmo com possíveis conflitos, garantindo que possamos
> explorar e testar recursos modernos, como o Signal Forms, antes da liberação oficial.

### Development Server

```sh
npm start

# Or
npx nx serve admin-sage
```

### Build

```sh
npm run build

# Or
npx nx build admin-sage
```

### Testing

```sh
# Unit tests (Jest)
npm run test

# Or
npx nx test admin-sage
```

### Linting

```sh
npm run lint

# Or
npx nx lint admin-sage
```

---

## Features

- Multi-step form para coleta de dados administrativos
- Server-Side Rendering (SSR) e Static Site Generation (SSG)
- Angular moderno com **standalone components**
- Formulários reativos com Signal Forms
- Gerenciamento de estado com **NgRx Signal Store** + **Resource API**
- Estilização moderna e responsiva com com **SCSS** + **Tailwind CSS** + **Angular Material**
- Testes unitários com **Jest** (cobertura mínima de 80%)

---

## Development Tools

### Nx Console

Instale [Nx Console](https://nx.dev/getting-started/editor-setup) para VSCode ou IntelliJ para executar tarefas e gerar código de forma visual.

---

## Resources

- [Angular Documentation](https://angular.dev)
- [NgRx Signals](https://ngrx.io/guide/signals)
- [RxResource](https://ngrx.io/guide/resource)
- [Nx Documentation](https://nx.dev)
