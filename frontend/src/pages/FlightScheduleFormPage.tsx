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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { createFlightSchedule, getFlightScheduleById, updateFlightSchedule } from "@/service/FlightScheduleService";
import { getFlights } from "@/service/FlightService";
import { getAircrafts } from "@/service/AircraftService";
import { getGates } from "@/service/GateService";

interface Flight {
  flightId: number;
  flightNumber: string;
}

interface Aircraft {
  aircraftId: number;
  model: string;
}

interface Gate {
  gateId: number;
  gateCode: string;
}

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
  
  const [flights, setFlights] = useState<Flight[]>([]);
  const [aircrafts, setAircrafts] = useState<Aircraft[]>([]);
  const [gates, setGates] = useState<Gate[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [flightsRes, aircraftsRes, gatesRes] = await Promise.all([
          getFlights(),
          getAircrafts(),
          getGates()
        ]);
        
        const fData = flightsRes.data?.result ?? flightsRes.data;
        const aData = aircraftsRes.data?.result ?? aircraftsRes.data;
        const gData = gatesRes.data?.result ?? gatesRes.data;

        setFlights(Array.isArray(fData) ? fData : []);
        setAircrafts(Array.isArray(aData) ? aData : []);
        setGates(Array.isArray(gData) ? gData : []);
      } catch (error) {
        console.error("Failed to load dependency data:", error);
      }
    };
    loadData();
  }, []);

  useEffect(() => {
    if (id) {
      getFlightScheduleById(Number(id)).then(res => {
        const data = res.data?.result ?? res.data;
        const formatDateTime = (isoString?: string) => {
          if (!isoString) return "";
          return new Date(isoString).toISOString().slice(0, 16);
        };
        
        setFormData({
          flightId: data.flight?.flightId?.toString() || "",
          aircraftId: data.aircraft?.aircraftId?.toString() || "",
          gateId: data.gate?.gateId?.toString() || "",
          departureTime: formatDateTime(data.departureTime),
          arrivalTime: formatDateTime(data.arrivalTime),
          status: data.status || "SCHEDULED",
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
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
                        <div>
                          <Label htmlFor="flightId">Flight</Label>
                          <Select 
                            value={formData.flightId}
                            onValueChange={(val) => handleSelectChange("flightId", val)}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select flight" />
                            </SelectTrigger>
                            <SelectContent>
                              {flights.length === 0 ? (
                                <div className="p-2 text-sm text-muted-foreground">Chưa có dữ liệu</div>
                              ) : (
                                flights.map((f) => (
                                  <SelectItem key={f.flightId} value={f.flightId.toString()}>
                                    {f.flightNumber}
                                  </SelectItem>
                                ))
                              )}
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="aircraftId">Aircraft</Label>
                          <Select 
                            value={formData.aircraftId}
                            onValueChange={(val) => handleSelectChange("aircraftId", val)}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select aircraft" />
                            </SelectTrigger>
                            <SelectContent>
                              {aircrafts.length === 0 ? (
                                <div className="p-2 text-sm text-muted-foreground">Chưa có dữ liệu</div>
                              ) : (
                                aircrafts.map((a) => (
                                  <SelectItem key={a.aircraftId} value={a.aircraftId.toString()}>
                                    {a.model} (ID: {a.aircraftId})
                                  </SelectItem>
                                ))
                              )}
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="gateId">Gate</Label>
                          <Select 
                            value={formData.gateId}
                            onValueChange={(val) => handleSelectChange("gateId", val)}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select gate" />
                            </SelectTrigger>
                            <SelectContent>
                              {gates.length === 0 ? (
                                <div className="p-2 text-sm text-muted-foreground">Chưa có dữ liệu</div>
                              ) : (
                                gates.map((g) => (
                                  <SelectItem key={g.gateId} value={g.gateId.toString()}>
                                    {g.gateCode}
                                  </SelectItem>
                                ))
                              )}
                            </SelectContent>
                          </Select>
                        </div>
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
                          <Select 
                            value={formData.status}
                            onValueChange={(val) => handleSelectChange("status", val)}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="SCHEDULED">SCHEDULED</SelectItem>
                              <SelectItem value="DELAYED">DELAYED</SelectItem>
                              <SelectItem value="DEPARTED">DEPARTED</SelectItem>
                              <SelectItem value="ARRIVED">ARRIVED</SelectItem>
                              <SelectItem value="CANCELLED">CANCELLED</SelectItem>
                            </SelectContent>
                          </Select>
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

