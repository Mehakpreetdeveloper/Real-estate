export interface Property {
  id: number;
  name: string;
  type: string;
  location: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  description: string;
  status: "planning" | "in_progress" | "completed";
  progress: number;
  invested: number;
  currentValue: number;
  quarterlyReturn: number;
  projectedReturn: number;
  investmentDate: string;
  completionDate: string;
  size: number;
  image: string;
  ownershipPercentage: number;
  totalProjectValue: number;
  price: number;
  renovationCost: number;
  salesPriceEstimation: number;
  actualSalesPrice?: number; // Optional field for completed projects
  updates: Array<{
    date: string;
    title: string;
    description: string;
  }>;
}

export const mockProperties: Property[] = [
  {
    id: 1,
    name: "Jovellanos",
    type: "Residential",
    location: "Calle Jovellanos 5, 9º, Torremolinos",
    coordinates: {
      lat: 36.6240,
      lng: -4.4989
    },
    description: "Premium residential property in Torremolinos with excellent potential for renovation and value appreciation.",
    status: "in_progress",
    progress: 50,
    invested: 292210,
    currentValue: 296600 + (292210 - 279000),
    quarterlyReturn: 0,
    projectedReturn: 85800,
    investmentDate: "Dec 19, 2023",
    completionDate: "31/05/2025",
    size: 120,
    ownershipPercentage: 100,
    totalProjectValue: 400000 + (292210 - 279000),
    price: 292210,
    renovationCost: 35200,
    salesPriceEstimation: 400000,
    image: "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?q=80&w=1170&auto=format&fit=crop",
    updates: [
      {
        date: "Apr 15, 2024",
        title: "Renovation Progress Update",
        description: "Project has reached 50% completion. All structural work is completed and interior renovations are underway."
      },
      {
        date: "Mar 1, 2024",
        title: "Renovation Started",
        description: "Renovation work has begun with initial demolition and structural assessment completed."
      },
      {
        date: "Dec 19, 2023",
        title: "Property Acquired",
        description: "Successfully acquired the property in Torremolinos. Renovation planning phase initiated."
      }
    ]
  },
  {
    id: 5,
    name: "Torre Gaudi",
    type: "Residential",
    location: "Calle Rio Suborán 4, 4c, Torremolinos",
    coordinates: {
      lat: 36.6240,
      lng: -4.4989
    },
    description: "Well-located residential property in Torremolinos undergoing final renovation phase.",
    status: "in_progress",
    progress: 90,
    invested: 186235,
    currentValue: 186235 + ((270000 - (186235 + 36000)) * 0.9),
    quarterlyReturn: 0,
    projectedReturn: 270000 - (186235 + 36000),
    investmentDate: "Apr 18, 2024",
    completionDate: "15/05/2025",
    size: 90,
    ownershipPercentage: 100,
    totalProjectValue: 270000,
    price: 186235,
    renovationCost: 36000,
    salesPriceEstimation: 270000,
    image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?q=80&w=1170&auto=format&fit=crop",
    updates: [
      {
        date: "Apr 18, 2024",
        title: "Final Phase of Renovation",
        description: "Project is 90% complete with finishing touches being applied. On track for completion in June."
      },
      {
        date: "Apr 18, 2024",
        title: "Property Acquired",
        description: "Successfully acquired the Torre Gaudi property. Renovation work commenced immediately."
      }
    ]
  },
  {
    id: 6,
    name: "Sorrolla",
    type: "Residential",
    location: "Calle Sorroya 33, 7B, Torremolinos",
    coordinates: {
      lat: 36.6240,
      lng: -4.4989
    },
    description: "Residential property in Torremolinos at the beginning of its renovation journey.",
    status: "in_progress",
    progress: 10,
    invested: 221300,
    currentValue: 221300 + ((310000 - (221300 + 39900)) * 0.1),
    quarterlyReturn: 0,
    projectedReturn: 310000 - (221300 + 39900),
    investmentDate: "Apr 18, 2024",
    completionDate: "25/07/2025",
    size: 90,
    ownershipPercentage: 100,
    totalProjectValue: 310000,
    price: 221300,
    renovationCost: 39900,
    salesPriceEstimation: 310000,
    image: "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?q=80&w=1170&auto=format&fit=crop",
    updates: [
      {
        date: "Apr 18, 2024",
        title: "Property Acquired",
        description: "Successfully acquired the Sorrolla property. Initial renovation planning phase commenced."
      }
    ]
  },
  {
    id: 7,
    name: "Colegiala",
    type: "Residential",
    location: "Calle Colegiala 19, 6h, Torremolinos",
    coordinates: {
      lat: 36.6240,
      lng: -4.4989
    },
    description: "Residential property in Torremolinos in advanced renovation stage.",
    status: "in_progress",
    progress: 80,
    invested: 159945,
    currentValue: 159945 + ((220000 - (159945 + 26660)) * 0.8),
    quarterlyReturn: 0,
    projectedReturn: 220000 - (159945 + 26660),
    investmentDate: "Apr 18, 2024",
    completionDate: "20/05/2025",
    size: 90,
    ownershipPercentage: 100,
    totalProjectValue: 220000,
    price: 159945,
    renovationCost: 26660,
    salesPriceEstimation: 220000,
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1170&auto=format&fit=crop",
    updates: [
      {
        date: "Apr 18, 2024",
        title: "Advanced Renovation Stage",
        description: "Project is at 80% completion with finishing work underway."
      },
      {
        date: "Apr 18, 2024",
        title: "Property Acquired",
        description: "Successfully acquired the Colegiala property and began immediate renovation work."
      }
    ]
  }
];

export const userInvestments = {
  totalInvested: 186235 + 221300 + 159945 + 292210,
  totalCurrentValue: 
    (186235 + ((270000 - (186235 + 36000)) * 0.9)) + 
    (221300 + ((310000 - (221300 + 39900)) * 0.1)) + 
    (159945 + ((220000 - (159945 + 26660)) * 0.8)) +
    (296600 + (292210 - 279000)),
  totalROI: 18.8,
  activeProjects: 4,
  projectsInDevelopment: 4,
  projectsCompleted: 0,
};
