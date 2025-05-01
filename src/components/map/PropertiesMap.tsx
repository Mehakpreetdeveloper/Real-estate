
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Building, ArrowRight } from "lucide-react";
import { mockProperties } from "@/data/mockData";
import { PropertyStatusBadge } from "@/components/dashboard/PropertyList";

const PropertiesMap = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [selectedProperty, setSelectedProperty] = useState<number | null>(null);
  const navigate = useNavigate();

  // Function to render our map canvas
  const renderMap = () => {
    if (!mapRef.current) return;
    
    const mapContainer = mapRef.current;
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    
    if (!ctx) return;
    
    // Set canvas dimensions to container size
    canvas.width = mapContainer.clientWidth;
    canvas.height = mapContainer.clientHeight;
    
    // Draw map background
    ctx.fillStyle = "#e9eef2";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw grid lines for "streets"
    ctx.strokeStyle = "#cbd5e1";
    ctx.lineWidth = 2;
    
    // Draw horizontal streets
    for (let i = 1; i < 12; i++) {
      const y = (canvas.height / 12) * i;
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(canvas.width, y);
      ctx.stroke();
    }
    
    // Draw vertical streets
    for (let i = 1; i < 16; i++) {
      const x = (canvas.width / 16) * i;
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, canvas.height);
      ctx.stroke();
    }
    
    // Draw property markers
    mockProperties.forEach((property) => {
      // Convert lat/lng to x,y coordinates (simplified for demo)
      // In real implementation, you would use proper projection
      const x = ((property.coordinates.lng + 3.8) / 8) * canvas.width;
      const y = ((40.4 - property.coordinates.lat) / 1) * canvas.height * 0.3;
      
      const isSelected = selectedProperty === property.id;
      
      // Draw pin
      ctx.fillStyle = isSelected ? "#E1A725" : "#0F3460";
      ctx.beginPath();
      ctx.arc(x, y - 15, isSelected ? 12 : 8, 0, Math.PI * 2);
      ctx.fill();
      
      // Draw pin point
      ctx.beginPath();
      ctx.moveTo(x, y - 8);
      ctx.lineTo(x - 12, y + 8);
      ctx.lineTo(x + 12, y + 8);
      ctx.closePath();
      ctx.fill();
      
      // If selected, draw property name
      if (isSelected) {
        ctx.fillStyle = "#0F3460";
        ctx.font = "bold 14px Arial";
        ctx.textAlign = "center";
        ctx.fillText(property.name, x, y + 30);
      }
    });
    
    // Add a watermark
    ctx.fillStyle = "#94a3b8";
    ctx.font = "10px Arial";
    ctx.textAlign = "right";
    ctx.fillText("Map View (Demo)", canvas.width - 10, canvas.height - 10);
    
    // Clear container and append the canvas
    mapContainer.innerHTML = "";
    mapContainer.appendChild(canvas);
    
    // Add click event listener to the canvas
    canvas.addEventListener("click", handleMapClick);
  };
  
  // Handle clicks on the map
  const handleMapClick = (event: MouseEvent) => {
    if (!mapRef.current) return;
    
    const rect = (event.target as HTMLCanvasElement).getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    // Check if click is near any property marker
    for (const property of mockProperties) {
      // Convert lat/lng to x,y coordinates (simplified)
      const markerX = ((property.coordinates.lng + 3.8) / 8) * mapRef.current.clientWidth;
      const markerY = ((40.4 - property.coordinates.lat) / 1) * mapRef.current.clientHeight * 0.3;
      
      // Check if click is within marker area
      const distance = Math.sqrt(Math.pow(x - markerX, 2) + Math.pow(y - markerY, 2));
      if (distance < 20) {
        setSelectedProperty(property.id);
        return;
      }
    }
    
    // If clicked elsewhere, deselect
    setSelectedProperty(null);
  };

  useEffect(() => {
    renderMap();
    
    // Rerender map on window resize
    const handleResize = () => {
      renderMap();
    };
    
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [selectedProperty]);

  const selectedPropertyData = mockProperties.find(
    (p) => p.id === selectedProperty
  );

  return (
    <div className="h-[calc(100vh-5rem)] w-full relative">
      <div ref={mapRef} className="h-full w-full bg-muted" />
      
      {/* Controls overlay */}
      <div className="absolute top-4 left-4 z-10 flex space-x-2">
        <Button variant="secondary" size="sm">
          <MapPin className="mr-1 h-4 w-4" /> Properties
        </Button>
        <Button variant="outline" size="sm" className="bg-background/95">
          <Building className="mr-1 h-4 w-4" /> Filter
        </Button>
      </div>
      
      {/* Property info card */}
      {selectedPropertyData && (
        <Card className="absolute bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-80 z-10 bg-background/95 backdrop-blur">
          <CardContent className="p-4">
            <div className="mb-2 flex items-center justify-between">
              <h3 className="font-medium">{selectedPropertyData.name}</h3>
              <PropertyStatusBadge status={selectedPropertyData.status} />
            </div>
            <div className="mb-2 text-sm text-muted-foreground flex items-center">
              <MapPin className="mr-1 h-3 w-3" /> {selectedPropertyData.location}
            </div>
            <div className="grid grid-cols-2 gap-2 text-sm mb-4">
              <div>
                <div className="text-xs text-muted-foreground">Invested</div>
                <div>€{selectedPropertyData.invested.toLocaleString()}</div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Value</div>
                <div>€{selectedPropertyData.currentValue.toLocaleString()}</div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Type</div>
                <div>{selectedPropertyData.type}</div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Progress</div>
                <div>{selectedPropertyData.progress}% Complete</div>
              </div>
            </div>
            <Button 
              className="w-full justify-between"
              onClick={() => navigate(`/properties/${selectedPropertyData.id}`)}
            >
              View Property Details
              <ArrowRight className="h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default PropertiesMap;
