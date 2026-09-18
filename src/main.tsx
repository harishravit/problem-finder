import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ClerkProvider } from '@clerk/react'
import { shadcn } from '@clerk/ui/themes'
import './index.css'
import App from './App.tsx'

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY || "pk_test_bmVlZGVkLXNxdWlkLTUzMDIuY2xlcmsuYWNjb3VudHMuZGV2JA";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} appearance={{ theme: shadcn }} afterSignOutUrl="/">
      <App />
    </ClerkProvider>
  </StrictMode>,
)
