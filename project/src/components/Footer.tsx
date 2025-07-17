import React from 'react';
import { MapPin, Phone, Mail, Facebook, Twitter, Instagram } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white mt-12 pb-24">
      <div className="max-w-md mx-auto px-4 py-8">
        {/* Company Info */}
        <div className="text-center mb-6">
          <h3 className="text-2xl font-bold text-emerald-400 mb-2">Lunch Time Cafe</h3>
          <p className="text-gray-300 text-sm">
            Delicious food, freshly made!
          </p>
        </div>

        {/* Contact Information */}
        <div className="space-y-3 mb-6">
          <div className="flex items-center">
            <MapPin className="w-5 h-5 text-emerald-400 mr-3 flex-shrink-0" />
            <div>
              <p className="text-sm text-gray-300">Industrial Area, Atlantis</p>
              <p className="text-sm text-gray-300">Next to ENGEN Petrol Station</p>
            </div>
          </div>
          
          <div className="flex items-center">
            <Phone className="w-5 h-5 text-emerald-400 mr-3 flex-shrink-0" />
            <p className="text-sm text-gray-300">(021) 123-4567</p>
          </div>
          
          <div className="flex items-center">
            <Mail className="w-5 h-5 text-emerald-400 mr-3 flex-shrink-0" />
            <p className="text-sm text-gray-300">hello@foodieapp.com</p>
          </div>
        </div>

        {/* Social Media Links */}
        <div className="text-center mb-6">
          <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
          <div className="flex justify-center space-x-4">
            <a
              href="#"
              className="bg-gray-800 p-3 rounded-full hover:bg-emerald-600 transition-colors duration-200"
              aria-label="Facebook"
            >
              <Facebook className="w-5 h-5" />
            </a>
            <a
              href="#"
              className="bg-gray-800 p-3 rounded-full hover:bg-emerald-600 transition-colors duration-200"
              aria-label="Twitter"
            >
              <Twitter className="w-5 h-5" />
            </a>
            <a
              href="#"
              className="bg-gray-800 p-3 rounded-full hover:bg-emerald-600 transition-colors duration-200"
              aria-label="Instagram"
            >
              <Instagram className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Operating Hours */}
        <div className="text-center mb-6">
          <h4 className="text-lg font-semibold mb-3">Operating Hours</h4>
          <div className="space-y-1 text-sm text-gray-300">
            <p>Monday - Friday: 8:00 AM - 17:00 PM</p>
            <p>Saturday: 9:00 AM - 13:00 PM</p>
            <p>Sunday: Closed</p>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-700 pt-4 text-center">
          <p className="text-xs text-gray-400">
            © 2025 Lunch Time Cafe. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;