
import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Plus, Building, Upload, Users } from "lucide-react";
import ProjectManagement from "@/components/admin/ProjectManagement";
import InvestorManagement from "@/components/admin/InvestorManagement";
import DocumentManagement from "@/components/admin/DocumentManagement";

const Admin = () => {
  const [activeTab, setActiveTab] = useState("projects");

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="container py-8">
        <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <p className="text-muted-foreground">Manage projects, investors, and documents</p>
          </div>
          <div className="flex gap-3">
            <Button className="bg-navy hover:bg-navy/90" onClick={() => setActiveTab("projects")}>
              <Plus className="mr-2 h-4 w-4" />
              New Project
            </Button>
            <Button variant="outline" onClick={() => setActiveTab("documents")}>
              <Upload className="mr-2 h-4 w-4" />
              Upload Documents
            </Button>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="projects" className="flex items-center">
              <Building className="mr-2 h-4 w-4" />
              Projects
            </TabsTrigger>
            <TabsTrigger value="investors" className="flex items-center">
              <Users className="mr-2 h-4 w-4" />
              Investors
            </TabsTrigger>
            <TabsTrigger value="documents" className="flex items-center">
              <Upload className="mr-2 h-4 w-4" />
              Documents
            </TabsTrigger>
          </TabsList>

          <TabsContent value="projects">
            <ProjectManagement />
          </TabsContent>

          <TabsContent value="investors">
            <InvestorManagement />
          </TabsContent>

          <TabsContent value="documents">
            <DocumentManagement />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;
