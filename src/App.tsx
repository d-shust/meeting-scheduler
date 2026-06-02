import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import {SchedulerPage} from './pages/scheduler-page/scheduler-page';
import {MeetingPage} from './pages/meeting-page/meeting-page'
export const App = () => {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SchedulerPage />} />
        <Route path="/meeting" element={<MeetingPage />} />
      </Routes>
    </BrowserRouter>
  )
}

