import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus } from "lucide-react";
import { getBaggages, deleteBaggage } from "@/service/BaggageService";

interface Baggage {
  baggageId: number;
  weight: number;
  type: string;
  status: string;
  ticket: { ticketId: number; passenger: { name: string } };
}

const BaggagePage = () => {
  const navigate = useNavigate();
  const [baggages, setBaggages] = useState<Baggage[]>([]);

  const loadBaggages = async () => {
    try {
      const res = await getBaggages();
      setBaggages(Array.isArray(res.data) ? res.data : []);
    } catch (error) {
      console.error("Failed to fetch baggages", error);
    }
  };

  useEffect(() => {
    loadBaggages();
  }, []);

  const handleEdit = (id: number) => {
    navigate(`/baggage/form?id=${id}`);
  };

  const handleAdd = () => {
    navigate("/baggage/form");
  };

  const handleDelete = async (id: number) => {
    if (confirm("Are you sure you want to delete this baggage?")) {
      try {
        await deleteBaggage(id);
        loadBaggages();
      } catch (error) {
        console.error("Failed to delete baggage", error);
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
                      <CardTitle>Baggage List</CardTitle>
                      <Button onClick={handleAdd}>
                        <Plus className="mr-2 h-4 w-4" />
                        Add Baggage
                      </Button>
                    </CardHeader>
                    <CardContent>
                      <table className="w-full text-left mt-4 border-collapse">
                        <thead>
                          <tr className="border-b">
                            <th className="p-2">Ticket ID</th>
                            <th className="p-2">Passenger</th>
                            <th className="p-2">Weight (kg)</th>
                            <th className="p-2">Type</th>
                            <th className="p-2">Status</th>
                            <th className="p-2">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {baggages.length === 0 ? (
                            <tr>
                              <td colSpan={6} className="p-2 text-center text-gray-500">
                                No baggages found
                              </td>
                            </tr>
                          ) : (
                            baggages.map((b) => (
                              <tr key={b.baggageId} className="border-b">
                                <td className="p-2">{b.ticket?.ticketId}</td>
                                <td className="p-2">{b.ticket?.passenger?.name}</td>
                                <td className="p-2">{b.weight}</td>
                                <td className="p-2">{b.type}</td>
                                <td className="p-2">{b.status}</td>
                                <td className="p-2">
                                  <Button variant="outline" size="sm" onClick={() => handleEdit(b.baggageId)}>
                                    Edit
                                  </Button>
                                  <Button
                                    className="ml-2"
                                    variant="destructive"
                                    size="sm"
                                    onClick={() => handleDelete(b.baggageId)}
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

export default BaggagePage;
