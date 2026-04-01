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
import { createCrew, getCrewById, updateCrew } from "@/service/CrewService";

const CrewFormPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  
  const [formData, setFormData] = useState({
    name: "",
    role: "PILOT",
    experienceYears: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) {
      getCrewById(Number(id)).then(res => {
        const c = res.data;
        setFormData({
          name: c.name || "",
          role: c.role || "PILOT",
          experienceYears: c.experienceYears || "",
        });
      }).catch(() => toast.error("Failed to fetch crew member"));
    }
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      name: formData.name,
      role: formData.role,
      experienceYears: Number(formData.experienceYears),
    };

    try {
      if (id) {
        await updateCrew(Number(id), payload);
        toast.success("Crew member updated successfully");
      } else {
        await createCrew(payload);
        toast.success("Crew member created successfully");
      }
      navigate("/crew");
    } catch {
      toast.error("Failed to save crew member");
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
                      <CardTitle>{id ? "Edit Crew Member" : "Add Crew Member"}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
                        <div>
                          <Label htmlFor="name">Name</Label>
                          <Input type="text" id="name" name="name" value={formData.name || ""} onChange={handleChange} required />
                        </div>
                        <div>
                          <Label htmlFor="experienceYears">Experience (Years)</Label>
                          <Input type="number" id="experienceYears" name="experienceYears" value={formData.experienceYears || ""} onChange={handleChange} required />
                        </div>
                        <div>
                          <Label htmlFor="role">Role</Label>
                          <select 
                            id="role" 
                            name="role" 
                            value={formData.role} 
                            onChange={handleChange} 
                            className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                          >
                            <option value="PILOT">PILOT</option>
                            <option value="FLIGHT_ATTENDANT">FLIGHT ATTENDANT</option>
                            <option value="GROUND_STAFF">GROUND STAFF</option>
                          </select>
                        </div>
                        <div className="flex gap-2 pt-4">
                          <Button type="submit" disabled={loading}>
                            {loading ? "Saving..." : "Save"}
                          </Button>
                          <Button variant="outline" onClick={() => navigate("/crew")}>Cancel</Button>
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

export default CrewFormPage;
