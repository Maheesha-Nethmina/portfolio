import React, { useRef } from 'react';
import SectionHeader from '../components/SectionHeader';
import { gsap, MQ } from '../lib/Gsap';
import useMM from '../hook/UseMM';

import {
  FaJava,
  FaReact,
  FaNodeJs,
  FaPhp,
  FaPython,
  FaDocker,
  FaAws,
  FaGithub,
  FaFigma,
  FaProjectDiagram,
  FaLaptopCode,
  FaServer,
  FaDatabase,
  FaCloud,
  FaPalette,
} from 'react-icons/fa';

import {
  SiJavascript,
  SiSpring,
  SiPostgresql,
  SiMysql,
  SiMongodb,
  SiTailwindcss,
  SiJira,
  SiPostman,
  SiGithubactions,
  SiTypescript,
  SiNextdotjs,
  SiFastapi,
  SiSqlalchemy,
  SiRust,
  SiTauri,
} from 'react-icons/si';

const skillGroups = [
  {
    title: 'Frontend',
    blurb: 'Fast, responsive and accessible interfaces.',
    icon: <FaPalette />,
    span: 'md:col-span-3',
    skills: [
      { name: 'React.js', icon: <FaReact />, core: true },
      { name: 'Next.js', icon: <SiNextdotjs />, core: true },
      { name: 'TypeScript', icon: <SiTypescript />, core: true },
      { name: 'JavaScript', icon: <SiJavascript /> },
      { name: 'Tailwind CSS', icon: <SiTailwindcss />, core: true },
      { name: 'Figma', icon: <FaFigma /> },
    ],
  },
  {
    title: 'Backend',
    blurb: 'REST APIs and microservices that scale.',
    icon: <FaServer />,
    span: 'md:col-span-3',
    skills: [
      { name: 'FastAPI', icon: <SiFastapi />, core: true },
      { name: 'Spring Boot', icon: <SiSpring />, core: true },
      { name: 'Node.js', icon: <FaNodeJs /> },
      { name: 'Python', icon: <FaPython /> },
      { name: 'Java', icon: <FaJava /> },
      { name: 'PHP', icon: <FaPhp /> },
    ],
  },
  {
    title: 'Desktop',
    blurb: 'Native-feeling cross-platform apps.',
    icon: <FaLaptopCode />,
    span: 'md:col-span-2',
    skills: [
      { name: 'Rust', icon: <SiRust />, core: true },
      { name: 'Tauri', icon: <SiTauri />, core: true },
    ],
  },
  {
    title: 'Databases',
    blurb: 'Relational and document data stores.',
    icon: <FaDatabase />,
    span: 'md:col-span-2',
    skills: [
      { name: 'PostgreSQL', icon: <SiPostgresql />, core: true },
      { name: 'MySQL', icon: <SiMysql /> },
      { name: 'MongoDB', icon: <SiMongodb /> },
    ],
  },
  {
    title: 'Cloud & DevOps',
    blurb: 'Ship, automate and run in the cloud.',
    icon: <FaCloud />,
    span: 'md:col-span-2',
    skills: [
      { name: 'AWS', icon: <FaAws />, core: true },
      { name: 'Docker', icon: <FaDocker />, core: true },
      { name: 'GitHub Actions', icon: <SiGithubactions />, core: true },
      { name: 'GitHub', icon: <FaGithub /> },
      { name: 'Postman', icon: <SiPostman /> },
      { name: 'Jira', icon: <SiJira /> },
    ],
  },
];


const handleSpotlight = (e) => {
  const rect = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty('--mx', `${e.clientX - rect.left}px`);
  e.currentTarget.style.setProperty('--my', `${e.clientY - rect.top}px`);
};

