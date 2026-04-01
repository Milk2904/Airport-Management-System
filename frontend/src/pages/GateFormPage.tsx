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
import { createGate, getGateById, updateGate } from "@/service/GateService";

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
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) {
      getGateById(Number(id)).then(res => {
        const g = res.data;
        setFormData({
          gateCode: g.gateCode || "",
          terminal: g.terminal || "",
          status: g.status || "OPEN",
          airportId: g.airport?.airportId || "",
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
                          <Label htmlFor="airportId">Airport ID</Label>
                          <Input type="number" id="airportId" name="airportId" value={formData.airportId || ""} onChange={handleChange} required />
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
                            <option value="OPEN">OPEN</option>
                            <option value="CLOSED">CLOSED</option>
                            <option value="MAINTENANCE">MAINTENANCE</option>
                          </select>
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
