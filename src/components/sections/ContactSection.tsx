'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { SERVICE_GROUPS, BUDGET_OPTIONS, DEADLINE_OPTIONS, CONTACT_METHOD_OPTIONS, COUNTRIES } from '@/lib/services-data';
import type { EnquiryFormData } from '@/types';

const schema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(7, 'Phone number is too short').max(20).regex(/^[+\d\s\-()]+$/, 'Invalid phone number'),
  company: z.string().max(100).optional(),
  country: z.string().min(1, 'Please select your country'),
  services: z.array(z.string()).min(1, 'Please select at least one service'),
  description: z.string().min(20, 'Please provide at least 20 characters of description').max(2000),
  budget: z.string().min(1, 'Please select a budget range'),
  deadline: z.string().min(1, 'Please select a timeline'),
  contact_method: z.string().min(1, 'Please select a contact method'),
  consent: z.literal(true, { errorMap: () => ({ message: 'You must agree to the privacy policy' }) }),
});

type FormData = z.infer<typeof schema>;

export default function ContactSection() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [enquiryId, setEnquiryId] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string>('');

  const { register, handleSubmit, formState: { errors }, watch, setValue, reset } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { services: [], consent: undefined as unknown as true },
  });

  const selectedServices = watch('services') || [];

  const toggleService = (id: string) => {
    const current = selectedServices;
    if (current.includes(id)) {
      setValue('services', current.filter(s => s !== id), { shouldValidate: true });
    } else {
      setValue('services', [...current, id], { shouldValidate: true });
    }
  };

  const onSubmit = async (data: FormData) => {
    setStatus('loading');
    setErrorMsg('');
    try {
      const res = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || 'Submission failed');
      setEnquiryId(json.enquiryId);
      setStatus('success');
      reset();
    } catch (e: unknown) {
      setErrorMsg(e instanceof Error ? e.message : 'Something went wrong. Please try again.');
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <section id="quote" className="section-pad bg-brand-navy">
        <div className="container-main max-w-xl mx-auto text-center">
          <div className="card p-10">
            <CheckCircle size={48} className="text-emerald-400 mx-auto mb-4" />
            <h2 className="font-display text-2xl font-bold text-brand-white mb-2">Enquiry Received!</h2>
            <p className="text-brand-light mb-4">
              Thank you for reaching out. We will review your requirements and get back to you within 24 hours.
            </p>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-brand-card border border-brand-border">
              <span className="text-xs text-brand-muted">Enquiry ID:</span>
              <span className="font-mono text-sm text-brand-accent font-semibold">{enquiryId}</span>
            </div>
            <p className="text-xs text-brand-muted mt-3">Please save this ID for reference.</p>
            <button onClick={() => setStatus('idle')} className="btn-secondary mt-6">
              Submit Another Enquiry
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="quote" className="section-pad bg-brand-navy">
      <div className="container-main max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <div className="divider mx-auto mb-4" />
          <h2 className="section-title mb-3">Get Your Free Quote</h2>
          <p className="section-subtitle mx-auto text-center">
            Tell us about your project and we will respond within 24 hours with a custom proposal.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} noValidate className="card p-8 space-y-6">
          {/* Name & Email */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="label" htmlFor="name">Full Name <span className="text-red-400">*</span></label>
              <input id="name" className="input-field" placeholder="Your name" {...register('name')} />
              {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>}
            </div>
            <div>
              <label className="label" htmlFor="email">Email Address <span className="text-red-400">*</span></label>
              <input id="email" type="email" className="input-field" placeholder="you@example.com" {...register('email')} />
              {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
            </div>
          </div>

          {/* Phone & Company */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="label" htmlFor="phone">Phone / WhatsApp <span className="text-red-400">*</span></label>
              <input id="phone" className="input-field" placeholder="+91 98765 43210" {...register('phone')} />
              {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone.message}</p>}
            </div>
            <div>
              <label className="label" htmlFor="company">Company / Business Name</label>
              <input id="company" className="input-field" placeholder="Optional" {...register('company')} />
            </div>
          </div>

          {/* Country */}
          <div>
            <label className="label" htmlFor="country">Country <span className="text-red-400">*</span></label>
            <select id="country" className="input-field" {...register('country')}>
              <option value="">Select your country</option>
              {COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            {errors.country && <p className="text-red-400 text-xs mt-1">{errors.country.message}</p>}
          </div>

          {/* Service selection */}
          <div>
            <label className="label">Services Required <span className="text-red-400">*</span></label>
            <p className="text-xs text-brand-muted mb-3">Select one or more services</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {SERVICE_GROUPS.map(group => (
                <button
                  key={group.id}
                  type="button"
                  onClick={() => toggleService(group.id)}
                  className={`text-left px-3 py-2.5 rounded-lg border text-sm transition-all duration-150 ${
                    selectedServices.includes(group.id)
                      ? 'border-brand-blue bg-brand-blue/10 text-brand-white'
                      : 'border-brand-border bg-brand-dark text-brand-muted hover:border-brand-muted hover:text-brand-white'
                  }`}
                >
                  {group.title}
                </button>
              ))}
            </div>
            {errors.services && <p className="text-red-400 text-xs mt-1">{errors.services.message}</p>}
          </div>

          {/* Description */}
          <div>
            <label className="label" htmlFor="description">Project Description <span className="text-red-400">*</span></label>
            <textarea
              id="description"
              rows={4}
              className="input-field resize-y"
              placeholder="Describe your project, goals, or what you need help with..."
              {...register('description')}
            />
            {errors.description && <p className="text-red-400 text-xs mt-1">{errors.description.message}</p>}
          </div>

          {/* Budget & Deadline */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="label" htmlFor="budget">Budget Range <span className="text-red-400">*</span></label>
              <select id="budget" className="input-field" {...register('budget')}>
                <option value="">Select a range</option>
                {BUDGET_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
              {errors.budget && <p className="text-red-400 text-xs mt-1">{errors.budget.message}</p>}
            </div>
            <div>
              <label className="label" htmlFor="deadline">Expected Timeline <span className="text-red-400">*</span></label>
              <select id="deadline" className="input-field" {...register('deadline')}>
                <option value="">Select timeline</option>
                {DEADLINE_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
              {errors.deadline && <p className="text-red-400 text-xs mt-1">{errors.deadline.message}</p>}
            </div>
          </div>

          {/* Contact method */}
          <div>
            <label className="label">Preferred Contact Method <span className="text-red-400">*</span></label>
            <div className="flex flex-wrap gap-2">
              {CONTACT_METHOD_OPTIONS.map(o => (
                <label key={o.value} className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" value={o.value} {...register('contact_method')} className="sr-only" />
                  <span
                    className={`px-4 py-2 rounded-lg border text-sm cursor-pointer transition-all duration-150 ${
                      watch('contact_method') === o.value
                        ? 'border-brand-blue bg-brand-blue/10 text-brand-white'
                        : 'border-brand-border bg-brand-dark text-brand-muted hover:border-brand-muted'
                    }`}
                    onClick={() => setValue('contact_method', o.value, { shouldValidate: true })}
                  >
                    {o.label}
                  </span>
                </label>
              ))}
            </div>
            {errors.contact_method && <p className="text-red-400 text-xs mt-1">{errors.contact_method.message}</p>}
          </div>

          {/* Consent */}
          <div>
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                className="mt-0.5 rounded border-brand-border bg-brand-dark text-brand-blue focus:ring-brand-blue"
                onChange={e => setValue('consent', e.target.checked as true, { shouldValidate: true })}
              />
              <span className="text-sm text-brand-muted">
                I agree to the{' '}
                <a href="/privacy-policy" target="_blank" className="text-brand-accent hover:underline">Privacy Policy</a>
                {' '}and consent to Zeeonix Digital contacting me about my enquiry. <span className="text-red-400">*</span>
              </span>
            </label>
            {errors.consent && <p className="text-red-400 text-xs mt-1">{errors.consent.message}</p>}
          </div>

          {/* Error message */}
          {status === 'error' && (
            <div className="flex items-center gap-2 p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
              <AlertCircle size={16} /> {errorMsg}
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={status === 'loading'}
            className="btn-primary w-full justify-center text-base py-3.5 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {status === 'loading' ? (
              <><Loader2 size={18} className="animate-spin" /> Sending...</>
            ) : (
              <><Send size={18} /> Send My Enquiry</>
            )}
          </button>

          <p className="text-xs text-center text-brand-muted">
            We typically respond within 24 hours on business days. Your data is handled per our privacy policy.
          </p>
        </form>
      </div>
    </section>
  );
}
