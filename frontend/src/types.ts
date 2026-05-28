export type User = {
  id: string;
  name: string;
  email: string;
  role: "admin" | "user";
};

export type ContentType =
  | "package"
  | "visa"
  | "desk"
  | "cms"
  | "gallery"
  | "testimonial"
  | "contact";

export type ContentItem = {
  _id: string;
  type: ContentType;
  title: string;
  slug?: string;
  description?: string;
  body?: string;
  image?: string;
  rating?: number;
  email?: string;
  phone?: string;
  isPublished: boolean;
  metaTitle?: string;
  metaDescription?: string;
};
