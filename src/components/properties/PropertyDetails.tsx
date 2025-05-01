
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { CalendarRange, Building, FileText, BarChart3, MapPin, DollarSign } from "lucide-react";
import { mockProperties } from "@/data/mockData";
import { PropertyStatusBadge } from "@/components/dashboard/PropertyList";
import PropertyMap from "@/components/properties/PropertyMap";
import DocumentSection from "@/components/properties/DocumentSection";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";

const PropertyDetails = () => {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const property = mockProperties.find((p) => p.id === Number(id));

  if (!property) {
    return (
      <div className="flex h-[80vh] items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold">Property Not Found</h2>
          <p className="text-muted-foreground mt-2">
            The property you're looking for doesn't exist.
          </p>
          <Button className="mt-4" onClick={() => window.history.back()}>
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-4 sm:py-8">
      <div className="mb-6 flex flex-col justify-between gap-2 sm:mb-8 sm:flex-row sm:items-center sm:gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">{property.name}</h1>
          <div className="flex items-center text-muted-foreground mt-1">
            <MapPin className="mr-1 h-4 w-4" />
            {property.location}
          </div>
        </div>
        <PropertyStatusBadge status={property.status} />
      </div>

      {/* Responsive for panel group: vertical on mobile, horizontal on md+ */}
      <div className="flex flex-col gap-4 md:gap-6 md:flex-row">
        <div className="md:w-3/5 w-full flex-shrink-0">
          <div className="h-full flex flex-col gap-4">
            <Card>
              <div className="aspect-video w-full rounded-t-lg bg-muted relative overflow-hidden max-h-[300px] sm:max-h-none">
                <img
                  src={property.image}
                  alt={property.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <CardHeader>
                <CardTitle>Property Overview</CardTitle>
                <CardDescription>Key information about this property</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <div className="text-sm font-medium">Completion Status</div>
                    <div className="text-sm text-muted-foreground">{property.progress}%</div>
                  </div>
                  <Progress value={property.progress} className="h-2" />
                </div>

                <Separator />

                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <div className="text-sm font-medium">Purchase price</div>
                    <div className="text-sm text-muted-foreground mt-1 flex items-center">
                      <DollarSign className="mr-1 h-3 w-3" />
                      {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'EUR' }).format(property.price)}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm font-medium">Renovation Cost</div>
                    <div className="text-sm text-muted-foreground mt-1 flex items-center">
                      <DollarSign className="mr-1 h-3 w-3" />
                      {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'EUR' }).format(property.renovationCost)}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm font-medium">Total Cost</div>
                    <div className="text-sm text-muted-foreground mt-1 flex items-center">
                      <DollarSign className="mr-1 h-3 w-3" />
                      {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'EUR' }).format(property.price + property.renovationCost)}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm font-medium">Sales Price Estimation</div>
                    <div className="text-sm text-muted-foreground mt-1 flex items-center">
                      <DollarSign className="mr-1 h-3 w-3" />
                      {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'EUR' }).format(property.salesPriceEstimation)}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm font-medium">Investment Date</div>
                    <div className="text-sm text-muted-foreground mt-1 flex items-center">
                      <CalendarRange className="mr-1 h-3 w-3" />
                      {property.investmentDate}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm font-medium">Property Type</div>
                    <div className="text-sm text-muted-foreground mt-1 flex items-center">
                      <Building className="mr-1 h-3 w-3" />
                      {property.type}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm font-medium">Size</div>
                    <div className="text-sm text-muted-foreground mt-1">
                      {property.size} m²
                    </div>
                  </div>
                  <div>
                    <div className="text-sm font-medium">Expected Completion</div>
                    <div className="text-sm text-muted-foreground mt-1">
                      {property.completionDate}
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <div className="text-sm font-medium">Description</div>
                  <div className="text-sm text-muted-foreground mt-1">
                    {property.description}
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Location</CardTitle>
                <CardDescription>Property on map</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="aspect-video w-full overflow-hidden rounded-md border min-h-[220px]">
                  <PropertyMap 
                    latitude={property.coordinates.lat} 
                    longitude={property.coordinates.lng} 
                    name={property.name}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        <div className="md:w-2/5 w-full flex-shrink-0">
          <div className="flex flex-col h-full gap-4">
            <Card className="h-full">
              <CardHeader>
                <CardTitle>Project Updates</CardTitle>
                <CardDescription>Latest development progress</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {property.updates.map((update, index) => (
                  <div key={index} className="space-y-1">
                    <div className="flex justify-between">
                      <div className="font-medium">{update.title}</div>
                      <div className="text-sm text-muted-foreground">{update.date}</div>
                    </div>
                    <p className="text-sm text-muted-foreground">{update.description}</p>
                    {index < property.updates.length - 1 && <Separator className="my-3" />}
                  </div>
                ))}
              </CardContent>
              <CardFooter>
                <div className="flex space-x-2 w-full">
                  <Button variant="outline" size="sm" className="w-full">
                    <FileText className="mr-2 h-4 w-4" />
                    Documents
                  </Button>
                  <Button variant="outline" size="sm" className="w-full">
                    <BarChart3 className="mr-2 h-4 w-4" />
                    Reports
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
      <div className="mt-6">
        <DocumentSection />
      </div>
    </div>
  );
};

export default PropertyDetails;

