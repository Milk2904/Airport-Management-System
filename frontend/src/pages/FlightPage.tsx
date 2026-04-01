import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { getFlights, deleteFlight } from "@/service/FlightService";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus } from "lucide-react";

interface Flight {
  flightId: number;
  flightNumber: string;
  departureAirport: { name: string };
  arrivalAirport: { name: string };
  airline: { name: string };
  aircraft: { model: string };
  duration: number;
}

const FlightPage = () => {
  const navigate = useNavigate();
  const [flights, setFlights] = useState<Flight[]>([]);

  const handleEdit = (id: number) => {
    navigate(`/flights/form?id=${id}`);
  };

  const handleAdd = () => {
    navigate("/flights/form");
  };

  const remove = async (id: number) => {
    try {
      await deleteFlight(id);
      const res = await getFlights();
      // Handle both direct array response and ApiResponse wrapper
      const data = res.data?.result ?? res.data;
      setFlights(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Failed to delete flight:", error);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const res = await getFlights();
        // Handle both direct array response and ApiResponse wrapper
        const data = res.data?.result ?? res.data;
        setFlights(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Failed to fetch flights:", error);
        setFlights([]);
      }
    })();
  }, []);

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
                      <CardTitle>Flight List</CardTitle>
                      <Button onClick={handleAdd}>
                        <Plus className="mr-2 h-4 w-4" />
                        Add Flight
                      </Button>
                    </CardHeader>
                    <CardContent>
                      <table className="w-full text-left mt-4">
                        <thead>
                          <tr className="border-b">
                            <th className="p-2">Flight Number</th>
                            <th className="p-2">Departure</th>
                            <th className="p-2">Arrival</th>
                            <th className="p-2">Airline</th>
                            <th className="p-2">Aircraft</th>
                            <th className="p-2">Duration (min)</th>
                            <th className="p-2">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {flights.map((f) => (
                            <tr key={f.flightId} className="border-b">
                              <td className="p-2">{f.flightNumber}</td>
                              <td className="p-2">{f.departureAirport?.name || "N/A"}</td>
                              <td className="p-2">{f.arrivalAirport?.name || "N/A"}</td>
                              <td className="p-2">{f.airline?.name || "N/A"}</td>
                              <td className="p-2">{f.aircraft?.model || "N/A"}</td>
                              <td className="p-2">{f.duration}</td>
                              <td className="p-2">
                                <Button variant="outline" onClick={() => handleEdit(f.flightId)}>Edit</Button>
                                <Button className="ml-2" variant="destructive" onClick={() => remove(f.flightId)}>
                                  Delete
                                </Button>
                              </td>
                            </tr>
                          ))}
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

export default FlightPage;