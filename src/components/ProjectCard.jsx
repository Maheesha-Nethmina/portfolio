import React, { useRef } from 'react';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import { SiFigma } from 'react-icons/si';
import { gsap, MQ } from '../lib/Gsap';
import useMM from '../hook/UseMM';

/*
  Structure (each layer is animated by a different system, so transforms never collide):
  .project-item  -> grid item, moved by GSAP Flip when filtering
  .card-reveal   -> scroll entrance (opacity / y) driven from Projects.jsx
  .card-tilt     -> hover lift + 3D tilt (this component)
  .card-img      -> scroll parallax (this component)
*/
const ProjectCard = ({ project, visible = true }) => {
  const { title, description, imageUrl, tags, github, figma, live, featured } = project;
  const rootRef = useRef(null);

  useMM(rootRef, (mm) => {
    // Image parallax inside the card (desktop only)
    mm.add(MQ.desktop, () => {
      gsap.fromTo(
        rootRef.current.querySelector('.card-img'),
        { yPercent: -6 },
        {
          yPercent: 6,
          ease: 'none',
          scrollTrigger: { trigger: rootRef.current, start: 'top bottom', end: 'bottom top', scrub: true },
        }
      );
    });

    // Lift + tilt towards the cursor (mouse devices only)
    mm.add(MQ.fine, () => {
      const root = rootRef.current;
      const inner = root.querySelector('.card-tilt');
      gsap.set(inner, { transformPerspective: 900 });
      const rotX = gsap.quickTo(inner, 'rotationX', { duration: 0.5, ease: 'power3' });
      const rotY = gsap.quickTo(inner, 'rotationY', { duration: 0.5, ease: 'power3' });
      const lift = gsap.quickTo(inner, 'y', { duration: 0.5, ease: 'power3' });

      const onMove = (e) => {
        const rect = inner.getBoundingClientRect();
        const px = (e.clientX - rect.left) / rect.width - 0.5;
        const py = (e.clientY - rect.top) / rect.height - 0.5;
        rotY(px * 6);
        rotX(-py * 6);
        lift(-8);
      };
      const onLeave = () => {
        rotX(0);
        rotY(0);
        lift(0);
      };
      root.addEventListener('mousemove', onMove);
      root.addEventListener('mouseleave', onLeave);
      return () => {
        root.removeEventListener('mousemove', onMove);
        root.removeEventListener('mouseleave', onLeave);
      };
    });
  }, []);

  return (
    <div
      ref={rootRef}
      className={`project-item ${featured ? 'md:col-span-2 lg:col-span-3' : ''} ${visible ? '' : 'hidden'}`}
    >
      <div className="card-reveal h-full">
        <div
          className={`card-tilt flex h-full flex-col overflow-hidden rounded-xl border border-line bg-card shadow-xl transition-shadow duration-300 hover:shadow-2xl ${
            featured ? 'lg:flex-row' : ''
          }`}
        >
          <div className={`relative h-48 w-full overflow-hidden ${featured ? 'lg:h-auto lg:min-h-[20rem] lg:w-1/2' : ''}`}>
            <img
              className="card-img absolute inset-x-0 -top-[10%] h-[120%] w-full object-cover"
              src={imageUrl}
              alt={title}
              loading="lazy"
            />
            {featured && (
              <span className="absolute left-4 top-4 rounded-full bg-cta px-3 py-1 text-xs font-bold text-white shadow-lg">
                Featured research
              </span>
            )}
          </div>

          <div className={`flex flex-1 flex-col justify-between p-6 ${featured ? 'lg:p-10' : ''}`}>
            <div>
              <h3 className={`mb-2 font-bold text-ink ${featured ? 'text-2xl lg:text-3xl' : 'text-2xl'}`}>{title}</h3>
              <p className="mb-4 text-ink-soft">{description}</p>
            </div>

            <div>
              <div className="mb-4 flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <span key={tag} className="rounded-full bg-brand-soft px-3 py-1 text-xs font-semibold text-brand">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center space-x-5">
                {github && (
                  <a
                    href={github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-ink-soft transition-colors hover:text-brand"
                    aria-label="GitHub link"
                  >
                    <FaGithub size={22} />
                    <span className="text-sm font-medium">Code</span>
                  </a>
                )}
                {figma && (
                  <a
                    href={figma}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-ink-soft transition-colors hover:text-brand"
                    aria-label="Figma link"
                  >
                    <SiFigma size={20} />
                    <span className="text-sm font-medium">Design</span>
                  </a>
                )}
                {live && (
                  <a
                    href={live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-ink-soft transition-colors hover:text-brand"
                    aria-label="Live demo link"
                  >
                    <FaExternalLinkAlt size={18} />
                    <span className="text-sm font-medium">Live</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;