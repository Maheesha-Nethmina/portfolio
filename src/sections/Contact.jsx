import React, { useState, useRef } from 'react';
import SectionHeader from '../components/SectionHeader';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaWhatsapp,
  FaPaperPlane,
  FaRegCopy,
  FaCheck,
  FaArrowRight,
  FaCheckCircle,
  FaExclamationCircle,
  FaUndo,
} from 'react-icons/fa';
import emailjs from '@emailjs/browser';
import { gsap, MQ } from '../lib/Gsap';
import useMM from '../hook/UseMM';

const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'service_87eld4o';
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'template_0khgj7p';
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'KKsUT_y4irOhMze3k';

const EMAIL_ADDRESS = 'maheeshanethmina@gmail.com';
const MAX_MESSAGE = 600;

const channels = [
  {
    label: 'WhatsApp',
    value: '+94 71 291 8346',
    href: 'https://wa.me/94712918346',
    icon: <FaWhatsapp />,
  },
  {
    label: 'LinkedIn',
    value: 'maheesha-nethmina',
    href: 'https://linkedin.com/in/maheesha-nethmina/',
    icon: <FaLinkedin />,
  },
  {
    label: 'GitHub',
    value: 'Maheesha-Nethmina',
    href: 'https://github.com/Maheesha-Nethmina',
    icon: <FaGithub />,
  },
];

const fieldClass =
  'peer w-full rounded-xl border border-line bg-page px-4 pb-2 pt-6 text-base text-ink ' +
  'placeholder-transparent transition-all duration-200 ' +
  'focus:border-transparent focus:outline-none focus:ring-2 focus:ring-brand';

const labelClass =
  'pointer-events-none absolute left-4 top-1.5 text-xs font-semibold text-ink-soft transition-all duration-200 ' +
  'peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:font-normal ' +
  'peer-focus:top-1.5 peer-focus:text-xs peer-focus:font-semibold peer-focus:text-brand';

const handleSpotlight = (e) => {
  const rect = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty('--mx', `${e.clientX - rect.left}px`);
  e.currentTarget.style.setProperty('--my', `${e.clientY - rect.top}px`);
};

