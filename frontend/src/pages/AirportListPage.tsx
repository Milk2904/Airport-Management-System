import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { getAirports, deleteAirport } from "@/service/AirportService";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus } from "lucide-react";

const AirportListPage = () => {
  const navigate = useNavigate();
  const [airports, setAirports] = useState([]);

  const handleEdit = (id: number) => {
    navigate(`/airports/form?id=${id}`);
  };

  const handleAdd = () => {
    navigate("/airports/form");
  };

  const remove = async (id: number) => {
    await deleteAirport(id);
    const res = await getAirports();
    setAirports(res.data);
  };

  useEffect(() => {
    (async () => {
      const res = await getAirports();
      setAirports(res.data);
    })();
  }, []);

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
                      <CardTitle>Airport List</CardTitle>
                      <Button onClick={handleAdd}>
                        <Plus className="mr-2 h-4 w-4" />
                        Add Airport
                      </Button>
                    </CardHeader>
                    <CardContent>
                      <table className="w-full text-left mt-4">
                        <thead>
                          <tr className="border-b">
                            <th className="p-2">Code</th>
                            <th className="p-2">Name</th>
                            <th className="p-2">City</th>
                            <th className="p-2">Country</th>
                            <th className="p-2">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {airports.map((a: { airportId: number; code: string; name: string; city: string; country: string }) => (
                            <tr key={a.airportId} className="border-b">
                              <td className="p-2">{a.code}</td>
                              <td className="p-2">{a.name}</td>
                              <td className="p-2">{a.city}</td>
                              <td className="p-2">{a.country}</td>
                              <td className="p-2">
                                <Button variant="outline" onClick={() => handleEdit(a.airportId)}>Edit</Button>
                                <Button className="ml-2" variant="destructive" onClick={() => remove(a.airportId)}>
                                  Delete
                                </Button>
                              </td>
                            </tr>
                          ))}
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

export default AirportListPage;