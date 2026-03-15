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
          teaser: 'First steps into creating a stunning composite effect in Photoshop.',
          description:
            'An introductory Photoshop activity focused on the "Text Behind the Person" technique. This involves separating the subject from the background using selection and masking tools, then layering large text behind the subject while keeping the person in the foreground. The result is a visually striking design that blends typography with photography.',
          images: [
            {
              src: '/images/projects/Text Behind.png',
              caption: 'Text Behind the Person – final composite output'
            }         
          ]
        },
        {
          id: 'act2',
          title: 'Activity 2: Honeycomb Clipping Mask',
          teaser: 'Exploring clipping masks through a geometric honeycomb pattern.',
          description:
            'This activity introduces the concept of clipping masks in Adobe Photoshop using a honeycomb grid layout. Individual hexagonal cells are filled with images or textures, creating a mosaic-style composition. The exercise builds familiarity with layer stacking, shape alignment, and applying clipping masks to confine image content within specific shapes.',
          images: [
            {
              src: '/images/projects/Honeycomb.png',
              caption: 'Honeycomb Clipping Mask – completed mosaic layout'
            }
          ]
        },

         {
          id: 'act3',
          title: 'Activity 3: Brochure Design for BLADE Extension Program',
          teaser: 'Designing a professional print brochure layout for the BLADE Extension Program.',
          description:
            'A practical layout design activity where Photoshop is used to create a multi-page brochure for the BLADE Extension Program. The project covers document setup for print (bleed, margins, resolution), typographic hierarchy, image placement, and brand consistency. Emphasis is placed on combining visual elements with structured text to produce a polished, print-ready publication.',
          images: [
            {
              src: '/images/projects/blade-brochure-01.jpg',
              caption: 'BLADE Brochure – front spread'
            },
            {
              src: '/images/projects/blade-brochure-02.jpg',
              caption: 'BLADE Brochure – back spread'
            }
          ]
        },

         {
          id: 'act4',
          title: 'Activity 4: Gradient Text Effects',
          teaser: 'Crafting bold typographic designs enhanced with gradient fills and effects.',
          description:
            'This activity explores expressive text design in Photoshop using gradient overlays, layer styles, and blending options. Each piece uses a distinct word or phrase as the visual anchor, styled with custom gradient fills, outer glows, and drop shadows to create eye-catching typographic artwork. The activity strengthens understanding of layer style panels and color theory in design.',
          images: [
            {
              src: '/images/projects/Creative Text Design.png',
              caption: '"CREATIVE" – gradient text design with vibrant color blend'
            },
            {
              src: '/images/projects/Future Text Design.png',
              caption: '"FUTURE" – futuristic gradient text composition'
            },
            {
              src: '/images/projects/Never GIve Up Text Design.png',
              caption: '"NEVER GIVE UP" – motivational text with gradient styling'
            }
          ]
        },
            {
          id: 'act5',
          title: 'Activity 5: Circular Clipping Mask',
          teaser: 'Applying circular clipping masks to create clean, focused image frames.',
          description:
            'This activity demonstrates the use of circular shapes as clipping masks in Photoshop. Images are cropped and confined within perfect circle boundaries, producing portrait-style or icon-like frames. The exercise reinforces the clipping mask workflow and introduces concepts such as smart objects, transform controls, and arranging masked layers within a cohesive composition.',
          images: [
            {
              src: '/images/projects/Clipping Mask Circle.png',
              caption: 'Circle Clipping Mask – image framed within circular shapes'
            }
          ]
        },

         {
          id: 'act6',
          title: 'Activity 6: Layer Blend Modes',
          teaser: 'Experimenting with Photoshop blend modes to achieve different visual atmospheres.',
          description:
            'This activity explores Photoshop\'s layer blending modes by applying the same base image under multiple blend settings. Each variation — Color Dodge, Multiply, Overlay, Screen, and Soft Light — demonstrates how blend modes interact with underlying layers to produce distinct lighting, contrast, and color effects. The exercise builds a practical understanding of non-destructive editing and mood-driven compositing.',
          images: [
            {
              src: '/images/projects/Layer Effects/Color Dodge.png',
              caption: 'Color Dodge – brightens by dodging the base layer with the blend color'
            },
            {
              src: '/images/projects/Layer Effects/Multiply.png',
              caption: 'Multiply – darkens by multiplying base and blend layer colors'
            },
            {
              src: '/images/projects/Layer Effects/Overlay.png',
              caption: 'Overlay – combines Multiply and Screen for contrast-boosted results'
            },
            {
              src: '/images/projects/Layer Effects/Screen.png',
              caption: 'Screen – lightens the image by inverting and multiplying the layers'
            },
            {
              src: '/images/projects/Layer Effects/Softlight.png',
              caption: 'Soft Light – applies a subtle, diffused light effect over the base layer'
            }
          ]
        },
       
      ]
    },
       
  ] 
};
