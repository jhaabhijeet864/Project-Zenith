import React from 'react';

interface TestimonialProps {
  content: string;
  author: string;
  role: string;
  image: string;
}

const testimonials: TestimonialProps[] = [
  {
    content: "Zenith's AI predictions helped us pivot our business model at the perfect time. We've seen 3x growth since implementing their recommendations.",
    author: "Sarah Johnson",
    role: "CEO, TechNova",
    image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100"
  },
  {
    content: "The insights from Zenith were instrumental in our funding round. The data-backed predictions gave investors confidence in our trajectory.",
    author: "Michael Chen",
    role: "Founder, DataSync",
    image: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=100"
  },
  {
    content: "As a first-time founder, Zenith's platform gave me clarity on which metrics matter most. It's like having a seasoned advisor in your pocket.",
    author: "Amara Okafor",
    role: "Founder, EduSpark",
    image: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=100"
  }
];

const TestimonialCard: React.FC<TestimonialProps> = ({ content, author, role, image }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 flex flex-col h-full">
      <div className="mb-4">
        <svg width="45" height="36" className="text-blue-500 mb-4 opacity-30" viewBox="0 0 45 36" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M13.4 36C8.86667 36 5.2 34.4667 2.4 31.4C0.8 29 0 26.2667 0 23.2C0 16.9333 3.06667 11.4 9.2 6.6L20 0L22.8 4.8C17.4667 8.13333 14.2667 11.5333 13.2 15C14.1333 14.6 15.2 14.4 16.4 14.4C18.9333 14.4 21.0667 15.2667 22.8 17C24.5333 18.7333 25.4 21 25.4 23.8C25.4 26.7333 24.4667 29.2 22.6 31.2C20.7333 34.4 17.5333 36 13.4 36ZM34.6 36C30.0667 36 26.4 34.4667 23.6 31.4C22 29 21.2 26.2667 21.2 23.2C21.2 16.9333 24.2667 11.4 30.4 6.6L41.2 0L44 4.8C38.6667 8.13333 35.4667 11.5333 34.4 15C35.3333 14.6 36.4 14.4 37.6 14.4C40.1333 14.4 42.2667 15.2667 44 17C45.7333 18.7333 46.6 21 46.6 23.8C46.6 26.7333 45.6667 29.2 43.8 31.2C41.9333 34.4 38.7333 36 34.6 36Z" />
        </svg>
      </div>
      <p className="text-gray-700 mb-6 flex-grow">{content}</p>
      <div className="flex items-center">
        <img 
          src={image} 
          alt={author} 
          className="w-12 h-12 rounded-full object-cover mr-4" 
        />
        <div>
          <h4 className="font-medium text-gray-900">{author}</h4>
          <p className="text-sm text-gray-500">{role}</p>
        </div>
      </div>
    </div>
  );
};

const Testimonials: React.FC = () => {
  return (
    <section className="py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
            Trusted by Innovative Startups
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Hear from founders who have transformed their businesses with our AI-powered insights.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} {...testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;