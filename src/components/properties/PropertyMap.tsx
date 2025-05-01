
import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

interface PropertyMapProps {
  latitude: number;
  longitude: number;
  name: string;
}

const PropertyMap = ({ latitude, longitude, name }: PropertyMapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [mapboxToken, setMapboxToken] = useState<string>("");
  const [showTokenInput, setShowTokenInput] = useState(true);
  
  // Initialize map when token is available
  useEffect(() => {
    if (!mapboxToken || !mapRef.current) return;
    
    mapboxgl.accessToken = mapboxToken;
    
    const map = new mapboxgl.Map({
      container: mapRef.current,
      style: "mapbox://styles/mapbox/light-v11",
      center: [longitude, latitude],
      zoom: 15,
      pitch: 45,
      attributionControl: true,
    });
    
    // Add navigation controls
    map.addControl(
      new mapboxgl.NavigationControl({
        visualizePitch: true,
      }),
      "top-right"
    );
    
    // Add marker for the property
    const marker = new mapboxgl.Marker({ color: "#0F3460" })
      .setLngLat([longitude, latitude])
      .setPopup(
        new mapboxgl.Popup({ offset: 25 })
          .setHTML(`<h3 class="font-bold">${name}</h3>`)
      )
      .addTo(map);
    
    // Open popup by default
    marker.togglePopup();
    
    // Cleanup on unmount
    return () => {
      map.remove();
    };
  }, [latitude, longitude, name, mapboxToken]);
  
  // When token is submitted
  const handleTokenSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const token = formData.get("mapboxToken") as string;
    
    if (token && token.trim()) {
      setMapboxToken(token.trim());
      setShowTokenInput(false);
      localStorage.setItem("mapboxToken", token.trim());
    }
  };
  
  // Try to get token from localStorage on mount
  useEffect(() => {
    const savedToken = localStorage.getItem("mapboxToken");
    if (savedToken) {
      setMapboxToken(savedToken);
      setShowTokenInput(false);
    }
  }, []);
  
  return (
    <div className="w-full h-full relative">
      {showTokenInput ? (
        <div className="absolute inset-0 bg-muted flex flex-col items-center justify-center p-4 text-center z-10">
          <h3 className="font-medium mb-2">Mapbox API Key Required</h3>
          <p className="text-sm text-muted-foreground mb-4">
            To view the property location, please enter your Mapbox public token.
            You can get one for free at <a href="https://mapbox.com/" target="_blank" rel="noopener noreferrer" className="underline">mapbox.com</a>
          </p>
          <form onSubmit={handleTokenSubmit} className="w-full max-w-md flex flex-col gap-2">
            <input 
              type="text" 
              name="mapboxToken"
              placeholder="Enter Mapbox public token"
              className="w-full p-2 border rounded"
              required
            />
            <button type="submit" className="bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded">
              Load Map
            </button>
          </form>
        </div>
      ) : null}
      
      <div 
        ref={mapRef} 
        className="w-full h-full bg-muted flex items-center justify-center text-muted-foreground"
      >
        {!mapboxToken ? "Loading map..." : null}
      </div>
    </div>
  );
};

export default PropertyMap;
