import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import { DataProvider } from './context/DataContext';
import Layout from './components/Layout';
import ScrollToTop from './components/ScrollToTop';
import LangUrlSync from './components/LangUrlSync';
import ErrorBoundary from './components/ErrorBoundary';
import Home from './pages/Home';
import About from './pages/About';
import Service from './pages/Service';
import ServiceDetail from './pages/ServiceDetail';
import Project from './pages/Project';
import ProjectDetail from './pages/ProjectDetail';
import Contact from './pages/Contact';
import Login from './pages/admin/Login';
import Dashboard from './pages/admin/Dashboard';
import NotFound from './pages/NotFound';

function App() {
  return (
    <ErrorBoundary>
      <LanguageProvider>
        <DataProvider>
          <BrowserRouter>
            <ScrollToTop />
            {/* <LangUrlSync /> TRANSLATE_DISABLED */}
            <Layout>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/service" element={<Service />} />
                <Route path="/service/:id" element={<ServiceDetail />} />
                <Route path="/project" element={<Project />} />
                <Route path="/project/:id" element={<ProjectDetail />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
                <Route path="/admin/login" element={<Login />} />
                <Route path="/admin/dashboard" element={<Dashboard />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Layout>
          </BrowserRouter>
        </DataProvider>
      </LanguageProvider>
    </ErrorBoundary>
  );
}

export default App;





 
