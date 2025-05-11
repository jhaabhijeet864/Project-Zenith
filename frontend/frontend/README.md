# Frontend Project

This is a frontend project structured to provide a simple web application using React. Below are the details regarding the project setup, components, and usage.

## Project Structure

```
frontend
├── public
│   ├── index.html
│   └── favicon.ico
├── src
│   ├── assets
│   │   └── styles
│   │       └── main.css
│   ├── components
│   │   ├── App.jsx
│   │   ├── Header.jsx
│   │   └── Footer.jsx
│   ├── pages
│   │   ├── Home.jsx
│   │   └── About.jsx
│   ├── utils
│   │   └── api.js
│   ├── context
│   │   └── AppContext.jsx
│   └── index.js
├── .gitignore
├── package.json
├── README.md
└── vite.config.js
```

## Getting Started

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the application:**
   ```bash
   npm run dev
   ```

## Components

- **App.jsx**: The root component that renders the main layout and handles routing.
- **Header.jsx**: Displays the navigation and branding.
- **Footer.jsx**: Contains footer content.
- **Home.jsx**: Represents the home page.
- **About.jsx**: Represents the about page.

## Styles

The main styles for the application are located in `src/assets/styles/main.css`.

## Utilities

Utility functions for API calls can be found in `src/utils/api.js`.

## Context

Global state management is handled through the context API in `src/context/AppContext.jsx`.

## License

This project is licensed under the MIT License.