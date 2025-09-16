import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Copy, ShieldCheck, Upload } from 'lucide-react';

const ofertasMock = [
  'Curso X – R$297',
  'E-book Y – R$47',
  'Mentoria Z – R$997',
];

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Bem-vindo à Scalify
        </h1>
        <p className="text-muted-foreground">
          Sua jornada do primeiro passo à grande escala.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {/* Card de Ofertas */}
        <Card className="flex flex-col rounded-2xl border-primary/50 bg-card/60 shadow-lg backdrop-blur-sm transition-transform duration-300 hover:scale-[1.02] hover:shadow-primary/20">
          <CardHeader>
            <CardTitle className="text-xl text-foreground">Ofertas</CardTitle>
          </CardHeader>
          <CardContent className="flex-grow">
            <ul className="space-y-2 text-muted-foreground">
              {ofertasMock.map((oferta, index) => (
                <li key={index} className="text-sm">{oferta}</li>
              ))}
            </ul>
          </CardContent>
          <CardFooter>
            <Button variant="secondary" className="w-full">
              Ver todas ofertas
            </Button>
          </CardFooter>
        </Card>

        {/* Card Anticlone */}
        <Card className="flex flex-col rounded-2xl border-secondary/50 bg-card/60 shadow-lg backdrop-blur-sm transition-transform duration-300 hover:scale-[1.02] hover:shadow-secondary/20">
          <CardHeader>
            <CardTitle className="flex items-center justify-between text-xl text-foreground">
              <span>Proteções ativas</span>
              <ShieldCheck className="h-5 w-5 text-green-500" />
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-grow">
            <p className="text-2xl font-bold">23</p>
            <p className="text-sm text-muted-foreground">
              tentativas de clonagem bloqueadas
            </p>
          </CardContent>
          <CardFooter className="flex flex-col items-start gap-2">
            <Badge variant="outline" className='border-green-500/50 text-green-500'>Ativo</Badge>
            <p className="text-xs text-muted-foreground">
              Última em: 15/09/2025
            </p>
          </CardFooter>
        </Card>

        {/* Card Clonador de Ofertas */}
        <Card className="flex flex-col rounded-2xl border-primary/50 bg-card/60 shadow-lg backdrop-blur-sm transition-transform duration-300 hover:scale-[1.02] hover:shadow-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center justify-between text-xl text-foreground">
             <span>Clonar Oferta</span>
             <Copy className="h-5 w-5 text-primary"/>
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-grow space-y-4">
            <Input
              type="text"
              placeholder="Insira o link da página que deseja clonar"
            />
            <Button className="w-full">Clonar</Button>
          </CardContent>
          <CardFooter>
             <p className="text-xs text-muted-foreground w-full text-center">Cole um link para começar.</p>
          </CardFooter>
        </Card>

        {/* Card Removedor de Metadados */}
        <Card className="flex flex-col rounded-2xl border-secondary/50 bg-card/60 shadow-lg backdrop-blur-sm transition-transform duration-300 hover:scale-[1.02] hover:shadow-secondary/20">
          <CardHeader>
            <CardTitle className="flex items-center justify-between text-xl text-foreground">
              <span>Limpador de Metadados</span>
              <Upload className="h-5 w-5 text-secondary" />
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-grow">
            <p className="text-sm text-muted-foreground">
              Remova dados EXIF e outras informações de suas imagens com apenas 1
              clique.
            </p>
          </CardContent>
          <CardFooter>
            <Button variant="secondary" className="w-full">
              Acessar Removedor
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
