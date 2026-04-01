import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus } from "lucide-react";
import { getSeats, deleteSeat } from "@/service/SeatService";

interface Seat {
  seatId: number;
  seatNumber: string;
  seatClass: string;
  status: string;
  aircraft: { aircraftId: number; model: string };
}

const SeatPage = () => {
  const navigate = useNavigate();
  const [seats, setSeats] = useState<Seat[]>([]);

  const loadSeats = async () => {
    try {
      const res = await getSeats();
      setSeats(Array.isArray(res.data) ? res.data : []);
    } catch (error) {
      console.error("Failed to fetch seats", error);
    }
  };

  useEffect(() => {
    loadSeats();
  }, []);

  const handleEdit = (id: number) => {
    navigate(`/seats/form?id=${id}`);
  };

  const handleAdd = () => {
    navigate("/seats/form");
  };

  const handleDelete = async (id: number) => {
    if (confirm("Are you sure you want to delete this seat?")) {
      try {
        await deleteSeat(id);
        loadSeats();
      } catch (error) {
        console.error("Failed to delete seat", error);
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
                      <CardTitle>Seat List</CardTitle>
                      <Button onClick={handleAdd}>
                        <Plus className="mr-2 h-4 w-4" />
                        Add Seat
                      </Button>
                    </CardHeader>
                    <CardContent>
                      <table className="w-full text-left mt-4 border-collapse">
                        <thead>
                          <tr className="border-b">
                            <th className="p-2">Seat Number</th>
                            <th className="p-2">Aircraft</th>
                            <th className="p-2">Class</th>
                            <th className="p-2">Status</th>
                            <th className="p-2">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {seats.length === 0 ? (
                            <tr>
                              <td colSpan={5} className="p-2 text-center text-gray-500">
                                No seats found
                              </td>
                            </tr>
                          ) : (
                            seats.map((seat) => (
                              <tr key={seat.seatId} className="border-b">
                                <td className="p-2">{seat.seatNumber}</td>
                                <td className="p-2">{seat.aircraft?.model} (ID: {seat.aircraft?.aircraftId})</td>
                                <td className="p-2">{seat.seatClass}</td>
                                <td className="p-2">{seat.status}</td>
                                <td className="p-2">
                                  <Button variant="outline" size="sm" onClick={() => handleEdit(seat.seatId)}>
                                    Edit
                                  </Button>
                                  <Button
                                    className="ml-2"
                                    variant="destructive"
                                    size="sm"
                                    onClick={() => handleDelete(seat.seatId)}
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

export default SeatPage;
