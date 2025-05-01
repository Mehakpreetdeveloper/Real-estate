
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserPlus, Search, ExternalLink, Download, UserCheck, Mail, Phone } from "lucide-react";
import { toast } from "sonner";

interface Investor {
  id: number;
  name: string;
  email: string;
  phone: string;
  totalInvested: number;
  projectCount: number;
  lastActive: string;
}

const mockInvestors: Investor[] = [
  { 
    id: 1, 
    name: "Jorge Carrascosa", 
    email: "jorge.carrascosa@example.com", 
    phone: "+34 612 345 678", 
    totalInvested: 250000, 
    projectCount: 1, 
    lastActive: "2024-04-18" 
  },
  { 
    id: 2, 
    name: "Raul Carlos Pissinis", 
    email: "raul.pissinis@example.com", 
    phone: "+34 623 456 789", 
    totalInvested: 250000, 
    projectCount: 1, 
    lastActive: "2024-04-18" 
  },
  { 
    id: 3, 
    name: "Germán Flecha", 
    email: "german.flecha@example.com", 
    phone: "+34 634 567 890", 
    totalInvested: 250000, 
    projectCount: 1, 
    lastActive: "2024-04-18" 
  },
  { 
    id: 4, 
    name: "Familium Partners S.L.", 
    email: "info@familiumpartners.com", 
    phone: "+34 645 678 901", 
    totalInvested: 250000, 
    projectCount: 1, 
    lastActive: "2024-04-18" 
  }
];

const InvestorManagement = () => {
  const [investors, setInvestors] = useState(mockInvestors);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isAssignDialogOpen, setIsAssignDialogOpen] = useState(false);
  const [selectedInvestor, setSelectedInvestor] = useState<number | null>(null);
  
  const handleAddInvestor = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Investor added successfully");
    setIsAddDialogOpen(false);
    // In a real implementation, this would add the investor to the database
  };
  
  const handleAssignProject = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Project assigned to investor");
    setIsAssignDialogOpen(false);
    // In a real implementation, this would assign a project to the investor
  };
  
  const handleExportInvestors = () => {
    toast.success("Exporting investor data to CSV");
    // In a real implementation, this would export investor data to a CSV file
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Investor Management</CardTitle>
          <CardDescription>Manage and assign investors to projects</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between mb-4">
            <div className="flex w-full max-w-sm items-center space-x-2">
              <div className="relative w-full">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input type="text" placeholder="Search investors..." className="pl-10" />
              </div>
              <Button variant="secondary">Search</Button>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" onClick={handleExportInvestors}>
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
              <Button onClick={() => setIsAddDialogOpen(true)}>
                <UserPlus className="mr-2 h-4 w-4" />
                Add Investor
              </Button>
            </div>
          </div>
          
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Investor</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Total Invested</TableHead>
                  <TableHead>Projects</TableHead>
                  <TableHead>Last Active</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {investors.map((investor) => (
                  <TableRow key={investor.id}>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-9 w-9">
                          <AvatarImage src={`https://ui-avatars.com/api/?name=${investor.name.replace(' ', '+')}&background=random`} />
                          <AvatarFallback>{investor.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{investor.name}</div>
                          <div className="text-xs text-muted-foreground">ID: INV-{investor.id.toString().padStart(4, '0')}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center text-sm">
                          <Mail className="mr-1 h-3 w-3" />
                          {investor.email}
                        </div>
                        <div className="flex items-center text-sm">
                          <Phone className="mr-1 h-3 w-3" />
                          {investor.phone}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">€{investor.totalInvested.toLocaleString()}</TableCell>
                    <TableCell>{investor.projectCount}</TableCell>
                    <TableCell>{investor.lastActive}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end space-x-2">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => {
                            setSelectedInvestor(investor.id);
                            setIsAssignDialogOpen(true);
                          }}
                        >
                          <UserCheck className="mr-1 h-4 w-4" />
                          Assign
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <ExternalLink className="h-4 w-4" />
                          <span className="sr-only">View</span>
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
      
      {/* Add Investor Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add New Investor</DialogTitle>
            <DialogDescription>
              Enter the investor details to create their account
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleAddInvestor}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="first-name">First Name</Label>
                  <Input id="first-name" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="last-name">Last Name</Label>
                  <Input id="last-name" required />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" required />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" type="tel" />
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Temporary Password</Label>
                  <Button variant="ghost" size="sm" className="h-8 px-2 text-xs">
                    Generate
                  </Button>
                </div>
                <Input id="password" type="text" />
                <p className="text-xs text-muted-foreground">
                  Investor will be prompted to change password on first login
                </p>
              </div>
            </div>
            
            <DialogFooter>
              <Button variant="outline" type="button" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" className="bg-navy hover:bg-navy/90">Add Investor</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      
      {/* Assign Project Dialog */}
      <Dialog open={isAssignDialogOpen} onOpenChange={setIsAssignDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Assign to Project</DialogTitle>
            <DialogDescription>
              Assign this investor to a project and specify their contribution
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleAssignProject}>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="project">Select Project</Label>
                <select 
                  id="project" 
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  required
                >
                  <option value="" disabled selected>Select a project</option>
                  <option value="1">Calle Hermosilla 39</option>
                  <option value="2">Calle Augusto Figueroa 9</option>
                  <option value="3">Valencia Grand Avenue</option>
                  <option value="4">Barcelona Oceanview Residences</option>
                </select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="investment-amount">Investment Amount (€)</Label>
                <Input id="investment-amount" type="number" min="0" required />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="investment-date">Investment Date</Label>
                <Input id="investment-date" type="date" required />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="notes">Notes</Label>
                <textarea 
                  id="notes" 
                  className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                />
              </div>
            </div>
            
            <DialogFooter>
              <Button variant="outline" type="button" onClick={() => setIsAssignDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" className="bg-navy hover:bg-navy/90">Assign to Project</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default InvestorManagement;
