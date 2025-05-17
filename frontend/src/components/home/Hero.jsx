import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../ui/Button';

const Hero = () => {
  return (
    <div className="relative min-h-screen bg-black overflow-hidden">
      {/* Background animation */}
      <div className="absolute inset-0">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob"></div>
        <div className="absolute top-0 -right-4 w-72 h-72 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-32 left-20 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative container mx-auto px-4 py-32 flex flex-col items-center text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
          <span className="block">Zenith</span>
          <span className="block mt-2 bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
            AI Powered Startup Success Predictor
          </span>
        </h1>
        
        <p className="text-lg md:text-xl text-gray-300 max-w-2xl mb-10">
          Harness the power of advanced machine learning to predict your startup's success. Make data-driven decisions and unlock your company's full potential.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 mb-16">
          <Link to="/signup">
            <Button size="lg" className="group">
              Get Started 
              <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
          <Link to="/demo">
            <Button variant="outline" size="lg" className="bg-white/5 text-white border-white/20 hover:bg-white/10">
              View Demo
            </Button>
          </Link>
        </div>
        
        <div className="flex flex-wrap justify-center gap-8 mb-20">
          <div className="flex items-center space-x-2">
            <div className="bg-white/10 rounded-full p-2">
              <svg className="w-6 h-6 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <span className="text-gray-300">99.9% Accuracy</span>
          </div>
          
          <div className="flex items-center space-x-2">
            <div className="bg-white/10 rounded-full p-2">
              <svg className="w-6 h-6 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <span className="text-gray-300">Real-time Analysis</span>
          </div>
          
          <div className="flex items-center space-x-2">
            <div className="bg-white/10 rounded-full p-2">
              <svg className="w-6 h-6 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <span className="text-gray-300">Data Privacy</span>
          </div>
        </div>
      </div>

      {/* Wave effect at the bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-b from-transparent to-white dark:to-gray-900"></div>
    </div>
  );
};

export default Hero;