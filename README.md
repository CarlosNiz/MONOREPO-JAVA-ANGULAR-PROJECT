# Gestão TI

Sistema completo de gerenciamento de equipamentos de TI e controle de licenças de software, com autenticação por sessão e cookies.

---

## ⚠️ Aviso

Este projeto foi desenvolvido como **experimento e aprendizado**, com foco em explorar as diferentes ferramentas e funcionalidades oferecidas pelas tecnologias utilizadas (Spring Boot, Spring Security, Angular, JPA, Docker etc.).

O código e a modelagem do banco de dados **poderiam estar significativamente melhores** — boas práticas como camada de domínio mais rica, separação de contextos, testes automatizados, índices otimizados, normalização avançada e outras técnicas de arquitetura limpa não foram aplicadas em sua totalidade. A prioridade aqui foi a exploração técnica e didática.

Use este projeto como referência e ponto de partida, não como exemplo de aplicação production-ready.

---

## 🚀 Tecnologias

### Backend
- Java 21
- Spring Boot 4.0.4
- Spring Security 7
- Spring Data JPA
- PostgreSQL 16 (via Docker)
- Maven
- Lombok

### Frontend
- Angular 21
- TypeScript
- SCSS
- RxJS

---

## 📋 Funcionalidades

- Autenticação via sessão com cookies HttpOnly
- Controle de acesso por roles (ADMIN e USER)
- CRUD completo de usuários, equipamentos e licenças de software
- Atribuição de equipamentos a usuários
- Promoção de usuários comuns para administradores
- Scheduler automático de verificação de licenças expiradas
- Validação de dados com regex e enums
- Tratamento global de exceções
- Paginação em todas as listagens
- Interface responsiva para mobile, tablet e desktop
- Logs de ações relevantes

---

## 📦 Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- **Java 21** ou superior
- **Maven 3.9+**
- **Node.js 20+** e **npm**
- **Angular CLI 21+** (`npm install -g @angular/cli`)
- **Docker** e **Docker Compose**

---

## 🔧 Instalação e Execução

### 1. Clone o repositório

```bash
git clone <url-do-repositorio>
cd gestao-ti
```

### 2. Suba o banco de dados com Docker

Na raiz do projeto backend, execute:

```bash
docker compose up -d
```

Para verificar se o container está rodando:

```bash
docker ps
```

### 3. Configure as variáveis de ambiente no IntelliJ

Em `Run/Debug Configurations` → selecione a aplicação `GestaoTiApplication` → `Modify options` → `Environment variables`, adicione:

```
DB_URL=jdbc:postgresql://localhost:5432/gestao_ti;DB_USERNAME=postgres;DB_PASSWORD=postgres
```

> 💡 Se preferir usar terminal, exporte as variáveis antes de rodar o `mvn spring-boot:run`.

### 4. Execute o backend

Pela IDE clique em ▶ na classe `GestaoTiApplication`.

O backend ficará disponível em: `http://localhost:8080`

### 5. Insira as roles iniciais no banco

Na primeira execução, é necessário inserir as roles no banco. A aplicação já faz isso automaticamente via `data.sql`, mas caso precise inserir manualmente:

```bash
docker exec -it gestao_ti_db psql -U postgres -d gestao_ti
```

```sql
INSERT INTO roles (id, name) VALUES (gen_random_uuid(), 'ROLE_USER');
INSERT INTO roles (id, name) VALUES (gen_random_uuid(), 'ROLE_ADMIN');
```

### 6. Execute o frontend

Em outro terminal, acesse a pasta do frontend:

```bash
cd gestao-ti-web
npm install
ng serve
```

O frontend ficará disponível em: `http://localhost:4200`

---

## 👤 Criando o primeiro usuário ADMIN

1. Acesse `http://localhost:4200`
2. O cadastro público de usuário ainda não existe pela UI, então use o Postman/Insomnia para criar via API:

```http
POST http://localhost:8080/api/users
Content-Type: application/json

{
    "username": "admin",
    "email": "admin@email.com",
    "password": "admin123"
}
```

