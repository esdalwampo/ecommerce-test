
import { useState, useEffect } from 'react';
import items from '../../data/items.json';

interface CategoriesProps {
  setSelectedCategories?: any;
  setSelectedSorter?: any;
  setSearch?: any;
}

const Categories = (props: CategoriesProps) => {

  const categories = new Set(items.map(item => item.category));
  const sortedCategories = Array.from(categories).sort();

  const [selectedCategories, setSelectedCategories] = useState<string[]>(sortedCategories);
  const [selectedSorter, setSelectedSorter] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    props.setSelectedCategories && props.setSelectedCategories(selectedCategories);
  }, [selectedCategories])

  useEffect(() => {
    props.setSelectedSorter && props.setSelectedSorter(selectedSorter);
  }, [selectedSorter])

  useEffect(() => {
    props.setSearch && props.setSearch(searchValue);
  }, [searchValue])

  const addCategory = (item: string) => {
    let newList = [...selectedCategories];
    newList.push(item);
    setSelectedCategories(newList);
  }

  const removeCategory = (item: string) => {
    let index = selectedCategories.indexOf(item);
    let newList = [...selectedCategories];
    newList.splice(index, 1);
    setSelectedCategories(newList);
  }

  return (
    <>
      <input type='checkbox' id='view-filter' className='hidden'
        checked={isOpen}
        onChange={e => setIsOpen(e.target.checked)}
      />
      <aside className={
        "fixed bg-white w-[16rem] pt-[5rem] h-full top-0 left-0 overflow-y-auto lg:block drop-shadow-lg lg:drop-shadow-none " + (
          isOpen ? "" : "hidden"
        )
      }>
        <div className="h-full">
          <div className="h-full border-r-2 px-4 py-4 text-accent">
            <div className='mt-2'>
              <h6 className='uppercase font-semibold text-sm'>Search:</h6>
              <input
                className='w-full border outline-none px-2 py-1 mt-2'
                onChange={e => setSearchValue(e.target.value)}
                placeholder='Type product name...'
              />
            </div>

            <div className='mt-8'>
              <h6 className='uppercase font-semibold text-sm'>Sort by:</h6>
              <select
                className='w-full border outline-none px-2 py-1 mt-2'
                onChange={e => setSelectedSorter(e.target.value)}
              >
                <option value="">None</option>
                <option value="price-asc">Price - Asc</option>
                <option value="price-desc">Price - Desc</option>
                <option value="name-asc">Name - Asc</option>
                <option value="name-desc">Name - Desc</option>
              </select>
            </div>

            <div className='mt-8'>
              <h6 className='uppercase font-semibold text-sm'>Category:</h6>
              <ul>
                <li
                  className="flex uppercase text-sm font-semibold my-1 rounded"
                >
                  <input
                    type='checkbox'
                    id="cat_all"
                    className='ml-4'
                    onChange={e => e.target.checked ? setSelectedCategories(sortedCategories) : setSelectedCategories([])}
                    checked={selectedCategories.length === sortedCategories.length}
                  />
                  <label
                    htmlFor="cat_all"
                    className='flex-1 py-2 px-3 cursor-pointer'
                  >
                    ALL
                  </label>
                </li>
                {
                  sortedCategories.map((item: string, index: number) => (
                    <li
                      key={index}
                      className="flex uppercase text-sm font-semibold my-1 rounded"
                    >
                      <input
                        type='checkbox'
                        id={`cat_${item}`}
                        className='ml-4'
                        onChange={e => e.target.checked ? addCategory(item) : removeCategory(item)}
                        checked={selectedCategories.includes(item)}
                      />
                      <label
                        htmlFor={`cat_${item}`}
                        className='flex-1 py-2 px-3 cursor-pointer'
                      >
                        {item}
                      </label>
                    </li>
                  ))
                }
              </ul>
            </div>
          </div>
        </div>
      </aside>
    </>
  )
}

export default Categories;