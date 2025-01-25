import React, { useState, useEffect } from 'react';

function Pagination({ totalPages, currentPage, setCurrentPage }) {
  const [jumpTo, setJumpTo] = useState('');

  useEffect(() => {
    setJumpTo('');
  }, [currentPage]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage - 1); 
    }
  };

  const handleJumpTo = () => {
    const pageNumber = parseInt(jumpTo, 10);
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      handlePageChange(pageNumber);
    } else {
      alert('Invalid page number');
    }
    setJumpTo('');
  };
  if (totalPages === 0)
      return; 

  return (
    <div className="pagination-container">
      <button
        onClick={() => handlePageChange(currentPage)}
        disabled={currentPage === 0}
      >
        Prev
      </button>
      <span>
        Page {currentPage + 1} of {totalPages}
      </span>
      <button
        onClick={() => handlePageChange(currentPage + 2)}
        disabled={currentPage + 1 === totalPages}
      >
        Next
      </button>
      <input
        name="jumpTo"
        type="number"
        placeholder="Go to page"
        onChange={(e) => setJumpTo(e.target.value)}
        value={jumpTo}
        min={0}
      />
      <button onClick={handleJumpTo} disabled={jumpTo === ''} >Go</button>
    </div>
  );
}

export default Pagination;
