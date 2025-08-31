import React from 'react';
import { Users, Award, Heart, Target, Truck, Shield } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const About = () => {
  const teamMembers = [
    {
      name: 'Sarah Johnson',
      role: 'Founder & CEO',
      image: '/placeholder.svg',
      description: 'Passionate about sustainable fashion and quality craftsmanship.'
    },
    {
      name: 'Mike Chen',
      role: 'Head of Design',
      image: '/placeholder.svg',
      description: 'Creates timeless designs that blend comfort with style.'
    },
    {
      name: 'Emily Davis',
      role: 'Quality Manager',
      image: '/placeholder.svg',
      description: 'Ensures every product meets our high-quality standards.'
    },
    {
      name: 'David Wilson',
      role: 'Customer Success',
      image: '/placeholder.svg',
      description: 'Dedicated to providing exceptional customer experiences.'
    }
  ];

  const values = [
    {
      icon: Heart,
      title: 'Quality First',
      description: 'We never compromise on quality. Every t-shirt is crafted with premium materials and attention to detail.'
    },
    {
      icon: Shield,
      title: 'Sustainability',
      description: 'We are committed to sustainable practices and eco-friendly production methods.'
    },
    {
      icon: Users,
      title: 'Community',
      description: 'We believe in building a community of people who appreciate quality and style.'
    },
    {
      icon: Target,
      title: 'Innovation',
      description: 'We continuously innovate to bring you the latest in comfort and design.'
    }
  ];

  const milestones = [
    { year: '2018', title: 'Company Founded', description: 'Started with a vision to create the perfect t-shirt' },
    { year: '2019', title: 'First Collection', description: 'Launched our first premium cotton collection' },
    { year: '2021', title: '50K+ Customers', description: 'Reached 50,000 satisfied customers worldwide' },
    { year: '2023', title: 'Eco Initiative', description: 'Launched our sustainable production line' },
    { year: '2024', title: 'Global Expansion', description: 'Expanded to serve customers in 25+ countries' }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-hero text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">About TeeShop</h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-white/90">
            We're passionate about creating premium t-shirts that combine comfort, style, and sustainability. 
            Every piece tells a story of quality craftsmanship and attention to detail.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Mission</h2>
              <p className="text-lg text-muted-foreground mb-6">
                At TeeShop, we believe that everyone deserves to wear clothes that make them feel confident and comfortable. 
                Our mission is to create premium quality t-shirts that not only look great but also stand the test of time.
              </p>
              <p className="text-lg text-muted-foreground mb-6">
                We're committed to sustainable practices, fair trade, and creating products that our customers will love 
                and cherish for years to come.
              </p>
              <div className="flex items-center space-x-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-brand-primary">100K+</div>
                  <div className="text-sm text-muted-foreground">Happy Customers</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-brand-primary">500+</div>
                  <div className="text-sm text-muted-foreground">Products Sold</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-brand-primary">25+</div>
                  <div className="text-sm text-muted-foreground">Countries</div>
                </div>
              </div>
            </div>
            <div className="relative">
              <img 
                src="/placeholder.svg" 
                alt="Our Story" 
                className="w-full h-auto rounded-lg shadow-product"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Values</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              These core values guide everything we do and help us create products you'll love
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <Card key={index} className="shadow-card text-center">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-gradient-hero rounded-full flex items-center justify-center mx-auto mb-4">
                    <value.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Journey</h2>
            <p className="text-xl text-muted-foreground">
              From a small startup to a global brand - here's our story
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              {milestones.map((milestone, index) => (
                <div key={index} className="flex items-start space-x-6">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-brand-primary rounded-full flex items-center justify-center text-white font-bold">
                      {milestone.year}
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-2">{milestone.title}</h3>
                    <p className="text-muted-foreground">{milestone.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Meet Our Team</h2>
            <p className="text-xl text-muted-foreground">
              The passionate people behind TeeShop
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member, index) => (
              <Card key={index} className="shadow-card text-center">
                <CardContent className="p-6">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                  />
                  <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                  <p className="text-brand-primary font-medium mb-3">{member.role}</p>
                  <p className="text-sm text-muted-foreground">{member.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-hero text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Join Our Story</h2>
          <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
            Become part of our community and experience the difference quality makes
          </p>
          <Button variant="hero" size="lg" className="bg-white text-brand-primary hover:bg-white/90">
            Shop Our Collection
          </Button>
        </div>
      </section>
    </div>
  );
};

export default About;