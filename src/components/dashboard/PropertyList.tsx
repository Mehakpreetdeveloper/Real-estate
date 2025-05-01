
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Building, MapPin, Calendar } from "lucide-react";
import { mockProperties } from "@/data/mockData";

export const PropertyStatusBadge = ({ status }: { status: string }) => {
  let bgColor;
  switch (status) {
    case "completed":
      bgColor = "bg-emerald-500";
      break;
    case "in_progress":
      bgColor = "bg-amber-500";
      break;
    case "planning":
      bgColor = "bg-blue-500";
      break;
    default:
      bgColor = "bg-gray-500";
  }

  return (
    <Badge className={`${bgColor}`}>
      {status === "in_progress" ? "In Progress" : status.charAt(0).toUpperCase() + status.slice(1)}
    </Badge>
  );
};

const PropertyList = () => {
  const navigate = useNavigate();

  return (
    <Card className="col-span-3">
      <CardHeader>
        <CardTitle>Your Properties</CardTitle>
        <CardDescription>
          Overview of your property investments
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {mockProperties.map((property) => {
            // Calculate ROI based on completed status
            let roiEstimation;
            let roiPercentage;
            
            if (property.status === "completed" && property.actualSalesPrice) {
              // Use actual values for completed projects
              roiEstimation = property.actualSalesPrice - (property.price + property.renovationCost);
              roiPercentage = ((roiEstimation / (property.price + property.renovationCost)) * 100).toFixed(1);
            } else {
              // Use estimates for projects in progress or planning
              roiEstimation = property.salesPriceEstimation - (property.price + property.renovationCost);
              roiPercentage = ((roiEstimation / (property.price + property.renovationCost)) * 100).toFixed(1);
            }

            return (
              <div
                key={property.id}
                className="flex flex-col space-y-3 rounded-lg border p-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0"
              >
                <div className="flex items-center space-x-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                    <Building className="h-5 w-5 text-navy" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-medium leading-none">{property.name}</h3>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <MapPin className="mr-1 h-3 w-3" />
                      {property.location}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col space-y-1 sm:mr-8">
                  <div className="text-xs text-muted-foreground">Completion Date</div>
                  <div className="flex items-center">
                    <Calendar className="mr-1 h-3 w-3" />
                    <span className="text-xs">{property.completionDate}</span>
                  </div>
                </div>

                <div className="flex flex-col space-y-1 sm:mr-8">
                  <div className="text-xs text-muted-foreground">
                    {property.status === "completed" ? "Actual ROI" : "ROI Estimation"}
                  </div>
                  <div className="text-sm">
                    {roiPercentage}% (€{roiEstimation.toLocaleString()})
                  </div>
                </div>
                <div className="flex items-center sm:space-x-4">
                  <PropertyStatusBadge status={property.status} />
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => navigate(`/properties/${property.id}`)}
                  >
                    View
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default PropertyList;
