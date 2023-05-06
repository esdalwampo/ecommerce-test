import { useEffect, useState } from "react";
import ChevronDoubleLeft from "../../svg/ChevronDoubleLeft";
import ChevronDoubleRight from "../../svg/ChevronDoubleRight";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  pageLimit: number;
  setPage: any;
}

const Pagination = (props: PaginationProps) => {
  
  const currentPage = props.currentPage;
  const totalPages = props.totalPages;

  const [max, setMax] = useState(1);
  const [min, setMin] = useState(10);

  const pages = Array<number>();
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  useEffect(() => {
    let half = props.pageLimit / 2;

    let max = currentPage + (
      currentPage < half ? (props.pageLimit - currentPage) : half
    );
    if(max > totalPages) max = totalPages;
    setMax(max);

    let min = currentPage - (
      currentPage > (totalPages - half) ? (props.pageLimit - (totalPages - currentPage)) : half
    );
    if(min < 0) min = 0;
    setMin(min);
  }, [props])

  const pageNumbers = pages.map(page => {

    if (page <= max && page > min) {
      return (
        <li 
          key={page} 
          onClick={() => props.setPage(page)}
          className={
            "flex items-center justify-center rounded-full cursor-pointer h-8 w-8 hover:bg-primary hover:text-white " + (

              currentPage === page ? "bg-primary-focus text-white" : "text-accent"
            )
          }>
          {page}
        </li>
      );
    } else {
      return null;
    }
  }

  );

  let pageIncrementEllipses = null;
  if (pages.length > max) {
    pageIncrementEllipses = (
      <li 
        className="flex h-8 items-center justify-center"
      >
        &hellip;
      </li>
    )
  }
  
  let pageDecremenEllipses = null;
  if (min >= 1) {
    pageDecremenEllipses = (
      <li 
        className="flex h-8 items-center justify-center"
      >
        &hellip;
      </li>
    )
  }

  if(pages.length < 2 ) return null;

  return (
    <ul className="flex gap-2 text-sm font-semibold text-accent">
      <li>
        <button 
          onClick={() => props.setPage(1)}
          className="flex h-8 items-center justify-center cursor-pointer hover:text-primary disabled:text-gray-400"
          disabled={props.currentPage === 1}
        >
          <ChevronDoubleLeft />
        </button>
      </li>
      {pageDecremenEllipses}
      {pageNumbers}
      {pageIncrementEllipses}
      <li>
        <button 
          onClick={() => props.setPage(pages.length)} 
          className="flex h-8 items-center justify-center cursor-pointer hover:text-primary disabled:text-gray-400"
          disabled={props.currentPage === pages.length}
        >
          <ChevronDoubleRight />
        </button>
      </li>
    </ul>
  )
}

export default Pagination