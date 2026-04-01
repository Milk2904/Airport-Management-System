import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { createFlightSchedule, getFlightScheduleById, updateFlightSchedule } from "@/service/FlightScheduleService";

const FlightScheduleFormPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  
  const [formData, setFormData] = useState({
    flightId: "",
    aircraftId: "",
    gateId: "",
    departureTime: "",
    arrivalTime: "",
    status: "SCHEDULED",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) {
      getFlightScheduleById(Number(id)).then(res => {
        const s = res.data;
        // Format LocalDateTime to datetime-local expected format (YYYY-MM-DDThh:mm)
        const formatDateTime = (isoString?: string) => {
          if (!isoString) return "";
          return new Date(isoString).toISOString().slice(0, 16);
        };
        
        setFormData({
          flightId: s.flight?.flightId || "",
          aircraftId: s.aircraft?.aircraftId || "",
          gateId: s.gate?.gateId || "",
          departureTime: formatDateTime(s.departureTime),
          arrivalTime: formatDateTime(s.arrivalTime),
          status: s.status || "SCHEDULED",
        });
      }).catch(() => toast.error("Failed to fetch flight schedule"));
    }
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      flightId: Number(formData.flightId),
      aircraftId: Number(formData.aircraftId),
      gateId: Number(formData.gateId),
      departureTime: formData.departureTime,
      arrivalTime: formData.arrivalTime,
      status: formData.status,
    };

    try {
      if (id) {
        // Backend FlightScheduleService update expects the same but maybe keeping flight mappings?
        // In our backend `update` method directly replaces properties so it's fine.
        await updateFlightSchedule(Number(id), payload);
        toast.success("Flight schedule updated successfully");
      } else {
        await createFlightSchedule(payload, Number(formData.flightId), Number(formData.aircraftId), Number(formData.gateId));
        toast.success("Flight schedule created successfully");
      }
      navigate("/flight-schedules");
    } catch {
      toast.error("Failed to save flight schedule");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
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
                    <CardHeader>
                      <CardTitle>{id ? "Edit Flight Schedule" : "Add Flight Schedule"}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
                        {!id && (
                          // Only show flight, aircraft, gate ID fields on create (based on backend CREATE logic mapping)
                          <>
                            <div>
                              <Label htmlFor="flightId">Flight ID</Label>
                              <Input type="number" id="flightId" name="flightId" value={formData.flightId || ""} onChange={handleChange} required />
                            </div>
                            <div>
                              <Label htmlFor="aircraftId">Aircraft ID</Label>
                              <Input type="number" id="aircraftId" name="aircraftId" value={formData.aircraftId || ""} onChange={handleChange} required />
                            </div>
                            <div>
                              <Label htmlFor="gateId">Gate ID</Label>
                              <Input type="number" id="gateId" name="gateId" value={formData.gateId || ""} onChange={handleChange} required />
                            </div>
                          </>
                        )}
                        <div>
                          <Label htmlFor="departureTime">Departure Time</Label>
                          <Input type="datetime-local" id="departureTime" name="departureTime" value={formData.departureTime || ""} onChange={handleChange} required />
                        </div>
                        <div>
                          <Label htmlFor="arrivalTime">Arrival Time</Label>
                          <Input type="datetime-local" id="arrivalTime" name="arrivalTime" value={formData.arrivalTime || ""} onChange={handleChange} required />
                        </div>
                        <div>
                          <Label htmlFor="status">Status</Label>
                          <select 
                            id="status" 
                            name="status" 
                            value={formData.status} 
                            onChange={handleChange} 
                            className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                          >
                            <option value="SCHEDULED">SCHEDULED</option>
                            <option value="DELAYED">DELAYED</option>
                            <option value="DEPARTED">DEPARTED</option>
                            <option value="ARRIVED">ARRIVED</option>
                            <option value="CANCELLED">CANCELLED</option>
                          </select>
                        </div>
                        <div className="flex gap-2 pt-4">
                          <Button type="submit" disabled={loading}>
                            {loading ? "Saving..." : "Save"}
                          </Button>
                          <Button variant="outline" onClick={() => navigate("/flight-schedules")}>Cancel</Button>
                        </div>
                      </form>
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

export default FlightScheduleFormPage;
