import type { FilterCategory } from "./types";
interface CardProps {
  image: string;
  duration: string;
  title: string;
  description: string;
  available_places?: number;
  available_books?: number;
  location: string;
  date?: string;
  btnTextCard?: string;
}

export type { CardProps };

interface WrapperProps<T> {
  subtitle: string;
  title: string;
  description: string;
  items: T[];
  renderItem: (item: T) => React.ReactNode;
}

export type { WrapperProps };
interface FilterProps {
  category: FilterCategory;
  onCategoryChange: (category: FilterCategory) => void;
  onSearch: (term: string) => void;
}

export type { FilterProps };

interface ModalProps {
  onClose: () => void;
  title: string;
  paragraph: string;
}

export type { ModalProps };

interface InputCustomProps {
  type: string;
  required?: boolean;
  label: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export type { InputCustomProps };

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
}

export type { ButtonProps };

interface FormProps {
  headerText: string;
  buttonText: string;
  linkText?: string;
}

export type { FormProps };