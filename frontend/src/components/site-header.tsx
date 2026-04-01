import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { useLocation, useNavigate } from "react-router";
import { LogOutIcon } from "lucide-react";
import { toast } from "sonner";

export function SiteHeader() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
    toast.success("Logged out successfully");
    navigate("/");
  };

  const getPageTitle = (pathname: string) => {
    switch (pathname) {
      case "/":
        return "Login";
      case "/dashboard":
        return "Dashboard";
      case "/flights":
        return "Flights";
      case "/passengers":
        return "Passengers";
      case "/aircraft":
        return "Aircraft";
      case "/airlines":
        return "Airlines";
      case "/employees":
        return "Employees";
      case "/airports":
        return "Airports";
      case "/analytics":
        return "Analytics";
      case "/reports":
        return "Incident Reports";
      case "/manuals":
        return "Operation Manuals";
      case "/documents":
        return "Documents Center";
      case "/settings":
        return "Settings";
      case "/help":
        return "Help";
      case "/search":
        return "Search";
      default:
        return "Documents";
    }
  };

  const isLoggedIn = Boolean(
    localStorage.getItem("accessToken") || localStorage.getItem("token")
  );

  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center justify-between gap-1 px-4 lg:gap-2 lg:px-6">
        <div className="flex items-center gap-1">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mx-2 data-[orientation=vertical]:h-4"
          />
          <h1 className="text-base font-medium">{getPageTitle(location.pathname)}</h1>
        </div>
        {isLoggedIn && (
          <Button
            variant="outline"
            size="sm"
            onClick={handleLogout}
            className="hidden md:inline-flex"
          >
            <LogOutIcon className="mr-2 h-4 w-4" />
            Logout
          </Button>
        )}
      </div>
    </header>
  );
}
