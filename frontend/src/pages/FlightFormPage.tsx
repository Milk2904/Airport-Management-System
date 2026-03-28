import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { getFlightById, createFlight, updateFlight } from "@/service/FlightService";
import { getAirports } from "@/service/AirportService";
import { getAirlines } from "@/service/AirlineService";
import { getAircrafts } from "@/service/AircraftService";
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

interface Airport {
  airportId: number;
  name: string;
}

interface Airline {
  airlineId: number;
  airlineName: string;
}

interface Aircraft {
  aircraftId: number;
  model: string;
}

const FlightFormPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  
  const [formData, setFormData] = useState({
    flightNumber: "",
    departureAirport: { airportId: "" },
    arrivalAirport: { airportId: "" },
    airline: { airlineId: "" },
    aircraft: { aircraftId: "" },
    duration: "",
  });
  const [airports, setAirports] = useState<Airport[]>([]);
  const [airlines, setAirlines] = useState<Airline[]>([]);
  const [aircrafts, setAircrafts] = useState<Aircraft[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        const airportsRes = await getAirports();
        const airlinesRes = await getAirlines();
        const aircraftsRes = await getAircrafts();
        setAirports(airportsRes.data);
        setAirlines(airlinesRes.data);
        setAircrafts(aircraftsRes.data);
      } catch {
        // Handle error silently
      }
    };
    loadData();
  }, []);

  useEffect(() => {
    if (id) {
      const loadFlight = async () => {
        try {
          const res = await getFlightById(parseInt(id));
          setFormData(res.data);
        } catch {
          toast.error("Failed to load flight");
          navigate("/flights");
        }
      };
      loadFlight();
    }
  }, [id, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = {
        ...formData,
        duration: parseInt(formData.duration as string),
      };

      if (id) {
        await updateFlight(parseInt(id), data);
        toast.success("Flight updated successfully");
      } else {
        const params = {
          departureId: parseInt(formData.departureAirport.airportId as string),
          arrivalId: parseInt(formData.arrivalAirport.airportId as string),
          airlineId: parseInt(formData.airline.airlineId as string),
        };
        await createFlight(data, params.departureId, params.arrivalId, params.airlineId);
        toast.success("Flight created successfully");
      }
      navigate("/flights");
    } catch {
      toast.error("Failed to save flight");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAirportChange = (value: string, type: "departure" | "arrival") => {
    if (type === "departure") {
      setFormData(prev => ({
        ...prev,
        departureAirport: { airportId: value }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        arrivalAirport: { airportId: value }
      }));
    }
  };

  const handleAirlineChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      airline: { airlineId: value }
    }));
  };

  const handleAircraftChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      aircraft: { aircraftId: value }
    }));
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
                      <CardTitle>{id ? "Edit Flight" : "Add Flight"}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
                        <div>
                          <Label htmlFor="flightNumber">Flight Number</Label>
                          <Input
                            id="flightNumber"
                            name="flightNumber"
                            value={formData.flightNumber}
                            onChange={handleChange}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="departure">Departure Airport</Label>
                          <Select 
                            value={formData.departureAirport?.airportId?.toString() || ""}
                            onValueChange={(val) => handleAirportChange(val, "departure")}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select departure airport" />
                            </SelectTrigger>
                            <SelectContent>
                              {airports.map((airport) => (
                                <SelectItem key={airport.airportId} value={airport.airportId.toString()}>
                                  {airport.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="arrival">Arrival Airport</Label>
                          <Select 
                            value={formData.arrivalAirport?.airportId?.toString() || ""}
                            onValueChange={(val) => handleAirportChange(val, "arrival")}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select arrival airport" />
                            </SelectTrigger>
                            <SelectContent>
                              {airports.map((airport) => (
                                <SelectItem key={airport.airportId} value={airport.airportId.toString()}>
                                  {airport.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="airline">Airline</Label>
                          <Select 
                            value={formData.airline?.airlineId?.toString() || ""}
                            onValueChange={handleAirlineChange}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select airline" />
                            </SelectTrigger>
                            <SelectContent>
                              {airlines.map((airline) => (
                                <SelectItem key={airline.airlineId} value={airline.airlineId.toString()}>
                                  {airline.airlineName}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="aircraft">Aircraft</Label>
                          <Select 
                            value={formData.aircraft?.aircraftId?.toString() || ""}
                            onValueChange={handleAircraftChange}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select aircraft" />
                            </SelectTrigger>
                            <SelectContent>
                              {aircrafts.map((aircraft) => (
                                <SelectItem key={aircraft.aircraftId} value={aircraft.aircraftId.toString()}>
                                  {aircraft.model}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="duration">Duration (minutes)</Label>
                          <Input
                            id="duration"
                            name="duration"
                            type="number"
                            value={formData.duration}
                            onChange={handleChange}
                            required
                          />
                        </div>
                        <div className="flex gap-2 pt-4">
                          <Button type="submit" disabled={loading}>
                            {loading ? "Saving..." : "Save"}
                          </Button>
                          <Button variant="outline" onClick={() => navigate("/flights")}>
                            Cancel
                          </Button>
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

export default FlightFormPage;
