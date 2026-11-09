import type { FilterCategory } from "./types";
interface CardProps {
  image: string;
  duration: string;
  title: string;
  description?: string;
  available_places?: number;
  available_books?: number;
  location: string;
  date?: string;
  btnTextCard?: string;
  onBtnClick?: () => void;
  secondBtnTextCard?: string;
  onSecondBtnClick?: () => void;
  onDelete?: () => void;
}

export type { CardProps };

interface WrapperProps<T> {
  subtitle?: string;
  title?: string;
  description?: string;
  items: T[];
  renderItem: (item: T) => React.ReactNode;
}

export type { WrapperProps };
interface FilterProps {
  category?: FilterCategory;
  onCategoryChange: (category: FilterCategory) => void;
  onSearch: (term: string) => void;
}

export type { FilterProps };

interface ModalProps {
  onClose: () => void;
  title: string;
  paragraph: string;
  adminLogin?: boolean;
  actionLabel?: string;
  actionTo?: string;
  details?: React.ReactNode;
  onConfirm?: () => void;
  confirmLabel?: string;
  confirmDisabled?: boolean;
}

export type { ModalProps };

interface InputCustomProps {
  type: string;
  name?: string;
  required?: boolean;
  label: string;
  value?: string;
  accept?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export type { InputCustomProps };

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

export type { ButtonProps };

interface ToastProps {
  message: string;
  type?: "success" | "error";
  icon?: React.ReactNode;
  duration?: number;
  onClose: () => void;
}

export type { ToastProps };

interface FormProps {
  headerText: string;
  buttonText: string;
  linkText?: string;
}

export type { FormProps };

interface BottomLinksProps {
  route_1: string;
  route_2: string;
  route_3: string;
  route_4: string;
  icon_1: React.ReactNode;
  icon_2: React.ReactNode;
  icon_3: React.ReactNode;
  icon_4: React.ReactNode;
}

export type { BottomLinksProps };

  interface StatTileProps {
  title: string;
  value: number;
  description: string;
  icon?: React.ReactNode;
}

export type { StatTileProps };

type TableRow = [
  React.ReactNode,
  React.ReactNode,
  React.ReactNode,
  React.ReactNode,
  React.ReactNode,
];

interface InfoTableProps {
  caption?: string;
  headers: [string, string, string, string, string];
  rows: TableRow[];
}

export type { InfoTableProps, TableRow };