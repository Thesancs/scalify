
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
  FormDescription,
} from '@/components/ui/form';
import { Checkbox } from '@/components/ui/checkbox';
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
import { type Oferta, formatOptions } from '@/lib/ofertas-data';
import { useEffect, useState } from 'react';
import { Save, Upload } from 'lucide-react';
import Image from 'next/image';
import { ScrollArea } from '@/components/ui/scroll-area';

interface OfferFormDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (oferta: Oferta) => void;
  oferta?: Oferta;
}

const formSchema = z.object({
  title: z.string().min(3, 'O título é obrigatório.'),
  type: z.enum(['Infoproduto', 'Encapsulado', 'SaaS']),
  format: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: 'Você precisa selecionar pelo menos um formato.',
  }),
  status: z.enum(['escalando', 'estável', 'queda']),
  imageUrl: z.string().min(1, 'A imagem é obrigatória.'),
  vendasUrl: z.string().url('Por favor, insira uma URL válida para a página de vendas.'),
  checkoutUrl: z.string().url('Por favor, insira uma URL válida para o checkout.'),
});

type OfferFormData = z.infer<typeof formSchema>;

const defaultFormValues: OfferFormData = {
  title: '',
  type: 'Infoproduto',
  format: ['VSL'],
  status: 'estável',
  imageUrl: '',
  vendasUrl: '',
  checkoutUrl: '',
};

export function OfferFormDialog({ isOpen, onClose, onSave, oferta }: OfferFormDialogProps) {
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const form = useForm<OfferFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultFormValues,
  });
  
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>, fieldChange: (value: string) => void) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const dataUrl = reader.result as string;
        fieldChange(dataUrl);
        setImagePreview(dataUrl);
      };
      reader.readAsDataURL(file);
    }
  };


  useEffect(() => {
    if (isOpen) {
      if (oferta) {
        form.reset({
          title: oferta.title,
          type: oferta.type,
          format: [...oferta.format], // Create a new array reference
          status: oferta.status,
          imageUrl: oferta.imageUrl,
          vendasUrl: oferta.vendasUrl || '',
          checkoutUrl: oferta.checkoutUrl || '',
        });
        setImagePreview(oferta.imageUrl);
      } else {
        form.reset(defaultFormValues);
        setImagePreview(null);
      }
    }
  }, [oferta, isOpen, form.reset]);
  
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
      <DialogContent className="sm:max-w-xl glassmorphic max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>{oferta ? 'Editar Oferta' : 'Adicionar Nova Oferta'}</DialogTitle>
          <DialogDescription>
            {oferta ? 'Modifique os detalhes da oferta abaixo.' : 'Preencha os campos para criar uma nova oferta.'}
          </DialogDescription>
        </DialogHeader>
        <div className="flex-1 overflow-y-auto -mx-6 px-6">
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
                      name="status"
                      render={({ field }) => (
                          <FormItem>
                          <FormLabel>Status</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                  <SelectTrigger><SelectValue placeholder="Selecione o status" /></SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                  <SelectItem value="escalando">Escalando</SelectItem>
                                  <SelectItem value="estável">Estável</SelectItem>
                                  <SelectItem value="queda">Em Queda</SelectItem>
                              </SelectContent>
                          </Select>
                          <FormMessage />
                          </FormItem>
                      )}
                  />
              </div>
                <FormField
                  control={form.control}
                  name="format"
                  render={() => (
                    <FormItem>
                      <div className="mb-4">
                        <FormLabel className="text-base">Formato da Oferta</FormLabel>
                        <FormDescription>
                          Selecione um ou mais formatos.
                        </FormDescription>
                      </div>
                      {formatOptions.map((item) => (
                        <FormField
                          key={item.id}
                          control={form.control}
                          name="format"
                          render={({ field }) => {
                            return (
                              <FormItem
                                key={item.id}
                                className="flex flex-row items-start space-x-3 space-y-0"
                              >
                                <FormControl>
                                  <Checkbox
                                    checked={field.value?.includes(item.id)}
                                    onCheckedChange={(checked) => {
                                      return checked
                                        ? field.onChange([...(field.value || []), item.id])
                                        : field.onChange(
                                            field.value?.filter(
                                              (value) => value !== item.id
                                            )
                                          )
                                    }}
                                  />
                                </FormControl>
                                <FormLabel className="font-normal">
                                  {item.label}
                                </FormLabel>
                              </FormItem>
                            )
                          }}
                        />
                      ))}
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="imageUrl"
                  render={({ field }) => (
                      <FormItem>
                          <FormLabel>Imagem da Oferta</FormLabel>
                          <FormControl>
                              <div>
                                  <Input 
                                      type="file" 
                                      className="hidden"
                                      id="image-upload"
                                      accept="image/png, image/jpeg, image/gif"
                                      onChange={(e) => handleImageChange(e, field.onChange)}
                                  />
                                  <label htmlFor="image-upload" className="cursor-pointer inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 h-10 px-4 py-2 border border-input bg-background hover:bg-primary/20 hover:text-primary w-full">
                                      <Upload className="mr-2 h-4 w-4" />
                                      Carregar Imagem
                                  </label>
                              </div>
                          </FormControl>
                          {imagePreview && (
                              <div className="mt-4 relative w-full h-48 rounded-md overflow-hidden border border-border">
                                  <Image src={imagePreview} alt="Prévia da imagem" layout="fill" objectFit="cover" />
                              </div>
                          )}
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

              <DialogFooter className="pt-8 -mx-6 px-6 pb-6 sticky bottom-0 bg-card/80 backdrop-blur-sm">
                  <Button type="button" variant="ghost" onClick={onClose}>Cancelar</Button>
                  <Button type="submit">
                      <Save className="mr-2 h-4 w-4"/>
                      Salvar Oferta
                  </Button>
              </DialogFooter>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
