import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { getAircrafts, deleteAircraft } from "@/service/AircraftService";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus } from "lucide-react";

const AirCraftPage = () => {
  const navigate = useNavigate();
  const [aircrafts, setAircrafts] = useState([]);

  const handleEdit = (id: number) => {
    navigate(`/aircraft/form?id=${id}`);
  };

  const handleAdd = () => {
    navigate("/aircraft/form");
  };

  const remove = async (id: number) => {
    await deleteAircraft(id);
    const res = await getAircrafts();
    setAircrafts(res.data);
  };

  useEffect(() => {
    (async () => {
      const res = await getAircrafts();
      setAircrafts(res.data);
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
                      <CardTitle>Aircraft List</CardTitle>
                      <Button onClick={handleAdd}>
                        <Plus className="mr-2 h-4 w-4" />
                        Add Aircraft
                      </Button>
                    </CardHeader>
                    <CardContent>
                      <table className="w-full text-left mt-4">
                        <thead>
                          <tr className="border-b">
                            <th className="p-2">Model</th>
                            <th className="p-2">Airline</th>
                            <th className="p-2">Capacity</th>
                            <th className="p-2">Manufacture Year</th>
                            <th className="p-2">Status</th>
                            <th className="p-2">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {aircrafts.map((a: {
                            aircraftId: number;
                            model: string;
                            airline: { name: string };
                            capacity: number;
                            manufactureYear: number;
                            status: string;
                          }) => (
                            <tr key={a.aircraftId} className="border-b">
                              <td className="p-2">{a.model}</td>
                              <td className="p-2">{a.airline?.name}</td>
                              <td className="p-2">{a.capacity}</td>
                              <td className="p-2">{a.manufactureYear}</td>
                              <td className="p-2">{a.status}</td>
                              <td className="p-2">
                                <Button variant="outline" onClick={() => handleEdit(a.aircraftId)}>Edit</Button>
                                <Button className="ml-2" variant="destructive" onClick={() => remove(a.aircraftId)}>
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

export default AirCraftPage;
