import React from 'react';
import { Link } from 'react-router-dom';
import { Eye } from 'lucide-react';
import { Card, CardContent } from './card';
import { Button } from './button';
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription } from './dialog';

export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category?: string;
  description?: string;
  material?: string;
}

interface ProductCardProps {
  product: Product;
  showQuickView?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, showQuickView = true }) => {
  return (
    <Card className="overflow-hidden group border-0 shadow-sm transition-all duration-300 hover:shadow-md">
      <CardContent className="p-0">
        <div className="aspect-square relative overflow-hidden">
          <img 
            src={product.image} 
            alt={product.name} 
            className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
          />
          
          {showQuickView && (
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm" className="bg-white text-black hover:bg-white/90">
                    <Eye className="h-4 w-4 mr-2" />
                    Быстрый просмотр
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[600px]">
                  <DialogTitle>{product.name}</DialogTitle>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                    <div className="aspect-square">
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        className="object-cover w-full h-full rounded-md"
                      />
                    </div>
                    <div>
                      <DialogDescription className="mb-4">
                        {product.description || 'Нет описания'}
                      </DialogDescription>
                      
                      {product.category && (
                        <p className="text-sm text-muted-foreground mb-2">
                          Категория: {product.category}
                        </p>
                      )}
                      
                      {product.material && (
                        <p className="text-sm text-muted-foreground mb-4">
                          Материал: {product.material}
                        </p>
                      )}
                      
                      <p className="text-xl font-medium mb-6">
                        {product.price.toLocaleString('ru-RU')} ₽
                      </p>
                      
                      <div className="space-y-3">
                        <Button className="w-full glow-button">
                          В корзину
                        </Button>
                        <Button asChild variant="outline" className="w-full">
                          <Link to={`/product/${product.id}`}>
                            Подробнее
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          )}
        </div>
        
        <div className="p-4">
          <Link to={`/product/${product.id}`} className="group-hover:text-primary">
            <h3 className="font-medium truncate">{product.name}</h3>
          </Link>
          <p className="mt-1 font-medium">{product.price.toLocaleString('ru-RU')} ₽</p>
          
          <div className="mt-3">
            <Button asChild size="sm" variant="outline" className="w-full">
              <Link to={`/product/${product.id}`}>
                Подробнее
              </Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
