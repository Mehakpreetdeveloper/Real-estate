
import Navbar from "@/components/layout/Navbar";
import PropertyDetails from "@/components/properties/PropertyDetails";

const Properties = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <PropertyDetails />
    </div>
  );
};

export default Properties;
