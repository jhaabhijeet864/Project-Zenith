import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import Button from '../ui/Button';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { currentUser, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || location.pathname !== '/' ? 
        'bg-white shadow-md py-3' : 
        'bg-transparent py-5'
      }`}
    >
      {/* Rest of the component remains the same */}
    </nav>
  );
};

export default Navbar;
