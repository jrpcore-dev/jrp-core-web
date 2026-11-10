"use client";

import React, { useState } from 'react';
import {
  ArrowRight,
  ArrowUpRight,
  Building2,
  Check,
  Clock,
  Copy,
  Loader2,
  Lock,
  Mail,
  Phone,
  Send,
  User,
} from 'lucide-react';
import { ScrollReveal, SectionEyebrow } from '@/components/product-page-shared';
import { motion, AnimatePresence } from 'framer-motion';

const WHATSAPP_NUMBER = '529861133052';
const WHATSAPP_HREF = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  'Hola JRP Core, me interesa conocer más sobre sus productos y servicios.',
)}`;
const CONTACT_API_URL = process.env.NEXT_PUBLIC_CONTACT_API_URL || '/api/contact';

const CONTACT_CHANNELS = [
  {
    Icon: Mail,
    label: 'Correo electrónico',
    value: 'contacto@jrpstudios.dev',
    href: 'mailto:contacto@jrpstudios.dev',
  },
  {
    Icon: Phone,
    label: 'Teléfono y WhatsApp',
    value: '+52 (986) 113 3052',
    href: 'tel:+529861133052',
  },
  {
    Icon: Clock,
    label: 'Horario de atención',
    value: 'Lunes a Sábado · 09:00 a 19:00 hrs.',
    href: null,
  },
];

const INTERESTS = [
  { value: 'vendia', label: 'Vendia' },
  { value: 'barberia', label: 'Barbería' },
  { value: 'medida', label: 'Desarrollo a medida' },
  { value: 'soporte', label: 'Soporte' },
];

type ContactField = 'name' | 'email' | 'phone' | 'message';
type ContactErrors = Partial<Record<ContactField, string>>;
type ContactApiResponse = { success: true; folio?: string };

const getContactErrors = (values: Record<ContactField, string>): ContactErrors => {
  const errors: ContactErrors = {};
  if (!values.name.trim()) errors.name = 'Por favor ingresa tu nombre.';
  if (!values.email.trim() || !/^\S+@\S+\.\S+$/.test(values.email)) {
    errors.email = 'Ingresa un correo electrónico válido.';
  }
  if (!values.phone.trim() || values.phone.replace(/\D/g, '').length < 8) {
    errors.phone = 'Ingresa un número telefónico o WhatsApp de contacto.';
  }
  if (!values.message.trim()) errors.message = 'Describe brevemente qué software requieres.';
  return errors;
}

const isContactApiResponse = (value: unknown): value is ContactApiResponse =>
  typeof value === 'object' &&
  value !== null &&
  'success' in value &&
  value.success === true &&
  (!('folio' in value) || typeof value.folio === 'string');

export function ContactForm({ defaultInterest = 'vendia' }: { defaultInterest?: string }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [company, setCompany] = useState('');
  const [interest, setInterest] = useState(defaultInterest);
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submittedFolio, setSubmittedFolio] = useState<string | null>(null);
  const [copiedFolio, setCopiedFolio] = useState(false);
  const [touchedFields, setTouchedFields] = useState<Partial<Record<ContactField, boolean>>>({});
  const [hasAttemptedSubmit, setHasAttemptedSubmit] = useState(false);
  const errors = getContactErrors({ name, email, phone, message });
  const visibleErrors: ContactErrors = hasAttemptedSubmit
    ? errors
    : {
        name: touchedFields.name ? errors.name : undefined,
        email: touchedFields.email ? errors.email : undefined,
        phone: touchedFields.phone ? errors.phone : undefined,
        message: touchedFields.message ? errors.message : undefined,
      };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setHasAttemptedSubmit(true);
    setTouchedFields({ name: true, email: true, phone: true, message: true });

    const firstInvalidField = (['name', 'email', 'phone', 'message'] as const).find(
      (field) => errors[field],
    );
    if (firstInvalidField) {
      document.getElementById(`contact-${firstInvalidField}`)?.focus();
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);
    try {
      const response = await fetch(CONTACT_API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, phone, company, interest, message }),
      });
      const result: unknown = await response.json();

      if (!response.ok || !isContactApiResponse(result)) {
        throw new Error('El servicio no confirmó el envío.');
      }

      setSubmittedFolio(result.folio || null);
      setHasSubmitted(true);
    } catch {
      setSubmitError(
        'No se pudo enviar la solicitud. Intenta de nuevo más tarde o contáctanos por WhatsApp.',
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopyFolio = () => {
    if (submittedFolio) {
      navigator.clipboard.writeText(submittedFolio);
      setCopiedFolio(true);
      setTimeout(() => setCopiedFolio(false), 2000);
    }
  };

  const resetForm = () => {
    setHasSubmitted(false);
    setSubmittedFolio(null);
    setSubmitError(null);
    setMessage('');
    setName('');
    setEmail('');
    setPhone('');
    setCompany('');
    setInterest('vendia');
    setTouchedFields({});
    setHasAttemptedSubmit(false);
  };

  const inputClass = (hasError: boolean) =>
    `peer w-full rounded-[14px] border bg-[#f8fbfe] py-3 pl-11 pr-4 text-[14px] text-[#121722] placeholder-[#a5a5a5] transition-all focus:bg-white focus:outline-none focus:ring-4 ${
      hasError
        ? 'border-[#b42318] focus:border-[#b42318] focus:ring-[#b42318]/10'
        : 'border-[#dce7f0] focus:border-[#0068f9] focus:ring-[#0068f9]/10'
    }`;

  return (
    <section
      id="contacto"
      className="relative overflow-hidden py-20 lg:py-28"
      style={{
        background:
          'linear-gradient(150deg, #f4f8fc 0%, #e8f7fc 42%, #dceef8 78%, #cfe4f3 100%)',
      }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          backgroundImage: 'radial-gradient(rgba(0,104,249,0.10) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
          WebkitMaskImage: 'radial-gradient(ellipse at 50% 0%, black 0%, transparent 72%)',
          maskImage: 'radial-gradient(ellipse at 50% 0%, black 0%, transparent 72%)',
        }}
      />

      <div className="relative mx-auto max-w-[1200px] px-5 sm:px-8">
        <div className="grid grid-cols-1 items-start gap-5 lg:grid-cols-12 lg:gap-6">
          {/* Left: direct contact panel */}
          <ScrollReveal yOffset={26} className="lg:col-span-5">
            <div className="relative overflow-hidden rounded-[28px] bg-[#0b1f3a] p-6 text-white sm:p-8 lg:sticky lg:top-28">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-16 -top-20 h-56 w-56 rounded-full bg-[#0068f9]/40 blur-3xl"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -bottom-24 -left-12 h-56 w-56 rounded-full bg-[#0074dd]/25 blur-3xl"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 opacity-[0.12]"
                style={{
                  backgroundImage:
                    'linear-gradient(rgba(125,184,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(125,184,255,0.5) 1px, transparent 1px)',
                  backgroundSize: '42px 42px',
                  WebkitMaskImage: 'radial-gradient(ellipse at 70% 0%, black 0%, transparent 70%)',
                  maskImage: 'radial-gradient(ellipse at 70% 0%, black 0%, transparent 70%)',
                }}
              />

              <div className="relative">
                <SectionEyebrow tone="dark">Contacto directo</SectionEyebrow>

                <h2 className="mt-4 font-heading text-[clamp(30px,3.6vw,42px)] leading-[1.05] text-white [text-wrap:balance]">
                  Hablemos de tu proyecto.
                </h2>
                <p className="mt-4 text-[14.5px] leading-relaxed text-white/60">
                  Elige alguno de nuestros productos o cuéntanos qué necesitas construir.
                  Te respondemos con una cotización clara en menos de 24 horas.
                </p>

                <div className="mt-7 space-y-2.5">
                  {CONTACT_CHANNELS.map(({ Icon, label, value, href }) => {
                    const content = (
                      <>
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[12px] bg-white/10 text-[#7db8ff] transition-colors group-hover:bg-[#0068f9] group-hover:text-white">
                          <Icon className="h-[18px] w-[18px]" aria-hidden="true" />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block text-[10px] font-semibold uppercase tracking-[0.14em] text-white/40">
                            {label}
                          </span>
                          <span className="mt-0.5 block truncate text-[13.5px] font-medium text-white">
                            {value}
                          </span>
                        </span>
                        {href && (
                          <ArrowUpRight
                            className="h-4 w-4 shrink-0 text-[#7db8ff] opacity-0 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100"
                            aria-hidden="true"
                          />
                        )}
                      </>
                    );

                    return href ? (
                      <a
                        key={label}
                        href={href}
                        className="group flex items-center gap-3 rounded-[16px] border border-white/10 bg-white/[0.04] px-3 py-3 transition-colors hover:border-white/20 hover:bg-white/[0.08] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7db8ff]/60"
                      >
                        {content}
                      </a>
                    ) : (
                      <div
                        key={label}
                        className="group flex items-center gap-3 rounded-[16px] border border-white/10 bg-white/[0.04] px-3 py-3"
                      >
                        {content}
                      </div>
                    );
                  })}
                </div>

                <div className="mt-7 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-2 text-[11.5px] font-medium text-white/65">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inset-0 animate-ping rounded-full bg-[#4ade80]/70" />
                    <span className="relative h-2 w-2 rounded-full bg-[#4ade80]" />
                  </span>
                  Respondemos en menos de 24 h
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Right: form */}
          <ScrollReveal delay={0.12} yOffset={30} className="lg:col-span-7">
            <div className="relative overflow-hidden rounded-[28px] border border-white bg-white p-5 shadow-[0_40px_90px_-50px_rgba(7,27,58,0.55)] sm:p-8">
              <div
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-[#0068f9] via-[#0074dd] to-[#7db8ff]"
              />

              <AnimatePresence mode="wait">
                {hasSubmitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.97 }}
                    className="space-y-6 py-8 text-center"
                  >
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#e8f7fc] text-[#0068f9]">
                      <Check className="h-8 w-8" strokeWidth={3} />
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-[22px] font-semibold text-[#121722]">
                        ¡Solicitud recibida con éxito!
                      </h3>
                      <p className="mx-auto max-w-md text-[14px] leading-relaxed text-[#777c86]">
                        Gracias,{' '}
                        <strong className="font-semibold text-[#121722]">{name}</strong>. Un
                        ingeniero de JRP Core revisará los detalles de tu proyecto y te
                        contactará a la brevedad.
                      </p>
                    </div>

                    {submittedFolio && (
                      <div className="mx-auto flex max-w-sm items-center justify-between gap-3 rounded-[14px] border border-[#dce7f0] bg-[#e8f7fc] p-4">
                        <div className="text-left">
                          <span className="block text-[10px] font-semibold uppercase tracking-[0.08em] text-[#777c86]">
                            Folio de seguimiento:
                          </span>
                          <span className="font-mono text-[15px] font-medium text-[#121722]">
                            {submittedFolio}
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={handleCopyFolio}
                          className="flex cursor-pointer items-center gap-1.5 rounded-full bg-[#0068f9] px-3 py-1.5 text-[12px] font-medium text-white transition-colors hover:bg-[#024bb1]"
                        >
                          {copiedFolio ? (
                            <Check className="h-3.5 w-3.5" />
                          ) : (
                            <Copy className="h-3.5 w-3.5" />
                          )}
                          <span>{copiedFolio ? 'Copiado' : 'Copiar'}</span>
                        </button>
                      </div>
                    )}

                    <div className="flex flex-col items-center gap-3 pt-2">
                      <a
                        href={WHATSAPP_HREF}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-full bg-[#0068f9] px-5 py-2.5 text-[12.5px] font-semibold text-white transition-colors hover:bg-[#024bb1]"
                      >
                        Continuar por WhatsApp
                        <ArrowRight className="h-4 w-4" aria-hidden="true" />
                      </a>
                      <button
                        type="button"
                        onClick={resetForm}
                        className="cursor-pointer text-[12px] font-medium text-[#0068f9] hover:underline"
                      >
                        Enviar otra consulta
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="space-y-5"
                    noValidate
                    aria-busy={isSubmitting}
                  >
                    <div>
                      <h3 className="text-[21px] font-semibold text-[#121722]">
                        Solicita tu cotización
                      </h3>
                      <p className="mt-1 text-[13px] text-[#777c86]">
                        Cuéntanos qué necesitas y te contactamos con una propuesta clara.
                      </p>
                    </div>

                    {hasAttemptedSubmit && Object.values(errors).some(Boolean) && (
                      <p
                        role="alert"
                        className="rounded-[12px] border border-[#b42318]/20 bg-[#b42318]/5 px-4 py-3 text-[12px] text-[#b42318]"
                      >
                        Revisa los campos marcados. Hay información incompleta o incorrecta.
                      </p>
                    )}

                    {submitError && (
                      <p
                        role="alert"
                        className="rounded-[12px] border border-[#b42318]/20 bg-[#b42318]/5 px-4 py-3 text-[12px] text-[#b42318]"
                      >
                        {submitError}
                      </p>
                    )}

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div>
                        <label
                          htmlFor="contact-name"
                          className="mb-1.5 block text-[12px] font-medium text-[#121722]"
                        >
                          Nombre o razón social *
                        </label>
                        <div className="relative">
                          <User
                            className="pointer-events-none absolute left-3.5 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-[#0068f9]/70"
                            aria-hidden="true"
                          />
                          <input
                            id="contact-name"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            onBlur={() => setTouchedFields((fields) => ({ ...fields, name: true }))}
                            placeholder="Ej. Roberto Morales"
                            className={inputClass(Boolean(visibleErrors.name))}
                            aria-invalid={Boolean(visibleErrors.name)}
                            aria-describedby={visibleErrors.name ? 'contact-name-error' : undefined}
                          />
                        </div>
                        {visibleErrors.name && (
                          <p id="contact-name-error" className="mt-1 text-[11px] text-[#b42318]">
                            {visibleErrors.name}
                          </p>
                        )}
                      </div>

                      <div>
                        <label
                          htmlFor="contact-email"
                          className="mb-1.5 block text-[12px] font-medium text-[#121722]"
                        >
                          Correo electrónico *
                        </label>
                        <div className="relative">
                          <Mail
                            className="pointer-events-none absolute left-3.5 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-[#0068f9]/70"
                            aria-hidden="true"
                          />
                          <input
                            id="contact-email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            onBlur={() => setTouchedFields((fields) => ({ ...fields, email: true }))}
                            placeholder="ejemplo@negocio.com"
                            className={inputClass(Boolean(visibleErrors.email))}
                            aria-invalid={Boolean(visibleErrors.email)}
                            aria-describedby={visibleErrors.email ? 'contact-email-error' : undefined}
                          />
                        </div>
                        {visibleErrors.email && (
                          <p id="contact-email-error" className="mt-1 text-[11px] text-[#b42318]">
                            {visibleErrors.email}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div>
                        <label
                          htmlFor="contact-phone"
                          className="mb-1.5 block text-[12px] font-medium text-[#121722]"
                        >
                          Teléfono / WhatsApp *
                        </label>
                        <div className="relative">
                          <Phone
                            className="pointer-events-none absolute left-3.5 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-[#0068f9]/70"
                            aria-hidden="true"
                          />
                          <input
                            id="contact-phone"
                            type="tel"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            onBlur={() => setTouchedFields((fields) => ({ ...fields, phone: true }))}
                            placeholder="Ej. 55 1234 5678"
                            className={inputClass(Boolean(visibleErrors.phone))}
                            aria-invalid={Boolean(visibleErrors.phone)}
                            aria-describedby={visibleErrors.phone ? 'contact-phone-error' : undefined}
                          />
                        </div>
                        {visibleErrors.phone && (
                          <p id="contact-phone-error" className="mt-1 text-[11px] text-[#b42318]">
                            {visibleErrors.phone}
                          </p>
                        )}
                      </div>

                      <div>
                        <label
                          htmlFor="contact-company"
                          className="mb-1.5 block text-[12px] font-medium text-[#121722]"
                        >
                          Empresa{' '}
                          <span className="font-normal text-[#a5a5a5]">(opcional)</span>
                        </label>
                        <div className="relative">
                          <Building2
                            className="pointer-events-none absolute left-3.5 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-[#0068f9]/70"
                            aria-hidden="true"
                          />
                          <input
                            id="contact-company"
                            type="text"
                            value={company}
                            onChange={(e) => setCompany(e.target.value)}
                            placeholder="Nombre de tu negocio"
                            className={inputClass(false)}
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <span className="mb-2 block text-[12px] font-medium text-[#121722]">
                        ¿Qué te interesa?
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {INTERESTS.map((option) => {
                          const selected = interest === option.value;
                          return (
                            <button
                              key={option.value}
                              type="button"
                              onClick={() => setInterest(option.value)}
                              aria-pressed={selected}
                              className={`cursor-pointer rounded-full border px-3.5 py-2 text-[12px] font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0068f9]/40 ${
                                selected
                                  ? 'border-[#0068f9] bg-[#0068f9] text-white shadow-[0_10px_22px_-14px_rgba(0,104,249,0.9)]'
                                  : 'border-[#dce7f0] bg-[#f8fbfe] text-[#4f5963] hover:border-[#0068f9]/40 hover:text-[#0068f9]'
                              }`}
                            >
                              {option.label}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="contact-message"
                        className="mb-1.5 block text-[12px] font-medium text-[#121722]"
                      >
                        Detalles del proyecto *
                      </label>
                      <textarea
                        id="contact-message"
                        rows={4}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onBlur={() => setTouchedFields((fields) => ({ ...fields, message: true }))}
                        placeholder="Cuéntanos qué necesitas: ¿te interesa alguno de nuestros productos o requieres un desarrollo a medida?"
                        className={`w-full resize-none rounded-[14px] border bg-[#f8fbfe] px-4 py-3 text-[14px] text-[#121722] placeholder-[#a5a5a5] transition-all focus:bg-white focus:outline-none focus:ring-4 ${
                          visibleErrors.message
                            ? 'border-[#b42318] focus:border-[#b42318] focus:ring-[#b42318]/10'
                            : 'border-[#dce7f0] focus:border-[#0068f9] focus:ring-[#0068f9]/10'
                        }`}
                        aria-invalid={Boolean(visibleErrors.message)}
                        aria-describedby={visibleErrors.message ? 'contact-message-error' : undefined}
                      />
                      {visibleErrors.message && (
                        <p id="contact-message-error" className="mt-1 text-[11px] text-[#b42318]">
                          {visibleErrors.message}
                        </p>
                      )}
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="group flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-[#0068f9] px-6 py-3.5 text-[13.5px] font-semibold text-white shadow-[0_18px_36px_-18px_rgba(0,104,249,0.9)] transition-all hover:bg-[#024bb1] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                          <span>Enviando solicitud...</span>
                        </>
                      ) : (
                        <>
                          <Send className="h-4 w-4" aria-hidden="true" />
                          <span>Enviar solicitud</span>
                          <ArrowRight
                            className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                            aria-hidden="true"
                          />
                        </>
                      )}
                    </button>

                    <p className="flex items-center justify-center gap-1.5 text-center text-[11px] text-[#a5a5a5]">
                      <Lock className="h-3 w-3 shrink-0" aria-hidden="true" />
                      Tus datos están protegidos. No compartimos tu información con
                      terceros.
                    </p>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
