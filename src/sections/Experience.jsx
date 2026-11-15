import React, { useRef } from 'react';
import SectionHeader from '../components/SectionHeader';
import { gsap, MQ } from '../lib/Gsap';
import useMM from '../hook/UseMM';

// Newest first: work, university, school
const timeline = [
  {
    kind: 'Work',
    title: 'Software Engineer Intern',
    org: 'Sisenco Digital, Kottawa, Sri Lanka',
    period: 'May 2026 - Present',
    points: [
      'Contributing to full-stack system development, from database and APIs to responsive user interfaces.',
      'Designed and shipped REST APIs with FastAPI and PostgreSQL.',
      'Built Next.js + TypeScript interfaces and dashboards with Tailwind CSS.',
      'Developing microservice-based systems with clear service boundaries and consistent API conventions.',
      'Working with AWS cloud services to deploy and run applications.',
      'Working in an agile team using Git workflows, code reviews and Jira.',
    ],
    tech: ['FastAPI', 'PostgreSQL', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Microservices', 'AWS'],
  },
  {
    kind: 'Education',
    title: 'Computer Science & Technology',
    org: 'Uva Wellassa University, Badulla',
    period: 'Undergraduate',
    points: [
      'Specializing in full-stack software development.',
      'Completed a machine learning research project on multivariate anomaly detection for wildfire detection.',
    ],
    tech: ['Spring Boot', 'React', 'MERN', 'Python'],
  },
  {
    kind: 'School',
    title: 'G.C.E. Advanced Level & Ordinary Level ',
    org: "St. Thomas' College, Matara",
    period: 'Secondary Education',
    points: ['Completed my G.C.E. O/L and A/L examinations here before moving on to university.'],
    tech: [],
  },
];

const Experience = () => {
  const ref = useRef(null);

  useMM(
    ref,
    (mm) => {
      mm.add(
        {
          md: `(min-width: 768px) and ${MQ.motion}`,
          sm: `(max-width: 767px) and ${MQ.motion}`,
        },
        (context) => {
          const { md } = context.conditions;
          const root = ref.current;

          // The coloured line draws itself as you scroll
          gsap.fromTo(
            root.querySelector('.tl-line'),
            { scaleY: 0 },
            {
              scaleY: 1,
              ease: 'none',
              scrollTrigger: {
                trigger: root.querySelector('.tl-list'),
                start: 'top 70%',
                end: 'bottom 70%',
                scrub: true,
              },
            }
          );

          root.querySelectorAll('.tl-item').forEach((item, i) => {
            const trigger = { trigger: item, start: 'top 82%', once: true };
            gsap.from(item.querySelector('.tl-card'), {
              x: md ? (i % 2 === 0 ? -60 : 60) : 40,
              opacity: 0,
              duration: 0.8,
              ease: 'power3.out',
              scrollTrigger: trigger,
            });
            gsap.from(item.querySelector('.tl-dot'), {
              scale: 0,
              duration: 0.5,
              ease: 'back.out(3)',
              scrollTrigger: trigger,
            });
            gsap.from(item.querySelectorAll('.tl-point'), {
              opacity: 0,
              x: -12,
              stagger: 0.1,
              delay: 0.3,
              duration: 0.5,
              scrollTrigger: trigger,
            });
          });
        }
      );
    },
    []
  );

  return (
    <section ref={ref} id="experience" className="py-24">
      <SectionHeader title="Experience" kicker="02 / Journey" />

      <ol className="tl-list relative mx-auto max-w-5xl">
        {/* base line + animated fill */}
        <span className="absolute bottom-0 left-[15px] top-0 -ml-px w-0.5 bg-line md:left-1/2" aria-hidden="true" />
        <span
          className="tl-line absolute bottom-0 left-[15px] top-0 -ml-px w-0.5 origin-top bg-brand md:left-1/2"
          aria-hidden="true"
        />

        {timeline.map((item, i) => (
          <li
            key={item.title}
            className={`tl-item relative mb-10 pl-12 last:mb-0 md:flex md:pl-0 ${
              i % 2 === 0 ? 'md:justify-start' : 'md:justify-end'
            }`}
          >
            <span
              className="tl-dot absolute left-[15px] top-7 -ml-2 h-4 w-4 rounded-full bg-cta ring-4 ring-page md:left-1/2"
              aria-hidden="true"
            />
            <div className="tl-card w-full rounded-xl border border-line bg-card p-6 shadow-lg md:w-[calc(50%-2rem)]">
              <div className="mb-3 flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-brand-soft px-3 py-1 text-xs font-semibold uppercase tracking-wide text-brand">
                  {item.kind}
                </span>
                <span className="text-sm text-ink-soft">{item.period}</span>
              </div>
              <h3 className="text-xl font-bold text-ink">{item.title}</h3>
              <p className="mb-4 font-medium text-brand">{item.org}</p>
              <ul className={`space-y-2 ${item.tech.length ? 'mb-4' : ''}`}>
                {item.points.map((point) => (
                  <li key={point} className="tl-point flex gap-2 text-sm text-ink-soft sm:text-base">
                    <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-brand"></span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
              {item.tech.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {item.tech.map((t) => (
                    <span key={t} className="rounded-full bg-brand-soft px-3 py-1 text-xs font-semibold text-brand">
                      {t}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
};

export default Experience;