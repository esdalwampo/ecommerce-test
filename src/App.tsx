import { useEffect, useState } from 'react';
import HeaderNav from './components/navigation/HeaderNav';
import Categories from './components/product/Filter';
import Cart from './components/cart/Cart';
import {Product} from './interfaces/types';
import ProductListItem from './components/product/ProductListItem';
import Pagination from './components/navigation/Pagination';

import items from './data/items.json';

const PAGE_SIZE = 10;
function App() {

  const [resultProducts, setResultProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState<any>({
    products: [],
    totalPages: 0,
  })

  const [sort, setSort] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [search, setSearch] = useState('');

  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const items = localStorage.getItem("cartItems");
    const parsedItems = items ? JSON.parse(items) : [];
    setCartItems(parsedItems);
  }, []);

  useEffect(() => {
    const prodCategories = filterByCategory(items);
    const prodSearch = filterBySearch(prodCategories);
    const sorted = sortData(prodSearch);
    setResultProducts(sorted);
    setCurrentPage(1);
  }, [sort, selectedCategories, search])

  useEffect(() => {
    const paginate = paginateData(resultProducts, currentPage)
    setData(paginate);
  }, [resultProducts, currentPage])

  const paginateData = (products: Product[], pageNumber: number) => {
    const startIndex = (pageNumber - 1) * PAGE_SIZE;
    const endIndex = startIndex + PAGE_SIZE;
    const currentData = products.slice(startIndex, endIndex);
    const totalPages = Math.ceil(products.length / PAGE_SIZE);
    return { products: currentData, totalPages };
  }

  const filterByCategory = (products: Product[]) => {
    if (selectedCategories) {
      return products.filter(item => {
        for (let category of selectedCategories) {
          if (item.category === category) return true;
        }

        return false;
      })
    }
    else {
      return products;
    }
  }

  const filterBySearch = (products: Product[]) => {
    if (search) {
      return products.filter(item => item.productName.toLowerCase().includes(search.toLowerCase()))
    }
    else {
      return products;
    }
  }

  const sortData = (products: Product[]) => {
    if (sort === "price-asc") {
      return products.sort((a, b) => a.unitPrice - b.unitPrice);
    }
    else if (sort === "price-desc") {
      return products.sort((a, b) => b.unitPrice - a.unitPrice);
    }
    else if (sort === "name-asc") {
      return products.sort((a, b) => {
        const nameA = a.productName.toLowerCase();
        const nameB = b.productName.toLowerCase();
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        return 0;
      });
    }
    else if (sort === "name-desc") {
      return products.sort((a, b) => {
        const nameA = a.productName.toLowerCase();
        const nameB = b.productName.toLowerCase();
        if (nameA > nameB) {
          return -1;
        }
        if (nameA < nameB) {
          return 1;
        }
        return 0;
      });
    }
    else {
      return products;
    }
  }

  return (
    <>
      <HeaderNav />

      <section className='lg:ml-[16rem] lg:mr-[24rem] pt-[5rem] h-screen'>
        <div className='p-8 h-full overflow-y-auto'>
          {
            data.products.map((item: Product, index: number) => (
              <ProductListItem
                key={item.id}
                product={item}
                setCartItems={setCartItems}
              />
            ))
          }
          <div className="flex justify-center pt-8">
            <Pagination
              totalPages={data.totalPages}
              currentPage={currentPage}
              setPage={setCurrentPage}
              pageLimit={5}
            />
          </div>
        </div>
      </section>
      <Categories
        setSelectedCategories={setSelectedCategories}
        setSelectedSorter={setSort}
        setSearch={setSearch}
      />
      <Cart 
        cartItems={cartItems}
        setCartItems={setCartItems}
      />
    </>
  );
}

export default App;
