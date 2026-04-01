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
import { createBaggage, getBaggageById, updateBaggage } from "@/service/BaggageService";

const BaggageFormPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  
  const [formData, setFormData] = useState({
    ticket: { ticketId: "" },
    weight: "",
    type: "CHECKED",
    status: "CHECKED_IN",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) {
      getBaggageById(Number(id)).then(res => {
        const t = res.data;
        setFormData({
          ticket: { ticketId: t.ticket?.ticketId || "" },
          weight: t.weight || "",
          type: t.type || "CHECKED",
          status: t.status || "CHECKED_IN",
        });
      }).catch(() => toast.error("Failed to fetch baggage"));
    }
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      ticket: { ticketId: Number(formData.ticket.ticketId) },
      weight: Number(formData.weight),
      type: formData.type,
      status: formData.status,
    };

    try {
      if (id) {
        await updateBaggage(Number(id), payload);
        toast.success("Baggage updated successfully");
      } else {
        await createBaggage(payload);
        toast.success("Baggage created successfully");
      }
      navigate("/baggage");
    } catch {
      toast.error("Failed to save baggage");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === "ticketId") {
      setFormData(prev => ({ ...prev, ticket: { ticketId: value } }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
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
                    <CardHeader>
                      <CardTitle>{id ? "Edit Baggage" : "Add Baggage"}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
                        <div>
                          <Label htmlFor="ticketId">Ticket ID</Label>
                          <Input type="number" id="ticketId" name="ticketId" value={formData.ticket.ticketId || ""} onChange={handleChange} required />
                        </div>
                        <div>
                          <Label htmlFor="weight">Weight (kg)</Label>
                          <Input type="number" step="0.1" id="weight" name="weight" value={formData.weight || ""} onChange={handleChange} required />
                        </div>
                        <div>
                          <Label htmlFor="type">Type</Label>
                          <select 
                            id="type" 
                            name="type" 
                            value={formData.type} 
                            onChange={handleChange} 
                            className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                          >
                            <option value="CARRY_ON">CARRY ON</option>
                            <option value="CHECKED">CHECKED</option>
                          </select>
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
                            <option value="CHECKED_IN">CHECKED_IN</option>
                            <option value="LOADED">LOADED</option>
                            <option value="CLAIMED">CLAIMED</option>
                            <option value="LOST">LOST</option>
                          </select>
                        </div>
                        <div className="flex gap-2 pt-4">
                          <Button type="submit" disabled={loading}>
                            {loading ? "Saving..." : "Save"}
                          </Button>
                          <Button variant="outline" onClick={() => navigate("/baggage")}>Cancel</Button>
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

export default BaggageFormPage;
