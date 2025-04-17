import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight, Award, Shield, Sparkles } from 'lucide-react';

const About: React.FC = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="/placeholder.svg" 
            alt="Alteris Jewelry Workshop" 
            className="w-full h-full object-cover opacity-30"
          />
        </div>
        <div className="container relative z-10">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-light mb-6">
              О бренде Alteris
            </h1>
            <p className="text-xl mb-8 text-muted-foreground">
              Мы создаем украшения, которые подстраиваются под вас
            </p>
          </div>
        </div>
      </section>

      {/* История бренда */}
      <section className="py-16 bg-secondary">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl mb-6">История бренда</h2>
              <p className="mb-4 text-muted-foreground">
                Alteris был основан в 2018 году ювелиром Анной Беловой, прошедшей обучение в престижных школах дизайна Милана и Парижа. Название бренда происходит от латинского "alter" - другой, иной, что отражает нашу философию создания украшений, которые выходят за рамки обычного.
              </p>
              <p className="mb-4 text-muted-foreground">
                Начав с небольшой коллекции серебряных колец, сегодня Alteris предлагает полный спектр украшений, созданных вручную с использованием высококачественных материалов и инновационных технологий.
              </p>
              <p className="text-muted-foreground">
                Каждое изделие Alteris создается с мыслью о том, как оно будет сочетаться с различными образами и стилями жизни своего владельца. Мы стремимся к тому, чтобы наши украшения становились не просто аксессуарами, а частью вашей истории.
              </p>
            </div>
            <div>
              <img 
                src="/placeholder.svg" 
                alt="История Alteris" 
                className="rounded-md shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Миссия */}
      <section className="py-16">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl mb-6">Наша миссия</h2>
            <p className="text-xl font-light">
              "Мы верим, что украшения должны быть не только красивыми, но и функциональными – 
              они должны подстраиваться под человека, а не наоборот."
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-background p-6 rounded-md border">
              <div className="h-12 w-12 rounded-full bg-silver/20 flex items-center justify-center mb-4">
                <Sparkles className="h-6 w-6 text-silver-dark" />
              </div>
              <h3 className="text-xl mb-3">Уникальность</h3>
              <p className="text-muted-foreground">
                Создаем украшения, которые отражают индивидуальность владельца и могут адаптироваться к разным стилям.
              </p>
            </div>
            
            <div className="bg-background p-6 rounded-md border">
              <div className="h-12 w-12 rounded-full bg-silver/20 flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-silver-dark" />
              </div>
              <h3 className="text-xl mb-3">Качество</h3>
              <p className="text-muted-foreground">
                Используем только проверенные материалы и строго контролируем каждый этап производства.
              </p>
            </div>
            
            <div className="bg-background p-6 rounded-md border">
              <div className="h-12 w-12 rounded-full bg-silver/20 flex items-center justify-center mb-4">
                <Award className="h-6 w-6 text-silver-dark" />
              </div>
              <h3 className="text-xl mb-3">Доступность</h3>
              <p className="text-muted-foreground">
                Стремимся сделать качественные украшения доступными для всех, кто ценит стиль и индивидуальность.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Производство */}
      <section className="py-16 bg-secondary">
        <div className="container">
          <h2 className="text-3xl mb-8">Производство</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div>
              <img 
                src="/placeholder.svg" 
                alt="Мастерская Alteris" 
                className="rounded-md shadow-lg mb-8"
              />
              <div className="grid grid-cols-2 gap-4">
                <img 
                  src="/placeholder.svg" 
                  alt="Процесс производства" 
                  className="rounded-md shadow-lg"
                />
                <img 
                  src="/placeholder.svg" 
                  alt="Детали украшений" 
                  className="rounded-md shadow-lg"
                />
              </div>
            </div>
            
            <div className="space-y-4">
              <p className="text-muted-foreground">
                Все украшения Alteris создаются в нашей мастерской в Москве командой профессиональных ювелиров под руководством Анны Беловой.
              </p>
              <p className="text-muted-foreground">
                Мы используем как традиционные ювелирные техники, так и современные технологии, включая 3D-моделирование и лазерную резку, что позволяет нам создавать украшения с исключительной точностью и детализацией.
              </p>
              <p className="text-muted-foreground">
                Для наших изделий мы выбираем только проверенные материалы: серебро 925 пробы, золото 585 и 750 проб, а также высококачественные камни от надежных поставщиков.
              </p>
              <p className="text-muted-foreground">
                Каждое украшение проходит через несколько этапов контроля качества перед тем, как попасть к своему владельцу, и снабжается фирменной гарантией Alteris.
              </p>
              
              <div className="pt-4">
                <Button asChild className="glow-button">
                  <Link to="/portfolio">
                    Смотреть портфолио мастера
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
          
          <div className="bg-background p-6 rounded-md border">
            <h3 className="text-xl mb-4">Гарантия качества</h3>
            <p className="text-muted-foreground mb-4">
              Мы предоставляем 2 года гарантии на все наши изделия. Если в течение этого срока вы обнаружите любые дефекты, связанные с производством, мы бесплатно отремонтируем или заменим украшение.
            </p>
            <p className="text-muted-foreground">
              Кроме того, мы предлагаем услуги по уходу за украшениями, включая чистку, полировку и восстановление покрытия, а также возможность изменения размера или индивидуальной доработки изделия.
            </p>
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="py-16 text-center">
        <div className="container">
          <h2 className="text-3xl mb-6">Станьте частью истории Alteris</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Откройте для себя коллекцию украшений, которые созданы, чтобы выражать вашу индивидуальность и подстраиваться под ваш стиль жизни.
          </p>
          <Button asChild size="lg" className="glow-button">
            <Link to="/catalog">Смотреть каталог</Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default About;
