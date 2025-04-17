import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Search, ShoppingBag } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-white py-4 border-b border-alteris-gray-light fixed w-full z-50">
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Логотип */}
        <Link to="/" className="flex items-center">
          <span className="text-2xl font-futura tracking-wide">ALTERIS</span>
        </Link>

        {/* Навигация для десктопа */}
        <nav className="hidden md:flex space-x-8">
          <Link to="/catalog" className="text-sm font-medium hover:text-alteris-gray transition-colors">
            КАТАЛОГ
          </Link>
          <Link to="/portfolio" className="text-sm font-medium hover:text-alteris-gray transition-colors">
            ПОРТФОЛИО
          </Link>
          <Link to="/about" className="text-sm font-medium hover:text-alteris-gray transition-colors">
            О НАС
          </Link>
          <Link to="/delivery" className="text-sm font-medium hover:text-alteris-gray transition-colors">
            ДОСТАВКА
          </Link>
          <Link to="/contacts" className="text-sm font-medium hover:text-alteris-gray transition-colors">
            КОНТАКТЫ
          </Link>
        </nav>

        {/* Иконки справа */}
        <div className="flex items-center space-x-4">
          <button aria-label="Поиск" className="p-2 hover:bg-alteris-gray-light rounded-full">
            <Search className="h-5 w-5" />
          </button>
          <Link to="/cart" className="p-2 hover:bg-alteris-gray-light rounded-full relative">
            <ShoppingBag className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 bg-alteris-black text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
              0
            </span>
          </Link>
          <button
            aria-label="Открыть меню"
            className="p-2 hover:bg-alteris-gray-light rounded-full md:hidden"
            onClick={toggleMenu}
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Мобильное меню */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-white z-50 md:hidden">
          <div className="container mx-auto px-4 py-4 flex justify-between items-center border-b border-alteris-gray-light">
            <span className="text-2xl font-futura tracking-wide">ALTERIS</span>
            <button 
              aria-label="Закрыть меню" 
              className="p-2 hover:bg-alteris-gray-light rounded-full"
              onClick={toggleMenu}
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <nav className="container mx-auto px-4 py-8 flex flex-col space-y-6">
            <Link 
              to="/catalog" 
              className="text-lg font-medium py-2 border-b border-alteris-gray-light"
              onClick={toggleMenu}
            >
              КАТАЛОГ
            </Link>
            <Link 
              to="/portfolio" 
              className="text-lg font-medium py-2 border-b border-alteris-gray-light"
              onClick={toggleMenu}
            >
              ПОРТФОЛИО
            </Link>
            <Link 
              to="/about" 
              className="text-lg font-medium py-2 border-b border-alteris-gray-light"
              onClick={toggleMenu}
            >
              О НАС
            </Link>
            <Link 
              to="/delivery" 
              className="text-lg font-medium py-2 border-b border-alteris-gray-light"
              onClick={toggleMenu}
            >
              ДОСТАВКА
            </Link>
            <Link 
              to="/contacts" 
              className="text-lg font-medium py-2 border-b border-alteris-gray-light"
              onClick={toggleMenu}
            >
              КОНТАКТЫ
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;