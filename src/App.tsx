import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { SpeedInsights } from '@vercel/speed-insights/react'
import { ProgressProvider } from './contexts/ProgressContext'
import { BookmarkProvider } from './contexts/BookmarkContext'
import { ThemeProvider } from './contexts/ThemeContext'
import { NoteProvider } from './contexts/NoteContext'
import { AuthProvider } from './contexts/AuthContext'
import { PracticeProvider } from './contexts/PracticeContext'
import ErrorBoundary from './components/ErrorBoundary'
import ScrollToTop from './components/ScrollToTop'
import Layout from './components/Layout'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import Bookmarks from './pages/Bookmarks'
import ExportImport from './pages/ExportImport'
import Login from './pages/Login'
import Signup from './pages/Signup'
import NotFound from './pages/NotFound'
import JavaScriptBasics from './pages/javascript/JavaScriptBasics'
import JavaScriptIntermediate from './pages/javascript/JavaScriptIntermediate'
import JavaScriptAdvanced from './pages/javascript/JavaScriptAdvanced'
import TypeScriptBasics from './pages/typescript/TypeScriptBasics'
import TypeScriptIntermediate from './pages/typescript/TypeScriptIntermediate'
import TypeScriptAdvanced from './pages/typescript/TypeScriptAdvanced'
import ReactLearning from './pages/frameworks/ReactLearning'
import VueLearning from './pages/frameworks/VueLearning'
import NextLearning from './pages/frameworks/NextLearning'
import SQLBasics from './pages/sql/SQLBasics'
import SQLIntermediate from './pages/sql/SQLIntermediate'
import JavaScriptPracticeBasics from './pages/practice/JavaScriptPracticeBasics'
import JavaScriptPracticeIntermediate from './pages/practice/JavaScriptPracticeIntermediate'
import JavaScriptPracticeAdvanced from './pages/practice/JavaScriptPracticeAdvanced'
import TypeScriptPracticeBasics from './pages/practice/TypeScriptPracticeBasics'
import TypeScriptPracticeIntermediate from './pages/practice/TypeScriptPracticeIntermediate'
import TypeScriptPracticeAdvanced from './pages/practice/TypeScriptPracticeAdvanced'
import PrivacyPolicy from './pages/PrivacyPolicy'
import TermsOfService from './pages/TermsOfService'
import PrivacyConsent from './components/PrivacyConsent'
import AccountSettings from './pages/AccountSettings'
import DataMigration from './pages/DataMigration'

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <AuthProvider>
          <Router>
            <ScrollToTop />
            <PrivacyConsent />
            <ProgressProvider>
              <BookmarkProvider>
                <PracticeProvider>
                  <NoteProvider>
                  <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route element={<Layout />}>
                      <Route path="/" element={<Home />} />
                      <Route path="/dashboard" element={<Dashboard />} />
                      <Route path="/bookmarks" element={<Bookmarks />} />
                      <Route path="/export-import" element={<ExportImport />} />
                    <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                    <Route path="/terms" element={<TermsOfService />} />
                    <Route path="/account-settings" element={<AccountSettings />} />
                    <Route path="/data-migration" element={<DataMigration />} />
                    <Route path="/javascript/basics" element={<JavaScriptBasics />} />
                    <Route path="/javascript/intermediate" element={<JavaScriptIntermediate />} />
                    <Route path="/javascript/advanced" element={<JavaScriptAdvanced />} />
                    <Route path="/typescript/basics" element={<TypeScriptBasics />} />
                    <Route path="/typescript/intermediate" element={<TypeScriptIntermediate />} />
                    <Route path="/typescript/advanced" element={<TypeScriptAdvanced />} />
                    <Route path="/frameworks/react" element={<ReactLearning />} />
                    <Route path="/frameworks/vue" element={<VueLearning />} />
                    <Route path="/frameworks/next" element={<NextLearning />} />
                    <Route path="/sql/basics" element={<SQLBasics />} />
                    <Route path="/sql/intermediate" element={<SQLIntermediate />} />
                    <Route path="/practice/javascript/basics" element={<JavaScriptPracticeBasics />} />
                    <Route path="/practice/javascript/intermediate" element={<JavaScriptPracticeIntermediate />} />
                    <Route path="/practice/javascript/advanced" element={<JavaScriptPracticeAdvanced />} />
                    <Route path="/practice/typescript/basics" element={<TypeScriptPracticeBasics />} />
                    <Route path="/practice/typescript/intermediate" element={<TypeScriptPracticeIntermediate />} />
                    <Route path="/practice/typescript/advanced" element={<TypeScriptPracticeAdvanced />} />
                    <Route path="*" element={<NotFound />} />
                    </Route>
                  </Routes>
                  </NoteProvider>
                </PracticeProvider>
              </BookmarkProvider>
            </ProgressProvider>
            <SpeedInsights />
          </Router>
        </AuthProvider>
      </ThemeProvider>
    </ErrorBoundary>
  )
}

export default App