3. Promova esse usuário para ADMIN no banco de dados:

```bash
docker exec -it gestao_ti_db psql -U postgres -d gestao_ti
```

```sql
UPDATE users
SET role_id = (SELECT id FROM roles WHERE name = 'ROLE_ADMIN')
WHERE username = 'admin';
```

4. Faça login pela interface e tudo estará liberado.

---

## 📂 Estrutura de Pastas

### Backend

```
src/main/java/com/carlosniz/gestao_ti/
├── controller/      # Endpoints REST
├── service/         # Regras de negócio
├── repository/      # Acesso ao banco
├── entity/          # Entidades JPA
├── dto/             # Objetos de transferência
├── security/        # Configurações de segurança
└── exception/       # Tratamento global de exceções
```

### Frontend

```
src/app/
├── core/
│   ├── guards/         # Proteção de rotas
│   ├── interceptors/   # Tratamento de requisições
│   └── services/       # Comunicação com a API
├── features/
│   ├── auth/           # Login
│   ├── users/          # CRUD de usuários
│   ├── equipments/     # CRUD de equipamentos
│   └── licenses/       # CRUD de licenças
└── shared/
    ├── components/     # Componentes reutilizáveis
    └── models/         # Interfaces TypeScript
```

---

## 🔐 Permissões

| Recurso | ADMIN | USER |
|---|---|---|
| Visualizar Equipamentos | ✅ | ✅ |
| Criar/Editar/Excluir Equipamentos | ✅ | ❌ |
| Visualizar Licenças | ✅ | ❌ |
| CRUD de Licenças | ✅ | ❌ |
| Visualizar Usuários | ✅ | ❌ |
| Promover usuários para ADMIN | ✅ | ❌ |

---

## 🧪 Endpoints da API

### Autenticação
- `POST /api/auth/login` — Login
- `POST /api/auth/logout` — Logout
- `GET /api/auth/me` — Dados do usuário logado

### Usuários
- `POST /api/users` — Criar usuário (público)
- `GET /api/users` — Listar usuários (ADMIN)
- `GET /api/users/list` — Listagem simplificada (autenticado)
- `GET /api/users/{id}` — Buscar por ID (ADMIN)
- `PUT /api/users/{id}` — Atualizar (ADMIN)
- `DELETE /api/users/{id}` — Excluir (ADMIN)
- `PATCH /api/users/{id}/promote` — Promover para ADMIN (ADMIN)

### Equipamentos
- `POST /api/equipments` — Criar
- `GET /api/equipments` — Listar (paginado)
- `GET /api/equipments/{id}` — Buscar por ID
- `PUT /api/equipments/{id}` — Atualizar
- `DELETE /api/equipments/{id}` — Excluir

### Licenças
- `POST /api/licenses` — Criar
- `GET /api/licenses` — Listar (paginado)
- `GET /api/licenses/{id}` — Buscar por ID
- `PUT /api/licenses/{id}` — Atualizar
- `DELETE /api/licenses/{id}` — Excluir

---

## 🐛 Problemas comuns

### CORS bloqueando requisições
Verifique se o `CorsConfig.java` está liberando a origem `http://localhost:4200` e se o `SecurityConfig.java` tem a configuração `.cors(cors -> cors.configure(http))`.

### Cookie não está sendo enviado
Confirme que o `auth.interceptor.ts` está aplicando `withCredentials: true` em todas as requisições.

### Tabela vazia mesmo com dados na API
O Angular 17+ pode requerer `ChangeDetectorRef.detectChanges()` após atualizar dados em modo Zoneless. Já está aplicado em todos os componentes.

### Role inválida ao criar usuário
A role padrão `ROLE_USER` precisa existir no banco. O `data.sql` cuida disso, mas caso precise inserir manualmente, veja a seção "Criando o primeiro usuário ADMIN".

---

## 📝 Licença

Projeto livre para fins de estudo e referência.

---

## 🙋 Autor

Desenvolvido como projeto de estudo por **Carlos Niz**.
