import { PropsWithChildren, createContext, useContext, useState } from 'react';
import { Category } from '@/constants/categories';

type ProductsFilterState = {
  selectedCategory: Category;
  setSelectedCategory: React.Dispatch<React.SetStateAction<Category>>;
};

const initialFilterState: ProductsFilterState = {
  selectedCategory: 'All',
  setSelectedCategory: () => {},
};

const ProductsFilterContext = createContext(initialFilterState);

export const useProductsFilter = () => useContext(ProductsFilterContext);

export default function ProductsFilterProvider({
  children,
}: PropsWithChildren) {
  const [selectedCategory, setSelectedCategory] = useState<Category>('All');

  const value = {
    selectedCategory,
    setSelectedCategory,
  };
  return (
    <ProductsFilterContext value={value}>{children}</ProductsFilterContext>
  );
}
