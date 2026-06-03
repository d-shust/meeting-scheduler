import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import {SchedulerPage} from './pages/scheduler-page/scheduler-page';
import {MeetingPage} from './pages/meeting-page/meeting-page'
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
export const App = () => {

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SchedulerPage />} />
          <Route path="/meeting" element={<MeetingPage />} />
        </Routes>
      </BrowserRouter>
    </LocalizationProvider>
  )
}

