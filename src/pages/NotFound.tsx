import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button"; // shadcn button
import bgGif from "@/assets/bg.gif"; // assuming bg.gif is in src/assets/

const NotFound = () => {
  return (
    <section className="min-h-screen flex items-center justify-center bg-white font-serif">
      <div className="max-w-4xl w-full px-4 text-center">
        {/* Heading */}
        <h1 className="text-[70px] sm:text-[100px] font-extrabold text-black drop-shadow-lg">
          404
        </h1>

        {/* Background GIF */}
        <div
          className="w-full h-64 sm:h-96 bg-center bg-no-repeat bg-cover flex items-center justify-center"
          style={{
            backgroundImage: `url(${bgGif})`,
          }}
        ></div>

        {/* Spacer for Line Break */}
        <div className="h-6 sm:h-10" />

        {/* Content */}
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold mb-2">
            Look like you're lost
          </h2>
          <p className="text-gray-600 mb-6">
            The page you are looking for is not available!
          </p>

          {/* ShadCN Button */}
          <Link to="/">
            <Button className="bg-[#39ac31] hover:bg-[#2f912a] text-white px-6 py-2 rounded-lg">
              Go to Home
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default NotFound;
