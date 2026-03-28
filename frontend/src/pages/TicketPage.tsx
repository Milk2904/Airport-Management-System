import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus } from "lucide-react";

interface Ticket {
  id: number;
  ticketNumber: string;
  seatNumber: string;
  flightNumber: string;
  passengerName: string;
}

const TicketPage = () => {
  const navigate = useNavigate();
  const [tickets] = useState<Ticket[]>([]);

  // TODO: Load tickets when API is ready
  useEffect(() => {
    // const loadTickets = async () => {
    //   const res = await getTickets();
    //   setTickets(res.data);
    // };
    // loadTickets();
  }, []);

  const handleEdit = (id: number) => {
    navigate(`/tickets/form?id=${id}`);
  };

  const handleAdd = () => {
    navigate("/tickets/form");
  };

  const handleDelete = (id: number) => {
    // TODO: Implement delete when API is ready
    console.log("Delete ticket:", id);
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
                      <CardTitle>Ticket List</CardTitle>
                      <Button onClick={handleAdd}>
                        <Plus className="mr-2 h-4 w-4" />
                        Add Ticket
                      </Button>
                    </CardHeader>
                    <CardContent>
                      <table className="w-full text-left mt-4">
                        <thead>
                          <tr className="border-b">
                            <th className="p-2">Ticket Number</th>
                            <th className="p-2">Seat</th>
                            <th className="p-2">Flight</th>
                            <th className="p-2">Passenger</th>
                            <th className="p-2">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {tickets.length === 0 ? (
                            <tr>
                              <td colSpan={5} className="p-2 text-center text-gray-500">
                                No tickets found
                              </td>
                            </tr>
                          ) : (
                            tickets.map((t) => {
                              const ticket = t as { id: number; ticketNumber: string; seatNumber: string; flightNumber: string; passengerName: string };
                              return (
                                <tr key={ticket.id} className="border-b">
                                  <td className="p-2">{ticket.ticketNumber}</td>
                                  <td className="p-2">{ticket.seatNumber}</td>
                                  <td className="p-2">{ticket.flightNumber}</td>
                                  <td className="p-2">{ticket.passengerName}</td>
                                  <td className="p-2">
                                    <Button variant="outline" onClick={() => handleEdit(ticket.id)}>
                                      Edit
                                    </Button>
                                    <Button
                                      className="ml-2"
                                      variant="destructive"
                                      onClick={() => handleDelete(ticket.id)}
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

export default TicketPage;
