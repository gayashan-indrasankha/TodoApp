# ToDo App - Clean Architecture Light

This is an individual full-stack ToDo App practice project built using **ASP.NET Core Web API** and **React + TypeScript**.

The project is developed using a **Clean Architecture Light** approach. At the current stage, the backend folder structure and Clean Architecture project setup have been completed.

---

## Project Status

Current completed stage:

```text
feature/setup-clean-architecture -> develop
```

Completed setup work:

- ASP.NET Core Web API project created
- Clean Architecture light project structure created
- Domain, Application, Infrastructure, and API projects added
- Project references configured
- Basic backend folder structure prepared
- Setup branch merged into `develop`

The actual ToDo CRUD implementation will be completed in the next feature branch.

---

## Technology Stack

| Area | Technology |
|---|---|
| Frontend | React + TypeScript + Vite |
| Backend | ASP.NET Core Web API |
| Architecture | Clean Architecture Light |
| Data Storage | In-memory repository |
| API Style | REST API |
| Version Control | Git + GitHub |
| API Testing | Swagger / Postman / Thunder Client |

---

## Architecture Overview

The backend follows a simple Clean Architecture structure:

```text
API Layer
   ↓
Application Layer
   ↓
Domain Layer
   ↓
Infrastructure Layer
```

### Layer Responsibilities

| Layer | Responsibility |
|---|---|
| API | Receives HTTP requests and returns responses |
| Application | Contains DTOs, interfaces, services, and business logic |
| Domain | Contains core entities |
| Infrastructure | Contains repository implementations and data access logic |

The main backend flow will be:

```text
Controller -> Service -> Repository Interface -> In-memory Repository
```

---

## Backend Folder Structure

```text
backend/
│
├── TodoApp.sln
│
├── TodoApp.API/
│   ├── Controllers/
│   │   └── TodosController.cs
│   │
│   ├── Properties/
│   │   └── launchSettings.json
│   │
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
│   │
│   ├── Interfaces/
│   │   └── ITodoRepository.cs
│   │
│   ├── Services/
│   │   ├── ITodoService.cs
│   │   └── TodoService.cs
│   │
│   └── TodoApp.Application.csproj
│
├── TodoApp.Domain/
│   ├── Entities/
│   │   └── Todo.cs
│   │
│   └── TodoApp.Domain.csproj
│
└── TodoApp.Infrastructure/
    ├── Repositories/
    │   └── InMemoryTodoRepository.cs
    │
    └── TodoApp.Infrastructure.csproj
```

---

## Project Layers Explained

### TodoApp.API

This is the Web API layer.

It is responsible for:

- Exposing REST API endpoints
- Receiving requests from the frontend
- Calling application services
- Returning responses to the client

The controller should not contain business logic.

---

### TodoApp.Application

This is the application/business logic layer.

It is responsible for:

- DTOs
- Service interfaces
- Service implementations
- Repository interfaces
- Application-level business logic

---

### TodoApp.Domain

This is the core layer.

It contains the main domain entity:

```text
Todo.cs
```

The Domain layer should not depend on API, Infrastructure, or frontend code.

---

### TodoApp.Infrastructure

This is the data access layer.

For this project, it will contain:

```text
InMemoryTodoRepository.cs
```

This repository will store todo data in memory using a list.

---

## Planned Features

The final application will support:

- Add todo
- View all todos
- View todo by id
- Edit todo
- Delete todo
- Mark todo as completed or not completed
- Filter todos by status: All, Active, Completed

---

## Planned API Endpoints

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/api/todos` | Get all todos |
| GET | `/api/todos/{id}` | Get one todo by id |
| POST | `/api/todos` | Create a new todo |
| PUT | `/api/todos/{id}` | Update a todo |
| PATCH | `/api/todos/{id}/status` | Mark complete/incomplete |
| DELETE | `/api/todos/{id}` | Delete a todo |

Optional filter examples:

```text
GET /api/todos?status=all
GET /api/todos?status=active
GET /api/todos?status=completed
```

---

## Git Branching Strategy

This project uses a simple professional Git workflow.

```text
main
develop
feature/setup-clean-architecture
feature/todo-crud
feature/final-testing-docs
```

### Branch Purpose

| Branch | Purpose |
|---|---|
| main | Stable final version |
| develop | Main development branch |
| feature/setup-clean-architecture | Clean Architecture folder/project setup |
| feature/todo-crud | ToDo CRUD implementation |
| feature/final-testing-docs | Final testing, bug fixing, and documentation |

Feature branches are created only when needed.

---

## Current Git Progress

Completed:

```text
feature/setup-clean-architecture -> develop
```

Next planned branch:

```text
feature/todo-crud
```

The `feature/todo-crud` branch will include:

- Todo entity implementation
- DTO implementation
- Repository interface
- In-memory repository
- Service interface and service
- Todos controller
- Dependency Injection setup
- Swagger API testing

---

## How to Run the Backend

From the backend folder:

```bash
cd backend
dotnet restore
dotnet build
dotnet run --project TodoApp.API
```

The backend will run on a local URL shown in the terminal, usually similar to:

```text
https://localhost:5001
```

or

```text
http://localhost:5000
```

---

## Development Order

Recommended implementation order:

```text
1. Todo.cs
2. CreateTodoDto.cs
3. UpdateTodoDto.cs
4. TodoDto.cs
5. ITodoRepository.cs
6. InMemoryTodoRepository.cs
7. ITodoService.cs
8. TodoService.cs
9. Program.cs Dependency Injection
10. TodosController.cs
11. Swagger API testing
12. React frontend setup
13. Frontend-backend integration
14. Final testing and README update
```

---

## Coding Rules

- Keep the code simple and readable.
- Do not put business logic inside controllers.
- Use services for business logic.
- Use repository interfaces for data access.
- Use DTOs for request and response data.
- Use Dependency Injection.
- Commit small meaningful changes.
- Test before merging to `develop`.
- Keep documentation updated.

---

## Final Goal

The final goal is to build a working full-stack ToDo application with:

- Clean backend structure
- REST API
- React frontend
- In-memory data storage
- Full CRUD functionality
- Basic testing
- Clear documentation

This project focuses on learning and demonstrating professional project structure, not building an over-complicated system.
