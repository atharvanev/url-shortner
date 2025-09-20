import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Copy, Link, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const apiURL = import.meta.env.VITE_API_ENDPOINT

const URLShortener = () => {
  const [url, setUrl] = useState("");
  const [shortenedUrl, setShortenedUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const isValidUrl = (string: string) => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };

  const handleShorten = async () => {
    if (!url.trim()) {
      toast({
        title: "Please enter a URL",
        variant: "destructive",
      });
      return;
    }

    if (!isValidUrl(url)) {
      toast({
        title: "Please enter a valid URL",
        description: "Make sure to include http:// or https://",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    try{
      const response = await fetch(`${apiURL}/shorten`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({url: url})
      });

      if(!response.ok){
        throw new Error(`Server error: ${response.status}`);
      }
      const data = await response.json();
      console.log(data)
      setShortenedUrl(data.short_url);
      console.log(shortenedUrl)
    }catch(err){
      console.error("API issue",err)
    }finally{
      setIsLoading(false)
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(`https://${shortenedUrl}`);
      setCopied(true);
      toast({
        title: "Copied to clipboard!",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast({
        title: "Failed to copy",
        variant: "destructive",
      });
    } 
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      {/* Main Input Section */}
      <Card className="p-8 shadow-latte border-0 gradient-cream">
        <div className="space-y-4">
          <div className="flex gap-3">
            <div className="relative flex-1">
              <Link className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Enter your long URL here..."
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="pl-10 h-12 border-border/50 focus:border-primary bg-background/80"
                onKeyPress={(e) => e.key === 'Enter' && handleShorten()}
              />
            </div>
            <Button 
              onClick={handleShorten}
              disabled={isLoading}
              className="h-12 px-8 gradient-mocha border-0 text-primary-foreground hover:opacity-90 transition-all duration-300"
            >
              {isLoading ? "Shortening..." : "Shorten"}
            </Button>
          </div>
        </div>
      </Card>

      {/* Result Section */}
      {shortenedUrl && (
        <Card className="p-6 shadow-latte border-0 gradient-latte">
          <div className="space-y-3">
            <h3 className="font-medium text-foreground">Your shortened URL:</h3>
            <div className="flex items-center gap-3 p-3 rounded-lg bg-background/60 border border-border/30">
              <div className="flex-1">
                <p className="text-primary font-medium">https://{shortenedUrl}</p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleCopy}
                className="border-primary/20 hover:bg-primary/10"
              >
                {copied ? (
                  <CheckCircle className="w-4 h-4 text-green-600" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </Button>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};

export default URLShortener;