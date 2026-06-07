# ToDo App

This is an individual full-stack ToDo application developed using **React** and **ASP.NET Core Web API**.

## Current Status

The project is currently in the initial setup stage.

Completed:

- ASP.NET Core Web API project created
- Clean Architecture light folder structure added
- Domain, Application, Infrastructure, and API layers created
- Project references configured
- `feature/setup-clean-architecture` branch merged into `develop`

Next:

- Implement ToDo entity, DTOs, repository, service, and controller
- Add CRUD API endpoints
- Test APIs using Swagger
- Build React frontend
- Connect frontend with backend API

## Technology Stack

- Frontend: React + TypeScript + Vite
- Backend: ASP.NET Core Web API
- Architecture: Clean Architecture Light
- Data Storage: In-memory repository
- API Style: REST API
- Version Control: Git + GitHub

## Backend Architecture

```text
TodoApp.API
TodoApp.Application
TodoApp.Domain
TodoApp.Infrastructure
```

## Planned Features

- Add todo
- View todos
- View todo by id
- Edit todo
- Delete todo
- Mark todo as complete/incomplete
- Filter todos by status

## Planned API Endpoints

```text
GET    /api/todos
GET    /api/todos/{id}
POST   /api/todos
PUT    /api/todos/{id}
PATCH  /api/todos/{id}/status
DELETE /api/todos/{id}
```

Optional filter examples:

```text
GET /api/todos?status=all
GET /api/todos?status=active
GET /api/todos?status=completed
```

## Git Workflow

```text
main
develop
feature/setup-clean-architecture
feature/todo-crud
feature/final-testing-docs
```

Feature branches are created only when needed.

## Running the Backend

```bash
cd backend
dotnet restore
dotnet build
dotnet run --project TodoApp.API
```

## Note

This project is being developed as an individual practice project to demonstrate full-stack development, API design, Clean Architecture basics, and Git workflow.
