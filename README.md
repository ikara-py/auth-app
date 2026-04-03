# Auth App

A React-based authentication system for registration, login, profile management, and password security, integrated with a Laravel backend.

## Features

- **Authentication**: Login and registration with token-based persistence.
- **Dashboard**: User dashboard with profile management.
- **Profile Management**: Update account info and change passwords.
- **Protected Routing**: Guards for authenticated routes.
- **UI**: Dark mode and responsive layout via CSS Modules.
- **API Integration**: Axios configuration with request interceptors for auth tokens.

## Tech Stack

- **Frontend**: React 19, Vite
- **Routing**: React Router DOM v7
- **API Client**: Axios
- **Styling**: Vanilla CSS with CSS Modules
- **Backend Compatibility**: Designed for Laravel Sanctum or similar token-based APIs

## Project Structure

```text
src/
├── api/          # API service layer
├── components/   # Reusable UI components
├── pages/        # Main application views
├── utils/        # Helper functions
├── App.jsx       # Root component and routes
└── main.jsx      # Entry point
```

## Getting Started

### Prerequisites

- Node.js
- npm
- Backend API (default: http://127.0.0.1:8000/api)

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/ikara-py/auth-app
   cd auth-app
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure the API**:
   Update `API_BASE_URL` in `src/api/auth.js` if necessary.

4. **Run development server**:
   ```bash
   npm run dev
   ```

5. **Build for production**:
   ```bash
   npm run build
   ```

## Security

- Routes are protected via logic in `App.jsx`.
- Auth tokens are stored in `localStorage`.
- API calls include the `Authorization: Bearer <token>` header automatically.

## Contributing

Submit a Pull Request or open an issue for any bugs or feature requests.

## License

This project is open-source and available under the MIT License.

