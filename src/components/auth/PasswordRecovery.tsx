
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { ArrowLeft } from "lucide-react";

interface PasswordRecoveryProps {
  onBack: () => void;
}

const PasswordRecovery = ({ onBack }: PasswordRecoveryProps) => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleRecovery = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // This is a mock password recovery until backend is integrated
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
      toast.success("Recovery email sent");
    }, 1500);
  };

  if (isSubmitted) {
    return (
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-2 text-center">
          <CardTitle className="text-2xl font-bold">Check Your Email</CardTitle>
          <CardDescription>
            We've sent recovery instructions to {email}
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center text-muted-foreground">
          <p>Please check your email and follow the instructions to reset your password.</p>
          <p className="mt-2">Didn't receive an email? Check your spam folder or try again in a few minutes.</p>
        </CardContent>
        <CardFooter>
          <Button
            variant="outline"
            className="w-full"
            onClick={onBack}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Login
          </Button>
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="space-y-2 text-center">
        <CardTitle className="text-2xl font-bold">Reset Password</CardTitle>
        <CardDescription>
          Enter your email address and we'll send you instructions to reset your password
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleRecovery}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="recovery-email">Email</Label>
            <Input
              id="recovery-email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <Button
            type="submit"
            className="w-full bg-navy hover:bg-navy/90"
            disabled={isLoading}
          >
            {isLoading ? "Sending..." : "Send Recovery Email"}
          </Button>
          <Button
            type="button"
            variant="ghost"
            className="w-full"
            onClick={onBack}
            disabled={isLoading}
          >
            Back to Login
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default PasswordRecovery;
