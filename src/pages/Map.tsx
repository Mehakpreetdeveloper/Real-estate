
import Navbar from "@/components/layout/Navbar";
import PropertiesMap from "@/components/map/PropertiesMap";

const Map = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <PropertiesMap />
    </div>
  );
};

export default Map;
