import { Toaster } from './components/ui/sonner';
import { ProjectsProvider } from './contexts/ProjectsContext';
import { MonitoringPage } from './pages/MonitoringPage';

function App() {
  return (
    <ProjectsProvider>
      <MonitoringPage />
      <Toaster position="top-right" richColors />
    </ProjectsProvider>
  );
}

export default App;
