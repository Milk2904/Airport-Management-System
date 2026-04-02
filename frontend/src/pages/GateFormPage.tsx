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
import { createGate, getGateById, updateGate } from "@/service/GateService";
import { getAirports } from "@/service/AirportService";

interface Airport {
  airportId: number;
  name: string;
}

const GateFormPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  
  const [formData, setFormData] = useState({
    gateCode: "",
    terminal: "",
    status: "OPEN",
    airportId: "",
  });
  const [airports, setAirports] = useState<Airport[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadAirports = async () => {
      try {
        const res = await getAirports();
        const data = res.data?.result ?? res.data;
        setAirports(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Failed to load airports:", error);
      }
    };
    loadAirports();
  }, []);

  useEffect(() => {
    if (id) {
      getGateById(Number(id)).then(res => {
        const data = res.data?.result ?? res.data;
        setFormData({
          gateCode: data.gateCode || "",
          terminal: data.terminal || "",
          status: data.status || "OPEN",
          airportId: data.airport?.airportId?.toString() || "",
        });
      }).catch(() => toast.error("Failed to fetch gate"));
    }
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      gateCode: formData.gateCode,
      terminal: formData.terminal,
      status: formData.status,
      airport: { airportId: Number(formData.airportId) },
    };

    try {
      if (id) {
        await updateGate(Number(id), payload);
        toast.success("Gate updated successfully");
      } else {
        await createGate(payload);
        toast.success("Gate created successfully");
      }
      navigate("/gates");
    } catch {
      toast.error("Failed to save gate");
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
                      <CardTitle>{id ? "Edit Gate" : "Add Gate"}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
                        <div>
                          <Label htmlFor="gateCode">Gate Code</Label>
                          <Input type="text" id="gateCode" name="gateCode" value={formData.gateCode || ""} onChange={handleChange} required />
                        </div>
                        <div>
                          <Label htmlFor="terminal">Terminal</Label>
                          <Input type="text" id="terminal" name="terminal" value={formData.terminal || ""} onChange={handleChange} required />
                        </div>
                        <div>
                          <Label htmlFor="airportId">Airport</Label>
                          <Select 
                            value={formData.airportId}
                            onValueChange={(val) => handleSelectChange("airportId", val)}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select airport" />
                            </SelectTrigger>
                            <SelectContent>
                              {airports.length === 0 ? (
                                <div className="p-2 text-sm text-muted-foreground">Chưa có dữ liệu</div>
                              ) : (
                                airports.map((airport) => (
                                  <SelectItem key={airport.airportId} value={airport.airportId.toString()}>
                                    {airport.name}
                                  </SelectItem>
                                ))
                              )}
                            </SelectContent>
                          </Select>
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
                              <SelectItem value="OPEN">OPEN</SelectItem>
                              <SelectItem value="CLOSED">CLOSED</SelectItem>
                              <SelectItem value="MAINTENANCE">MAINTENANCE</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="flex gap-2 pt-4">
                          <Button type="submit" disabled={loading}>
                            {loading ? "Saving..." : "Save"}
                          </Button>
                          <Button variant="outline" onClick={() => navigate("/gates")}>Cancel</Button>
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

export default GateFormPage;

