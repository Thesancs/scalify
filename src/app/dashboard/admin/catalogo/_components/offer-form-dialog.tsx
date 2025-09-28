
'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { type Oferta } from '@/lib/ofertas-data';
import { useEffect } from 'react';
import { Save } from 'lucide-react';

interface OfferFormDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (oferta: Oferta) => void;
  oferta?: Oferta;
}

const formSchema = z.object({
  title: z.string().min(3, 'O título é obrigatório.'),
  type: z.enum(['Infoproduto', 'Encapsulado', 'SaaS']),
  format: z.enum(['VSL', 'Landing Page', 'Quiz']),
  status: z.enum(['escalando', 'estável', 'queda']),
  imageUrl: z.string().url('Por favor, insira uma URL de imagem válida.'),
  vendasUrl: z.string().url('Por favor, insira uma URL válida para a página de vendas.'),
  checkoutUrl: z.string().url('Por favor, insira uma URL válida para o checkout.'),
});

type OfferFormData = z.infer<typeof formSchema>;

export function OfferFormDialog({ isOpen, onClose, onSave, oferta }: OfferFormDialogProps) {
  const form = useForm<OfferFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      type: 'Infoproduto',
      format: 'VSL',
      status: 'estável',
      imageUrl: '',
      vendasUrl: '',
      checkoutUrl: '',
    },
  });

  useEffect(() => {
    if (oferta) {
      form.reset({
        title: oferta.title,
        type: oferta.type,
        format: oferta.format,
        status: oferta.status,
        imageUrl: oferta.imageUrl,
        vendasUrl: oferta.vendasUrl || '',
        checkoutUrl: oferta.checkoutUrl || '',
      });
    } else {
      form.reset();
    }
  }, [oferta, form, isOpen]);
  
  const onSubmit = (data: OfferFormData) => {
    const ofertaToSave: Oferta = {
        ...data,
        id: oferta?.id || '', 
        // Mock data fields that are not in the form
        ads: oferta?.ads || 0,
        roas: oferta?.roas || 0,
        ticket: oferta?.ticket || 0,
        score: oferta?.score || 'Médio',
        porque: oferta?.porque || '',
        imageHint: oferta?.imageHint || 'custom product',
    };
    onSave(ofertaToSave);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] glassmorphic">
        <DialogHeader>
          <DialogTitle>{oferta ? 'Editar Oferta' : 'Adicionar Nova Oferta'}</DialogTitle>
          <DialogDescription>
            {oferta ? 'Modifique os detalhes da oferta abaixo.' : 'Preencha os campos para criar uma nova oferta.'}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
                 <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Título da Oferta</FormLabel>
                        <FormControl>
                            <Input placeholder="Ex: Método de 7 Segundos" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                 />
                 <div className="grid grid-cols-2 gap-4">
                    <FormField
                        control={form.control}
                        name="type"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Tipo</FormLabel>
                               <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger><SelectValue placeholder="Selecione o tipo" /></SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="Infoproduto">Infoproduto</SelectItem>
                                    <SelectItem value="Encapsulado">Encapsulado</SelectItem>
                                    <SelectItem value="SaaS">SaaS</SelectItem>
                                </SelectContent>
                            </Select>
                            <FormMessage />
                            </FormItem>
                        )}
                    />
                     <FormField
                        control={form.control}
                        name="format"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Formato</FormLabel>
                             <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger><SelectValue placeholder="Selecione o formato" /></SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="VSL">VSL</SelectItem>
                                    <SelectItem value="Landing Page">Landing Page</SelectItem>
                                    <SelectItem value="Quiz">Quiz</SelectItem>
                                </SelectContent>
                            </Select>
                            <FormMessage />
                            </FormItem>
                        )}
                    />
                 </div>
                  <FormField
                    control={form.control}
                    name="imageUrl"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>URL da Imagem da Oferta</FormLabel>
                        <FormControl>
                            <Input placeholder="https://..." {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                 />
                 <FormField
                    control={form.control}
                    name="vendasUrl"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>URL da Página de Vendas</FormLabel>
                        <FormControl>
                            <Input placeholder="https://..." {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                 />
                 <FormField
                    control={form.control}
                    name="checkoutUrl"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>URL do Checkout</FormLabel>
                        <FormControl>
                            <Input placeholder="https://..." {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                 />
                <DialogFooter>
                    <Button type="button" variant="ghost" onClick={onClose}>Cancelar</Button>
                    <Button type="submit">
                        <Save className="mr-2 h-4 w-4"/>
                        Salvar Oferta
                    </Button>
                </DialogFooter>
            </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

