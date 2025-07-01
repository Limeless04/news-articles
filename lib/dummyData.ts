type Article = {
  id: number;
  title: string;
  description: string;
  category: string;
  imageUrl: string;
  slug: string;
};

export const articles: Article[] = [
  {
    id: 1,
    title: "The Rise of AI in Everyday Life",
    description:
      "Explore how artificial intelligence is shaping the future of industries and daily tasks.",
    category: "technology",
    imageUrl: "https://picsum.photos/400/300",
    slug: "/articles/ai-rise",
  },
  {
    id: 2,
    title: "Designing with Accessibility in Mind",
    description:
      "A quick guide on making your web apps more inclusive and user-friendly.",
    category: "design",
    imageUrl: "https://picsum.photos/400/300",
    slug: "/articles/accessibility-design",
  },
  {
    id: 3,
    title: "Breaking Down the Basics of Web3",
    description:
      "Understand the core ideas behind decentralized apps and blockchain.",
    category: "technology",
    imageUrl: "https://picsum.photos/400/300",
    slug: "/articles/web3-basics",
  },
  {
    id: 4,
    title: "Getting Started with Tailwind CSS",
    description:
      "Learn how to rapidly build modern websites with Tailwind CSS utility classes.",
    category: "frontend",
    imageUrl: "https://picsum.photos/400/300",
    slug: "/articles/tailwind-start",
  },
  {
    id: 5,
    title: "Next.js App Router Overview",
    description:
      "Explore the latest features of Next.js App Router and how to use them.",
    category: "frontend",
    imageUrl: "https://picsum.photos/400/300",
    slug: "/articles/nextjs-app-router",
  },
  {
    id: 6,
    title: "Deploying to Vercel Made Easy",
    description:
      "Quick steps to get your project live using Vercel’s fast and developer-friendly hosting.",
    category: "devops",
    imageUrl: "https://picsum.photos/400/300",
    slug: "/articles/vercel-deploy",
  },
];
