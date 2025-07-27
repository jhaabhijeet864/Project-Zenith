import React from 'react';
import { BarChart3, TrendingUp, Award, PieChart, Zap, ShieldCheck } from 'lucide-react';

const features = [
  {
    title: "Predictive Analytics",
    description: "Utilize advanced machine learning to predict startup success based on key metrics and industry benchmarks.",
    icon: <TrendingUp className="w-6 h-6 text-blue-500" />
  },
  {
    title: "Market Insights",
    description: "Analyze market trends and competitor performance to position your startup strategically.",
    icon: <BarChart3 className="w-6 h-6 text-blue-500" />
  },
  {
    title: "Success Metrics",
    description: "Track and measure your progress against proven success indicators and industry leaders.",
    icon: <Award className="w-6 h-6 text-blue-500" />
  },
  {
    title: "Performance Dashboard",
    description: "Visualize your startup's performance metrics in real-time with intuitive charts and graphs.",
    icon: <PieChart className="w-6 h-6 text-blue-500" />
  },
  {
    title: "Actionable Recommendations",
    description: "Get AI-powered recommendations to improve your business strategy and maximize growth potential.",
    icon: <Zap className="w-6 h-6 text-blue-500" />
  },
  {
    title: "Secure Data Handling",
    description: "Your business data is encrypted and protected with enterprise-grade security protocols.",
    icon: <ShieldCheck className="w-6 h-6 text-blue-500" />
  }
];

const Features: React.FC = () => {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
            Powerful Features for Startup Success
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Our AI-powered platform provides everything you need to analyze, predict, and enhance your startup's performance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow border border-gray-100"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-50 rounded-lg mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;