const Skills = () => {
  const ref = useRef(null);

  useMM(
    ref,
    (mm) => {
      mm.add(MQ.motion, () => {
        const root = ref.current;

        const nums = [...root.querySelectorAll('.skill-num')];
        nums.forEach((el) => {
          const end = Number(el.dataset.value);
          const obj = { v: 0 };
          el.textContent = '0';
          gsap.to(obj, {
            v: end,
            duration: 1.4,
            ease: 'power2.out',
            onUpdate: () => {
              el.textContent = Math.round(obj.v);
            },
            scrollTrigger: { trigger: el, start: 'top 92%', once: true },
          });
        });

        gsap.from(root.querySelectorAll('.skill-intro > *'), {
          y: 20,
          opacity: 0,
          stagger: 0.1,
          duration: 0.6,
          ease: 'power3.out',
          clearProps: 'transform,opacity',
          scrollTrigger: { trigger: root.querySelector('.skill-intro'), start: 'top 90%', once: true },
        });

        root.querySelectorAll('.skill-panel').forEach((panel) => {
          const trigger = { trigger: panel, start: 'top 88%', once: true };
          const tl = gsap.timeline({ scrollTrigger: trigger });
          tl.from(panel, {
            y: 60,
            opacity: 0,
            duration: 0.8,
            ease: 'power3.out',
            clearProps: 'transform,opacity',
          })
            .from(
              panel.querySelector('.panel-icon'),
              { scale: 0, rotate: -90, duration: 0.6, ease: 'back.out(2)' },
              0.15
            )
            .from(
              panel.querySelectorAll('.skill-chip'),
              {
                y: 14,
                opacity: 0,
                scale: 0.85,
                stagger: 0.05,
                duration: 0.45,
                ease: 'back.out(1.8)',
                clearProps: 'transform,opacity',
              },
              0.3
            );
        });

        return () => {
          nums.forEach((el) => {
            el.textContent = el.dataset.value;
          });
        };
      });

      mm.add(`${MQ.fine} and ${MQ.motion}`, () => {
        const panels = [...ref.current.querySelectorAll('.skill-panel')];
        const cleanups = panels.map((panel) => {
          const move = (e) => {
            const r = panel.getBoundingClientRect();
            const px = (e.clientX - r.left) / r.width - 0.5;
            const py = (e.clientY - r.top) / r.height - 0.5;
            gsap.to(panel, {
              rotationY: px * 6,
              rotationX: -py * 6,
              transformPerspective: 900,
              duration: 0.4,
              ease: 'power2.out',
            });
          };
          const leave = () =>
            gsap.to(panel, { rotationX: 0, rotationY: 0, duration: 0.6, ease: 'power3.out' });
          panel.addEventListener('mousemove', move);
          panel.addEventListener('mouseleave', leave);
          return () => {
            panel.removeEventListener('mousemove', move);
            panel.removeEventListener('mouseleave', leave);
            gsap.set(panel, { clearProps: 'transform' });
          };
        });
        return () => cleanups.forEach((fn) => fn());
      });
    },
    []
  );

  return (
    <section ref={ref} id="skills" className="py-24">
      <SectionHeader title="Technical Skills" kicker="03 / Stack" />


      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-5 md:grid-cols-6">
        {skillGroups.map((group) => (
          <article
            key={group.title}
            onMouseMove={handleSpotlight}
            className={`skill-panel spotlight relative overflow-hidden rounded-2xl border border-line bg-card p-6 shadow-sm transition-[box-shadow,border-color] duration-300 hover:border-brand/40 hover:shadow-lg ${group.span}`}
          >
            <header className="relative mb-5 flex items-center gap-4">
              <span className="panel-icon flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-soft text-xl text-brand">
                {group.icon}
              </span>
              <div>
                <h3 className="text-lg font-bold text-ink">{group.title}</h3>
                <p className="text-sm text-ink-soft">{group.blurb}</p>
              </div>
            </header>

            <ul className="relative flex flex-wrap gap-2.5">
              {group.skills.map((skill) => (
                <li
                  key={skill.name}
                  className={`skill-chip group/chip flex cursor-default items-center gap-2 rounded-lg border px-3 py-2 text-sm font-medium transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md ${
                    skill.core
                      ? 'border-brand/40 bg-brand-soft text-ink'
                      : 'border-line bg-page/40 text-ink-soft hover:text-ink'
                  }`}
                >
                  <span className="text-lg text-brand transition-transform duration-300 group-hover/chip:scale-125 group-hover/chip:rotate-6">
                    {skill.icon}
                  </span>
                  {skill.name}
                  {skill.core && (
                    <span className="relative ml-0.5 flex h-1.5 w-1.5" title="Core stack">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand opacity-60" />
                      <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-brand" />
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Skills;