
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Download, PictureInPicture, FileArchive, Folder, Search } from "lucide-react";
import { toast } from "sonner";

type Document = {
  id: number;
  name: string;
  type: string;
  date: string;
  size: string;
  category: "legal" | "technical" | "financial";
};

const mockDocuments: Document[] = [
  { id: 1, name: "Building License", type: "PDF", date: "2023-08-15", size: "1.2 MB", category: "legal" },
  { id: 2, name: "Architectural Plans", type: "PDF", date: "2023-07-22", size: "3.5 MB", category: "technical" },
  { id: 3, name: "Construction Contract", type: "PDF", date: "2023-08-10", size: "0.8 MB", category: "legal" },
  { id: 4, name: "Financial Projections", type: "XLSX", date: "2023-09-05", size: "0.5 MB", category: "financial" },
  { id: 5, name: "Soil Analysis Report", type: "PDF", date: "2023-06-18", size: "2.3 MB", category: "technical" },
  { id: 6, name: "Property Deed", type: "PDF", date: "2023-05-30", size: "1.1 MB", category: "legal" },
  { id: 7, name: "Quarterly Financial Report", type: "PDF", date: "2023-10-01", size: "0.7 MB", category: "financial" },
  { id: 8, name: "Building Blueprints", type: "DWG", date: "2023-07-25", size: "4.2 MB", category: "technical" },
];

const DocumentSection = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  const handleDownload = (doc: Document) => {
    toast.success(`Downloading ${doc.name}`);
    // In a real implementation, this would trigger an actual file download
  };

  const filterDocuments = (category: string) => {
    const filtered = category === "all" 
      ? mockDocuments 
      : mockDocuments.filter(doc => doc.category === category);
      
    if (searchQuery) {
      return filtered.filter(doc => 
        doc.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    return filtered;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Project Documentation</CardTitle>
        <CardDescription>Access all property documents and reports</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4 relative">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search documents..."
            className="w-full rounded-md border border-input pl-10 py-2 bg-background text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <Tabs defaultValue="all">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="legal">Legal</TabsTrigger>
            <TabsTrigger value="technical">Technical</TabsTrigger>
            <TabsTrigger value="financial">Financial</TabsTrigger>
          </TabsList>
          
          {["all", "legal", "technical", "financial"].map((category) => (
            <TabsContent key={category} value={category} className="space-y-4 pt-4">
              {filterDocuments(category).length > 0 ? (
                <div className="rounded-md border">
                  <div className="grid grid-cols-5 p-3 text-sm font-medium text-muted-foreground border-b">
                    <div className="col-span-2">Name</div>
                    <div>Date</div>
                    <div>Size</div>
                    <div className="text-right">Action</div>
                  </div>
                  <div className="divide-y">
                    {filterDocuments(category).map((doc) => (
                      <div key={doc.id} className="grid grid-cols-5 p-3 text-sm items-center">
                        <div className="col-span-2 flex items-center">
                          <div className="mr-2 rounded bg-muted p-1">
                            {doc.type === "PDF" && <FileText className="h-4 w-4 text-primary" />}
                            {doc.type === "XLSX" && <FileArchive className="h-4 w-4 text-emerald-500" />}
                            {doc.type === "DWG" && <PictureInPicture className="h-4 w-4 text-blue-500" />}
                          </div>
                          <span>{doc.name}</span>
                        </div>
                        <div>{doc.date}</div>
                        <div>{doc.size}</div>
                        <div className="text-right">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => handleDownload(doc)}
                            className="h-8 w-8 p-0"
                          >
                            <Download className="h-4 w-4" />
                            <span className="sr-only">Download</span>
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <Folder className="h-12 w-12 text-muted-foreground/50 mb-3" />
                  <h3 className="text-lg font-medium">No documents found</h3>
                  <p className="text-sm text-muted-foreground">
                    {searchQuery ? "Try adjusting your search" : "Documents will appear here once uploaded"}
                  </p>
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default DocumentSection;
