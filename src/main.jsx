import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'react-hot-toast';
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter basename='/ProductHub-react'>
      <App />
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "#1a1a2e",
            color: "#e2e8f0",
            border: "1px solid #334155",
            fontFamily: "'Sora', sans-serif",
            marginTop: '50px'
          },
        }}
      />
    </BrowserRouter>
  </StrictMode>,
);
