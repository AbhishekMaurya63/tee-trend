import React from 'react';
import { Users, Award, Heart, Target, Truck, Shield, Crown, Sparkles, Globe, TrendingUp } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const About = () => {
  const teamMembers = [
    {
      name: 'Sarah Johnson',
      role: 'Founder & CEO',
      image: '/placeholder.svg',
      description: 'Passionate about luxury fashion and sustainable craftsmanship.'
    },
    {
      name: 'Mike Chen',
      role: 'Head of Design',
      image: '/placeholder.svg',
      description: 'Creates timeless designs that blend elegance with modern aesthetics.'
    },
    {
      name: 'Emily Davis',
      role: 'Quality Manager',
      image: '/placeholder.svg',
      description: 'Ensures every product meets our exceptional quality standards.'
    },
    {
      name: 'David Wilson',
      role: 'Customer Success',
      image: '/placeholder.svg',
      description: 'Dedicated to providing unparalleled customer experiences.'
    }
  ];

  const values = [
    {
      icon: Crown,
      title: 'Excellence',
      description: 'We pursue perfection in every detail, from fabric selection to final stitching.'
    },
    {
      icon: Shield,
      title: 'Sustainability',
      description: 'Committed to eco-friendly practices and responsible luxury production.'
    },
    {
      icon: Users,
      title: 'Community',
      description: 'Building a community that appreciates timeless elegance and quality.'
    },
    {
      icon: TrendingUp,
      title: 'Innovation',
      description: 'Continuously evolving to bring you the finest in luxury fashion.'
    }
  ];

  const milestones = [
    { year: '2018', title: 'Brand Inception', description: 'Founded with a vision to redefine luxury fashion' },
    { year: '2019', title: 'First Collection', description: 'Launched our debut luxury collection' },
    { year: '2021', title: 'Global Recognition', description: 'Featured in international fashion publications' },
    { year: '2023', title: 'Eco Initiative', description: 'Introduced sustainable luxury production line' },
    { year: '2024', title: 'Worldwide Presence', description: 'Expanded to serve connoisseurs in 30+ countries' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-25 to-amber-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-amber-600 to-amber-800 text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-amber-400/30 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-500/20 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 lg:px-8 text-center relative z-10">
          <Badge className="bg-amber-500/20 text-amber-100 border-amber-400/30 px-4 py-1.5 text-sm font-medium rounded-full mb-6">
            <Sparkles className="h-4 w-4 mr-2" />
            Our Heritage
          </Badge>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            About <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-amber-400">AnantAttire</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-amber-100/90 leading-relaxed">
            We craft luxury clothing that embodies elegance, quality, and sustainability. 
            Each piece tells a story of exceptional craftsmanship and timeless design.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="space-y-2">
                <Badge className="bg-amber-500/10 text-amber-700 border-amber-400/20 px-4 py-1.5 text-sm font-medium rounded-full">
                  Our Purpose
                </Badge>
                <h2 className="text-3xl md:text-4xl font-bold text-amber-950 leading-tight">
                  Redefining Luxury Fashion
                </h2>
              </div>
              <p className="text-lg text-amber-800/90 leading-relaxed">
                At AnantAttire, we believe true luxury lies in the perfect harmony of exceptional quality, 
                timeless design, and sustainable practices. Our mission is to create clothing that not only 
                looks exquisite but feels extraordinary to wear.
              </p>
              <p className="text-lg text-amber-800/90 leading-relaxed">
                We're committed to ethical production, fair trade partnerships, and creating pieces that 
                become cherished additions to your wardrobe for years to come.
              </p>
              <div className="grid grid-cols-3 gap-8 pt-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-amber-700 mb-2">50K+</div>
                  <div className="text-sm text-amber-600/80">Luxury Clients</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-amber-700 mb-2">30+</div>
                  <div className="text-sm text-amber-600/80">Countries</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-amber-700 mb-2">98%</div>
                  <div className="text-sm text-amber-600/80">Satisfaction</div>
                </div>
              </div>
            </div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1603400521630-9f2de124b33b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80" 
                alt="Luxury Craftsmanship" 
                className="w-full h-[500px] object-cover rounded-2xl shadow-2xl shadow-amber-700/20"
              />
              <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-gradient-to-br from-amber-400/20 to-amber-600/10 rounded-full blur-xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gradient-to-b from-amber-100/50 to-amber-50">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="bg-amber-500/10 text-amber-700 border-amber-400/20 px-4 py-1.5 text-sm font-medium rounded-full mb-4">
              Core Values
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-amber-950 mb-4">
              The Principles That Guide Us
            </h2>
            <p className="text-xl text-amber-700/90 max-w-2xl mx-auto">
              These fundamental values shape every decision we make and every piece we create
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="shadow-lg border-amber-200 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <CardContent className="p-8">
                  <div className="w-20 h-20 bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-amber-500/30">
                    <value.icon className="h-10 w-10 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-amber-900 mb-4">{value.title}</h3>
                  <p className="text-amber-700/90 leading-relaxed">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      {/* <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="bg-amber-500/10 text-amber-700 border-amber-400/20 px-4 py-1.5 text-sm font-medium rounded-full mb-4">
              Our Journey
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-amber-950 mb-4">
              Milestones of Excellence
            </h2>
            <p className="text-xl text-amber-700/90">
              From visionary beginnings to becoming a symbol of luxury
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="space-y-12 relative">
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-amber-400 to-amber-600 transform -translate-x-1/2 z-0"></div>
              
              {milestones.map((milestone, index) => (
                <div key={index} className="flex items-start space-x-8 relative z-10">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-amber-600 rounded-full flex items-center justify-center text-white font-bold shadow-lg shadow-amber-500/30">
                      {milestone.year}
                    </div>
                  </div>
                  <div className="flex-1 bg-white p-6 rounded-2xl shadow-lg border border-amber-100">
                    <h3 className="text-xl font-semibold text-amber-900 mb-3">{milestone.title}</h3>
                    <p className="text-amber-700/90">{milestone.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section> */}

      {/* Team Section */}
      <section className="py-20 bg-gradient-to-b from-amber-100/50 to-amber-50">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="bg-amber-500/10 text-amber-700 border-amber-400/20 px-4 py-1.5 text-sm font-medium rounded-full mb-4">
              Our Team
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-amber-950 mb-4">
              The Visionaries Behind AnantAttire
            </h2>
            <p className="text-xl text-amber-700/90 max-w-2xl mx-auto">
              Meet the passionate individuals dedicated to redefining luxury fashion
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <Card key={index} className="shadow-lg border-amber-200 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <CardContent className="p-8">
                  <div className="w-32 h-32 mx-auto mb-6 relative">
                    <img 
                      src={member.image} 
                      alt={member.name}
                      className="w-full h-full rounded-2xl object-cover border-2 border-amber-200 shadow-md"
                    />
                    <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-gradient-to-br from-amber-500 to-amber-600 rounded-full flex items-center justify-center">
                      <Crown className="h-4 w-4 text-white" />
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-amber-900 mb-2">{member.name}</h3>
                  <p className="text-amber-600 font-medium mb-4">{member.role}</p>
                  <p className="text-amber-700/90 text-sm leading-relaxed">{member.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-amber-600 to-amber-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-64 h-64 bg-amber-400/30 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-amber-500/20 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 lg:px-8 text-center relative z-10">
          <Badge className="bg-amber-500/20 text-amber-100 border-amber-400/30 px-4 py-1.5 text-sm font-medium rounded-full mb-6">
            Join the Experience
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Experience Luxury Redefined
          </h2>
          <p className="text-xl mb-10 text-amber-100/90 max-w-2xl mx-auto leading-relaxed">
            Discover our exclusive collection and become part of our community of discerning individuals 
            who appreciate true craftsmanship and timeless elegance.
          </p>
          <Button 
            size="lg" 
            className="bg-white text-amber-700 hover:bg-amber-50 px-10 py-6 text-base font-semibold rounded-xl shadow-lg hover:shadow-amber-900/30 transition-all duration-300"
          >
            Explore Our Collections
          </Button>
        </div>
      </section>
    </div>
  );
};

export default About;