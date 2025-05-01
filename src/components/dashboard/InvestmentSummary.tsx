
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, TrendingUp, Briefcase, Users } from "lucide-react";
import { userInvestments, mockProperties } from "@/data/mockData";

// Use the number of active projects for calculations
const numberOfPropertiesInProgress = userInvestments.activeProjects;

// Total sales price estimation of all properties
const totalSalesPriceEstimation = mockProperties.reduce(
  (total, property) => total + property.salesPriceEstimation,
  0
);

// Value estimation: total sales price estimation divided by number of active projects
const valueEstimation =
  numberOfPropertiesInProgress > 0
    ? totalSalesPriceEstimation / numberOfPropertiesInProgress
    : 0;

// Total purchase price + renovation cost from all properties
const totalInvestment = mockProperties.reduce(
  (total, property) => total + property.price + property.renovationCost,
  0
);

// Each investor has equal participation (4 investors)
const numberOfInvestors = 4;

// Individual investment amount
const myInvestment = 250000;

// Calculate ROI as (valueEstimation - myInvestment) / myInvestment * 100
const roi =
  myInvestment > 0 ? ((valueEstimation - myInvestment) / myInvestment) * 100 : 0;

const InvestmentSummary = () => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">My Investment</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">€{myInvestment.toLocaleString()}</div>
          <p className="text-xs text-muted-foreground">Initial investment</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Value estimation</CardTitle>
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            €{valueEstimation.toLocaleString(undefined, { maximumFractionDigits: 0 })}
          </div>
          <div className="text-xs mt-1 font-semibold" style={{ color: "#059669" }}>
            {roi >= 0 ? "+" : ""}
            {roi.toFixed(1)}% estimated ROI
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Investment</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">€{totalInvestment.toLocaleString()}</div>
          <p className="text-xs text-muted-foreground">
            Total purchase + renovation cost
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
          <Briefcase className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{userInvestments.activeProjects}</div>
          <p className="text-xs text-muted-foreground">
            {userInvestments.projectsInDevelopment} in development, {userInvestments.projectsCompleted} completed
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Investors</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{numberOfInvestors}</div>
          <p className="text-xs text-muted-foreground">€250,000 each</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default InvestmentSummary;
