import { Book, Check, X, Shield, Mail, BookOpen, Clock, Heart, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { 
  AlertDialog, 
  AlertDialogAction, 
  AlertDialogCancel, 
  AlertDialogContent, 
  AlertDialogDescription, 
  AlertDialogFooter, 
  AlertDialogHeader, 
  AlertDialogTitle 
} from "@/components/ui/alert-dialog";
import logoImage from "@assets/Mapa da Fé Catolica_1761328374413.png";
import joaoImage from "@assets/Mapa da Fé Catolica (1)_1761328388197.png";
import matheusImage from "@assets/Mapa da Fé Catolica (2)_1761328396544.png";
import genesisImage from "@assets/Mapa da Fé Catolica (3)_1761328401328.png";
import timelineAtImage from "@assets/Mapa da Fé Catolica (4)_1761328404507.png";
import cronologiaImage from "@assets/Mapa da Fé Catolica (5)_1761328407487.png";
import panoramaImage from "@assets/Mapa da Fé Catolica (6)_1761328410475.png";
import brandLogo from "@assets/LOGO_-_Mapa_da_Fé_Catolica-removebg-preview_1761329417586.png";
import fiveStars from "@assets/5 estrelas usuario_1761328558561.png";
import fiveStarsRating from "@assets/5 estrelas usuario_1761331979855.png";
import testimonial1 from "@assets/depoimentos catolicos_1761331979854.png";
import testimonial2 from "@assets/depoimentos catolicos (1)_1761331979856.png";
import testimonial3 from "@assets/depoimentos catolicos (2)_1761331979857.png";
import testimonial4 from "@assets/depoimentos catolicos (3)_1761331979852.png";
import testimonial5 from "@assets/depoimentos catolicos (4)_1761331979853.png";
import mapaBooksImage from "@assets/1_1761335202543.png";
import panoramaBibliaImage from "@assets/2_1761335666100.png";
import eventosCronologicosImage from "@assets/3_1761335834929.png";
import garantia30DiasImage from "@assets/30 dias garantia_1761337224351.png";
import bonusSecretoImage from "@assets/bonus secreto_1761338915313.png";
import { useState, useRef, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

const brazilianNames = [
  "Maria Silva", "João Santos", "Ana Costa", "Pedro Oliveira", "Juliana Souza",
  "Carlos Pereira", "Fernanda Lima", "Rafael Alves", "Beatriz Rocha", "Lucas Fernandes",
  "Camila Rodrigues", "Gabriel Martins", "Patricia Gomes", "Marcos Ribeiro", "Amanda Carvalho",
  "Bruno Barbosa", "Larissa Araújo", "Felipe Dias", "Isabela Correia", "Thiago Moreira",
  "Renata Cardoso", "Diego Ferreira", "Aline Teixeira", "Vinicius Mendes", "Tatiana Ramos"
];

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showDiscountPopup, setShowDiscountPopup] = useState(false);
  const [showExitIntentPopup, setShowExitIntentPopup] = useState(false);
  const [exitIntentShown, setExitIntentShown] = useState(false);
  const pricingSectionRef = useRef<HTMLElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    const showPurchaseNotification = () => {
      const randomName = brazilianNames[Math.floor(Math.random() * brazilianNames.length)];
      const isMobile = window.innerWidth < 640;
      
      toast({
        title: isMobile ? undefined : "🎉 Nova compra realizada!",
        description: isMobile ? `🎉 ${randomName} acabou de comprar` : `${randomName} acabou de comprar`,
        duration: 4000,
        variant: "success",
      });
    };

    const interval = setInterval(showPurchaseNotification, 10000);

    return () => clearInterval(interval);
  }, [toast]);

  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !exitIntentShown) {
        setShowExitIntentPopup(true);
        setExitIntentShown(true);
        localStorage.setItem('exitIntentShown', 'true');
      }
    };

    const checkExitIntentShown = localStorage.getItem('exitIntentShown');
    if (checkExitIntentShown) {
      setExitIntentShown(true);
    }

    let lastScrollTop = 0;
    let scrollUpCount = 0;

    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      
      if (scrollTop < lastScrollTop && scrollTop < 100) {
        scrollUpCount++;
        
        if (scrollUpCount > 2 && !exitIntentShown && scrollTop > 0) {
          setShowExitIntentPopup(true);
          setExitIntentShown(true);
          localStorage.setItem('exitIntentShown', 'true');
        }
      } else {
        scrollUpCount = 0;
      }
      
      lastScrollTop = scrollTop;
    };

    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (!exitIntentShown) {
        setShowExitIntentPopup(true);
        setExitIntentShown(true);
        localStorage.setItem('exitIntentShown', 'true');
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [exitIntentShown]);

  useEffect(() => {
    let checkoutOpened = false;

    const originalOpen = window.open;
    window.open = function(...args) {
      const url = args[0] as string;
      if (url && (url.includes('perfectpay.com.br') || url.includes('ggcheckout.com') || url.includes('checkout'))) {
        checkoutOpened = true;
        sessionStorage.setItem('checkoutOpened', 'true');
      }
      return originalOpen.apply(this, args);
    };

    const handleVisibilityChange = () => {
      if (!document.hidden && checkoutOpened) {
        setTimeout(() => {
          const wasCheckoutOpened = sessionStorage.getItem('checkoutOpened');
          if (wasCheckoutOpened && !sessionStorage.getItem('backFromCheckoutShown')) {
            setShowExitIntentPopup(true);
            sessionStorage.setItem('backFromCheckoutShown', 'true');
          }
        }, 1000);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.open = originalOpen;
    };
  }, []);

  const handleCTAClick = () => {
    pricingSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handlePremiumPlanClick = () => {
    if (typeof window !== 'undefined' && (window as any).fbq) {
      (window as any).fbq('track', 'InitiateCheckout', {
        content_name: 'Plano Premium',
        value: 27.00,
        currency: 'BRL'
      });
    }
    window.open('https://www.ggcheckout.com/checkout/v2/8c49KpvMLaeEt1edlOLl', '_blank');
  };

  const handleBasicPlanClick = () => {
    if (typeof window !== 'undefined' && (window as any).fbq) {
      (window as any).fbq('track', 'InitiateCheckout', {
        content_name: 'Plano Básico',
        value: 10.00,
        currency: 'BRL'
      });
    }
    setShowDiscountPopup(true);
  };

  const handleAcceptPremiumOffer = () => {
    if (typeof window !== 'undefined' && (window as any).fbq) {
      (window as any).fbq('track', 'AddToCart', {
        content_name: 'Plano Premium - Oferta Especial',
        value: 17.00,
        currency: 'BRL'
      });
    }
    setShowDiscountPopup(false);
    window.open('https://www.ggcheckout.com/checkout/v2/qRI4cB4o8RDqzNXZlenJ', '_blank');
  };

  const handleDeclineOffer = () => {
    if (typeof window !== 'undefined' && (window as any).fbq) {
      (window as any).fbq('track', 'AddToCart', {
        content_name: 'Plano Básico',
        value: 10.00,
        currency: 'BRL'
      });
    }
    setShowDiscountPopup(false);
    window.open('https://www.ggcheckout.com/checkout/v2/X6hCm7Ld3BUPvtJkV8hW', '_blank');
  };

  const handleExitIntentOffer = () => {
    if (typeof window !== 'undefined' && (window as any).fbq) {
      (window as any).fbq('track', 'AddToCart', {
        content_name: 'Oferta Exit Intent - Premium',
        value: 14.90,
        currency: 'BRL'
      });
    }
    setShowExitIntentPopup(false);
    window.open('https://www.ggcheckout.com/checkout/v2/TWSHiQLH3KNBi11ktuL4', '_blank');
  };

  const handleCloseExitIntent = () => {
    setShowExitIntentPopup(false);
  };

  const carouselImages = [
    { src: logoImage, alt: "Mapa da Fé Católica - Logo" },
    { src: joaoImage, alt: "Mapa do Livro de João" },
    { src: matheusImage, alt: "Registros da Fé - São Matheus" },
    { src: genesisImage, alt: "Mapa do Livro de Gênesis" },
    { src: timelineAtImage, alt: "Linha do Tempo do Antigo Testamento" },
    { src: cronologiaImage, alt: "Cronologia de Jesus Cristo" },
    { src: panoramaImage, alt: "Panorama Bíblico" },
  ];

  const basicFeatures = [
    { name: "Mapa dos 73 Livros", included: true },
    { name: "Panorama Bíblico", included: true },
    { name: "Linha do Tempo Cronológica", included: true },
    { name: "Registros da Fé", included: true },
    { name: "Bônus Plano de Leitura", included: false },
    { name: "Acesso vitalício à área de membros", included: false, note: "(7 dias de acesso)" },
    { name: "Versão imprimível em alta qualidade", included: false },
    { name: "Garantia 7 dias", included: true },
  ];

  const premiumFeatures = [
    { name: "Mapa dos 73 Livros", included: true },
    { name: "Panorama Bíblico", included: true },
    { name: "Linha do Tempo Cronológica", included: true },
    { name: "Registros da Fé", included: true },
    { name: "Bônus Plano de Leitura Sagrada", included: true },
    { name: "Diário da Oração (Lectio Divina)", included: true },
    { name: "Versão imprimível em alta qualidade", included: true },
    { name: "Acesso vitalício à área de membros", included: true },
    { name: "Garantia 7 dias", included: true },
  ];

  const faqItems = [
    {
      question: "📖 Cobre todos os livros da Bíblia?",
      answer: "Sim, os 73 livros completos da Bíblia Católica."
    },
    {
      question: "📱 O material é digital?",
      answer: "Sim. Acesso imediato na área de membros."
    },
    {
      question: "🕊️ É voltado para católicos?",
      answer: "Sim, baseado na Bíblia Ave Maria e na tradição da Igreja Católica."
    },
    {
      question: "📤 Como recebo o acesso?",
      answer: "Após o pagamento, o acesso é enviado automaticamente para seu e-mail."
    }
  ];

  const testimonials = [
    {
      name: "Fernanda S.",
      text: "O Mapa da Fé Católica me ajudou a entender cada livro e sentir que Deus fala comigo em cada página.",
      stars: 5
    },
    {
      name: "Ricardo S.",
      text: "Antes eu lia por obrigação, agora estudo com prazer e fé.",
      stars: 5
    },
    {
      name: "Eduardo M.",
      text: "É impressionante como tudo faz sentido quando vemos a Bíblia organizada.",
      stars: 5
    }
  ];

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      {/* 1. Headline */}
      <section className="py-12 px-4 md:py-20 bg-gradient-to-b from-primary/5 to-background">
        <div className="container max-w-4xl mx-auto text-center space-y-6">
          <div className="flex flex-col items-center justify-center gap-4">
            <img 
              src={fiveStars} 
              alt="5 estrelas - 4.96/5 de 2.464 usuários" 
              className="h-12 md:h-14 w-auto"
              data-testid="img-five-stars"
            />
            <img 
              src={brandLogo} 
              alt="Mapa da Fé Católica" 
              className="h-24 md:h-32 lg:h-40 w-auto"
              data-testid="img-brand-logo"
            />
          </div>
          <h1 className="font-heading font-bold text-3xl md:text-5xl lg:text-6xl leading-tight text-foreground">
            Descubra o poder escondido nos 73 livros da Bíblia — e permita que a Palavra de Deus{" "}
            <span className="text-primary">transforme sua vida por completo.</span>
          </h1>
        </div>
      </section>

      {/* 2. Sub-Headline */}
      <section className="py-8 px-4 md:py-12">
        <div className="container max-w-3xl mx-auto text-center space-y-4">
          <p className="text-lg md:text-xl text-foreground/80 leading-relaxed">
            Deus fala conosco todos os dias, mas muitos não conseguem entender Sua mensagem.
          </p>
          <p className="text-lg md:text-xl text-foreground/80 leading-relaxed">
            <span className="font-semibold text-primary">O Mapa da Fé Católica</span> foi criado para ajudar você a ouvir, compreender e viver a Palavra — de forma clara, organizada e inspiradora.
          </p>
        </div>
      </section>

      {/* 3. Carrossel de Imagens */}
      <section className="py-8 px-4 md:py-12">
        <div className="container max-w-3xl mx-auto space-y-6">
          <Carousel 
            opts={{ align: "start", loop: true }}
            className="w-full"
            data-testid="carousel-product"
            setApi={(api) => {
              if (!api) return;
              
              setCurrentSlide(api.selectedScrollSnap());
              
              api.on('select', () => {
                setCurrentSlide(api.selectedScrollSnap());
              });
            }}
          >
            <CarouselContent>
              {carouselImages.map((image, index) => (
                <CarouselItem key={index}>
                  <Card className="overflow-hidden">
                    <CardContent className="p-0">
                      <img 
                        src={image.src} 
                        alt={image.alt}
                        className="w-full h-auto object-contain"
                        data-testid={`carousel-image-${index}`}
                      />
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious 
              className="left-2 md:left-4" 
              data-testid="button-carousel-prev" 
            />
            <CarouselNext 
              className="right-2 md:right-4" 
              data-testid="button-carousel-next" 
            />
          </Carousel>
          
          {/* Indicadores de pontos */}
          <div className="flex items-center justify-center gap-2" data-testid="carousel-indicators">
            {carouselImages.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-colors ${
                  currentSlide === index ? 'bg-primary' : 'bg-muted-foreground/30'
                }`}
                data-testid={`carousel-dot-${index}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 4. Botão CTA */}
      <section className="py-8 px-4">
        <div className="container max-w-md mx-auto">
          <Button 
            onClick={handleCTAClick} 
            size="lg" 
            className="w-full text-base md:text-lg h-12 md:h-14 bg-primary hover:bg-primary/90 text-primary-foreground border-primary-border animate-pulse-scale"
            data-testid="button-cta-main"
          >
            QUERO MEU MAPA DA FÉ CATÓLICA AGORA
          </Button>
        </div>
      </section>

      {/* 4.5. O que estão dizendo */}
      <section className="py-12 px-4 md:py-20 bg-muted/30">
        <div className="container max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-4">
            <h2 className="font-heading font-bold text-2xl md:text-4xl text-foreground">
              O que estão dizendo sobre <span className="text-primary">O Mapa da Fé Católica</span>
            </h2>
            <p className="text-lg md:text-xl text-foreground/80">
              <span className="text-primary">O Mapa da Fé Católica</span> é incrível e milhares de católicos concordam com isso.
            </p>
            <div className="flex justify-center pt-2">
              <img 
                src={fiveStarsRating} 
                alt="4.96/5 de 2.464 usuários" 
                className="h-10 md:h-12 w-auto"
                data-testid="img-rating-stars"
              />
            </div>
          </div>

          <Carousel 
            opts={{ align: "start", loop: true }}
            className="w-full"
            data-testid="carousel-testimonials"
          >
            <CarouselContent>
              <CarouselItem>
                <Card className="overflow-hidden">
                  <CardContent className="p-0">
                    <img 
                      src={testimonial1} 
                      alt="Depoimento de cliente católico"
                      className="w-full h-auto object-contain"
                      data-testid="testimonial-slide-0"
                    />
                  </CardContent>
                </Card>
              </CarouselItem>
              <CarouselItem>
                <Card className="overflow-hidden">
                  <CardContent className="p-0">
                    <img 
                      src={testimonial2} 
                      alt="Depoimento de cliente católico"
                      className="w-full h-auto object-contain"
                      data-testid="testimonial-slide-1"
                    />
                  </CardContent>
                </Card>
              </CarouselItem>
              <CarouselItem>
                <Card className="overflow-hidden">
                  <CardContent className="p-0">
                    <img 
                      src={testimonial3} 
                      alt="Depoimento de cliente católico"
                      className="w-full h-auto object-contain"
                      data-testid="testimonial-slide-2"
                    />
                  </CardContent>
                </Card>
              </CarouselItem>
              <CarouselItem>
                <Card className="overflow-hidden">
                  <CardContent className="p-0">
                    <img 
                      src={testimonial4} 
                      alt="Depoimento de cliente católico"
                      className="w-full h-auto object-contain"
                      data-testid="testimonial-slide-3"
                    />
                  </CardContent>
                </Card>
              </CarouselItem>
              <CarouselItem>
                <Card className="overflow-hidden">
                  <CardContent className="p-0">
                    <img 
                      src={testimonial5} 
                      alt="Depoimento de cliente católico"
                      className="w-full h-auto object-contain"
                      data-testid="testimonial-slide-4"
                    />
                  </CardContent>
                </Card>
              </CarouselItem>
            </CarouselContent>
            <CarouselPrevious 
              className="left-2 md:left-4" 
              data-testid="button-testimonial-carousel-prev" 
            />
            <CarouselNext 
              className="right-2 md:right-4" 
              data-testid="button-testimonial-carousel-next" 
            />
          </Carousel>
        </div>
      </section>

      {/* 5. Dores do cliente */}
      <section className="py-12 px-4 md:py-20 bg-muted/30">
        <div className="container max-w-3xl mx-auto space-y-8">
          <h2 className="font-heading font-bold text-2xl md:text-4xl text-center text-foreground">
            Você se identifica com alguma dessas situações?
          </h2>
          
          <div className="space-y-4">
            {[
              "Você tenta ler a Bíblia, mas se perde entre nomes e histórias?",
              "Sente que a leitura não te aproxima realmente de Deus?",
              "Já começou vários planos de leitura, mas nunca conseguiu ir até o fim?",
              "Deseja ensinar seus filhos ou grupo de oração, mas sente falta de clareza?"
            ].map((pain, index) => (
              <Card key={index} className="hover-elevate" data-testid={`card-pain-${index}`}>
                <CardContent className="p-6 flex items-start gap-4">
                  <div className="w-6 h-6 rounded-full bg-destructive/10 flex items-center justify-center flex-shrink-0 mt-1">
                    <Heart className="w-4 h-4 text-destructive" />
                  </div>
                  <p className="text-foreground leading-relaxed">{pain}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <p className="text-center text-lg md:text-xl text-foreground font-semibold pt-4">
            Não é falta de fé. É falta de estrutura e compreensão — e é exatamente isso que o{" "}
            <span className="text-primary">Mapa da Fé Católica</span> entrega.
          </p>
        </div>
      </section>

      {/* 6. Como o produto resolve */}
      <section className="py-12 px-4 md:py-20">
        <div className="container max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-4">
            <h2 className="font-heading font-bold text-2xl md:text-4xl text-foreground">
              Como o <span className="text-primary">Mapa da Fé Católica</span> transforma seu estudo
            </h2>
            <p className="text-lg text-foreground/80">
              O Mapa da Fé Católica transforma o estudo das Escrituras em um caminho de entendimento e espiritualidade.
            </p>
            <p className="text-base text-muted-foreground">
              Cada mapa, resumo e linha do tempo foi criado com base na Bíblia Ave Maria e na tradição católica.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <Card className="hover-elevate md:col-span-2" data-testid="card-solution-0">
              <CardContent className="p-6 space-y-4">
                <div className="flex justify-center">
                  <img 
                    src={mapaBooksImage} 
                    alt="Mapa dos 73 Livros da Bíblia" 
                    className="w-full h-auto object-contain rounded-md"
                    data-testid="img-mapa-books"
                  />
                </div>
                <div className="space-y-3">
                  <h3 className="font-heading font-bold text-xl md:text-2xl text-foreground">
                    Mapa dos 73 Livros Explore
                  </h3>
                  <p className="text-foreground/80 leading-relaxed">
                    cada um dos 73 livros da Bíblia de forma clara e estruturada, com resumos e elementos essenciais que facilitam o entendimento da Palavra de Deus.
                  </p>
                  <div className="space-y-2 pt-2">
                    <p className="text-foreground font-semibold">Em cada livro, você terá:</p>
                    <ul className="space-y-2 pl-4">
                      {[
                        "Resumo do livro",
                        "Simbologias e temas centrais",
                        "Principais nomes",
                        "Linha do tempo e eventos",
                        "Versículos-chave"
                      ].map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                          <span className="text-foreground/90">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="hover-elevate md:col-span-2" data-testid="card-solution-2">
              <CardContent className="p-6 space-y-4">
                <div className="flex justify-center">
                  <img 
                    src={eventosCronologicosImage} 
                    alt="Eventos Cronológicos" 
                    className="w-full h-auto object-contain rounded-md"
                    data-testid="img-eventos-cronologicos"
                  />
                </div>
                <div className="space-y-3">
                  <h3 className="font-heading font-bold text-xl md:text-2xl text-foreground">
                    Eventos Cronológicos
                  </h3>
                  <p className="text-foreground/80 leading-relaxed">
                    Entenda a ordem dos principais acontecimentos da Bíblia e veja como a história da salvação se desenrola ao longo do tempo. Descubra as conexões entre os eventos e o contexto histórico que une toda a narrativa sagrada.
                  </p>
                  <div className="space-y-2 pt-2">
                    <p className="text-foreground font-semibold">Conteúdo:</p>
                    <ul className="space-y-2 pl-4">
                      {[
                        "Linha do Tempo Bíblica",
                        "Conexões Entre Eventos",
                        "Contexto Histórico"
                      ].map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                          <span className="text-foreground/90">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="hover-elevate md:col-span-2" data-testid="card-solution-3">
              <CardContent className="p-6 space-y-4">
                <div className="flex justify-center">
                  <img 
                    src={panoramaBibliaImage} 
                    alt="Panorama da Bíblia" 
                    className="w-full h-auto object-contain rounded-md"
                    data-testid="img-panorama-biblia"
                  />
                </div>
                <div className="space-y-3">
                  <h3 className="font-heading font-bold text-xl md:text-2xl text-foreground">
                    Panorama da Bíblia
                  </h3>
                  <p className="text-foreground/80 leading-relaxed">
                    Veja como a Bíblia se organiza em cada parte da história da salvação. Descubra suas divisões, seções e gêneros literários e entenda como todos os livros se conectam para revelar a mensagem central de Deus.
                  </p>
                  <div className="space-y-2 pt-2">
                    <p className="text-foreground font-semibold">Conteúdo:</p>
                    <ul className="space-y-2 pl-4">
                      {[
                        "Antigo e Novo Testamento",
                        "Seções e Livros",
                        "Gêneros Literários",
                        "Tabela Periódica da Bíblia"
                      ].map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                          <span className="text-foreground/90">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <p className="text-center text-lg text-foreground/90 pt-4">
            A Palavra de Deus deixará de ser algo distante — e passará a ser{" "}
            <span className="font-semibold text-primary">luz e direção no seu dia a dia.</span>
          </p>

          <div className="flex justify-center pt-8">
            <Button 
              onClick={handleCTAClick} 
              size="lg" 
              className="w-full max-w-md text-base md:text-lg h-12 md:h-14 bg-primary hover:bg-primary/90 text-primary-foreground border-primary-border animate-pulse-scale"
              data-testid="button-cta-after-transform"
            >
              QUERO MEU MAPA DA FÉ CATÓLICA AGORA
            </Button>
          </div>
        </div>
      </section>

      {/* 7. O que você vai receber */}
      <section className="py-12 px-4 md:py-20 bg-gradient-to-b from-primary/5 to-background">
        <div className="container max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-4">
            <h2 className="font-heading font-bold text-2xl md:text-4xl text-foreground">
              O que você vai receber
            </h2>
            <p className="text-lg text-primary font-semibold">
              Um guia completo com mais de 250 páginas para estudar, compreender e viver a Bíblia:
            </p>
          </div>

          <div className="space-y-4">
            {[
              { icon: "📖", title: "Mapa dos 73 Livros", desc: "resumos, temas centrais, versículos-chave e símbolos." },
              { icon: "🕊️", title: "Panorama Bíblico", desc: "entenda como todos os livros se conectam na história da salvação." },
              { icon: "⏳", title: "Linha do Tempo Cronológica", desc: "veja os acontecimentos na ordem real." },
              { icon: "✍️", title: "Registros da Fé", desc: "espaço para anotações, orações e reflexões pessoais." }
            ].map((item, index) => (
              <Card key={index} className="hover-elevate" data-testid={`card-receive-${index}`}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-xl">
                    <span className="text-2xl">{item.icon}</span>
                    {item.title}
                  </CardTitle>
                  <CardDescription className="text-base">{item.desc}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>

          <Card className="bg-accent/10 border-accent/20">
            <CardHeader>
              <div className="flex justify-center mb-4">
                <img 
                  src={bonusSecretoImage} 
                  alt="Bônus Secreto" 
                  className="h-32 md:h-40 w-auto"
                  data-testid="img-bonus-secreto"
                />
              </div>
              <CardTitle className="flex items-center gap-3 text-xl text-accent">
                <span className="text-2xl">🎁</span>
                Bônus Exclusivo
              </CardTitle>
              <CardDescription className="text-base text-foreground/80">
                <span className="font-semibold">Plano de Leitura Sagrada</span> — um guia diário para percorrer toda a Bíblia em 12 meses, fortalecendo sua rotina espiritual.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* 8. Oferta - Planos */}
      <section ref={pricingSectionRef} className="pricing-section py-16 px-4 md:py-24 bg-gradient-to-b from-primary/5 via-background to-primary/5">
        <div className="container max-w-6xl mx-auto space-y-10 overflow-x-hidden w-full">
          <div className="text-center space-y-6 px-2 md:px-4">
            <h2 className="font-heading font-bold text-3xl sm:text-4xl md:text-6xl lg:text-7xl text-foreground leading-tight">
              Escolha seu plano
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-foreground/80 max-w-2xl mx-auto px-2">
              Invista na sua jornada espiritual e transforme seu estudo da Palavra de Deus
            </p>
            <div className="flex justify-center px-2">
              <Badge variant="destructive" className="text-xs sm:text-sm md:text-base px-3 sm:px-4 md:px-6 py-2 md:py-3 animate-pulse-scale text-white">
                🔥 Oferta especial de lançamento válida somente hoje 🔥
              </Badge>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4 sm:gap-6 md:gap-8 max-w-5xl mx-auto px-2 sm:px-4 w-full">
            {/* Plano Básico */}
            <Card className="pricing-card w-full" data-testid="card-pricing-basic">
              <CardHeader className="pricing-card-header text-center space-y-4 pb-6">
                <div className="space-y-2">
                  <CardTitle className="text-xl sm:text-2xl">🔹 Plano Básico</CardTitle>
                  <CardDescription className="text-sm">
                    Para quem quer começar o estudo da Palavra com simplicidade.
                  </CardDescription>
                </div>
                <div className="space-y-2">
                  <div className="text-base sm:text-lg text-muted-foreground">
                    De <span className="line-through text-red-500 font-semibold">R$ 47,00</span>
                  </div>
                  <div className="text-sm sm:text-base font-semibold text-foreground">
                    por
                  </div>
                  <div className="space-y-1">
                    <div className="text-xl sm:text-2xl font-bold text-primary">APENAS</div>
                    <div className="pricing-price-lg text-4xl sm:text-5xl font-bold text-primary">R$ 10</div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pricing-card-content space-y-6">
                <div className="space-y-3">
                  {basicFeatures.map((feature, index) => (
                    <div 
                      key={index} 
                      className="flex items-start gap-3"
                      data-testid={`feature-basic-${index}`}
                    >
                      <div className="flex-shrink-0 mt-1">
                        {feature.included ? (
                          <Check className="w-5 h-5 text-green-500 led-check" />
                        ) : (
                          <X className="w-5 h-5 text-red-500 led-x-red" />
                        )}
                      </div>
                      <div className="flex-1">
                        <p className={feature.included ? "text-foreground" : "text-muted-foreground"}>
                          {feature.name}
                          {feature.note && (
                            <span className="text-xs ml-2">{feature.note}</span>
                          )}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <Button 
                  onClick={handleBasicPlanClick}
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground border-primary-border animate-pulse-scale"
                  size="lg"
                  data-testid="button-buy-basic"
                >
                  QUERO O PLANO BÁSICO — R$ 10
                </Button>
              </CardContent>
            </Card>

            {/* Plano Premium */}
            <Card className="pricing-card w-full border-2 border-primary shadow-lg shadow-primary/20" data-testid="card-pricing-premium">
              <CardHeader className="pricing-card-header text-center space-y-4 pb-6">
                <Badge className="mx-auto text-xs sm:text-sm">✨ RECOMENDADO</Badge>
                <div className="space-y-2">
                  <CardTitle className="text-xl sm:text-2xl">🔸 Plano Premium</CardTitle>
                  <CardDescription className="text-sm">
                    Para quem quer mergulhar profundamente na Palavra e receber todos os recursos.
                  </CardDescription>
                </div>
                <div className="space-y-2">
                  <div className="text-base sm:text-lg text-muted-foreground">
                    De <span className="line-through text-red-500 font-semibold">R$ 97,00</span>
                  </div>
                  <div className="text-sm sm:text-base font-semibold text-foreground">
                    por
                  </div>
                  <div className="space-y-1">
                    <div className="text-xl sm:text-2xl font-bold text-primary">APENAS</div>
                    <div className="pricing-price-lg text-4xl sm:text-5xl font-bold text-primary">R$ 27</div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pricing-card-content space-y-6">
                <div className="space-y-3">
                  {premiumFeatures.map((feature, index) => (
                    <div 
                      key={index} 
                      className="flex items-start gap-3"
                      data-testid={`feature-premium-${index}`}
                    >
                      <div className="flex-shrink-0 mt-1">
                        <Check className="w-5 h-5 text-green-500 led-check" />
                      </div>
                      <div className="flex-1">
                        <p className="text-foreground">{feature.name}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <Button 
                  onClick={handlePremiumPlanClick}
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground border-primary-border animate-pulse-scale"
                  size="lg"
                  data-testid="button-buy-premium"
                >
                  QUERO O PLANO PREMIUM — R$ 27
                </Button>
              </CardContent>
            </Card>
          </div>

          <p className="text-center text-sm text-muted-foreground">
            💳 Pagamento seguro e acesso imediato por e-mail.
          </p>
        </div>
      </section>

      {/* 9. Depoimentos */}
      <section className="py-12 px-4 md:py-20 bg-muted/30">
        <div className="container max-w-4xl mx-auto space-y-8">
          <h2 className="font-heading font-bold text-2xl md:text-4xl text-center text-foreground">
            O que nossos alunos dizem
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="hover-elevate" data-testid={`card-testimonial-${index}`}>
                <CardContent className="p-6 space-y-4">
                  <div className="space-y-2">
                    <p className="font-semibold text-primary">{testimonial.name}</p>
                    <div className="flex gap-1">
                      {Array.from({ length: testimonial.stars }).map((_, starIndex) => (
                        <Star key={starIndex} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </div>
                  <p className="text-foreground/90 leading-relaxed italic">
                    "{testimonial.text}"
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 10. Garantia */}
      <section className="py-12 px-4 md:py-20 bg-gradient-to-b from-background to-primary/5">
        <div className="container max-w-3xl mx-auto">
          <Card className="border-2 border-primary/30 hover-elevate">
            <CardContent className="p-8 md:p-12 text-center space-y-6">
              <div className="flex justify-center">
                <img 
                  src={garantia30DiasImage} 
                  alt="7 Dias de Garantia" 
                  className="h-24 md:h-32 w-auto"
                  data-testid="img-garantia-7-dias"
                />
              </div>
              <h2 className="font-heading font-bold text-2xl md:text-3xl text-foreground">
                🛡️ Garantia de 7 Dias
              </h2>
              <div className="space-y-4 text-foreground/90">
                <p className="text-lg">
                  Você tem <span className="font-semibold text-primary">7 dias de garantia total.</span>
                </p>
                <p className="text-lg">
                  Se não sentir que sua compreensão da Palavra foi transformada, devolvemos{" "}
                  <span className="font-semibold text-primary">100% do valor.</span>
                </p>
                <p className="text-base text-muted-foreground pt-2">
                  Sua fé está protegida — e seu investimento também.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* 11. FAQ */}
      <section className="py-12 px-4 md:py-20 bg-background">
        <div className="container max-w-3xl mx-auto space-y-8">
          <h2 className="font-heading font-bold text-2xl md:text-4xl text-center text-foreground">
            ❓ Perguntas Frequentes
          </h2>

          <Accordion type="single" collapsible className="space-y-4">
            {faqItems.map((item, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="border rounded-lg px-4 bg-card"
                data-testid={`accordion-faq-${index}`}
              >
                <AccordionTrigger className="text-left font-semibold hover:no-underline">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-foreground/80">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* 12. Botão Final */}
      <section className="py-12 px-4 md:py-16 bg-gradient-to-b from-primary/10 to-background">
        <div className="container max-w-2xl mx-auto text-center space-y-6">
          <h2 className="font-heading font-bold text-2xl md:text-3xl text-foreground">
            Pronto para transformar seu estudo da Bíblia?
          </h2>
          <Button 
            onClick={handleCTAClick} 
            size="lg" 
            className="w-full max-w-md mx-auto text-sm md:text-base h-14 md:h-16 bg-primary hover:bg-primary/90 text-primary-foreground border-primary-border animate-pulse-scale px-4"
            data-testid="button-cta-final"
          >
            QUERO GARANTIR MEU MAPA DA FÉ CATÓLICA AGORA
          </Button>
        </div>
      </section>

      {/* 13. Rodapé */}
      <footer className="py-12 px-4 bg-muted/50 border-t">
        <div className="container max-w-4xl mx-auto">
          <div className="text-center space-y-6">
            <div className="flex items-center justify-center gap-2 text-foreground">
              <Book className="w-6 h-6" />
              <span className="font-heading font-bold text-xl">Mapa da Fé Católica</span>
            </div>
            
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
              <a href="#" className="hover:text-foreground transition-colors" data-testid="link-privacy">
                Política de Privacidade
              </a>
              <span className="text-muted-foreground/50">•</span>
              <a href="#" className="hover:text-foreground transition-colors" data-testid="link-terms">
                Termos de Uso
              </a>
              <span className="text-muted-foreground/50">•</span>
              <a href="#" className="hover:text-foreground transition-colors" data-testid="link-support">
                <Mail className="w-4 h-4 inline mr-1" />
                Suporte
              </a>
            </div>

            <p className="text-sm text-muted-foreground">
              © 2025 Mapa da Fé Católica — Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>

      {/* Popup de Desconto Limitado */}
      <AlertDialog open={showDiscountPopup} onOpenChange={setShowDiscountPopup}>
        <AlertDialogContent className="max-w-md" data-testid="dialog-discount-popup">
          <AlertDialogHeader>
            <div className="text-center space-y-3">
              <Badge variant="destructive" className="text-xs px-3 py-1 animate-pulse-scale text-white">
                ⏰ OFERTA ACABA EM 5 MINUTOS ⏰
              </Badge>
              <AlertDialogTitle className="text-xl font-bold text-foreground">
                Espere! Oferta Especial
              </AlertDialogTitle>
              <AlertDialogDescription className="text-sm text-foreground/80">
                Aproveite o <span className="font-bold text-primary">Plano Premium</span> com desconto exclusivo:
              </AlertDialogDescription>
            </div>
          </AlertDialogHeader>

          <div className="py-4">
            <div className="text-center space-y-3 border-2 border-primary rounded-lg p-4">
              <div className="space-y-1">
                <div className="text-sm text-muted-foreground">
                  De <span className="line-through text-red-500 font-semibold">R$ 27,00</span> por apenas
                </div>
                <div className="text-4xl font-bold bg-gradient-to-r from-primary via-chart-4 to-accent bg-clip-text text-transparent">
                  R$ 17,00
                </div>
                <p className="text-xs text-muted-foreground">
                  Economia de R$ 10,00!
                </p>
              </div>
              
              <div className="bg-muted/30 backdrop-blur-sm rounded-lg p-3 space-y-2">
                <p className="font-semibold text-foreground text-sm">Inclui tudo do Premium:</p>
                <div className="grid gap-1.5">
                  {premiumFeatures.slice(0, 5).map((feature, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-xs text-foreground text-left">{feature.name}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <p className="text-xs text-muted-foreground font-semibold text-red-500">
                ⚠️ Esta oferta vai sumir em 5 minutos!
              </p>
            </div>
          </div>

          <AlertDialogFooter className="flex-col sm:flex-col gap-2">
            <AlertDialogAction
              onClick={handleAcceptPremiumOffer}
              className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90 text-primary-foreground text-sm font-bold"
              data-testid="button-accept-premium-offer"
            >
              QUERO O PREMIUM POR R$ 17,00
            </AlertDialogAction>
            <AlertDialogCancel
              onClick={handleDeclineOffer}
              className="w-full text-xs"
              data-testid="button-decline-offer"
            >
              Não, prefiro o básico por R$ 10
            </AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Popup de Exit Intent / Volta do Checkout */}
      <AlertDialog open={showExitIntentPopup} onOpenChange={setShowExitIntentPopup}>
        <AlertDialogContent className="max-w-md" data-testid="dialog-exit-intent-popup">
          <AlertDialogHeader>
            <div className="text-center space-y-3">
              <Badge variant="destructive" className="text-xs px-3 py-1 animate-pulse-scale text-white">
                🚨 ESPERE! NÃO VÁ EMBORA 🚨
              </Badge>
              <AlertDialogTitle className="text-xl font-bold text-foreground">
                Última Chance: Oferta Exclusiva!
              </AlertDialogTitle>
              <AlertDialogDescription className="text-sm text-foreground/80">
                Antes de sair, veja essa oferta especial que preparamos para você:
              </AlertDialogDescription>
            </div>
          </AlertDialogHeader>

          <div className="py-4">
            <div className="text-center space-y-3 border-2 border-primary rounded-lg p-4 bg-gradient-to-b from-primary/5 to-transparent">
              <div className="space-y-1">
                <div className="text-sm text-muted-foreground">
                  🎁 Plano Premium com <span className="font-bold text-primary">DESCONTO ESPECIAL</span>
                </div>
                <div className="text-sm text-muted-foreground">
                  De <span className="line-through text-red-500 font-semibold">R$ 27,00</span> por apenas
                </div>
                <div className="text-4xl font-bold bg-gradient-to-r from-primary via-chart-4 to-accent bg-clip-text text-transparent">
                  R$ 14,90
                </div>
                <p className="text-xs text-muted-foreground">
                  💰 Economize R$ 12,10 agora!
                </p>
              </div>
              
              <div className="bg-muted/30 backdrop-blur-sm rounded-lg p-3 space-y-2">
                <p className="font-semibold text-foreground text-sm">✨ Tudo do Premium incluído:</p>
                <div className="grid gap-1.5">
                  {premiumFeatures.slice(0, 6).map((feature, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-xs text-foreground text-left">{feature.name}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <p className="text-xs font-semibold text-red-500 animate-pulse">
                ⚠️ Oferta válida SOMENTE agora!
              </p>
            </div>
          </div>

          <AlertDialogFooter className="flex-col sm:flex-col gap-2">
            <AlertDialogAction
              onClick={handleExitIntentOffer}
              className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90 text-primary-foreground text-sm font-bold"
              data-testid="button-accept-exit-intent-offer"
            >
              ✅ SIM! QUERO O PREMIUM POR R$ 14,90
            </AlertDialogAction>
            <AlertDialogCancel
              onClick={handleCloseExitIntent}
              className="w-full text-xs"
              data-testid="button-close-exit-intent"
            >
              Não, obrigado
            </AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
