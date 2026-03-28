import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { getAirlines, deleteAirline } from "@/service/AirlineService";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus } from "lucide-react";

const AirLinePage = () => {
  const navigate = useNavigate();
  const [airlines, setAirlines] = useState([]);

  const handleEdit = (id: number) => {
    navigate(`/airlines/form?id=${id}`);
  };

  const handleAdd = () => {
    navigate("/airlines/form");
  };

  const remove = async (id: number) => {
    await deleteAirline(id);
    const res = await getAirlines();
    setAirlines(res.data);
  };

  useEffect(() => {
    (async () => {
      const res = await getAirlines();
      setAirlines(res.data);
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
                      <CardTitle>Airline List</CardTitle>
                      <Button onClick={handleAdd}>
                        <Plus className="mr-2 h-4 w-4" />
                        Add Airline
                      </Button>
                    </CardHeader>
                    <CardContent>
                      <table className="w-full text-left mt-4">
                        <thead>
                          <tr className="border-b">
                            <th className="p-2">Airline Name</th>
                            <th className="p-2">Country</th>
                            <th className="p-2">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {airlines.map((a: {
                            airlineId: number;
                            airlineName: string;
                            country: string;
                          }) => (
                            <tr key={a.airlineId} className="border-b">
                              <td className="p-2">{a.airlineName}</td>
                              <td className="p-2">{a.country}</td>
                              <td className="p-2">
                                <Button variant="outline" onClick={() => handleEdit(a.airlineId)}>Edit</Button>
                                <Button className="ml-2" variant="destructive" onClick={() => remove(a.airlineId)}>
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

export default AirLinePage;
