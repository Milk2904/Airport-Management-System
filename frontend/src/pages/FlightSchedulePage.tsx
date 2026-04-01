import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus } from "lucide-react";
import { getFlightSchedules, deleteFlightSchedule } from "@/service/FlightScheduleService";

interface FlightSchedule {
  scheduleId: number;
  flight: { flightId: number; flightNumber: string };
  aircraft: { aircraftId: number; model: string };
  gate: { gateId: number; gateCode: string };
  departureTime: string;
  arrivalTime: string;
  status: string;
}

const FlightSchedulePage = () => {
  const navigate = useNavigate();
  const [schedules, setSchedules] = useState<FlightSchedule[]>([]);

  const loadSchedules = async () => {
    try {
      const res = await getFlightSchedules();
      setSchedules(Array.isArray(res.data) ? res.data : []);
    } catch (error) {
      console.error("Failed to fetch flight schedules", error);
    }
  };

  useEffect(() => {
    loadSchedules();
  }, []);

  const handleEdit = (id: number) => {
    navigate(`/flight-schedules/form?id=${id}`);
  };

  const handleAdd = () => {
    navigate("/flight-schedules/form");
  };

  const handleDelete = async (id: number) => {
    if (confirm("Are you sure you want to delete this flight schedule?")) {
      try {
        await deleteFlightSchedule(id);
        loadSchedules();
      } catch (error) {
        console.error("Failed to delete flight schedule", error);
      }
    }
  };

  return (
    <TooltipProvider>
      <SidebarProvider
        style={
          {
            "--sidebar-width": "calc(var(--spacing) * 72)",
            "--header-height": "calc(var(--spacing) * 12)",
          } as React.CSSProperties
        }
      >
        <AppSidebar variant="inset" />
        <SidebarInset>
          <SiteHeader />
          <div className="flex flex-1 flex-col">
            <div className="@container/main flex flex-1 flex-col gap-2">
              <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                <div className="px-4 lg:px-6">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                      <CardTitle>Flight Schedules</CardTitle>
                      <Button onClick={handleAdd}>
                        <Plus className="mr-2 h-4 w-4" />
                        Add Schedule
                      </Button>
                    </CardHeader>
                    <CardContent>
                      <table className="w-full text-left mt-4 border-collapse">
                        <thead>
                          <tr className="border-b">
                            <th className="p-2">Flight No.</th>
                            <th className="p-2">Aircraft</th>
                            <th className="p-2">Gate Code</th>
                            <th className="p-2">Departure</th>
                            <th className="p-2">Arrival</th>
                            <th className="p-2">Status</th>
                            <th className="p-2">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {schedules.length === 0 ? (
                            <tr>
                              <td colSpan={7} className="p-2 text-center text-gray-500">
                                No flight schedules found
                              </td>
                            </tr>
                          ) : (
                            schedules.map((s) => (
                              <tr key={s.scheduleId} className="border-b">
                                <td className="p-2">{s.flight?.flightNumber}</td>
                                <td className="p-2">{s.aircraft?.model}</td>
                                <td className="p-2">{s.gate?.gateCode}</td>
                                <td className="p-2">{new Date(s.departureTime).toLocaleString()}</td>
                                <td className="p-2">{new Date(s.arrivalTime).toLocaleString()}</td>
                                <td className="p-2">{s.status}</td>
                                <td className="p-2">
                                  <Button variant="outline" size="sm" onClick={() => handleEdit(s.scheduleId)}>
                                    Edit
                                  </Button>
                                  <Button
                                    className="ml-2"
                                    variant="destructive"
                                    size="sm"
                                    onClick={() => handleDelete(s.scheduleId)}
                                  >
                                    Delete
                                  </Button>
                                </td>
                              </tr>
                            ))
                          )}
                        </tbody>
                      </table>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </TooltipProvider>
  );
};

export default FlightSchedulePage;
