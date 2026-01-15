export interface Testimonial {
  id: string;
  name: string;
  designation: string;
  industry: string;
  message: string;
  rating: number;
  isActive: boolean;
  createdAt: string;
  image?: string;
}

export const testimonials: Testimonial[] = [
  {
    id: 'test-1',
    name: 'Rajesh Kumar',
    designation: 'IT Manager',
    industry: 'Corporate IT',
    message: 'YANTRAQ has been our trusted partner for over 5 years. Their CCTV and server solutions have transformed our infrastructure. The team responds quickly to any issues, and their AMC service gives us peace of mind knowing our systems are always maintained.',
    rating: 5,
    isActive: true,
    createdAt: '2024-01-15',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
  },
  {
    id: 'test-2',
    name: 'Dr. Priya Sharma',
    designation: 'Principal',
    industry: 'Education',
    message: 'We deployed biometric attendance systems and CCTV cameras across our campus with YANTRAQ. The installation was professional, and the ongoing support has been exceptional. Our campus security has improved significantly.',
    rating: 5,
    isActive: true,
    createdAt: '2024-02-20',
    image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
  },
  {
    id: 'test-3',
    name: 'Amit Verma',
    designation: 'Operations Director',
    industry: 'Manufacturing',
    message: 'The GPS tracking solutions from YANTRAQ helped us optimize our fleet operations. Real-time monitoring and geofencing have reduced our fuel costs by 20%. Their technical expertise and reliable service make them stand out.',
    rating: 5,
    isActive: true,
    createdAt: '2024-03-10',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
  },
  {
    id: 'test-4',
    name: 'Neha Agarwal',
    designation: 'Founder & CEO',
    industry: 'Startup',
    message: 'As a growing startup, we needed flexible IT solutions without heavy upfront costs. YANTRAQ\'s rental services for laptops and networking equipment allowed us to scale quickly. Their team understood our needs and delivered beyond expectations.',
    rating: 5,
    isActive: true,
    createdAt: '2024-04-05',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
  },
  {
    id: 'test-5',
    name: 'Sandeep Patel',
    designation: 'Head of Operations',
    industry: 'Enterprise',
    message: 'YANTRAQ manages our entire IT infrastructure across 3 locations. From servers to network switches to security systems — everything runs smoothly. Their proactive maintenance approach has virtually eliminated downtime for us.',
    rating: 5,
    isActive: true,
    createdAt: '2024-05-12',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
  },
  {
    id: 'test-6',
    name: 'Kavita Reddy',
    designation: 'Administrator',
    industry: 'Healthcare',
    message: 'We trust YANTRAQ for all our IT needs at our multi-specialty hospital. Their understanding of healthcare requirements, combined with enterprise-grade solutions, makes them the perfect partner. Highly recommended!',
    rating: 5,
    isActive: true,
    createdAt: '2024-06-18',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
  },
];

export const getActiveTestimonials = () => {
  return testimonials.filter(t => t.isActive);
};
