import React from 'react';
import { Link } from 'react-router-dom';

function Hero() {
  return (
    <section className="hero">
      <h1>
        <span>Zenith</span>
        <span className="block mt-2">AI Powered Startup Success Predictor</span>
      </h1>
      
      <p>
        Harness the power of advanced machine learning to predict your startup's success.
        Make data-driven decisions and unlock your company's full potential.
      </p>
      
      <div className="buttons">
        <Link to="/signup" className="primary">Get Started</Link>
        <Link to="/demo" className="secondary">View Demo</Link>
      </div>
      
      <div className="flex flex-wrap justify-center gap-8 mt-16">
        <div className="flex items-center space-x-2">
          <div className="bg-white/10 rounded-full p-2">
            <svg className="w-6 h-6 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          </div>
          <span>99.9% Accuracy</span>
        </div>
        
        <div className="flex items-center space-x-2">
          <div className="bg-white/10 rounded-full p-2">
            <svg className="w-6 h-6 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          </div>
          <span>Real-time Analysis</span>
        </div>
        
        <div className="flex items-center space-x-2">
          <div className="bg-white/10 rounded-full p-2">
            <svg className="w-6 h-6 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          </div>
          <span>Data Privacy</span>
        </div>
      </div>
    </section>
  );
}

export default Hero;