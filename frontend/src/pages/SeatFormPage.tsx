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
import { createSeat, getSeatById, updateSeat } from "@/service/SeatService";
import { getAircrafts } from "@/service/AircraftService";

interface Aircraft {
  aircraftId: number;
  model: string;
}

const SeatFormPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  
  const [formData, setFormData] = useState({
    seatNumber: "",
    seatClass: "ECONOMY",
    status: "AVAILABLE",
    aircraftId: "",
  });
  const [aircrafts, setAircrafts] = useState<Aircraft[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadAircrafts = async () => {
      try {
        const res = await getAircrafts();
        const data = res.data?.result ?? res.data;
        setAircrafts(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Failed to load aircrafts:", error);
      }
    };
    loadAircrafts();
  }, []);

  useEffect(() => {
    if (id) {
      getSeatById(Number(id)).then(res => {
        const data = res.data?.result ?? res.data;
        setFormData({
          seatNumber: data.seatNumber || "",
          seatClass: data.seatClass || "ECONOMY",
          status: data.status || "AVAILABLE",
          aircraftId: data.aircraft?.aircraftId?.toString() || data.aircraftId?.toString() || "",
        });
      }).catch(() => toast.error("Failed to fetch seat"));
    }
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      seatNumber: formData.seatNumber,
      seatClass: formData.seatClass,
      status: formData.status,
      aircraftId: Number(formData.aircraftId),
    };

    try {
      if (id) {
        await updateSeat(Number(id), payload);
        toast.success("Seat updated successfully");
      } else {
        await createSeat(payload);
        toast.success("Seat created successfully");
      }
      navigate("/seats");
    } catch {
      toast.error("Failed to save seat");
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
                      <CardTitle>{id ? "Edit Seat" : "Add Seat"}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
                        <div>
                          <Label htmlFor="seatNumber">Seat Number</Label>
                          <Input type="text" id="seatNumber" name="seatNumber" value={formData.seatNumber || ""} onChange={handleChange} required />
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
                                aircrafts.map((aircraft) => (
                                  <SelectItem key={aircraft.aircraftId} value={aircraft.aircraftId.toString()}>
                                    {aircraft.model} (ID: {aircraft.aircraftId})
                                  </SelectItem>
                                ))
                              )}
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="seatClass">Seat Class</Label>
                          <Select 
                            value={formData.seatClass}
                            onValueChange={(val) => handleSelectChange("seatClass", val)}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select class" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="ECONOMY">ECONOMY</SelectItem>
                              <SelectItem value="BUSINESS">BUSINESS</SelectItem>
                              <SelectItem value="FIRST_CLASS">FIRST_CLASS</SelectItem>
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
                              <SelectItem value="AVAILABLE">AVAILABLE</SelectItem>
                              <SelectItem value="BOOKED">BOOKED</SelectItem>
                              <SelectItem value="MAINTENANCE">MAINTENANCE</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="flex gap-2 pt-4">
                          <Button type="submit" disabled={loading}>
                            {loading ? "Saving..." : "Save"}
                          </Button>
                          <Button variant="outline" onClick={() => navigate("/seats")}>Cancel</Button>
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

export default SeatFormPage;

