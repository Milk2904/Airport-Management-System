import { BrowserRouter, Routes, Route } from "react-router";
import { Toaster } from "sonner";

// Components
import { ProtectedRoute } from "./components/ProtectedRoute";

// Pages
import LogInPage from "./pages/LogInPage";
import DashBoardPage from "./pages/DashBoardPage";

import AirportListPage from "./pages/AirportListPage";
import AirportFormPage from "./pages/AirportFormPage";

import AirLinePage from "./pages/AirLinePage";
import AirlineFormPage from "./pages/AirlineFormPage";

import AirCraftPage from "./pages/AirCraftPage";
import AircraftFormPage from "./pages/AircraftFormPage";

import FlightPage from "./pages/FlightPage";
import FlightFormPage from "./pages/FlightFormPage";

import PassengerPage from "./pages/PassengerPage";
import PassengerFormPage from "./pages/PassengerFormPage";

import EmployeePage from "./pages/EmployeePage";
import EmployeeFormPage from "./pages/EmployeeFormPage";

import TicketPage from "./pages/TicketPage";
import TicketFormPage from "./pages/TicketFormPage";

import SeatPage from "./pages/SeatPage";
import SeatFormPage from "./pages/SeatFormPage";

import BaggagePage from "./pages/BaggagePage";
import BaggageFormPage from "./pages/BaggageFormPage";

import CrewPage from "./pages/CrewPage";
import CrewFormPage from "./pages/CrewFormPage";

import GatePage from "./pages/GatePage";
import GateFormPage from "./pages/GateFormPage";

import FlightSchedulePage from "./pages/FlightSchedulePage";
import FlightScheduleFormPage from "./pages/FlightScheduleFormPage";

function App() {
  return (
    <>
      <Toaster richColors />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LogInPage />} />
          <Route path="/dashboard" element={<ProtectedRoute><DashBoardPage /></ProtectedRoute>} />
          
          {/* Airport Routes */}
          <Route path="/airports" element={<ProtectedRoute><AirportListPage /></ProtectedRoute>} />
          <Route path="/airports/form" element={<ProtectedRoute><AirportFormPage /></ProtectedRoute>} />
          
          {/* Airline Routes */}
          <Route path="/airlines" element={<ProtectedRoute><AirLinePage /></ProtectedRoute>} />
          <Route path="/airlines/form" element={<ProtectedRoute><AirlineFormPage /></ProtectedRoute>} />
          
          {/* Aircraft Routes */}
          <Route path="/aircraft" element={<ProtectedRoute><AirCraftPage /></ProtectedRoute>} />
          <Route path="/aircraft/form" element={<ProtectedRoute><AircraftFormPage /></ProtectedRoute>} />
          
          {/* Flight Routes */}
          <Route path="/flights" element={<ProtectedRoute><FlightPage /></ProtectedRoute>} />
          <Route path="/flights/form" element={<ProtectedRoute><FlightFormPage /></ProtectedRoute>} />
          
          {/* Passenger Routes */}
          <Route path="/passengers" element={<ProtectedRoute><PassengerPage /></ProtectedRoute>} />
          <Route path="/passengers/form" element={<ProtectedRoute><PassengerFormPage /></ProtectedRoute>} />
          
          {/* Employee Routes */}
          <Route path="/employees" element={<ProtectedRoute><EmployeePage /></ProtectedRoute>} />
          <Route path="/employees/form" element={<ProtectedRoute><EmployeeFormPage /></ProtectedRoute>} />
          
          {/* Ticket Routes */}
          <Route path="/tickets" element={<ProtectedRoute><TicketPage /></ProtectedRoute>} />
          <Route path="/tickets/form" element={<ProtectedRoute><TicketFormPage /></ProtectedRoute>} />
          
          {/* Seat Routes */}
          <Route path="/seats" element={<ProtectedRoute><SeatPage /></ProtectedRoute>} />
          <Route path="/seats/form" element={<ProtectedRoute><SeatFormPage /></ProtectedRoute>} />

          {/* Baggage Routes */}
          <Route path="/baggage" element={<ProtectedRoute><BaggagePage /></ProtectedRoute>} />
          <Route path="/baggage/form" element={<ProtectedRoute><BaggageFormPage /></ProtectedRoute>} />

          {/* Crew Routes */}
          <Route path="/crew" element={<ProtectedRoute><CrewPage /></ProtectedRoute>} />
          <Route path="/crew/form" element={<ProtectedRoute><CrewFormPage /></ProtectedRoute>} />

          {/* Gate Routes */}
          <Route path="/gates" element={<ProtectedRoute><GatePage /></ProtectedRoute>} />
          <Route path="/gates/form" element={<ProtectedRoute><GateFormPage /></ProtectedRoute>} />

          {/* Flight Schedule Routes */}
          <Route path="/flight-schedules" element={<ProtectedRoute><FlightSchedulePage /></ProtectedRoute>} />
          <Route path="/flight-schedules/form" element={<ProtectedRoute><FlightScheduleFormPage /></ProtectedRoute>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;