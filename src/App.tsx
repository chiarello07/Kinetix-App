/* Main App Component - Handles routing (using react-router-dom), query client and other providers - use this file to add all routes */
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Toaster } from '@/components/ui/toaster'
import { Toaster as Sonner } from '@/components/ui/sonner'
import { TooltipProvider } from '@/components/ui/tooltip'
import Index from './pages/Index'
import NotFound from './pages/NotFound'
import Layout from './components/Layout'
import OnboardingPage from './pages/onboarding/OnboardingPage'
import NutritionOnboardingPage from './pages/nutrition-onboarding/NutritionOnboardingPage'
import NutritionAssessmentsPage from './pages/nutrition-assessments/NutritionAssessmentsPage'
import PosturalAnalysisPage from './pages/analysis/PosturalAnalysisPage'
import Workouts from './pages/Workouts'

// ONLY IMPORT AND RENDER WORKING PAGES, NEVER ADD PLACEHOLDER COMPONENTS OR PAGES IN THIS FILE
// AVOID REMOVING ANY CONTEXT PROVIDERS FROM THIS FILE (e.g. TooltipProvider, Toaster, Sonner)

const App = () => (
  <BrowserRouter future={{ v7_startTransition: false, v7_relativeSplatPath: false }}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Index />} />
          <Route path="/onboarding" element={<OnboardingPage />} />
          <Route path="/nutrition-onboarding" element={<NutritionOnboardingPage />} />
          <Route path="/nutrition-assessments" element={<NutritionAssessmentsPage />} />
          <Route path="/analysis" element={<PosturalAnalysisPage />} />
          <Route
            path="/dashboard"
            element={
              <div className="p-8 text-center text-muted-foreground animate-fade-in mt-20">
                Dashboard em desenvolvimento...
              </div>
            }
          />
          <Route path="/workouts" element={<Workouts />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </TooltipProvider>
  </BrowserRouter>
)

export default App
