export interface FoodItem {
  id: number;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  number: string;
  accentColor: string;
}

export const foods: FoodItem[] = [
  {
    id: 1,
    slug: "pizza",
    name: "Pizza",
    tagline: "Made to pull you closer.",
    description:
      "Hand-stretched dough, slow-simmered tomato, and a generous pull of melted cheese. Every slice is built to be remembered.",
    number: "01/05",
    accentColor: "#E8A87C",
  },
  {
    id: 2,
    slug: "burger",
    name: "Burger",
    tagline: "Layers of pure satisfaction.",
    description:
      "Flame-kissed patty, crisp lettuce, house-made sauce, and a brioche bun that holds it all together — barely.",
    number: "02/05",
    accentColor: "#C8A26B",
  },
  {
    id: 3,
    slug: "mango-lassi",
    name: "Mango Lassi",
    tagline: "A little sweetness, a lot of magic.",
    description:
      "Sun-ripened Alphonso mangoes blended with cool, creamy yogurt. A sip that takes you somewhere golden.",
    number: "03/05",
    accentColor: "#F4C842",
  },
  {
    id: 4,
    slug: "french-fries",
    name: "French Fries",
    tagline: "Golden. Crispy. Irresistible.",
    description:
      "Double-fried in refined oil to a perfect golden crust. Seasoned at the exact right moment. Impossible to eat just one.",
    number: "04/05",
    accentColor: "#E8C547",
  },
  {
    id: 5,
    slug: "chocolate-lava-cake",
    name: "Chocolate Lava Cake",
    tagline: "Let the chocolate flow.",
    description:
      "A dark chocolate shell with a molten core that reveals itself with the first cut. Warm, rich, and utterly indulgent.",
    number: "05/05",
    accentColor: "#A0522D",
  },
];
