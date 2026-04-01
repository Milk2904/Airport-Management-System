import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus } from "lucide-react";
import { getCrews, deleteCrew } from "@/service/CrewService";

interface Crew {
  crewId: number;
  name: string;
  role: string;
  experienceYears: number;
}

const CrewPage = () => {
  const navigate = useNavigate();
  const [crews, setCrews] = useState<Crew[]>([]);

  const loadCrews = async () => {
    try {
      const res = await getCrews();
      setCrews(Array.isArray(res.data) ? res.data : []);
    } catch (error) {
      console.error("Failed to fetch crew", error);
    }
  };

  useEffect(() => {
    loadCrews();
  }, []);

  const handleEdit = (id: number) => {
    navigate(`/crew/form?id=${id}`);
  };

  const handleAdd = () => {
    navigate("/crew/form");
  };

  const handleDelete = async (id: number) => {
    if (confirm("Are you sure you want to delete this crew member?")) {
      try {
        await deleteCrew(id);
        loadCrews();
      } catch (error) {
        console.error("Failed to delete crew member", error);
      }
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
                    <CardHeader className="flex flex-row items-center justify-between">
                      <CardTitle>Crew List</CardTitle>
                      <Button onClick={handleAdd}>
                        <Plus className="mr-2 h-4 w-4" />
                        Add Crew Member
                      </Button>
                    </CardHeader>
                    <CardContent>
                      <table className="w-full text-left mt-4 border-collapse">
                        <thead>
                          <tr className="border-b">
                            <th className="p-2">Name</th>
                            <th className="p-2">Role</th>
                            <th className="p-2">Experience (Years)</th>
                            <th className="p-2">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {crews.length === 0 ? (
                            <tr>
                              <td colSpan={4} className="p-2 text-center text-gray-500">
                                No crew members found
                              </td>
                            </tr>
                          ) : (
                            crews.map((c) => (
                              <tr key={c.crewId} className="border-b">
                                <td className="p-2">{c.name}</td>
                                <td className="p-2">{c.role}</td>
                                <td className="p-2">{c.experienceYears}</td>
                                <td className="p-2">
                                  <Button variant="outline" size="sm" onClick={() => handleEdit(c.crewId)}>
                                    Edit
                                  </Button>
                                  <Button
                                    className="ml-2"
                                    variant="destructive"
                                    size="sm"
                                    onClick={() => handleDelete(c.crewId)}
                                  >
                                    Delete
                                  </Button>
                                </td>
                              </tr>
                            ))
                          )}
                        </tbody>
                      </table>
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

export default CrewPage;
