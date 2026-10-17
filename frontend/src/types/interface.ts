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