const Contact = () => {
  const [isSending, setIsSending] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [copied, setCopied] = useState(false);
  const [messageLength, setMessageLength] = useState(0);
  const formRef = useRef(null);
  const sectionRef = useRef(null);

  useMM(
    sectionRef,
    (mm) => {
      mm.add(MQ.motion, () => {
        const root = sectionRef.current;
        const trigger = { trigger: root.querySelector('.ct-grid'), start: 'top 82%', once: true };

        const tl = gsap.timeline({ scrollTrigger: trigger });
        tl.from(root.querySelector('.ct-badge'), {
          y: 16,
          opacity: 0,
          duration: 0.6,
          ease: 'power3.out',
          clearProps: 'transform,opacity',
        })
          .from(root.querySelector('.ct-title-inner'), { yPercent: 110, duration: 0.9, ease: 'power4.out' }, 0.1)
          .from(
            root.querySelectorAll('.ct-fade'),
            { y: 20, opacity: 0, stagger: 0.1, duration: 0.6, ease: 'power3.out', clearProps: 'transform,opacity' },
            0.3
          )
          .from(
            root.querySelectorAll('.ct-row'),
            { x: -30, opacity: 0, stagger: 0.12, duration: 0.7, ease: 'power3.out', clearProps: 'transform,opacity' },
            0.45
          )
          .from(
            root.querySelectorAll('.ct-line'),
            { scaleX: 0, transformOrigin: 'left center', stagger: 0.12, duration: 0.9, ease: 'power2.out', clearProps: 'transform' },
            0.5
          )
          .from(
            root.querySelector('.ct-panel'),
            { x: 60, opacity: 0, duration: 0.9, ease: 'power3.out', clearProps: 'transform,opacity' },
            0.35
          );

        gsap.to(root.querySelectorAll('.ct-orb'), {
          x: 'random(-40, 40)',
          y: 'random(-30, 30)',
          duration: 'random(6, 9)',
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
          stagger: 1.2,
        });
      });

      mm.add(`${MQ.fine} and ${MQ.motion}`, () => {
        const root = sectionRef.current;
        const orbs = [...root.querySelectorAll('.ct-orb-wrap')];

        const btn = root.querySelector('.ct-submit');
        const pullX = btn ? gsap.quickTo(btn, 'x', { duration: 0.4, ease: 'power3.out' }) : null;
        const pullY = btn ? gsap.quickTo(btn, 'y', { duration: 0.4, ease: 'power3.out' }) : null;
        const btnMove = (e) => {
          const r = btn.getBoundingClientRect();
          pullX((e.clientX - (r.left + r.width / 2)) * 0.08);
          pullY((e.clientY - (r.top + r.height / 2)) * 0.25);
        };
        const btnLeave = () => {
          pullX(0);
          pullY(0);
        };
        btn?.addEventListener('mousemove', btnMove);
        btn?.addEventListener('mouseleave', btnLeave);

        const move = (e) => {
          const r = root.getBoundingClientRect();
          const px = (e.clientX - r.left) / r.width - 0.5;
          const py = (e.clientY - r.top) / r.height - 0.5;
          orbs.forEach((orb, i) =>
            gsap.to(orb, { x: px * (i % 2 ? -60 : 60), y: py * (i % 2 ? -40 : 40), duration: 1.2, ease: 'power2.out' })
          );
        };
        root.addEventListener('mousemove', move);
        return () => {
          root.removeEventListener('mousemove', move);
          btn?.removeEventListener('mousemove', btnMove);
          btn?.removeEventListener('mouseleave', btnLeave);
          if (btn) gsap.set(btn, { clearProps: 'transform' });
        };
      });
    },
    []
  );

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL_ADDRESS);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Copy failed', err);
    }
  };

  const sendEmail = (e) => {
    e.preventDefault();
    setIsSending(true);
    setSubmitStatus(null);

    emailjs
      .sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, formRef.current, {
        publicKey: EMAILJS_PUBLIC_KEY,
      })
      .then(
        () => {
          setIsSending(false);
          setSubmitStatus('success');
          setMessageLength(0);
        },
        (error) => {
          setIsSending(false);
          setSubmitStatus('error');
          console.error('FAILED...', error?.text || error);
        }
      );
  };

  const sendAnother = () => setSubmitStatus(null);

  return (
    <section ref={sectionRef} id="contact" className="relative z-10 py-16 sm:py-24">
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
        <div className="ct-orb-wrap absolute left-[8%] top-[18%]">
          <div className="ct-orb h-72 w-72 rounded-full bg-indigo-500/15 blur-3xl" />
        </div>
        <div className="ct-orb-wrap absolute bottom-[8%] right-[6%]">
          <div className="ct-orb h-80 w-80 rounded-full bg-sky-400/10 blur-3xl" />
        </div>
      </div>

      <SectionHeader title="Get In Touch" kicker="06 / Contact" />

      <div className="ct-grid mx-auto grid max-w-6xl items-stretch gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">

          <div className="overflow-hidden pb-1">
            <h3 className="ct-title-inner text-4xl font-extrabold leading-tight text-ink sm:text-5xl">
              Let's build something <span className="text-gradient">great together.</span>
            </h3>
          </div>

          <p className="ct-fade mt-5 text-base leading-relaxed text-ink-soft sm:text-lg">
            Whether you have a question, a role in mind or just want to say hi, my inbox is always open.
          </p>

          <button
            type="button"
            onClick={copyEmail}
            className="ct-fade group mt-8 flex w-full items-center justify-between gap-4 rounded-xl border border-line bg-card px-4 py-3 text-left transition-colors hover:border-brand/40"
            aria-label="Copy email address"
          >
            <span className="flex min-w-0 items-center gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-soft text-brand">
                <FaEnvelope />
              </span>
              <span className="min-w-0">
                <span className="block text-xs uppercase tracking-wider text-ink-soft">Email</span>
                <span className="block truncate text-sm font-semibold text-ink sm:text-base">{EMAIL_ADDRESS}</span>
              </span>
            </span>
            <span className="flex shrink-0 items-center gap-2 text-xs font-semibold text-brand">
              {copied ? (
                <>
                  <FaCheck className="text-emerald-500" /> Copied
                </>
              ) : (
                <>
                  <FaRegCopy /> Copy
                </>
              )}
            </span>
          </button>

          <div className="mt-6">
            <div className="ct-line h-px w-full bg-line" />
            {channels.map((c) => (
              <div key={c.label}>
                <a
                  href={c.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ct-row group flex items-center gap-4 py-4"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-soft text-lg text-brand transition-transform duration-300 group-hover:-translate-y-1 group-hover:rotate-6">
                    {c.icon}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-xs uppercase tracking-wider text-ink-soft">{c.label}</span>
                    <span className="block truncate text-sm font-semibold text-ink sm:text-base">{c.value}</span>
                  </span>
                  <FaArrowRight className="shrink-0 text-ink-soft transition-all duration-300 group-hover:translate-x-1.5 group-hover:text-brand" />
                </a>
                <div className="ct-line h-px w-full bg-line" />
              </div>
            ))}
          </div>
        </div>

        <div className="ct-panel flex lg:col-span-7">
          <div
            onMouseMove={handleSpotlight}
            className="spotlight relative flex w-full flex-col overflow-hidden rounded-3xl border border-line bg-card p-6 shadow-xl sm:p-10"
          >
            <AnimatePresence mode="wait" initial={false}>
              {submitStatus === 'success' ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.35 }}
                  className="relative flex min-h-[420px] flex-1 flex-col items-center justify-center text-center"
                >
                  <motion.span
                    initial={{ scale: 0, rotate: -90 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: 'spring', stiffness: 220, damping: 14, delay: 0.1 }}
                    className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500/15 text-5xl text-emerald-500"
                  >
                    <FaCheckCircle />
                  </motion.span>
                  <h4 className="text-2xl font-bold text-ink">Message sent!</h4>
                  <p className="mt-2 max-w-sm text-ink-soft">
                    Thanks for reaching out. I'll get back to you as soon as I can.
                  </p>
                  <button
                    type="button"
                    onClick={sendAnother}
                    className="mt-8 flex items-center gap-2 rounded-full border border-line px-6 py-2.5 text-sm font-semibold text-ink transition-colors hover:border-brand/40 hover:text-brand"
                  >
                    <FaUndo className="text-xs" /> Send another message
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  ref={formRef}
                  onSubmit={sendEmail}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="relative flex flex-1 flex-col gap-5"
                >
                  <div>
                    <h4 className="text-2xl font-bold text-ink">Send me a message</h4>
                    <p className="mt-1 text-sm text-ink-soft">It goes straight to my inbox.</p>
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <div className="relative">
                      <input
                        id="ct-name"
                        type="text"
                        name="user_name"
                        required
                        placeholder=" "
                        autoComplete="name"
                        className={fieldClass}
                      />
                      <label htmlFor="ct-name" className={labelClass}>
                        Your name
                      </label>
                    </div>
                    <div className="relative">
                      <input
                        id="ct-email"
                        type="email"
                        name="user_email"
                        required
                        placeholder=" "
                        autoComplete="email"
                        className={fieldClass}
                      />
                      <label htmlFor="ct-email" className={labelClass}>
                        Your email
                      </label>
                    </div>
                  </div>

                  <div className="relative flex min-h-[10rem] flex-1">
                    <textarea
                      id="ct-message"
                      name="message"
                      required
                      rows={6}
                      maxLength={MAX_MESSAGE}
                      placeholder=" "
                      onChange={(e) => setMessageLength(e.target.value.length)}
                      className={`${fieldClass} h-full resize-none`}
                    />
                    <label htmlFor="ct-message" className={labelClass}>
                      Your message
                    </label>
                    <span className="pointer-events-none absolute bottom-3 right-4 text-xs text-ink-soft">
                      {messageLength}/{MAX_MESSAGE}
                    </span>
                  </div>

                  <button
                    type="submit"
                    disabled={isSending}
                    className={`ct-submit group flex w-full items-center justify-center gap-3 rounded-xl py-4 text-lg font-bold text-white shadow-lg shadow-indigo-500/25 transition-[background-color,box-shadow] duration-300 ${
                      isSending ? 'cursor-not-allowed bg-slate-400' : 'bg-cta hover:bg-cta-hover hover:shadow-xl'
                    }`}
                  >
                    {isSending ? (
                      <>
                        <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message
                        <FaPaperPlane className="text-sm transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-1" />
                      </>
                    )}
                  </button>

                  <AnimatePresence>
                    {submitStatus === 'error' && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        role="alert"
                        className="flex items-center justify-center gap-2 rounded-xl border border-red-500/20 bg-red-500/10 p-3 text-center text-sm font-medium text-red-600 dark:text-red-400"
                      >
                        <FaExclamationCircle /> Failed to send. Please check your connection and try again.
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;