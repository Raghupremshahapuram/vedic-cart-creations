import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Button } from '@/components/ui/button';

const Signup = () => {
  const [isRegister, setIsRegister] = useState(false);

  return (
    <>
      <Helmet>
        <title>Cow Products - Login / Register</title>
        <meta
          name="description"
          content="Login or Register to buy authentic cow ghee, natural wellness goods, and Vedic products."
        />
      </Helmet>

      <div className="flex flex-col min-h-screen font-poppins bg-background py-12">
        <div className="flex-grow flex items-center justify-center px-4">
          <div className="relative w-[850px] h-[550px] bg-white rounded-2xl shadow-xl overflow-hidden">
            
            {/* Form Section */}
            <div
              className={`absolute top-0 left-0 w-1/2 h-full p-8 transition-transform duration-700 bg-white z-20 flex flex-col justify-center ${
                isRegister ? 'translate-x-full' : ''
              }`}
            >
              <h2 className="text-3xl font-bold mb-6 text-center">
                {isRegister ? 'Register' : 'Login'}
              </h2>

              <form className="space-y-5">
                {isRegister && (
                  <input
                    type="text"
                    placeholder="Name"
                    className="w-full px-4 py-2 bg-gray-100 rounded-md"
                  />
                )}
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full px-4 py-2 bg-gray-100 rounded-md"
                />
                <input
                  type="password"
                  placeholder="Password"
                  className="w-full px-4 py-2 bg-gray-100 rounded-md"
                />
                {isRegister && (
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    className="w-full px-4 py-2 bg-gray-100 rounded-md"
                  />
                )}

                {!isRegister && (
                  <a
                    href="#"
                    className="text-sm text-gray-500 hover:underline block text-right"
                  >
                    Forgot password?
                  </a>
                )}

                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-gradient-to-r from-sacred to-accent text-sacred-foreground hover:from-sacred/90 hover:to-accent/90 rounded-md"
                >
                  {isRegister ? 'Sign Up' : 'Login'}
                </Button>
              </form>

              {/* Inline Toggle (Mobile Friendly) */}
              <div className="mt-6 text-center text-sm text-muted-foreground block md:hidden">
                {isRegister ? (
                  <>
                    Already have an account?{' '}
                    <button
                      onClick={() => setIsRegister(false)}
                      className="text-sacred underline"
                    >
                      Login
                    </button>
                  </>
                ) : (
                  <>
                    Don’t have an account?{' '}
                    <button
                      onClick={() => setIsRegister(true)}
                      className="text-sacred underline"
                    >
                      Register
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* Right Panel (Register Info) */}
            <div
                    className={`absolute top-0 right-0 w-1/2 h-full bg-[#a8f642] text-black flex flex-col justify-center items-center transition-all duration-700 ${
                        isRegister
                        ? 'z-10 opacity-0 pointer-events-none'
                        : 'z-30 opacity-100'
                    }`}
                    >
                    <h1 className="text-4xl font-bold mb-4">Hello, Friend!</h1>
                    <p className="text-sm mb-6 text-center px-6">
                        Enter your personal details to register
                    </p>
                    <button
                        className="border-2 border-black px-6 py-2 rounded-lg"
                        onClick={() => setIsRegister(true)}
                    >
                        Register
                    </button>
                    </div>


            {/* Left Panel (Login Info) */}
            <div
              className={`absolute top-0 left-0 w-1/2 h-full bg-[#a8f642] text-black flex flex-col justify-center items-center transition-all duration-700 ${
                isRegister
                  ? 'z-30 opacity-100'
                  : 'z-10 opacity-0 pointer-events-none'
              }`}
            >
              <h1 className="text-4xl font-bold mb-4">Welcome Back!</h1>
              <p className="text-sm mb-6 text-center px-6">
                To keep connected, login with your personal info
              </p>
              <button
                className="border-2 border-black px-6 py-2 rounded-lg"
                onClick={() => setIsRegister(false)}
              >
                Login
              </button>
            </div>
          </div>
        </div>

       
      </div>
    </>
  );
};

export default Signup;



