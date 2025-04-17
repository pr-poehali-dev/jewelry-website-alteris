import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Diamond, Award, Clock, ShieldCheck } from 'lucide-react';

const HomePage: React.FC = () => {
  // Временные данные для бестселлеров
  const bestSellers = [
    { id: 1, name: 'Кольцо "Волна"', price: 15900, image: '/placeholder.svg' },
    { id: 2, name: 'Серьги "Геометрия"', price: 8700, image: '/placeholder.svg' },
    { id: 3, name: 'Браслет "Линия"', price: 12400, image: '/placeholder.svg' },
    { id: 4, name: 'Подвеска "Круг"', price: 9300, image: '/placeholder.svg' },
    { id: 5, name: 'Колье "Минимализм"', price: 18500, image: '/placeholder.svg' }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center">
        <div className="absolute inset-0 z-0">
          <img 
            src="/placeholder.svg" 
            alt="Alteris Jewelry" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-alteris-black/80 to-alteris-black/20"></div>
        </div>
        
        <div className="container relative z-10">
          <div className="max-w-2xl text-alteris-white">
            <h1 className="text-4xl md:text-6xl font-light mb-4">
              Alteris – другой взгляд на украшения
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Создано, чтобы подстраиваться под вас
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="glow-button">
                <Link to="/catalog">Купить сейчас</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-silver hover:bg-silver/10">
                <Link to="/catalog">Смотреть коллекцию</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Brand Benefits */}
      <section className="py-20 bg-alteris-white">
        <div className="container">
          <h2 className="text-3xl text-center mb-16">Почему выбирают Alteris</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="flex flex-col items-center text-center">
              <div className="h-16 w-16 rounded-full bg-silver/20 flex items-center justify-center mb-4">
                <Diamond className="h-8 w-8 text-silver-dark" />
              </div>
              <h3 className="text-xl mb-2">Универсальность</h3>
              <p className="text-muted-foreground">Украшения, которые подходят к любому образу и случаю</p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="h-16 w-16 rounded-full bg-silver/20 flex items-center justify-center mb-4">
                <Award className="h-8 w-8 text-silver-dark" />
              </div>
              <h3 className="text-xl mb-2">Качество</h3>
              <p className="text-muted-foreground">Используем только лучшие материалы и современные технологии</p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="h-16 w-16 rounded-full bg-silver/20 flex items-center justify-center mb-4">
                <ShieldCheck className="h-8 w-8 text-silver-dark" />
              </div>
              <h3 className="text-xl mb-2">Эксклюзивность</h3>
              <p className="text-muted-foreground">Каждое изделие уникально и создано с вниманием к деталям</p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="h-16 w-16 rounded-full bg-silver/20 flex items-center justify-center mb-4">
                <Clock className="h-8 w-8 text-silver-dark" />
              </div>
              <h3 className="text-xl mb-2">Быстрая доставка</h3>
              <p className="text-muted-foreground">Доставляем по всей России в течение 1-3 рабочих дней</p>
            </div>
          </div>
        </div>
      </section>

      {/* Bestsellers */}
      <section className="py-20 bg-secondary">
        <div className="container">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl">Бестселлеры</h2>
            <Link to="/catalog" className="text-sm font-medium hover:underline">
              Смотреть все
            </Link>
          </div>
          
          <Carousel>
            <CarouselContent className="-ml-2 md:-ml-4">
              {bestSellers.map((product) => (
                <CarouselItem key={product.id} className="pl-2 md:pl-4 sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
                  <Link to={`/product/${product.id}`}>
                    <Card className="overflow-hidden metal-shine border-0 shadow-sm">
                      <CardContent className="p-0">
                        <div className="aspect-square relative">
                          <img 
                            src={product.image} 
                            alt={product.name} 
                            className="object-cover w-full h-full"
                          />
                        </div>
                        <div className="p-4">
                          <h3 className="font-medium">{product.name}</h3>
                          <p className="mt-1">{product.price.toLocaleString('ru-RU')} ₽</p>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex" />
            <CarouselNext className="hidden md:flex" />
          </Carousel>
          
          <div className="mt-10 text-center">
            <Button asChild size="lg" className="glow-button">
              <Link to="/catalog">В каталог</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
