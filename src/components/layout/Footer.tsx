import { Link } from 'react-router-dom';
import { Instagram, Facebook, Youtube } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-alteris-black text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Логотип и краткое описание */}
          <div className="md:col-span-1">
            <h2 className="text-2xl font-futura tracking-wide mb-4">ALTERIS</h2>
            <p className="text-sm text-alteris-silver mb-6">
              Украшения, которые становятся частью тебя
            </p>
            <div className="flex space-x-4">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" 
                 className="text-white hover:text-alteris-silver transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" 
                 className="text-white hover:text-alteris-silver transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" 
                 className="text-white hover:text-alteris-silver transition-colors">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Магазин */}
          <div>
            <h3 className="text-sm font-futura uppercase tracking-wider mb-4">Магазин</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/catalog/rings" className="text-sm text-alteris-silver hover:text-white transition-colors">
                  Кольца
                </Link>
              </li>
              <li>
                <Link to="/catalog/earrings" className="text-sm text-alteris-silver hover:text-white transition-colors">
                  Серьги
                </Link>
              </li>
              <li>
                <Link to="/catalog/pendants" className="text-sm text-alteris-silver hover:text-white transition-colors">
                  Подвески
                </Link>
              </li>
              <li>
                <Link to="/catalog/bracelets" className="text-sm text-alteris-silver hover:text-white transition-colors">
                  Браслеты
                </Link>
              </li>
              <li>
                <Link to="/catalog/all" className="text-sm text-alteris-silver hover:text-white transition-colors">
                  Все изделия
                </Link>
              </li>
            </ul>
          </div>

          {/* Информация */}
          <div>
            <h3 className="text-sm font-futura uppercase tracking-wider mb-4">Информация</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-sm text-alteris-silver hover:text-white transition-colors">
                  О бренде
                </Link>
              </li>
              <li>
                <Link to="/delivery" className="text-sm text-alteris-silver hover:text-white transition-colors">
                  Доставка и оплата
                </Link>
              </li>
              <li>
                <Link to="/returns" className="text-sm text-alteris-silver hover:text-white transition-colors">
                  Возврат
                </Link>
              </li>
              <li>
                <Link to="/care" className="text-sm text-alteris-silver hover:text-white transition-colors">
                  Уход за украшениями
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-sm text-alteris-silver hover:text-white transition-colors">
                  Частые вопросы
                </Link>
              </li>
            </ul>
          </div>

          {/* Контакты */}
          <div>
            <h3 className="text-sm font-futura uppercase tracking-wider mb-4">Контакты</h3>
            <ul className="space-y-2">
              <li className="text-sm text-alteris-silver">
                <a href="tel:+74951234567" className="hover:text-white transition-colors">
                  +7 (495) 123-45-67
                </a>
              </li>
              <li className="text-sm text-alteris-silver">
                <a href="mailto:info@alteris.ru" className="hover:text-white transition-colors">
                  info@alteris.ru
                </a>
              </li>
              <li className="text-sm text-alteris-silver pt-2">
                Москва, ул. Никольская, 10<br />
                Ежедневно с 10:00 до 21:00
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-alteris-gray-dark flex flex-col md:flex-row justify-between items-center">
          <p className="text-xs text-alteris-silver">&copy; {new Date().getFullYear()} Alteris. Все права защищены.</p>
          <div className="mt-4 md:mt-0">
            <ul className="flex space-x-4">
              <li>
                <Link to="/privacy" className="text-xs text-alteris-silver hover:text-white transition-colors">
                  Политика конфиденциальности
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-xs text-alteris-silver hover:text-white transition-colors">
                  Условия использования
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;