import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { getEmployeeById, createEmployee, updateEmployee } from "@/service/EmployeeService";
import { getAirports } from "@/service/AirportService";
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

const EmployeeFormPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    airport: { airportId: "" },
    role: { roleId: "" },
  });
  const [airports, setAirports] = useState<Airport[]>([]);
  const [loading, setLoading] = useState(false);

  const roles = ["ADMIN", "STAFF", "MANAGER"];

  useEffect(() => {
    (async () => {
      const res = await getAirports();
      setAirports(res.data);
    })();
  }, []);

  useEffect(() => {
    if (id) {
      (async () => {
        try {
          const res = await getEmployeeById(parseInt(id));
          setFormData(res.data);
        } catch {
          toast.error("Failed to load employee");
          navigate("/employees");
        }
      })();
    }
  }, [id, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      airportId: formData.airport?.airportId ? Number(formData.airport.airportId) : null,
      roleId: formData.role?.roleId ? Number(formData.role.roleId) : null,
      status: "ACTIVE" // Assuming a default if not in form
    };

    try {
      if (id) {
        await updateEmployee(parseInt(id), payload);
        toast.success("Employee updated successfully");
      } else {
        await createEmployee(payload);
        toast.success("Employee created successfully");
      }
      navigate("/employees");
    } catch {
      toast.error("Failed to save employee");
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

  const handleAirportChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      airport: { airportId: value }
    }));
  };

  const handleRoleChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      role: { roleId: value }
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
                      <CardTitle>{id ? "Edit Employee" : "Add Employee"}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
                        <div>
                          <Label htmlFor="name">Name</Label>
                          <Input
                            id="name"
                            name="name"
                            value={formData.name || ""}
                            onChange={handleChange}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email || ""}
                            onChange={handleChange}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="phone">Phone</Label>
                          <Input
                            id="phone"
                            name="phone"
                            value={formData.phone || ""}
                            onChange={handleChange}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="airport">Airport</Label>
                          <Select 
                            value={formData.airport?.airportId?.toString() || ""}
                            onValueChange={handleAirportChange}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select airport" />
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
                          <Label htmlFor="role">Role</Label>
                          <Select 
                            value={formData.role?.roleId?.toString() || ""}
                            onValueChange={handleRoleChange}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select role" />
                            </SelectTrigger>
                            <SelectContent>
                              {roles.map((role) => (
                                <SelectItem key={role} value={role}>
                                  {role}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="flex gap-2 pt-4">
                          <Button type="submit" disabled={loading}>
                            {loading ? "Saving..." : "Save"}
                          </Button>
                          <Button variant="outline" onClick={() => navigate("/employees")}>
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

export default EmployeeFormPage;
