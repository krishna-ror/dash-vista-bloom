import { useApp } from "@/contexts/AppContext";
import FinanceDashboard from "@/components/FinanceDashboard";
import HRDashboard from "@/components/HRDashboard";
import ManagementDashboard from "@/components/ManagementDashboard";

const Dashboard = () => {
  const { role } = useApp();

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto">
      {role === "finance" && <FinanceDashboard />}
      {role === "hr" && <HRDashboard />}
      {role === "management" && <ManagementDashboard />}
    </div>
  );
};

export default Dashboard;
