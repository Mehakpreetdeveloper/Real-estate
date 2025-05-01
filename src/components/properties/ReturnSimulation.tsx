
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { ArrowRight, TrendingUp, ChevronDown, ChevronUp, Download } from "lucide-react";
import { toast } from "sonner";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface ReturnSimulationProps {
  initialInvestment: number;
  currentValue: number;
}

const ReturnSimulation = ({ initialInvestment, currentValue }: ReturnSimulationProps) => {
  const [sliderValue, setSliderValue] = useState([5]);
  const [timeHorizon, setTimeHorizon] = useState("3");
  const [expanded, setExpanded] = useState(false);
  
  const yearsHeld = parseInt(timeHorizon);
  const annualGrowthRate = sliderValue[0] / 100;
  
  // Generate projected values based on different scenarios
  const generateProjections = (baseValue: number, years: number, scenarios: { name: string, rate: number }[]) => {
    return Array.from({ length: years + 1 }, (_, i) => {
      const year = i;
      const entry: any = { year };
      
      scenarios.forEach(scenario => {
        entry[scenario.name] = Math.round(baseValue * Math.pow(1 + scenario.rate, year));
      });
      
      return entry;
    });
  };
  
  const scenarios = [
    { name: "conservative", rate: annualGrowthRate * 0.5 },
    { name: "base", rate: annualGrowthRate },
    { name: "optimistic", rate: annualGrowthRate * 1.5 }
  ];
  
  const projectionData = generateProjections(currentValue, yearsHeld, scenarios);
  
  const finalValues = {
    conservative: projectionData[yearsHeld].conservative,
    base: projectionData[yearsHeld].base, 
    optimistic: projectionData[yearsHeld].optimistic
  };
  
  const totalReturns = {
    conservative: finalValues.conservative - initialInvestment,
    base: finalValues.base - initialInvestment,
    optimistic: finalValues.optimistic - initialInvestment
  };
  
  const annualizedReturns = {
    conservative: ((finalValues.conservative / initialInvestment) ** (1/yearsHeld) - 1) * 100,
    base: ((finalValues.base / initialInvestment) ** (1/yearsHeld) - 1) * 100,
    optimistic: ((finalValues.optimistic / initialInvestment) ** (1/yearsHeld) - 1) * 100
  };
  
  const handleExportResults = () => {
    toast.success("Simulation results exported to CSV");
    // In a real implementation, this would trigger an actual file download
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Return Simulation</CardTitle>
            <CardDescription>Estimate future returns based on different scenarios</CardDescription>
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            className="rounded-full" 
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className={`space-y-6 ${expanded ? "" : "hidden md:block"}`}>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-4">
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <div className="text-sm">Annual Growth Rate</div>
                  <div className="font-medium">{sliderValue[0]}%</div>
                </div>
                <Slider 
                  value={sliderValue} 
                  onValueChange={setSliderValue} 
                  min={1} 
                  max={15} 
                  step={0.5} 
                />
                <div className="mt-1 flex justify-between text-xs text-muted-foreground">
                  <span>1%</span>
                  <span>8%</span>
                  <span>15%</span>
                </div>
              </div>
              
              <div>
                <div className="mb-2 text-sm">Investment Horizon</div>
                <div className="grid grid-cols-3 gap-2">
                  {["1", "3", "5", "10"].map((year) => (
                    <Button
                      key={year}
                      variant={timeHorizon === year ? "default" : "outline"}
                      className={timeHorizon === year ? "bg-navy hover:bg-navy/90" : ""}
                      onClick={() => setTimeHorizon(year)}
                    >
                      {year} {parseInt(year) === 1 ? "Year" : "Years"}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="rounded-md border p-3">
                <div className="text-sm font-medium">Initial Investment</div>
                <div className="text-xl font-bold">€{initialInvestment.toLocaleString()}</div>
              </div>
              
              <div className="rounded-md border p-3">
                <div className="text-sm font-medium">Current Value</div>
                <div className="text-xl font-bold">€{currentValue.toLocaleString()}</div>
              </div>
            </div>
          </div>
          
          <Tabs defaultValue="chart">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="chart">Chart View</TabsTrigger>
              <TabsTrigger value="table">Table View</TabsTrigger>
            </TabsList>
            
            <TabsContent value="chart" className="pt-4">
              <div className="h-[250px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={projectionData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                      dataKey="year" 
                      label={{ value: 'Years', position: 'insideBottomRight', offset: -5 }}
                    />
                    <YAxis 
                      tickFormatter={(value) => `€${(value/1000).toFixed(0)}k`}
                      width={80}
                    />
                    <Tooltip 
                      formatter={(value) => [`€${Number(value).toLocaleString()}`, ""]}
                      labelFormatter={(label) => `Year ${label}`}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="conservative" 
                      name="Conservative" 
                      stroke="#94a3b8" 
                      strokeWidth={2}
                      dot={false}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="base" 
                      name="Base Case" 
                      stroke="#0F3460" 
                      strokeWidth={2}
                      dot={false}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="optimistic" 
                      name="Optimistic" 
                      stroke="#10b981" 
                      strokeWidth={2}
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </TabsContent>
            
            <TabsContent value="table" className="pt-4">
              <div className="rounded-md border">
                <div className="grid grid-cols-4 p-3 text-sm font-medium text-muted-foreground border-b">
                  <div>Scenario</div>
                  <div>Final Value</div>
                  <div>Total Return</div>
                  <div>Annualized Return</div>
                </div>
                <div className="divide-y">
                  <div className="grid grid-cols-4 p-3 text-sm">
                    <div className="font-medium">Conservative</div>
                    <div>€{finalValues.conservative.toLocaleString()}</div>
                    <div>€{totalReturns.conservative.toLocaleString()}</div>
                    <div>{annualizedReturns.conservative.toFixed(1)}%</div>
                  </div>
                  <div className="grid grid-cols-4 p-3 text-sm bg-muted/50">
                    <div className="font-medium">Base Case</div>
                    <div className="font-medium">€{finalValues.base.toLocaleString()}</div>
                    <div className="font-medium">€{totalReturns.base.toLocaleString()}</div>
                    <div className="font-medium">{annualizedReturns.base.toFixed(1)}%</div>
                  </div>
                  <div className="grid grid-cols-4 p-3 text-sm">
                    <div className="font-medium">Optimistic</div>
                    <div>€{finalValues.optimistic.toLocaleString()}</div>
                    <div>€{totalReturns.optimistic.toLocaleString()}</div>
                    <div>{annualizedReturns.optimistic.toFixed(1)}%</div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
          
          <div className="flex justify-between">
            <Button variant="outline" onClick={handleExportResults}>
              <Download className="mr-2 h-4 w-4" />
              Export Results
            </Button>
            <Button className="bg-navy hover:bg-navy/90">
              View Detailed Analysis
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
        
        {!expanded && (
          <div className="md:hidden flex justify-center">
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => setExpanded(true)}
            >
              <TrendingUp className="mr-2 h-4 w-4" />
              Show Simulation Options
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ReturnSimulation;
