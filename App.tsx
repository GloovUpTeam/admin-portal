import React, { Suspense, lazy } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';

// Lazy Load Pages
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Projects = lazy(() => import('./pages/Projects'));
const Tickets = lazy(() => import('./pages/Tickets'));
const Users = lazy(() => import('./pages/Users'));
const Clients = lazy(() => import('./pages/Clients'));
const Attendance = lazy(() => import('./pages/Attendance'));
const Notifications = lazy(() => import('./pages/Notifications'));

const Loading = () => (
  <div className="h-full w-full flex items-center justify-center p-20 text-gloov-tealDark">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-current"></div>
  </div>
);

const App: React.FC = () => {
  return (
    <Router>
      <Layout>
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/clients" element={<Clients />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/tickets" element={<Tickets />} />
            <Route path="/users" element={<Users />} />
            <Route path="/attendance" element={<Attendance />} />
            <Route path="/notifications" element={<Notifications />} />
            {/* Redirect legacy Reviews links to Dashboard */}
            <Route path="/reviews" element={<Navigate to="/" replace />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </Layout>
    </Router>
  );
};

export default App;