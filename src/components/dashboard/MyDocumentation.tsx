
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Download } from "lucide-react";
import { toast } from "sonner";

const documents = [
  {
    id: 1,
    name: "Investment Agreement",
    date: "2023-01-15",
    description: "Legal investment contract between you and the fund manager"
  },
  {
    id: 2,
    name: "Terms and Conditions",
    date: "2023-01-15",
    description: "General terms and conditions for all investors"
  },
  {
    id: 3,
    name: "Privacy Policy",
    date: "2023-01-15",
    description: "How your personal data is handled and protected"
  },
];

const MyDocumentation = () => {
  const handleDownload = (docName: string) => {
    toast.success(`Downloading ${docName}`);
    // In a real implementation, this would trigger the actual file download
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>My Documentation</CardTitle>
        <CardDescription>
          Access your personal investment agreements and documents
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {documents.map((doc) => (
            <div 
              key={doc.id} 
              className="flex items-center justify-between p-4 rounded-md border"
            >
              <div className="flex items-start gap-3">
                <div className="rounded bg-muted p-2">
                  <FileText className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium">{doc.name}</h4>
                  <p className="text-sm text-muted-foreground">{doc.description}</p>
                  <p className="text-xs text-muted-foreground mt-1">Signed on: {doc.date}</p>
                </div>
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => handleDownload(doc.name)}
                className="gap-1"
              >
                <Download className="h-4 w-4" />
                Download
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default MyDocumentation;
