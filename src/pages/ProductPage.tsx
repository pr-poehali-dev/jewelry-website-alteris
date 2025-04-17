import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import ProductCard, { Product } from '@/components/ui/ProductCard';
import { Heart, Share2 } from 'lucide-react';

// Временные данные
const mockProduct = {
  id: 1,
  name: 'Кольцо "Минимализм"',
  price: 15900,
  description: 'Минималистичное серебряное кольцо с идеально гладкой поверхностью. Подходит для повседневной носки и особых случаев. Это украшение станет идеальным компаньоном и дополнит любой образ.',
  images: Array(5).fill('/placeholder.svg'),
  materials: ['Серебро 925', 'Золото 585', 'Золото с родиевым покрытием'],
  sizes: ['15', '16', '17', '17.5', '18', '19'],
  details: 'Ручная работа опытных ювелиров Alteris. Каждое изделие проходит строгий контроль качества.',
  careInstructions: 'Рекомендуется хранить в темном и сухом месте, избегать контакта с парфюмерией и косметикой. Регулярно чистить мягкой тканью.',
  category: 'Кольца'
};

// Товары для рекомендаций
const recommendedProducts: Product[] = Array.from({ length: 4 }, (_, i) => ({
  id: i + 2,
  name: ['Серьги', 'Подвеска', 'Браслет', 'Кольцо'][i % 4] + ' "' + 
        ['Геометрия', 'Волна', 'Линия', 'Круг'][i % 4] + '"',
  price: Math.floor(Math.random() * 15000) + 8000,
  image: '/placeholder.svg'
}));

const ProductPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [selectedMaterial, setSelectedMaterial] = useState(mockProduct.materials[0]);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);

  return (
    <div className="container py-12">
      {/* Breadcrumbs */}
      <div className="text-sm text-muted-foreground mb-6">
        <Link to="/" className="hover:text-foreground">Главная</Link> / 
        <Link to="/catalog" className="mx-2 hover:text-foreground">Каталог</Link> / 
        <Link to="/catalog/rings" className="hover:text-foreground">Кольца</Link> / 
        <span className="ml-2">{mockProduct.name}</span>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Product Gallery */}
        <div>
          <div className="mb-4 aspect-square overflow-hidden rounded-md">
            <img 
              src={mockProduct.images[activeImage]} 
              alt={mockProduct.name} 
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="grid grid-cols-5 gap-2">
            {mockProduct.images.map((image, index) => (
              <div 
                key={index}
                className={`aspect-square cursor-pointer rounded-md overflow-hidden border-2 ${
                  activeImage === index ? 'border-primary' : 'border-transparent'
                }`}
                onClick={() => setActiveImage(index)}
              >
                <img 
                  src={image} 
                  alt={`${mockProduct.name} - вид ${index + 1}`} 
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
        
        {/* Product Details */}
        <div>
          <h1 className="text-3xl font-light mb-2">{mockProduct.name}</h1>
          <p className="text-2xl font-medium mb-6">{mockProduct.price.toLocaleString('ru-RU')} ₽</p>
          
          <div className="space-y-6">
            {/* Material Selection */}
            <div>
              <h3 className="font-medium mb-3">Материал</h3>
              <RadioGroup 
                value={selectedMaterial} 
                onValueChange={setSelectedMaterial}
                className="flex flex-wrap gap-3"
              >
                {mockProduct.materials.map((material) => (
                  <div key={material} className="flex items-center">
                    <RadioGroupItem value={material} id={`material-${material}`} className="peer sr-only" />
                    <Label 
                      htmlFor={`material-${material}`}
                      className="px-4 py-2 border rounded-md cursor-pointer hover:bg-secondary peer-data-[state=checked]:bg-primary peer-data-[state=checked]:text-primary-foreground transition-colors"
                    >
                      {material}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
            
            {/* Size Selection */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-medium">Размер</h3>
                <Button variant="link" className="p-0 h-auto text-sm text-muted-foreground">
                  Таблица размеров
                </Button>
              </div>
              
              <Select value={selectedSize} onValueChange={setSelectedSize}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Выберите размер" />
                </SelectTrigger>
                <SelectContent>
                  {mockProduct.sizes.map((size) => (
                    <SelectItem key={size} value={size}>
                      {size}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            {/* Quantity */}
            <div>
              <h3 className="font-medium mb-3">Количество</h3>
              <div className="flex items-center">
                <Button 
                  variant="outline" 
                  size="icon" 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                >
                  -
                </Button>
                <Input 
                  type="number" 
                  value={quantity} 
                  onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                  className="mx-2 w-20 text-center"
                  min={1}
                />
                <Button 
                  variant="outline" 
                  size="icon"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  +
                </Button>
              </div>
            </div>
            
            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Button size="lg" className="flex-1 glow-button">
                Добавить в корзину
              </Button>
              <Button size="lg" variant="outline" className="flex-1">
                Купить в 1 клик
              </Button>
              <Button size="lg" variant="ghost" className="px-3">
                <Heart className="h-5 w-5" />
              </Button>
              <Button size="lg" variant="ghost" className="px-3">
                <Share2 className="h-5 w-5" />
              </Button>
            </div>
            
            {/* Description */}
            <Separator />
            
            <Tabs defaultValue="description" className="mt-6">
              <TabsList className="w-full grid grid-cols-3">
                <TabsTrigger value="description">Описание</TabsTrigger>
                <TabsTrigger value="details">Детали</TabsTrigger>
                <TabsTrigger value="care">Уход</TabsTrigger>
              </TabsList>
              <TabsContent value="description" className="mt-4">
                <p className="text-muted-foreground">
                  {mockProduct.description}
                </p>
              </TabsContent>
              <TabsContent value="details" className="mt-4">
                <p className="text-muted-foreground">
                  {mockProduct.details}
                </p>
              </TabsContent>
              <TabsContent value="care" className="mt-4">
                <p className="text-muted-foreground">
                  {mockProduct.careInstructions}
                </p>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
      
      {/* Recommended Products */}
      <div className="mt-20">
        <h2 className="text-2xl mb-8">С этим товаром также покупают</h2>
        
        <Carousel>
          <CarouselContent className="-ml-4">
            {recommendedProducts.map((product) => (
              <CarouselItem key={product.id} className="pl-4 md:basis-1/2 lg:basis-1/4">
                <ProductCard product={product} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex" />
          <CarouselNext className="hidden md:flex" />
        </Carousel>
      </div>
    </div>
  );
};

export default ProductPage;
