import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, MessageCircle, HeadphonesIcon, HelpCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { postDataHandler } from '@/config/services'

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "Please fill required fields",
        description: "Name, email, and message are required.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    const data = {
      name: formData.name,
      email: formData.email,
      subject: formData.subject,
      message: formData.message
    };

    try {
      await postDataHandler("contact", data);
      
      toast({
        title: "Message sent successfully!",
        description: "We'll get back to you within 24 hours.",
      });

      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      toast({
        title: "Error sending message",
        description: "Please try again or contact support.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: 'Visit Our Boutique',
      details: ['123 Luxury Avenue', 'Mumbai 400001', 'India'],
      color: 'text-amber-600'
    },
    {
      icon: Phone,
      title: 'Call Us',
      details: ['+91 98765 43210', '+91 91234 56789', 'Mon-Sat 10am-7pm IST'],
      color: 'text-amber-600'
    },
    {
      icon: Mail,
      title: 'Email Us',
      details: ['info@anantattire.com', 'support@anantattire.com', 'inquiries@anantattire.com'],
      color: 'text-amber-600'
    },
    {
      icon: Clock,
      title: 'Business Hours',
      details: ['Monday - Saturday: 10am - 7pm', 'Sunday: By appointment only'],
      color: 'text-amber-600'
    }
  ];

  const faqs = [
    {
      question: "What is your return policy?",
      answer: "We offer a 30-day return policy for all unworn items in original condition. Luxury items must be returned with all original packaging and tags attached."
    },
    {
      question: "How long does shipping take?",
      answer: "Standard shipping takes 3-5 business days within India. International shipping takes 7-14 business days. We offer express shipping options for urgent orders."
    },
    {
      question: "Do you offer custom sizing?",
      answer: "Yes, we provide bespoke tailoring services for custom sizing. Please contact our concierge team to discuss your specific requirements and measurements."
    },
    {
      question: "Are your products sustainably made?",
      answer: "Absolutely. We're committed to sustainable luxury. Our products are crafted using eco-friendly materials and ethical production practices."
    },
    {
      question: "How do I care for my luxury garments?",
      answer: "Each piece comes with specific care instructions. We recommend dry cleaning for most luxury items and proper storage to maintain their pristine condition."
    },
    {
      question: "Do you offer international shipping?",
      answer: "Yes, we ship worldwide. International orders may be subject to customs duties and taxes based on your country's regulations."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-amber-100">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-amber-600 to-amber-800 text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-amber-400/30 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-500/20 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 lg:px-8 text-center relative z-10">
          <span className="bg-amber-500/20 text-amber-100 border border-amber-400/30 px-4 py-1.5 rounded-full text-sm font-medium inline-flex items-center mb-6">
            <MessageCircle className="h-4 w-4 mr-2" />
            Get in Touch
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            Contact <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-amber-400">AnantAttire</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-amber-100/90 leading-relaxed">
            Have questions about our luxury collections? Need personalized styling advice? 
            Our concierge team is here to provide exceptional service and support.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-2xl border border-amber-200 overflow-hidden">
              <div className="bg-gradient-to-r from-amber-50 to-amber-100 border-b border-amber-200 px-6 py-4">
                <h2 className="text-2xl text-amber-900 font-semibold flex items-center">
                  <Send className="h-6 w-6 mr-3 text-amber-600" />
                  Send us a Message
                </h2>
              </div>
              <div className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="name" className="block text-amber-900 font-medium">Full Name *</label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        placeholder="Your full name"
                        className="w-full px-3 py-2 border border-amber-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="block text-amber-900 font-medium">Email Address *</label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        placeholder="your.email@example.com"
                        className="w-full px-3 py-2 border border-amber-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="subject" className="block text-amber-900 font-medium">Subject</label>
                    <input
                      id="subject"
                      name="subject"
                      type="text"
                      value={formData.subject}
                      onChange={handleInputChange}
                      placeholder="What can we help you with?"
                      className="w-full px-3 py-2 border border-amber-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="message" className="block text-amber-900 font-medium">Message *</label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={6}
                      placeholder="Tell us how we can assist you with your luxury needs..."
                      className="w-full px-3 py-2 border border-amber-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                    />
                  </div>
                  
                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white py-3 rounded-lg font-semibold shadow-lg hover:shadow-amber-700/30 transition-all duration-300 inline-flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="h-5 w-5 mr-3" />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-6">
            {contactInfo.map((info, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg border border-amber-200 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl flex items-center justify-center flex-shrink-0">
                      <info.icon className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-amber-900 text-lg mb-3">{info.title}</h3>
                      <div className="space-y-2">
                        {info.details.map((detail, i) => (
                          <p key={i} className="text-amber-700 text-sm">
                            {detail}
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-20">
          <div className="text-center mb-16">
            <span className="bg-amber-500/10 text-amber-700 border border-amber-400/20 px-4 py-1.5 rounded-full text-sm font-medium inline-flex items-center mb-4">
              <HelpCircle className="h-4 w-4 mr-2" />
              Common Questions
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-amber-950 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-amber-700 max-w-2xl mx-auto">
              Quick answers to common questions about our luxury services
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg border border-amber-200 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="p-6">
                  <h3 className="font-semibold text-amber-900 text-lg mb-4 flex items-start">
                    <span className="w-6 h-6 bg-amber-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                      <span className="text-amber-600 font-bold text-sm">Q</span>
                    </span>
                    {faq.question}
                  </h3>
                  <p className="text-amber-700 text-sm leading-relaxed flex items-start">
                    <span className="w-6 h-6 bg-amber-50 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                      <span className="text-amber-500 font-bold text-xs">A</span>
                    </span>
                    {faq.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Map Section */}
        <div className="mt-20">
          <div className="bg-white rounded-xl shadow-2xl border border-amber-200 overflow-hidden">
            <div className="bg-gradient-to-r from-amber-50 to-amber-100 border-b border-amber-200 px-6 py-4">
              <h2 className="text-2xl text-amber-900 font-semibold flex items-center">
                <MapPin className="h-6 w-6 mr-3 text-amber-600" />
                Visit Our Luxury Boutique
              </h2>
            </div>
            <div className="p-8">
              <div className="aspect-video bg-gradient-to-br from-amber-100 to-amber-50 rounded-2xl border-2 border-amber-200 flex items-center justify-center shadow-inner">
                <div className="text-center p-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <MapPin className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-amber-900 mb-3">AnantAttire Boutique</h3>
                  <p className="text-amber-700 mb-2">123 Luxury Avenue</p>
                  <p className="text-amber-700 mb-4">Mumbai 400001, India</p>
                  <p className="text-sm text-amber-600">
                    Interactive map integration would be implemented here
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Support Banner */}
        <div className="mt-16 bg-gradient-to-r from-amber-600 to-amber-700 rounded-2xl p-8 text-center text-white shadow-2xl">
          <div className="max-w-2xl mx-auto">
            <HeadphonesIcon className="h-12 w-12 mx-auto mb-4 text-amber-200" />
            <h3 className="text-2xl font-semibold mb-3">Need Immediate Assistance?</h3>
            <p className="text-amber-100 mb-6">
              Our luxury concierge team is available to provide personalized service and answer your questions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-amber-700 hover:bg-amber-50 px-8 py-2 rounded-md font-medium inline-flex items-center">
                <Phone className="h-4 w-4 mr-2" />
                Call Now
              </button>
              <button className="border border-amber-300 text-amber-100 hover:bg-amber-500 px-8 py-2 rounded-md font-medium inline-flex items-center">
                <Mail className="h-4 w-4 mr-2" />
                Email Support
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;