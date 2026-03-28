import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus } from "lucide-react";

interface Seat {
  id: number;
  seatNumber: string;
  seatClass: string;
  aircraft: string;
  isAvailable: boolean;
}

const SeatPage = () => {
  const navigate = useNavigate();
  const [seats] = useState<Seat[]>([]);

  // TODO: Load seats when API is ready
  useEffect(() => {
    // const loadSeats = async () => {
    //   const res = await getSeats();
    //   setSeats(res.data);
    // };
    // loadSeats();
  }, []);

  const handleEdit = (id: number) => {
    navigate(`/seats/form?id=${id}`);
  };

  const handleAdd = () => {
    navigate("/seats/form");
  };

  const handleDelete = (id: number) => {
    // TODO: Implement delete when API is ready
    console.log("Delete seat:", id);
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
                      <table className="w-full text-left mt-4">
                        <thead>
                          <tr className="border-b">
                            <th className="p-2">Seat Number</th>
                            <th className="p-2">Class</th>
                            <th className="p-2">Aircraft</th>
                            <th className="p-2">Available</th>
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
                            seats.map((s) => {
                              const seat = s as { id: number; seatNumber: string; seatClass: string; aircraft: string; isAvailable: boolean };
                              return (
                                <tr key={seat.id} className="border-b">
                                  <td className="p-2">{seat.seatNumber}</td>
                                  <td className="p-2">{seat.seatClass}</td>
                                  <td className="p-2">{seat.aircraft}</td>
                                  <td className="p-2">{seat.isAvailable ? "Yes" : "No"}</td>
                                  <td className="p-2">
                                    <Button variant="outline" onClick={() => handleEdit(seat.id)}>
                                      Edit
                                    </Button>
                                    <Button
                                      className="ml-2"
                                      variant="destructive"
                                      onClick={() => handleDelete(seat.id)}
                                    >
                                      Delete
                                    </Button>
                                  </td>
                                </tr>
                              );
                            })
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
