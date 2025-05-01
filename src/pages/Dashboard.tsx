
import Navbar from "@/components/layout/Navbar";
import InvestmentSummary from "@/components/dashboard/InvestmentSummary";
import PropertyList from "@/components/dashboard/PropertyList";
import MyDocumentation from "@/components/dashboard/MyDocumentation";

const Dashboard = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="container py-8">
        <h1 className="text-3xl font-bold mb-8">Investment Dashboard</h1>
        <div className="space-y-8">
          <InvestmentSummary />
          <PropertyList />
          <MyDocumentation />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
