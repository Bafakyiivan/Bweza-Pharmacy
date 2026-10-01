export type BlogSection = {
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
  callout?: string;
};

export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  category: string;
  publishedAt: string;
  updatedAt: string;
  readTime: string;
  image: string;
  imageAlt: string;
  sections: BlogSection[];
  sources: { label: string; url: string }[];
};

export const blogPosts: BlogPost[] = [
  {
    slug: "understanding-high-blood-pressure",
    title: "Understanding high blood pressure",
    description: "Why regular blood-pressure checks matter, common risk factors and when to seek urgent care.",
    category: "Health education",
    publishedAt: "2026-10-02",
    updatedAt: "2026-10-02",
    readTime: "5 min read",
    image: "/images/pharmacy-counter.jpg",
    imageAlt: "Bweza Pharmacy team inside the Kibuye pharmacy",
    sections: [
      {
        heading: "Why blood pressure matters",
        paragraphs: [
          "Blood pressure is the force of blood against the walls of your blood vessels. A reading has two numbers: the top number is the pressure when the heart beats, and the bottom number is the pressure when the heart rests.",
          "High blood pressure often causes no symptoms. Measuring it is the only reliable way to know whether it is raised."
        ]
      },
      {
        heading: "Know the common risk factors",
        bullets: [
          "Eating too much salt or foods high in saturated and trans fats",
          "Not getting enough physical activity",
          "Using tobacco or drinking alcohol harmfully",
          "Living with overweight or obesity",
          "A family history of high blood pressure, older age, diabetes or kidney disease"
        ]
      },
      {
        heading: "Practical next steps",
        bullets: [
          "Have your blood pressure checked by a trained health worker.",
          "Keep a record of your readings and take it to your clinician.",
          "Do not start, stop or change blood-pressure medicine without professional advice.",
          "Choose more fruit and vegetables, reduce salt, stay active and avoid tobacco."
        ],
        callout: "A single reading does not always confirm hypertension. A qualified health professional should assess repeated readings and your overall health."
      },
      {
        heading: "When to get urgent help",
        paragraphs: [
          "Seek urgent medical care for chest pain, severe headache, blurred vision, confusion, breathing difficulty, weakness or numbness—especially with a very high blood-pressure reading."
        ]
      }
    ],
    sources: [
      { label: "World Health Organization: Hypertension", url: "https://www.who.int/news-room/fact-sheets/detail/hypertension" }
    ]
  },
  {
    slug: "how-to-use-medicines-safely",
    title: "How to use medicines safely",
    description: "Simple habits that help prevent dosing mistakes, interactions and avoidable medicine-related harm.",
    category: "Medicine safety",
    publishedAt: "2026-10-02",
    updatedAt: "2026-10-02",
    readTime: "5 min read",
    image: "/images/pharmacy-shelves.jpg",
    imageAlt: "Medicine and wellness-product shelves inside Bweza Pharmacy",
    sections: [
      {
        heading: "Know, check and ask",
        paragraphs: [
          "Every medicine should have a clear purpose, dose and schedule. Before taking it, know the medicine’s name, why you need it, how to use it and how long to continue.",
          "Ask a pharmacist or prescriber if any instruction is unclear. This is especially important when you take several medicines, have allergies, are pregnant or breastfeeding, or live with a long-term condition."
        ]
      },
      {
        heading: "Build safer habits",
        bullets: [
          "Keep an up-to-date list of prescription medicines, over-the-counter products and supplements.",
          "Read the label each time and use the correct measuring device for liquid medicines.",
          "Do not share prescription medicines with another person.",
          "Store medicines as directed and away from children.",
          "Check before combining medicines, herbal products or alcohol.",
          "Return expired or unwanted medicines through an appropriate disposal route."
        ]
      },
      {
        heading: "After a clinic or hospital visit",
        paragraphs: [
          "When treatment changes, compare the new instructions with the medicines you were already using. Ask which medicines have started, stopped or changed, and when your next review is due."
        ],
        callout: "Never stop an important prescribed medicine suddenly unless a qualified health professional tells you to do so."
      },
      {
        heading: "Report problems early",
        paragraphs: [
          "Contact a health professional promptly if you notice a suspected side effect, take the wrong dose or are unsure whether two medicines can be used together. For severe breathing difficulty, collapse, swelling of the face or another emergency, seek urgent medical care."
        ]
      }
    ],
    sources: [
      { label: "WHO: Medication Without Harm", url: "https://www.who.int/initiatives/medication-without-harm/medication-safety-in-high-risk-situations" },
      { label: "WHO: 5 Moments for Medication Safety", url: "https://www.who.int/publications/i/item/WHO-HIS-SDS-2019.4" }
    ]
  },
  {
    slug: "know-your-blood-sugar-and-diabetes-risk",
    title: "Know your blood sugar and diabetes risk",
    description: "A clear introduction to diabetes risk, possible warning signs and the value of timely testing.",
    category: "Health education",
    publishedAt: "2026-10-02",
    updatedAt: "2026-10-02",
    readTime: "5 min read",
    image: "/images/pharmacy-interior.jpg",
    imageAlt: "Bweza Pharmacy team member ready to support customers",
    sections: [
      {
        heading: "What diabetes means",
        paragraphs: [
          "Diabetes is a long-term condition in which blood glucose is too high because the body does not make enough insulin, cannot use insulin effectively, or both.",
          "Type 2 diabetes is the most common form. Symptoms can develop gradually, so testing matters when a health professional recommends it."
        ]
      },
      {
        heading: "Possible warning signs",
        bullets: [
          "Passing urine more often than usual",
          "Feeling unusually thirsty or tired",
          "Unexplained weight loss",
          "Blurred vision",
          "Slow-healing wounds or frequent infections"
        ],
        callout: "These symptoms can have many causes. A blood-glucose test and professional assessment are needed for diagnosis."
      },
      {
        heading: "Who should discuss testing",
        paragraphs: [
          "Speak with a qualified health professional if you have symptoms or risk factors such as a family history of diabetes, overweight, high blood pressure, limited physical activity, previous gestational diabetes or a history of raised blood sugar."
        ]
      },
      {
        heading: "Protect your long-term health",
        bullets: [
          "Choose a balanced diet and limit highly processed foods and sugary drinks.",
          "Stay physically active in a way that is safe for you.",
          "Avoid tobacco and attend recommended health checks.",
          "If you already have diabetes, follow your treatment plan and keep scheduled reviews for your eyes, feet, kidneys and blood pressure."
        ]
      }
    ],
    sources: [
      { label: "World Health Organization: Diabetes", url: "https://www.who.int/news-room/fact-sheets/detail/diabetes" }
    ]
  }
];

export function getBlogPost(slug: string) {
  return blogPosts.find((post) => post.slug === slug);
}

export function formatBlogDate(date: string) {
  return new Intl.DateTimeFormat("en-UG", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Africa/Kampala"
  }).format(new Date(`${date}T12:00:00+03:00`));
}
