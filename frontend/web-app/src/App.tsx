import { ProjectsProvider } from './contexts/ProjectsContext';
import { MonitoringPage } from './pages/MonitoringPage';

function App() {
  return (
    <ProjectsProvider>
      <MonitoringPage />
    </ProjectsProvider>
  );
}

export default App;
