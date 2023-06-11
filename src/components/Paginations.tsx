import { useState } from 'react';

interface PaginationProps {
  postsPerPage: number;
  setCurrentPage: (n: number) => void;
  currentPage: number;
  images: string[];
}

const Paginations = ({
  postsPerPage,
  setCurrentPage,
  currentPage,
  images,
}: PaginationProps) => {
  const pages = [];

  const totalPosts = images.length;

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) pages.push(i);

  const [active, setActive] = useState(1);

  const prevHandler = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
      setActive(currentPage - 1);
    }
  };

  const nextHandler = () => {
    if (currentPage !== pages.length) {
      setCurrentPage(currentPage + 1);
      setActive(currentPage + 1);
    }
  };

  return (
    <div>
      <button className=" border px-2 prevNext" onClick={prevHandler}>
        Prev
      </button>
      {pages.map((page, i) => (
        <button
          className={`border px-2 ${
            active === page ? 'bg-black text-white' : 'bg-white'
          }`}
          key={i}
          onClick={() => {
            setCurrentPage(page);
            setActive(page);
          }}
        >
          {page}
        </button>
      ))}
      <button className="border px-2 prevNext" onClick={nextHandler}>
        Next
      </button>
    </div>
  );
};

export default Paginations;
