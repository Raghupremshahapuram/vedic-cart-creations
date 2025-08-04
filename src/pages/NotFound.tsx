import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Leaf, Home } from "lucide-react";
import bgGif from "@/assets/bg.gif";

const NotFound = () => {
  return (
    <section className="min-h-screen bg-gradient-to-br from-background via-secondary to-accent/20 flex items-center justify-center font-poppins">
      <div className="container mx-auto px-6">
        <Card className="max-w-2xl mx-auto border-0 shadow-warm bg-card/80 backdrop-blur-sm">
          <CardContent className="p-12 text-center">
            {/* Natural Icon */}
            <div className="w-20 h-20 bg-gradient-to-r from-nature to-accent rounded-full flex items-center justify-center mx-auto mb-6 animate-glow">
              <Leaf className="w-10 h-10 text-nature-foreground" />
            </div>

            {/* 404 Heading with Natural Styling */}
            <h1 className="text-6xl sm:text-8xl font-bold text-primary mb-4 animate-fade-in">
              404
            </h1>

            {/* Background GIF with Natural Frame */}
            <div className="relative mb-8">
              <div
                className="w-full h-48 sm:h-64 bg-center bg-no-repeat bg-cover rounded-2xl border-4 border-accent/30 shadow-soft overflow-hidden"
                style={{
                  backgroundImage: `url(${bgGif})`,
                }}
              >
                <div className="w-full h-full bg-gradient-to-t from-primary/20 to-transparent"></div>
              </div>
            </div>

            {/* Natural Content */}
            <div className="space-y-4">
              <h2 className="text-2xl sm:text-3xl font-semibold text-primary mb-2">
                Oops! You've wandered off the path
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                The page you're looking for seems to have gone back to nature. 
                Let's guide you back to our organic collection!
              </p>

              {/* Natural Button with Sacred Colors */}
              <Link to="/">
                <Button size="lg" className="rounded-2xl px-8 py-4 bg-gradient-to-r from-sacred to-accent hover:from-sacred/90 hover:to-accent/90 text-sacred-foreground shadow-warm">
                  <Home className="mr-2 w-5 h-5" />
                  Return to Home
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default NotFound;
