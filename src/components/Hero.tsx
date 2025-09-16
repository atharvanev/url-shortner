const Hero = () => {
  return (
    <div className="text-center space-y-6 mb-12">
      <div className="space-y-4">
        <h1 className="text-5xl md:text-6xl font-bold text-foreground tracking-tight">
          Shorten<span className="text-primary">This</span>URL
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Transform your long, complex URLs into short, shareable links in seconds.
          Simple, fast, and reliable.
        </p>
      </div>
      
      <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-primary rounded-full"></div>
          <span>No registration required</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-primary rounded-full"></div>
          <span>Free forever</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-primary rounded-full"></div>
          <span>Instant results</span>
        </div>
      </div>
    </div>
  );
};

export default Hero;