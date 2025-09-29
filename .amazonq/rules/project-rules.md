# Admin Sage Project Rules

## Project Context

This is an Angular 21 (21.0.0-next.x) application using Nx standalone workspace, Angular Material, and Tailwind CSS.
The project is designed to explore modern Angular features, including Signal Forms, Signals-based state management, and Resource API (httpResource / rxResource / htttpResource) integrations.

## Development Guidelines

- Use Angular standalone components
- Follow Angular style guide conventions
- Use TypeScript strict mode
- Implement responsive design with Tailwind CSS and SCSS structure when needed
- Use Angular Material components when appropriate to ensure consistency and accessibility
- Follow Nx workspace structure and conventions
- Prefer Signal Forms for new form implementations (reactive, type-safe, and aligned with Angular 21).
- Apply NgRx Signal Store and/or Resource API for state management and data handling.

## Signals Guidelines

Signals should be the default reactive primitive in the project.
Use signals, for example, for the following cases:

- Variables used in the UI (changed) 
- Retrieved data (API responses, local storage values, or any asynchronous data exposed to components)
  - Prefer wrapping data in httpResource / rxResource when working with HTTP.
- Calculated or composed values

## Code Standards

- Use meaningful variable and function names
- Add JSDoc comments for public methods
- Implement robust error handling (HTTP errors, form validation errors, state management failures).
- Use RxJS operators efficiently (prefer declarative, composable pipelines).
- Follow Angular Signals patterns for state and reactivity instead of legacy Observable-only patterns where possible.
- Prefer Signal Forms instead of template-driven or legacy reactive forms.
- Ensure unit tests (Jest) are written for services, stores, and core components, with a minimum 80% coverage.
