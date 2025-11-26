# YouAssign Backend

Production-ready Node.js/Express backend with PostgreSQL.

## Setup

1. Clone the repository:
```bash
git clone <your-repo-url>
cd youassign-backend
```

2. Install dependencies:
```bash
npm install
```

3. Create .env file (copy from .env.example):
```bash
cp .env.example .env
```

4. Update .env with your database credentials and JWT secret

5. Run database schema:
```bash
# Connect to your PostgreSQL database and run:
psql -d your_database -f database/schema.sql
```

6. Start the server:
```bash
npm start
```

## Database Schema

The database schema is located in `database/schema.sql`. It includes:
- Users table with authentication fields
- Email uniqueness constraints
- Indexes for performance
- Auto-updating timestamp triggers

## API Endpoints

### Auth
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Users (Protected - requires JWT token)
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID

## Authentication

All protected routes require a JWT token in the Authorization header:
```
Authorization: Bearer <your-jwt-token>
```

## Security Features

✅ Comprehensive error handling with try-catch blocks
✅ Input validation on all endpoints
✅ Duplicate email prevention
✅ JWT authentication middleware
✅ Password hashing with bcrypt
✅ SQL injection protection (parameterized queries)
✅ Environment variable validation
✅ Role-based authorization ready

## Deployment

This project is configured for deployment on Render.com using the included `render.yaml` file.

1. Push to GitHub
2. Connect your GitHub repo to Render
3. Set environment variables in Render dashboard
4. Deploy!

## License

MIT