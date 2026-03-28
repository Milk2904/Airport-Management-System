import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { getAircraftById, createAircraft, updateAircraft } from "@/service/AircraftService";
import { getAirlines } from "@/service/AirlineService";
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

interface Airline {
  airlineId: number;
  airlineName: string;
}

const AircraftFormPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  
  const [formData, setFormData] = useState({
    model: "",
    airline: { airlineId: "" },
    capacity: "",
    manufactureYear: "",
    status: "ACTIVE",
  });
  const [airlines, setAirlines] = useState<Airline[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      const res = await getAirlines();
      setAirlines(res.data);
    })();
  }, []);

  useEffect(() => {
    if (id) {
      (async () => {
        try {
          const res = await getAircraftById(parseInt(id));
          setFormData(res.data);
        } catch {
          toast.error("Failed to load aircraft");
          navigate("/aircraft");
        }
      })();
    }
  }, [id, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = {
        ...formData,
        capacity: parseInt(formData.capacity as string),
        manufactureYear: parseInt(formData.manufactureYear as string),
      };
      
      if (id) {
        await updateAircraft(parseInt(id), data);
        toast.success("Aircraft updated successfully");
      } else {
        await createAircraft(data);
        toast.success("Aircraft created successfully");
      }
      navigate("/aircraft");
    } catch {
      toast.error("Failed to save aircraft");
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

  const handleAirlineChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      airline: { airlineId: value }
    }));
  };

  const handleStatusChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      status: value
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
                      <CardTitle>{id ? "Edit Aircraft" : "Add Aircraft"}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
                        <div>
                          <Label htmlFor="model">Model</Label>
                          <Input
                            id="model"
                            name="model"
                            value={formData.model}
                            onChange={handleChange}
                            required
                          />
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
                          <Label htmlFor="capacity">Capacity</Label>
                          <Input
                            id="capacity"
                            name="capacity"
                            type="number"
                            value={formData.capacity}
                            onChange={handleChange}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="manufactureYear">Manufacture Year</Label>
                          <Input
                            id="manufactureYear"
                            name="manufactureYear"
                            type="number"
                            value={formData.manufactureYear}
                            onChange={handleChange}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="status">Status</Label>
                          <Select value={formData.status} onValueChange={handleStatusChange}>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="ACTIVE">Active</SelectItem>
                              <SelectItem value="INACTIVE">Inactive</SelectItem>
                              <SelectItem value="MAINTENANCE">Maintenance</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="flex gap-2 pt-4">
                          <Button type="submit" disabled={loading}>
                            {loading ? "Saving..." : "Save"}
                          </Button>
                          <Button variant="outline" onClick={() => navigate("/aircraft")}>
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

export default AircraftFormPage;
