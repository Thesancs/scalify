import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Copy, FileCode2, ShieldCheck, Star, Tag } from 'lucide-react';

const modules = [
  { title: 'Ofertas', icon: Tag },
  { title: 'Reviews', icon: Star },
  { title: 'Anticlone', icon: ShieldCheck },
  { title: 'Clonador', icon: Copy },
  { title: 'Metadata', icon: FileCode2 },
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
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {modules.map((module) => (
          <Card 
            key={module.title} 
            className="bg-card/60 backdrop-blur-sm border-white/10 rounded-xl shadow-lg hover:border-primary/50 transition-colors duration-300"
          >
            <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg font-medium">{module.title}</CardTitle>
              <module.icon className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Em breve integração com API.</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
