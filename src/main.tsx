import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ThemeProvider } from './components/ui/ThemeProvider.tsx'
import { QueryClient, QueryClientProvider } from 'react-query'
import Layout from './components/layout.tsx'
import { Toaster } from './components/ui/sonner.tsx'
import { LanguageConfigProvider } from './context/LanguageConfigContext.tsx'


const client = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <QueryClientProvider client={client}>
        <LanguageConfigProvider>
          <App />
          <Toaster  position='bottom-center'/>
        </LanguageConfigProvider>
      </QueryClientProvider>
    </ThemeProvider>
  </StrictMode>,
)
