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
    slug: "ebola-update-uganda-outbreak-status",
    title: "Ebola update: Uganda’s outbreak has ended",
    description: "Uganda has ended its 2026 Ebola outbreak, but early reporting and continued vigilance remain important while an outbreak continues in the Democratic Republic of the Congo.",
    category: "Public health update",
    publishedAt: "2026-10-05",
    updatedAt: "2026-10-05",
    readTime: "5 min read",
    image: "/images/blog/ebola-update-uganda.webp",
    imageAlt: "Bweza Pharmacy Ebola update showing a Ugandan health worker explaining that Uganda’s outbreak has ended",
    sections: [
      {
        heading: "Uganda’s current status",
        paragraphs: [
          "As of 5 October 2026, Uganda is not reporting an active Ebola outbreak. The World Health Organization confirmed the outbreak ended on 27 August 2026 after 42 consecutive days without a new confirmed case following the discharge of the last imported patient on 16 July.",
          "During the outbreak, Uganda reported 20 confirmed cases of Bundibugyo virus disease: 15 imported and five locally acquired. Eighteen people recovered, two died and more than 800 contacts were monitored."
        ],
        callout: "An outbreak being declared over does not remove the risk of a future imported case. Uganda remains on alert."
      },
      {
        heading: "Why vigilance still matters",
        paragraphs: [
          "The Ebola outbreak in the Democratic Republic of the Congo remains active. Frequent cross-border travel, trade and family connections mean Uganda must maintain surveillance, laboratory readiness, infection prevention and rapid investigation of alerts.",
          "Use updates from the Uganda Ministry of Health and the World Health Organization, and avoid circulating unverified messages."
        ]
      },
      {
        heading: "How Ebola can spread",
        bullets: [
          "Direct contact with blood or other body fluids of a person who is ill with or has died from Ebola.",
          "Contact with items contaminated by those fluids, such as bedding, clothing or medical equipment.",
          "Contact with infected wildlife or raw meat from affected animals."
        ]
      },
      {
        heading: "Symptoms and what to do",
        paragraphs: [
          "Possible symptoms include fever, severe weakness, headache, muscle pain, vomiting, diarrhoea and stomach pain. Unexplained bleeding or bruising can occur later, but many early symptoms can also be caused by more common illnesses."
        ],
        bullets: [
          "If you develop compatible symptoms after travel to an affected area or contact with a suspected case, separate from others and do not travel.",
          "Call a health facility or the Ministry of Health before arriving so staff can prepare safely.",
          "Do not self-diagnose or hide relevant travel or contact history."
        ],
        callout: "Uganda Ministry of Health toll-free line: 0800 100 066. For an emergency, seek urgent professional help."
      }
    ],
    sources: [
      { label: "Uganda Ministry of Health: Uganda is officially Ebola free", url: "https://health.go.ug/uganda-is-officially-ebola-free" },
      { label: "WHO Africa: Uganda ends Ebola outbreak", url: "https://www.afro.who.int/countries/uganda/news/uganda-ends-ebola-outbreak-following-completion-42-day-countdown" },
      { label: "WHO: Ebola outbreak in the Democratic Republic of the Congo", url: "https://www.who.int/emergencies/situations/ebola-outbreak---drc-2026" },
      { label: "CDC: Ebola in Uganda and the Democratic Republic of the Congo", url: "https://wwwnc.cdc.gov/travel/notices/level2/ebola-drc-uganda" }
    ]
  },
  {
    slug: "understanding-high-blood-pressure",
    title: "Understanding high blood pressure",
    description: "Why regular blood-pressure checks matter, common risk factors and when to seek urgent care.",
    category: "Health education",
    publishedAt: "2026-10-02",
    updatedAt: "2026-10-02",
    readTime: "5 min read",
    image: "/images/blog/know-your-blood-pressure.webp",
    imageAlt: "Bweza Pharmacy blood-pressure awareness graphic showing a pharmacist speaking with a customer",
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
    image: "/images/blog/use-medicines-safely.webp",
    imageAlt: "Bweza Pharmacy medicine-safety awareness graphic showing a pharmacist helping a customer review medicine instructions",
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
    image: "/images/blog/know-your-blood-sugar.webp",
    imageAlt: "Bweza Pharmacy blood-sugar awareness graphic showing a pharmacist speaking with a customer",
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
