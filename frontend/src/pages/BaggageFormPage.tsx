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
import { createBaggage, getBaggageById, updateBaggage } from "@/service/BaggageService";
import { getTickets } from "@/service/TicketService";

interface Ticket {
  ticketId: number;
  passenger?: {
    employeeName?: string;
    username?: string;
    name?: string;
  };
  schedule?: {
    flight?: {
      flightNumber?: string;
    };
  };
}

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
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadTickets = async () => {
      try {
        const res = await getTickets();
        const data = res.data?.result ?? res.data;
        setTickets(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Failed to load tickets:", error);
      }
    };
    loadTickets();
  }, []);

  useEffect(() => {
    if (id) {
      getBaggageById(Number(id)).then(res => {
        const data = res.data?.result ?? res.data;
        setFormData({
          ticket: { ticketId: data.ticket?.ticketId?.toString() || "" },
          weight: data.weight?.toString() || "",
          type: data.type || "CHECKED",
          status: data.status || "CHECKED_IN",
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
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
                          <Label htmlFor="ticket">Ticket</Label>
                          <Select 
                            value={formData.ticket.ticketId}
                            onValueChange={(val) => handleSelectChange("ticketId", val)}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select ticket" />
                            </SelectTrigger>
                            <SelectContent>
                              {tickets.length === 0 ? (
                                <div className="p-2 text-sm text-muted-foreground">Chưa có dữ liệu</div>
                              ) : (
                                tickets.map((t) => (
                                  <SelectItem key={t.ticketId} value={t.ticketId.toString()}>
                                    Ticket #{t.ticketId} - {t.schedule?.flight?.flightNumber || "Flight info missing"}
                                  </SelectItem>
                                ))
                              )}
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="weight">Weight (kg)</Label>
                          <Input type="number" step="0.1" id="weight" name="weight" value={formData.weight || ""} onChange={handleChange} required />
                        </div>
                        <div>
                          <Label htmlFor="type">Type</Label>
                          <Select 
                            value={formData.type}
                            onValueChange={(val) => handleSelectChange("type", val)}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="CARRY_ON">CARRY ON</SelectItem>
                              <SelectItem value="CHECKED">CHECKED</SelectItem>
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
                              <SelectItem value="CHECKED_IN">CHECKED_IN</SelectItem>
                              <SelectItem value="LOADED">LOADED</SelectItem>
                              <SelectItem value="CLAIMED">CLAIMED</SelectItem>
                              <SelectItem value="LOST">LOST</SelectItem>
                            </SelectContent>
                          </Select>
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

