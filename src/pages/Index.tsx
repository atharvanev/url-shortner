import Hero from "@/components/Hero";
import URLShortener from "@/components/URLShortener";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-card to-secondary">
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto">
          <Hero />
          <URLShortener />
        </div>
      </div>
      
      {/* Subtle background decoration */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/4 -left-64 w-96 h-96 gradient-mocha rounded-full opacity-10 blur-3xl"></div>
        <div className="absolute bottom-1/4 -right-64 w-96 h-96 gradient-latte rounded-full opacity-10 blur-3xl"></div>
      </div>
    </div>
  );
};

export default Index;
