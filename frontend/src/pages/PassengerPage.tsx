import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { getPassengers, deletePassenger } from "@/service/PassengerService";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus } from "lucide-react";

const PassengerPage = () => {
  const navigate = useNavigate();
  const [passengers, setPassengers] = useState<{
    passengerId: number;
    fullName: string;
    email: string;
    phone: string;
    passportNumber: string;
  }[]>([]);

  const handleEdit = (id: number) => {
    navigate(`/passengers/form?id=${id}`);
  };

  const handleAdd = () => {
    navigate("/passengers/form");
  };

  const remove = async (id: number) => {
    try {
      await deletePassenger(id);
      const res = await getPassengers();
      setPassengers(Array.isArray(res.data) ? res.data : []);
    } catch (error) {
      console.error("Failed to delete passenger", error);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const res = await getPassengers();
        setPassengers(Array.isArray(res.data) ? res.data : []);
      } catch (error) {
        console.error("Failed to fetch passengers", error);
      }
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
                      <CardTitle>Passenger List</CardTitle>
                      <Button onClick={handleAdd}>
                        <Plus className="mr-2 h-4 w-4" />
                        Add Passenger
                      </Button>
                    </CardHeader>
                    <CardContent>
                      <table className="w-full text-left mt-4">
                        <thead>
                          <tr className="border-b">
                            <th className="p-2">Full Name</th>
                            <th className="p-2">Email</th>
                            <th className="p-2">Phone</th>
                            <th className="p-2">Passport Number</th>
                            <th className="p-2">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {passengers.map((p: {
                            passengerId: number;
                            fullName: string;
                            email: string;
                            phone: string;
                            passportNumber: string;
                          }) => (
                            <tr key={p.passengerId} className="border-b">
                              <td className="p-2">{p.fullName}</td>
                              <td className="p-2">{p.email}</td>
                              <td className="p-2">{p.phone}</td>
                              <td className="p-2">{p.passportNumber}</td>
                              <td className="p-2">
                                <Button variant="outline" onClick={() => handleEdit(p.passengerId)}>Edit</Button>
                                <Button className="ml-2" variant="destructive" onClick={() => remove(p.passengerId)}>
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

export default PassengerPage;