/**
 * portfolio.js — Single source of truth for ALL site content.
 *
 * HOW TO ADD CONTENT:
 *  • New course  → add an object to `projects[]`, create its image folder
 *  • New activity → add to `activities[]`, drop images in the matching folder
 *  • Images live in:  public/images/projects/{courseCode}_{slug}/{actId}_{slug}/
 *  • Image files are numbered sequentially: 1.jpg, 2.jpg, 3.jpg …
 *  • Use empty `images: []` for activities that have no screenshots yet
 *
 * IMAGE PATH RULES (strict):
 *  • Always absolute from the site root:  /images/projects/…
 *  • Vite serves everything in /public at /, so /images/… resolves in
 *    both dev and prod builds without any changes.
 *  • Never use relative paths like ./images/… or ../images/…
 */

export default {
  meta: {
    siteTitle: 'JGR Portfolio',
    siteDescription: 'CS Student & Developer Portfolio'
  },

  hero: {
    name: 'MICROSOFT',
    logoText: '<Microsoft/>',
    title: 'Full Stack Developer · CS Student · Builder of Things',
    greeting: 'Hello, World.',
    ctaLabel: 'View My Work',
    ctaTarget: '#projects',
    secondaryLabel: 'About Me',
    secondaryTarget: '#about'
  },

  about: {
    avatar: '/images/avatar.jpg',
    bio: [
      "I'm a passionate Computer Science student with a love for building things that live on the internet. I thrive at the intersection of elegant design and robust engineering, crafting experiences that are both beautiful and performant.",
      "When I'm not writing code, you'll find me exploring new frameworks, contributing to open-source projects, or diving deep into papers on distributed systems and machine learning. I believe great software is built iteratively — with curiosity, attention to detail, and a relentless drive to improve."
    ],
    skills: [
      { name: 'JavaScript', icon: 'devicon-javascript-plain colored' },
      { name: 'Python',     icon: 'devicon-python-plain colored'     },
      { name: 'C',          icon: 'devicon-c-plain colored'          },
      { name: 'C#',         icon: 'devicon-csharp-plain colored'     },
      { name: 'Java',       icon: 'devicon-java-plain colored'       },
      { name: 'Flutter',    icon: 'devicon-flutter-plain colored'    },
      { name: 'MySQL',      icon: 'devicon-mysql-plain colored'      },
      { name: 'Git',        icon: 'devicon-git-plain colored'        },
      { name: 'VS Code',    icon: 'devicon-vscode-plain colored'     },
      { name: 'HTML5',      icon: 'devicon-html5-plain colored'      },
      { name: 'CSS',        icon: 'devicon-css3-plain colored'       }
    ],
    terminal: [
      { label: 'user',         value: 'YourName'           },
      { label: 'location',     value: 'Philippines'         },
      { label: 'status',       value: 'Building cool stuff' },
      { label: 'patience',     value: 5.3, type: 'bar'     },
      { label: 'mood',         value: 'in flow state 🎧'   }
    ]
  },

  projects: [
    {
      id: 'cs101',
      courseCode: 'CS 101',
      courseName: 'CS Elective 2',
      description: 'Foundations of Adobe Photoshop',
      accentColor: '#00ffe1',
      activities: [
        {
          id: 'act1',
          title: 'Activity 1: Text Behind the Person',
          teaser: 'First steps into making a beatiful design using Photoshop.',
          description:
            'An introductory activity exploring the basics of writing your first program. Covers syntax, output functions, and the development environment setup. The activity walks through compiling and running a program from the command line, understanding error messages, and making iterative improvements to a simple "Hello, World!" output.',
          images: [
            {
              src: '/images/projects/Text Behind.png',
              caption: 'Terminal output of the program'
            }         
          ]
        },
        {
          id: 'act1',
          title: 'Activity 2: Honeycomb Clipping Mask',
          teaser: '',
          description:
            '',
          images: [
            {
              src: '/images/projects/Honeycomb.png',
              caption: 'Terminal output of the program'
            }
          ]
        },

         {
          id: 'act1',
          title: 'Activity 3: Brochure for BLADE Extension Program',
          teaser: '',
          description:
            '',
          images: [
            {
              src: '/images/projects/blade-brochure-01.jpg',
              caption: 'Terminal output of the program'
            },
            {
              src: '/images/projects/blade-brochure-02.jpg',
              caption: 'Source code structure'
            }
          ]
        },

         {
          id: 'act1',
          title: 'Activity 4: Text Design using Gradients',
          teaser: '',
          description:
            '',
          images: [
            {
              src: '/images/projects/Creative Text Design.png',
              caption: 'CREATIVE'
            },
            {
              src: '/images/projects/Future Text Design.png',
              caption: 'FUTURE'
            },
            {
              src: '/images/projects/Never GIve Up Text Design.png',
              caption: 'NEVER GIVE UP'
            }
          ]
        },
            {
          id: 'act1',
          title: 'Activity 5: Circle Clipping Mask',
          teaser: '',
          description:
            '',
          images: [
            {
              src: '/images/projects/Clipping Mask Circle.png',
              caption: 'Clipping Mask Circle'
            }
          ]
        }
       
      ]
    },
       
  ] 
};
