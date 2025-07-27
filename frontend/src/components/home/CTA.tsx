import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../ui/Button';

const CTA: React.FC = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-700">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
          Ready to Accelerate Your Startup's Growth?
        </h2>
        <p className="text-xl text-blue-100 max-w-2xl mx-auto mb-8">
          Join thousands of successful founders who use Zenith to make data-driven decisions.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link to="/signup">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
              Start Free Trial
            </Button>
          </Link>
          <Link to="/contact">
            <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
              Contact Sales
            </Button>
          </Link>
        </div>
        <p className="text-blue-200 mt-6">
          No credit card required. 14-day free trial.
        </p>
      </div>
    </section>
  );
};

export default CTA;