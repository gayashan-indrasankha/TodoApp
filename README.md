# ToDo App

This is an individual full-stack ToDo application developed using **React + TypeScript** and **ASP.NET Core Web API**.

The backend follows a **Clean Architecture Light** approach and will use **Entity Framework Core with SQLite** for data storage.

## Current Status

The project is currently in the backend development stage.

Completed:

- ASP.NET Core Web API project created
- Clean Architecture light folder structure added
- Domain, Application, Infrastructure, and API layers created
- Project references configured
- `feature/setup-clean-architecture` branch merged into `develop`
- ToDo entity implemented
- DTOs implemented
- `ITodoRepository` interface implemented

Next:

- Set up Entity Framework Core with SQLite
- Create `TodoDbContext`
- Create EF Core repository implementation
- Create service interface and service
- Register dependencies in `Program.cs`
- Add CRUD API endpoints
- Test APIs using Swagger
- Build React frontend
- Connect frontend with backend API

## Technology Stack

- Frontend: React + TypeScript + Vite
- Backend: ASP.NET Core Web API
- Architecture: Clean Architecture Light
- ORM: Entity Framework Core
- Database: SQLite
- API Style: REST API
- Version Control: Git + GitHub
- API Testing: Swagger / Postman / Thunder Client

## Project Structure

```text
TodoApp/
├── backend/
│   ├── TodoApp.API/
│   ├── TodoApp.Application/
│   ├── TodoApp.Domain/
│   └── TodoApp.Infrastructure/
│
├── frontend/
│
├── docs/
│   └── ui-designs/
│       ├── dashboard-ui.png
│       ├── add-todo-modal.png
│       └── update-todo-modal.png
│
├── README.md
├── .gitignore
└── TodoApp.slnx
```

## Backend Architecture

```text
TodoApp.API
TodoApp.Application
TodoApp.Domain
TodoApp.Infrastructure
```

## Layer Responsibilities

| Layer | Responsibility |
|---|---|
| API | Receives HTTP requests and returns responses |
| Application | Contains DTOs, interfaces, services, and business logic |
| Domain | Contains core entities |
| Infrastructure | Contains EF Core DbContext, migrations, and repository implementations |

## Backend Flow

```text
React Frontend
   ↓
TodosController
   ↓
TodoService
   ↓
ITodoRepository
   ↓
TodoRepository
   ↓
TodoDbContext
   ↓
SQLite Database
```

## Planned Backend Folder Structure

```text
backend/
│
├── TodoApp.API/
│   ├── Controllers/
│   │   └── TodosController.cs
│   ├── Properties/
│   │   └── launchSettings.json
│   ├── appsettings.json
│   ├── appsettings.Development.json
│   ├── Program.cs
│   └── TodoApp.API.csproj
│
├── TodoApp.Application/
│   ├── DTOs/
│   │   ├── TodoDto.cs
│   │   ├── CreateTodoDto.cs
│   │   └── UpdateTodoDto.cs
│   ├── Interfaces/
│   │   └── ITodoRepository.cs
│   ├── Services/
│   │   ├── ITodoService.cs
│   │   └── TodoService.cs
│   └── TodoApp.Application.csproj
│
├── TodoApp.Domain/
│   ├── Entities/
│   │   └── Todo.cs
│   └── TodoApp.Domain.csproj
│
└── TodoApp.Infrastructure/
    ├── Data/
    │   └── TodoDbContext.cs
    ├── Migrations/
    ├── Repositories/
    │   └── TodoRepository.cs
    └── TodoApp.Infrastructure.csproj
```

## Todo Entity

The Todo entity represents a single task in the system.

Planned fields:

- Id
- Title
- Description
- IsCompleted
- CreatedAt
- UpdatedAt

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

## UI Design References

Initial UI design references are available in:

```text
docs/ui-designs/
```

These designs are used as a visual guide for implementing the React frontend.

Current design references:

- Dashboard UI
- Add Todo modal
- Update Todo modal

## Git Workflow

```text
main
develop
feature/setup-clean-architecture
feature/setup-ef-core-sqlite
feature/todo-crud
feature/final-testing-docs
```

Feature branches are created only when needed.

## Branch Purpose

| Branch | Purpose |
|---|---|
| main | Stable final version |
| develop | Main development branch |
| feature/setup-clean-architecture | Initial Clean Architecture project setup |
| feature/setup-ef-core-sqlite | EF Core and SQLite setup |
| feature/todo-crud | Backend CRUD implementation |
| feature/final-testing-docs | Final testing, bug fixing, and documentation |

## Recommended Development Order

```text
1. Set up EF Core packages
2. Add SQLite connection string
3. Create TodoDbContext
4. Register DbContext in Program.cs
5. Create EF Core repository implementation
6. Create service interface and service
7. Create TodosController
8. Create and apply database migration
9. Test API endpoints using Swagger
10. Build React frontend
11. Connect frontend with backend API
12. Final testing and README update
```

## Running the Backend

```bash
cd backend
dotnet restore
dotnet build
dotnet run --project TodoApp.API
```

The backend will run on a local URL shown in the terminal.

## Running the Frontend

```bash
cd frontend
npm install
npm run dev
```

The frontend usually runs on:

```text
http://localhost:5173
```

## Database

This project uses **SQLite** with **Entity Framework Core**.

SQLite is lightweight, simple to set up, and suitable for an MVP project.

Unlike an in-memory list, SQLite stores data permanently in a database file.

## Note

This project is being developed as an individual practice project to demonstrate full-stack development, REST API design, Clean Architecture basics, EF Core usage, and Git workflow.
