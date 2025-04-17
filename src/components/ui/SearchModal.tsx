import React, { useState } from 'react';
import { Dialog, DialogContent } from './dialog';
import { Input } from './input';
import { Search, X } from 'lucide-react';
import { Button } from './button';
import { useNavigate } from 'react-router-dom';

// Временные данные для поиска
const mockProducts = [
  { id: 1, name: 'Кольцо "Минимализм"', category: 'Кольца', price: 12500, image: '/placeholder.svg' },
  { id: 2, name: 'Серьги "Геометрия"', category: 'Серьги', price: 8700, image: '/placeholder.svg' },
  { id: 3, name: 'Подвеска "Капля"', category: 'Подвески', price: 9300, image: '/placeholder.svg' },
];

interface SearchModalProps {
  isOpen?: boolean;
  onClose?: () => void;
}

const SearchModal: React.FC<SearchModalProps> = ({ isOpen = false, onClose = () => {} }) => {
  const [open, setOpen] = useState(isOpen);
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  
  const filteredProducts = mockProducts.filter(product => 
    product.name.toLowerCase().includes(query.toLowerCase()) || 
    product.category.toLowerCase().includes(query.toLowerCase())
  );

  const handleProductClick = (id: number) => {
    setOpen(false);
    navigate(`/product/${id}`);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[600px] p-0">
        <div className="p-4 border-b">
          <div className="flex items-center">
            <Search className="h-5 w-5 mr-2 text-muted-foreground" />
            <Input
              placeholder="Поиск украшений..."
              className="border-none focus-visible:ring-0 flex-1"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              autoFocus
            />
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setOpen(false)}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
        </div>
        
        <div className="max-h-[400px] overflow-y-auto p-4">
          {query.length > 0 && (
            <>
              {filteredProducts.length > 0 ? (
                <div className="space-y-4">
                  {filteredProducts.map((product) => (
                    <div 
                      key={product.id}
                      className="flex items-center space-x-4 p-2 hover:bg-muted rounded-md cursor-pointer transition-colors"
                      onClick={() => handleProductClick(product.id)}
                    >
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        className="h-16 w-16 object-cover rounded-md"
                      />
                      <div>
                        <h4 className="font-medium">{product.name}</h4>
                        <p className="text-sm text-muted-foreground">{product.category}</p>
                        <p className="text-sm">{product.price.toLocaleString('ru-RU')} ₽</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">Ничего не найдено</p>
                </div>
              )}
            </>
          )}
          
          {query.length === 0 && (
            <div className="text-center py-8">
              <p className="text-muted-foreground">Введите запрос для поиска</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SearchModal;
