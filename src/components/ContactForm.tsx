import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
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
import { Textarea } from '@/components/ui/textarea';
import { useContactForm, ContactFormData } from '@/hooks/useContactForm';

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email." }),
  phone: z.string().min(10, { message: "Please enter a valid phone number." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

type FormValues = z.infer<typeof formSchema>;

// Animation variants for staggering
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.08 * i, duration: 0.5, type: 'spring' },
  }),
};

const ContactForm: React.FC = () => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", email: "", phone: "", message: "" },
  });

  const { useSubmitContactForm } = useContactForm();
  const { mutate: submitContactForm, isPending } = useSubmitContactForm();

  const onSubmit = (data: FormValues) => {
    const contactData: ContactFormData = {
      name: data.name,
      email: data.email,
      phone: data.phone,
      message: data.message
    };
    submitContactForm(contactData, { onSuccess: () => form.reset() });
  };

  // Staggered order of fields
  const fields = [
    {
      name: "name",
      label: "Full Name",
      placeholder: "John Doe",
      type: "text",
      colSpan: 1,
    },
    {
      name: "email",
      label: "Email",
      placeholder: "john@example.com",
      type: "email",
      colSpan: 1,
    },
    {
      name: "phone",
      label: "Phone Number",
      placeholder: "(647) 555-1234",
      type: "text",
      colSpan: 1,
    },
  ];

  return (
    <Form {...form}>
      <motion.form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6"
        initial="hidden"
        animate="visible"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {fields.map((field, idx) => (
            <motion.div key={field.name} variants={fadeInUp} custom={idx}>
              <FormField
                control={form.control}
                name={field.name as "name" | "email" | "phone"}
                render={({ field: formField }) => (
                  <FormItem>
                    <FormLabel className="font-bold text-realtor-navy">{field.label}</FormLabel>
                    <FormControl>
                      <Input
                        {...formField}
                        type={field.type}
                        placeholder={field.placeholder}
                        className="p-3 border-2 border-realtor-gold rounded-md focus:border-realtor-navy focus:ring-realtor-gold transition"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </motion.div>
          ))}
        </div>

        {/* Message field (full width, animated after fields) */}
        <motion.div variants={fadeInUp} custom={fields.length}>
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-bold text-realtor-navy">Message</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    placeholder="How can I help you?"
                    className="min-h-[150px] p-3 border-2 border-realtor-gold rounded-md focus:border-realtor-navy focus:ring-realtor-gold transition"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </motion.div>

        {/* Submit Button (animated last) */}
        <motion.div variants={fadeInUp} custom={2} whileTap={{ scale: 0.97 }}>
  <Button
    type="submit"
    className="w-full md:w-auto bg-realtor-gold hover:bg-realtor-navy hover:text-realtor-gold text-realtor-navy font-semibold px-8 py-3 transition-all"
    disabled={isPending}
  >
    {isPending ? 'Scheduling...' : 'Schedule Consultation'}
  </Button>
</motion.div>
      </motion.form>
    </Form>
  );
};

export default ContactForm;
