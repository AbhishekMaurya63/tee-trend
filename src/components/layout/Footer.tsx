import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Crown, Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-amber-50 to-amber-25 border-t border-amber-200">
      <div className="container mx-auto px-4 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-16">
          {/* Company Info */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="w-12 h-12 bg-gradient-to-br from-amber-600 to-amber-800 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-300">
                <Crown className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-amber-700 to-amber-900 bg-clip-text text-transparent">
                AnantAttire
              </span>
            </Link>
            <p className="text-amber-700/90 text-base leading-relaxed max-w-xs">
              Premium luxury clothing designed for the modern connoisseur. Experience elegance redefined with our exquisite collections.
            </p>
            <div className="flex space-x-5 pt-2">
              {/* <a href="#" className="text-amber-600 hover:text-amber-800 transition-colors duration-300 transform hover:scale-110">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" className="text-amber-600 hover:text-amber-800 transition-colors duration-300 transform hover:scale-110">
                <Twitter className="h-6 w-6" />
              </a> */}
              <a href="https://www.instagram.com/anant_attire?igsh=bTEzMmhmMGFzczJq" target='_blank' className="text-amber-600 hover:text-amber-800 transition-colors duration-300 transform hover:scale-110">
                <Instagram className="h-6 w-6" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h3 className="font-semibold text-amber-900 text-lg border-b border-amber-200 pb-2">Quick Links</h3>
            <div className="space-y-4">
              <Link to="/products" className="block text-amber-700/90 hover:text-amber-800 transition-colors duration-300 hover:translate-x-1">
                All Collections
              </Link>
              <Link to="/about" className="block text-amber-700/90 hover:text-amber-800 transition-colors duration-300 hover:translate-x-1">
                Our Heritage
              </Link>
              <Link to="/contact" className="block text-amber-700/90 hover:text-amber-800 transition-colors duration-300 hover:translate-x-1">
                Contact Us
              </Link>
              <Link to="/cart" className="block text-amber-700/90 hover:text-amber-800 transition-colors duration-300 hover:translate-x-1">
                Shopping Cart
              </Link>
            </div>
          </div>

          {/* Customer Service */}
          <div className="space-y-6">
            <h3 className="font-semibold text-amber-900 text-lg border-b border-amber-200 pb-2">Customer Care</h3>
            <div className="space-y-4">
              <a href="#" className="block text-amber-700/90 hover:text-amber-800 transition-colors duration-300 hover:translate-x-1">
                Size Guide
              </a>
              <a href="#" className="block text-amber-700/90 hover:text-amber-800 transition-colors duration-300 hover:translate-x-1">
                Shipping Information
              </a>
              <a href="#" className="block text-amber-700/90 hover:text-amber-800 transition-colors duration-300 hover:translate-x-1">
                Returns & Exchanges
              </a>
              <a href="#" className="block text-amber-700/90 hover:text-amber-800 transition-colors duration-300 hover:translate-x-1">
                FAQ
              </a>
              <a href="#" className="block text-amber-700/90 hover:text-amber-800 transition-colors duration-300 hover:translate-x-1">
                Privacy Policy
              </a>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <h3 className="font-semibold text-amber-900 text-lg border-b border-amber-200 pb-2">Contact Us</h3>
            <div className="space-y-5">
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                  <Phone className="h-5 w-5 text-amber-700" />
                </div>
                <div>
                  <p className="font-medium text-amber-900">Phone</p>
                  <p className="text-amber-700/90">+91 9236862521</p>
                  <p className="text-amber-700/90">+91 8423537845</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                  <Mail className="h-5 w-5 text-amber-700" />
                </div>
                <div>
                  <p className="font-medium text-amber-900">Email</p>
                  <p className="text-amber-700/90">anantattire355@gmail.com</p>
                  <p className="text-amber-700/90">anantmaurya355@gmail.com</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                  <MapPin className="h-5 w-5 text-amber-700" />
                </div>
                <div>
                  <p className="font-medium text-amber-900">Address</p>
                  <p className="text-amber-700/90">Besahupur Shakarmandi, Sadar Jaunpur 222001 Uttar Pradesh, India</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-amber-200 text-center">
          <p className="text-amber-700/80 text-sm flex items-center justify-center">
            Made with <Heart className="h-4 w-4 text-amber-600 mx-1" /> in India • 
            <span className="ml-1">&copy; 2025 AnantAttire. All rights reserved.</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;