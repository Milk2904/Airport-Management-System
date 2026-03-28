import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { getEmployees, deleteEmployee } from "@/service/EmployeeService";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus } from "lucide-react";

const EmployeePage = () => {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState([]);

  const handleEdit = (id: number) => {
    navigate(`/employees/form?id=${id}`);
  };

  const handleAdd = () => {
    navigate("/employees/form");
  };

  const remove = async (id: number) => {
    await deleteEmployee(id);
    const res = await getEmployees();
    setEmployees(res.data);
  };

  useEffect(() => {
    (async () => {
      const res = await getEmployees();
      setEmployees(res.data);
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
                      <CardTitle>Employee List</CardTitle>
                      <Button onClick={handleAdd}>
                        <Plus className="mr-2 h-4 w-4" />
                        Add Employee
                      </Button>
                    </CardHeader>
                    <CardContent>
                      <table className="w-full text-left mt-4">
                        <thead>
                          <tr className="border-b">
                            <th className="p-2">Name</th>
                            <th className="p-2">Email</th>
                            <th className="p-2">Phone</th>
                            <th className="p-2">Airport</th>
                            <th className="p-2">Role</th>
                            <th className="p-2">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {employees.map((e: {
                            employeeId: number;
                            name: string;
                            email: string;
                            phone: string;
                            airport: { name: string };
                            role: { roleName: string };
                          }) => (
                            <tr key={e.employeeId} className="border-b">
                              <td className="p-2">{e.name}</td>
                              <td className="p-2">{e.email}</td>
                              <td className="p-2">{e.phone}</td>
                              <td className="p-2">{e.airport?.name}</td>
                              <td className="p-2">{e.role?.roleName}</td>
                              <td className="p-2">
                                <Button variant="outline" onClick={() => handleEdit(e.employeeId)}>Edit</Button>
                                <Button className="ml-2" variant="destructive" onClick={() => remove(e.employeeId)}>
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

export default EmployeePage;
