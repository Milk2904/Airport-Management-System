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
import { createTicket, getTicketById, updateTicket } from "@/service/TicketService";

// For dropdowns, ideally we load passengers, schedules, seats and employees. Let's use simple inputs for the IDs for brevity.
// In a production scenario, these would be robust async search selects.

const TicketFormPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  
  const [formData, setFormData] = useState({
    passengerId: "",
    scheduleId: "",
    seatId: "",
    employeeId: "",
    price: "",
    status: "CONFIRMED",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) {
      getTicketById(Number(id)).then(res => {
        const t = res.data;
        setFormData({
          passengerId: t.passenger?.passengerId || "",
          scheduleId: t.schedule?.scheduleId || "",
          seatId: t.seat?.seatId || "",
          employeeId: t.employee?.employeeId || "",
          price: t.price || "",
          status: t.status || "CONFIRMED",
        });
      }).catch(() => toast.error("Failed to fetch ticket"));
    }
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      passengerId: Number(formData.passengerId),
      scheduleId: Number(formData.scheduleId),
      seatId: Number(formData.seatId),
      employeeId: Number(formData.employeeId),
      price: Number(formData.price),
      status: formData.status,
    };

    try {
      if (id) {
        await updateTicket(Number(id), payload);
        toast.success("Ticket updated successfully");
      } else {
        await createTicket(payload);
        toast.success("Ticket created successfully");
      }
      navigate("/tickets");
    } catch {
      toast.error("Failed to save ticket");
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
                      <CardTitle>{id ? "Edit Ticket" : "Add Ticket"}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
                        <div>
                          <Label htmlFor="passengerId">Passenger ID</Label>
                          <Input type="number" id="passengerId" name="passengerId" value={formData.passengerId || ""} onChange={handleChange} required />
                        </div>
                        <div>
                          <Label htmlFor="scheduleId">Schedule ID</Label>
                          <Input type="number" id="scheduleId" name="scheduleId" value={formData.scheduleId || ""} onChange={handleChange} required />
                        </div>
                        <div>
                          <Label htmlFor="seatId">Seat ID</Label>
                          <Input type="number" id="seatId" name="seatId" value={formData.seatId || ""} onChange={handleChange} required />
                        </div>
                        <div>
                          <Label htmlFor="employeeId">Employee ID</Label>
                          <Input type="number" id="employeeId" name="employeeId" value={formData.employeeId || ""} onChange={handleChange} required />
                        </div>
                        <div>
                          <Label htmlFor="price">Price ($)</Label>
                          <Input type="number" step="0.01" id="price" name="price" value={formData.price || ""} onChange={handleChange} required />
                        </div>
                        <div>
                          <Label htmlFor="status">Status</Label>
                          <select 
                            id="status" 
                            name="status" 
                            value={formData.status} 
                            onChange={handleChange} 
                            className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                          >
                            <option value="CONFIRMED">CONFIRMED</option>
                            <option value="CANCELLED">CANCELLED</option>
                            <option value="PENDING">PENDING</option>
                          </select>
                        </div>
                        <div className="flex gap-2 pt-4">
                          <Button type="submit" disabled={loading}>
                            {loading ? "Saving..." : "Save"}
                          </Button>
                          <Button variant="outline" onClick={() => navigate("/tickets")}>Cancel</Button>
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

export default TicketFormPage;
