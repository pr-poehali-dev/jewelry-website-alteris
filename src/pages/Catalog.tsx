import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import ProductCard from '@/components/ui/ProductCard';
import { Filter, Grid3X3, LayoutList } from 'lucide-react';
import { Sheet, SheetTrigger, SheetContent, SheetClose } from '@/components/ui/sheet';

// Временные данные для каталога
const products = Array.from({ length: 12 }, (_, i) => ({
  id: i + 1,
  name: ['Кольцо', 'Серьги', 'Подвеска', 'Браслет'][Math.floor(Math.random() * 4)] + ' "' + 
        ['Минимализм', 'Геометрия', 'Волна', 'Линия', 'Круг'][Math.floor(Math.random() * 5)] + '"',
  price: Math.floor(Math.random() * 20000) + 5000,
  image: '/placeholder.svg',
  category: ['Кольца', 'Серьги', 'Подвески', 'Браслеты'][Math.floor(Math.random() * 4)],
  material: ['Серебро', 'Золото', 'Керамика'][Math.floor(Math.random() * 3)]
}));

const Catalog: React.FC = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [priceRange, setPriceRange] = useState([5000, 25000]);
  
  return (
    <div className="container py-12">
      <h1 className="text-3xl mb-8">Каталог украшений</h1>
      
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters - Desktop */}
        <div className="hidden lg:block w-[300px] shrink-0">
          <div className="sticky top-28 space-y-8">
            <div>
              <h3 className="font-medium mb-4">Категории</h3>
              <div className="space-y-2">
                {['Все украшения', 'Кольца', 'Серьги', 'Подвески', 'Браслеты'].map((category) => (
                  <div key={category} className="flex items-center space-x-2">
                    <Checkbox id={`category-${category}`} />
                    <Label
                      htmlFor={`category-${category}`}
                      className="text-sm font-normal cursor-pointer"
                    >
                      {category}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
            
            <Separator />
            
            <div>
              <h3 className="font-medium mb-4">Материал</h3>
              <RadioGroup defaultValue="all">
                {['Все', 'Серебро', 'Золото', 'Керамика'].map((material) => (
                  <div key={material} className="flex items-center space-x-2 mb-2">
                    <RadioGroupItem value={material.toLowerCase()} id={`material-${material}`} />
                    <Label
                      htmlFor={`material-${material}`}
                      className="text-sm font-normal cursor-pointer"
                    >
                      {material}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
            
            <Separator />
            
            <div>
              <h3 className="font-medium mb-4">Стиль</h3>
              <div className="space-y-2">
                {['Минимализм', 'Классика', 'Statement', 'Геометрия'].map((style) => (
                  <div key={style} className="flex items-center space-x-2">
                    <Checkbox id={`style-${style}`} />
                    <Label
                      htmlFor={`style-${style}`}
                      className="text-sm font-normal cursor-pointer"
                    >
                      {style}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
            
            <Separator />
            
            <div>
              <h3 className="font-medium mb-4">Цена</h3>
              <div className="px-2">
                <Slider
                  defaultValue={[5000, 25000]}
                  min={0}
                  max={50000}
                  step={1000}
                  value={priceRange}
                  onValueChange={setPriceRange}
                  className="mb-6"
                />
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Input
                      type="number"
                      className="w-24 h-8"
                      value={priceRange[0]}
                      onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                    />
                    <span className="mx-1 text-sm text-muted-foreground">₽</span>
                  </div>
                  <span className="text-sm text-muted-foreground">—</span>
                  <div className="flex items-center">
                    <Input
                      type="number"
                      className="w-24 h-8"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                    />
                    <span className="ml-1 text-sm text-muted-foreground">₽</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="pt-4">
              <Button className="w-full">Применить</Button>
              <Button variant="outline" className="w-full mt-2">Сбросить</Button>
            </div>
          </div>
        </div>
        
        {/* Mobile Filters */}
        <div className="lg:hidden mb-4">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="w-full">
                <Filter className="h-4 w-4 mr-2" />
                Фильтры
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-full sm:max-w-md overflow-y-auto">
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium mb-4">Категории</h3>
                  <div className="space-y-2">
                    {['Все украшения', 'Кольца', 'Серьги', 'Подвески', 'Браслеты'].map((category) => (
                      <div key={category} className="flex items-center space-x-2">
                        <Checkbox id={`mobile-category-${category}`} />
                        <Label
                          htmlFor={`mobile-category-${category}`}
                          className="text-sm font-normal cursor-pointer"
                        >
                          {category}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="font-medium mb-4">Материал</h3>
                  <RadioGroup defaultValue="all">
                    {['Все', 'Серебро', 'Золото', 'Керамика'].map((material) => (
                      <div key={material} className="flex items-center space-x-2 mb-2">
                        <RadioGroupItem value={material.toLowerCase()} id={`mobile-material-${material}`} />
                        <Label
                          htmlFor={`mobile-material-${material}`}
                          className="text-sm font-normal cursor-pointer"
                        >
                          {material}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="font-medium mb-4">Стиль</h3>
                  <div className="space-y-2">
                    {['Минимализм', 'Классика', 'Statement', 'Геометрия'].map((style) => (
                      <div key={style} className="flex items-center space-x-2">
                        <Checkbox id={`mobile-style-${style}`} />
                        <Label
                          htmlFor={`mobile-style-${style}`}
                          className="text-sm font-normal cursor-pointer"
                        >
                          {style}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="font-medium mb-4">Цена</h3>
                  <div className="px-2">
                    <Slider
                      defaultValue={[5000, 25000]}
                      min={0}
                      max={50000}
                      step={1000}
                      value={priceRange}
                      onValueChange={setPriceRange}
                      className="mb-6"
                    />
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Input
                          type="number"
                          className="w-24 h-8"
                          value={priceRange[0]}
                          onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                        />
                        <span className="mx-1 text-sm text-muted-foreground">₽</span>
                      </div>
                      <span className="text-sm text-muted-foreground">—</span>
                      <div className="flex items-center">
                        <Input
                          type="number"
                          className="w-24 h-8"
                          value={priceRange[1]}
                          onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                        />
                        <span className="ml-1 text-sm text-muted-foreground">₽</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="pt-4 space-y-2">
                  <SheetClose asChild>
                    <Button className="w-full">Применить</Button>
                  </SheetClose>
                  <Button variant="outline" className="w-full">Сбросить</Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
        
        {/* Products */}
        <div className="flex-1">
          <div className="flex justify-between items-center mb-6">
            <div>
              <p className="text-sm text-muted-foreground">Найдено: {products.length} товаров</p>
            </div>
            
            <div className="flex items-center space-x-2">
              <Tabs defaultValue="popular" className="hidden sm:block">
                <TabsList>
                  <TabsTrigger value="popular">Популярные</TabsTrigger>
                  <TabsTrigger value="new">Новинки</TabsTrigger>
                  <TabsTrigger value="price-asc">Цена ↑</TabsTrigger>
                  <TabsTrigger value="price-desc">Цена ↓</TabsTrigger>
                </TabsList>
              </Tabs>
              
              <div className="flex border rounded-md overflow-hidden">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  size="icon"
                  className="rounded-none h-9 w-9"
                  onClick={() => setViewMode('grid')}
                >
                  <Grid3X3 className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  size="icon"
                  className="rounded-none h-9 w-9"
                  onClick={() => setViewMode('list')}
                >
                  <LayoutList className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
          
          <div className={viewMode === 'grid' 
            ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" 
            : "space-y-4"
          }>
            {products.map((product) => (
              <div key={product.id}>
                {viewMode === 'grid' ? (
                  <ProductCard product={product} />
                ) : (
                  <div className="flex gap-4 border p-4 rounded-md">
                    <div className="w-32 h-32">
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        className="w-full h-full object-cover rounded-md"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium">{product.name}</h3>
                      <p className="text-sm text-muted-foreground mb-2">
                        {product.category} • {product.material}
                      </p>
                      <p className="text-lg font-medium mb-4">{product.price.toLocaleString('ru-RU')} ₽</p>
                      <Button asChild size="sm">
                        <a href={`/product/${product.id}`}>Подробнее</a>
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Catalog;
