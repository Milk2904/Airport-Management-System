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
import { createTicket, getTicketById, updateTicket } from "@/service/TicketService";
import { getPassengers } from "@/service/PassengerService";
import { getFlightSchedules } from "@/service/FlightScheduleService";
import { getSeats } from "@/service/SeatService";
import { getEmployees } from "@/service/EmployeeService";

interface Passenger {
  passengerId: number;
  fullName: string;
}

interface FlightSchedule {
  scheduleId: number;
  flight?: {
    flightNumber?: string;
  };
  departureTime?: string;
}

interface Seat {
  seatId: number;
  seatNumber: string;
  aircraft?: {
    model?: string;
  };
}

interface Employee {
  employeeId: number;
  name: string;
}

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
  
  const [passengers, setPassengers] = useState<Passenger[]>([]);
  const [schedules, setSchedules] = useState<FlightSchedule[]>([]);
  const [seats, setSeats] = useState<Seat[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [passengersRes, schedulesRes, seatsRes, employeesRes] = await Promise.all([
          getPassengers(),
          getFlightSchedules(),
          getSeats(),
          getEmployees()
        ]);
        
        const pData = passengersRes.data?.result ?? passengersRes.data;
        const schData = schedulesRes.data?.result ?? schedulesRes.data;
        const sData = seatsRes.data?.result ?? seatsRes.data;
        const eData = employeesRes.data?.result ?? employeesRes.data;

        setPassengers(Array.isArray(pData) ? pData : []);
        setSchedules(Array.isArray(schData) ? schData : []);
        setSeats(Array.isArray(sData) ? sData : []);
        setEmployees(Array.isArray(eData) ? eData : []);
      } catch (error) {
        console.error("Failed to load dependency data:", error);
      }
    };
    loadData();
  }, []);

  useEffect(() => {
    if (id) {
      getTicketById(Number(id)).then(res => {
        const data = res.data?.result ?? res.data;
        setFormData({
          passengerId: data.passenger?.passengerId?.toString() || "",
          scheduleId: data.schedule?.scheduleId?.toString() || "",
          seatId: data.seat?.seatId?.toString() || "",
          employeeId: data.employee?.employeeId?.toString() || "",
          price: data.price?.toString() || "",
          status: data.status || "CONFIRMED",
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
                      <CardTitle>{id ? "Edit Ticket" : "Add Ticket"}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
                        <div>
                          <Label htmlFor="passengerId">Passenger</Label>
                          <Select 
                            value={formData.passengerId}
                            onValueChange={(val) => handleSelectChange("passengerId", val)}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select passenger" />
                            </SelectTrigger>
                            <SelectContent>
                              {passengers.length === 0 ? (
                                <div className="p-2 text-sm text-muted-foreground">Chưa có dữ liệu</div>
                              ) : (
                                passengers.map((p) => (
                                  <SelectItem key={p.passengerId} value={p.passengerId.toString()}>
                                    {p.fullName} (ID: {p.passengerId})
                                  </SelectItem>
                                ))
                              )}
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="scheduleId">Flight Schedule</Label>
                          <Select 
                            value={formData.scheduleId}
                            onValueChange={(val) => handleSelectChange("scheduleId", val)}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select schedule" />
                            </SelectTrigger>
                            <SelectContent>
                              {schedules.length === 0 ? (
                                <div className="p-2 text-sm text-muted-foreground">Chưa có dữ liệu</div>
                              ) : (
                                schedules.map((s) => (
                                  <SelectItem key={s.scheduleId} value={s.scheduleId.toString()}>
                                    {s.flight?.flightNumber || "Flight"} - {s.departureTime ? new Date(s.departureTime).toLocaleString() : "Date TBD"}
                                  </SelectItem>
                                ))
                              )}
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="seatId">Seat</Label>
                          <Select 
                            value={formData.seatId}
                            onValueChange={(val) => handleSelectChange("seatId", val)}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select seat" />
                            </SelectTrigger>
                            <SelectContent>
                              {seats.length === 0 ? (
                                <div className="p-2 text-sm text-muted-foreground">Chưa có dữ liệu</div>
                              ) : (
                                seats.map((s) => (
                                  <SelectItem key={s.seatId} value={s.seatId.toString()}>
                                    {s.seatNumber} ({s.aircraft?.model || "Aircraft"})
                                  </SelectItem>
                                ))
                              )}
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="employeeId">Staff Member</Label>
                          <Select 
                            value={formData.employeeId}
                            onValueChange={(val) => handleSelectChange("employeeId", val)}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select staff" />
                            </SelectTrigger>
                            <SelectContent>
                              {employees.length === 0 ? (
                                <div className="p-2 text-sm text-muted-foreground">Chưa có dữ liệu</div>
                              ) : (
                                employees.map((e) => (
                                  <SelectItem key={e.employeeId} value={e.employeeId.toString()}>
                                    {e.name}
                                  </SelectItem>
                                ))
                              )}
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="price">Price ($)</Label>
                          <Input type="number" step="0.01" id="price" name="price" value={formData.price || ""} onChange={handleChange} required />
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
                              <SelectItem value="CONFIRMED">CONFIRMED</SelectItem>
                              <SelectItem value="CANCELLED">CANCELLED</SelectItem>
                              <SelectItem value="PENDING">PENDING</SelectItem>
                            </SelectContent>
                          </Select>
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

