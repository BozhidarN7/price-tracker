import {
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useDeferredValue,
  useState,
} from 'react';
import { SORT_OPTIONS } from '../constants';
import { Category } from '@/constants/categories';
import { Product } from '@/types/product';
import { normalize } from '@/utils';

type ProductsFilterState = {
  selectedCategories: Category[];
  setSelectedCategories: React.Dispatch<React.SetStateAction<Category[]>>;
  sortBy: string;
  setSortBy: React.Dispatch<React.SetStateAction<string>>;
  isAscending: boolean;
  setIsAscending: React.Dispatch<React.SetStateAction<boolean>>;
  numberOfMatchedProducts: number;
  setNumberOfMatchedProducts: React.Dispatch<React.SetStateAction<number>>;
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  sortProducts: (products: Product[]) => Product[];
  searchProducts: (products: Product[]) => Product[];
};

const initialFilterState: ProductsFilterState = {
  selectedCategories: ['All'],
  setSelectedCategories: () => {},
  sortBy: '',
  setSortBy: () => {},
  isAscending: true,
  setIsAscending: () => {},
  sortProducts: (products: Product[]) => products,
  searchProducts: (products: Product[]) => products,
  numberOfMatchedProducts: 0,
  searchQuery: '',
  setSearchQuery: () => {},
  setNumberOfMatchedProducts: () => {},
};

const ProductsFilterContext = createContext(initialFilterState);

export const useProductsFilter = () => useContext(ProductsFilterContext);

export default function ProductsFilterProvider({
  children,
}: PropsWithChildren) {
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([
    'All',
  ]);
  const [sortBy, setSortBy] = useState<string>('');
  const [isAscending, setIsAscending] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState('');
  const deferredSearchQuery = useDeferredValue(searchQuery);
  const [numberOfMatchedProducts, setNumberOfMatchedProducts] = useState(0);

  const sortProducts = useCallback(
    (products: Product[]) => {
      if (sortBy === SORT_OPTIONS.RECENTLY_UPDATED) {
        products.sort((a, b) => {
          const dateA = new Date(a.updatedAt).getTime();
          const dateB = new Date(b.updatedAt).getTime();
          return isAscending ? dateA - dateB : dateB - dateA;
        });
      }
      if (sortBy === SORT_OPTIONS.NAME) {
        products.sort((a, b) => {
          return isAscending
            ? a.name.localeCompare(b.name)
            : b.name.localeCompare(a.name);
        });
      }
      if (sortBy === SORT_OPTIONS.LATEST_PRICE) {
        products.sort((a, b) => {
          return isAscending
            ? a.latestPrice - b.latestPrice
            : b.latestPrice - a.latestPrice;
        });
      }
      if (
        sortBy === SORT_OPTIONS.BIGGEST_INCREASE ||
        sortBy === SORT_OPTIONS.BIGGEST_DECREASE
      ) {
        products.sort((a, b) => {
          const priceHistoryA = a.priceHistory;
          const priceHistoryB = b.priceHistory;

          const increaseA =
            priceHistoryA.length >= 2
              ? priceHistoryA[priceHistoryA.length - 1].price -
                priceHistoryA[priceHistoryA.length - 2].price
              : 0;
          const increaseB =
            priceHistoryB.length >= 2
              ? priceHistoryB[priceHistoryB.length - 1].price -
                priceHistoryB[priceHistoryB.length - 2].price
              : 0;

          return isAscending ? increaseA - increaseB : increaseB - increaseA;
        });
      }

      return products;
    },
    [sortBy, isAscending],
  );

  const searchProducts = useCallback(
    (products: Product[]) => {
      return products.filter((product) => {
        const query = normalize(deferredSearchQuery);

        const name = normalize(product.name);
        const brand = normalize(product.brand || '');

        return name.includes(query) || brand.includes(query);
      });
    },
    [deferredSearchQuery],
  );

  const value = {
    selectedCategories,
    setSelectedCategories,

    sortBy,
    setSortBy,

    isAscending,
    setIsAscending,

    numberOfMatchedProducts,
    setNumberOfMatchedProducts,

    searchQuery,
    setSearchQuery,

    sortProducts,
    searchProducts,
  };
  return (
    <ProductsFilterContext value={value}>{children}</ProductsFilterContext>
  );
}
