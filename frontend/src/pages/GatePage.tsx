import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus } from "lucide-react";
import { getGates, deleteGate } from "@/service/GateService";

interface Gate {
  gateId: number;
  gateCode: string;
  terminal: string;
  status: string;
  airport: { airportId: number; name: string };
}

const GatePage = () => {
  const navigate = useNavigate();
  const [gates, setGates] = useState<Gate[]>([]);

  const loadGates = async () => {
    try {
      const res = await getGates();
      setGates(Array.isArray(res.data) ? res.data : []);
    } catch (error) {
      console.error("Failed to fetch gates", error);
    }
  };

  useEffect(() => {
    loadGates();
  }, []);

  const handleEdit = (id: number) => {
    navigate(`/gates/form?id=${id}`);
  };

  const handleAdd = () => {
    navigate("/gates/form");
  };

  const handleDelete = async (id: number) => {
    if (confirm("Are you sure you want to delete this gate?")) {
      try {
        await deleteGate(id);
        loadGates();
      } catch (error) {
        console.error("Failed to delete gate", error);
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
                      <CardTitle>Gate List</CardTitle>
                      <Button onClick={handleAdd}>
                        <Plus className="mr-2 h-4 w-4" />
                        Add Gate
                      </Button>
                    </CardHeader>
                    <CardContent>
                      <table className="w-full text-left mt-4 border-collapse">
                        <thead>
                          <tr className="border-b">
                            <th className="p-2">Gate Code</th>
                            <th className="p-2">Terminal</th>
                            <th className="p-2">Airport</th>
                            <th className="p-2">Status</th>
                            <th className="p-2">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {gates.length === 0 ? (
                            <tr>
                              <td colSpan={5} className="p-2 text-center text-gray-500">
                                No gates found
                              </td>
                            </tr>
                          ) : (
                            gates.map((g) => (
                              <tr key={g.gateId} className="border-b">
                                <td className="p-2">{g.gateCode}</td>
                                <td className="p-2">{g.terminal}</td>
                                <td className="p-2">{g.airport?.name} (ID: {g.airport?.airportId})</td>
                                <td className="p-2">{g.status}</td>
                                <td className="p-2">
                                  <Button variant="outline" size="sm" onClick={() => handleEdit(g.gateId)}>
                                    Edit
                                  </Button>
                                  <Button
                                    className="ml-2"
                                    variant="destructive"
                                    size="sm"
                                    onClick={() => handleDelete(g.gateId)}
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

export default GatePage;
