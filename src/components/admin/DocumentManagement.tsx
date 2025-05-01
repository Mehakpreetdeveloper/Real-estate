
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FileText, Upload, X } from "lucide-react";
import { toast } from "sonner";

type Document = {
  id: number;
  name: string;
  description: string;
  date: string;
  type: "legal" | "technical" | "financial";
};

const mockDocuments: Document[] = [
  {
    id: 1,
    name: "Investment Agreement",
    description: "Legal investment contract between you and the fund manager",
    date: "2023-01-15",
    type: "legal"
  },
  {
    id: 2,
    name: "Terms and Conditions",
    description: "General terms and conditions for all investors",
    date: "2023-01-15",
    type: "legal"
  },
];

const DocumentManagement = () => {
  const [documents, setDocuments] = useState<Document[]>(mockDocuments);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) return;

    // In a real implementation, this would upload to a storage service
    const newDoc: Document = {
      id: documents.length + 1,
      name: selectedFile.name,
      description: (e.target as HTMLFormElement).description.value,
      date: new Date().toISOString().split('T')[0],
      type: (e.target as HTMLFormElement).docType.value as Document['type'],
    };

    setDocuments([...documents, newDoc]);
    setSelectedFile(null);
    (e.target as HTMLFormElement).reset();
    toast.success("Document uploaded successfully");
  };

  const handleDelete = (id: number) => {
    setDocuments(documents.filter(doc => doc.id !== id));
    toast.success("Document deleted successfully");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Document Management</CardTitle>
        <CardDescription>Upload and manage documents for investors</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleUpload} className="space-y-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="file">Upload Document</Label>
              <Input
                id="file"
                type="file"
                onChange={handleFileSelect}
                required
              />
            </div>

            <div>
              <Label htmlFor="description">Document Description</Label>
              <Input
                id="description"
                name="description"
                placeholder="Enter document description"
                required
              />
            </div>

            <div>
              <Label htmlFor="docType">Document Type</Label>
              <Select name="docType" required>
                <SelectTrigger>
                  <SelectValue placeholder="Select document type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="legal">Legal</SelectItem>
                  <SelectItem value="technical">Technical</SelectItem>
                  <SelectItem value="financial">Financial</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button type="submit" className="w-full">
              <Upload className="mr-2 h-4 w-4" />
              Upload Document
            </Button>
          </div>
        </form>

        <div className="mt-8">
          <h3 className="font-medium mb-4">Uploaded Documents</h3>
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
                    <p className="text-xs text-muted-foreground mt-1">Uploaded on: {doc.date}</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDelete(doc.id)}
                  className="text-destructive"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DocumentManagement;
