import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PropertyStatusBadge } from "@/components/dashboard/PropertyList";
import { Pencil, Trash2, Plus, X, MapPin } from "lucide-react";
import { mockProperties } from "@/data/mockData";
import { toast } from "sonner";

const ProjectManagement = () => {
  const [projects, setProjects] = useState(mockProperties);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProjects, setFilteredProjects] = useState(mockProperties);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  
  const handleSearch = () => {
    const filtered = projects.filter(project => 
      project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.location.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredProjects(filtered);
  };
  
  const handleAddProject = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Project created successfully");
    setIsAddDialogOpen(false);
    // In a real implementation, this would add the project to the database
  };
  
  const handleDeleteProject = () => {
    if (selectedProject !== null) {
      setProjects(projects.filter(project => project.id !== selectedProject));
      toast.success("Project deleted successfully");
      setIsDeleteDialogOpen(false);
      setSelectedProject(null);
    }
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Project Management</CardTitle>
          <CardDescription>Create, edit, and manage property projects</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between mb-4">
            <div className="flex w-full max-w-sm items-center space-x-2">
              <Input 
                type="text" 
                placeholder="Search projects..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              />
              <Button 
                variant="secondary" 
                onClick={handleSearch}
              >
                Search
              </Button>
            </div>
            <Button onClick={() => setIsAddDialogOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Add Project
            </Button>
          </div>
          
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Progress</TableHead>
                  <TableHead>Total Investment</TableHead>
                  <TableHead>Current Value</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProjects.map((project) => (
                  <TableRow key={project.id}>
                    <TableCell className="font-medium">{project.name}</TableCell>
                    <TableCell>{project.location}</TableCell>
                    <TableCell>
                      <PropertyStatusBadge status={project.status} />
                    </TableCell>
                    <TableCell>{project.progress}%</TableCell>
                    <TableCell>€{project.invested.toLocaleString()}</TableCell>
                    <TableCell>€{project.currentValue.toLocaleString()}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end space-x-2">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Pencil className="h-4 w-4" />
                          <span className="sr-only">Edit</span>
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8 text-destructive"
                          onClick={() => {
                            setSelectedProject(project.id);
                            setIsDeleteDialogOpen(true);
                          }}
                        >
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Delete</span>
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
      
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Add New Project</DialogTitle>
            <DialogDescription>
              Enter the details for the new real estate project
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleAddProject}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="project-name">Project Name</Label>
                  <Input id="project-name" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="project-type">Project Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="residential">Residential</SelectItem>
                      <SelectItem value="commercial">Commercial</SelectItem>
                      <SelectItem value="mixed">Mixed Use</SelectItem>
                      <SelectItem value="land">Land</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="project-location">
                  <div className="flex items-center">
                    Location
                    <MapPin className="ml-1 h-3 w-3" />
                  </div>
                </Label>
                <Input id="project-location" required />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="project-status">Status</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="planning">Planning</SelectItem>
                      <SelectItem value="in_progress">In Progress</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="project-progress">Progress (%)</Label>
                  <Input type="number" id="project-progress" min="0" max="100" defaultValue="0" />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="project-investment">Total Investment (€)</Label>
                  <Input type="number" id="project-investment" min="0" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="project-value">Current Value (€)</Label>
                  <Input type="number" id="project-value" min="0" />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="project-description">Description</Label>
                <Textarea id="project-description" rows={3} />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="project-image">Featured Image</Label>
                <Input type="file" id="project-image" />
              </div>
            </div>
            
            <DialogFooter>
              <Button variant="outline" type="button" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" className="bg-navy hover:bg-navy/90">Create Project</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this project? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex space-x-2 justify-end">
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>Cancel</Button>
            <Button variant="destructive" onClick={handleDeleteProject}>
              <Trash2 className="mr-2 h-4 w-4" />
              Delete Project
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ProjectManagement;
