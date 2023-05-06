import Cart from "../../svg/Cart";
import List from "../../svg/List";

const HeaderNav = () => {

  return (
    <header className="fixed z-10 w-full top-0">
      <nav className="bg-white text-primary h-[5rem] px-8 flex items-center drop-shadow-lg gap-4">
        <label htmlFor="view-filter" className="lg:hidden cursor-pointer">
          <List />
        </label>
        <h1 className="flex-1 uppercase font-bold text-2xl">Online Shopping Store</h1>
        <label htmlFor="view-cart" className="lg:hidden cursor-pointer">
          <Cart />
        </label>
        
      </nav>
    </header>
  )
}

export default HeaderNav;