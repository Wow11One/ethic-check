"use client";
import { Button } from "@/components/Button";
import { RequestHistory } from "@/types/apiResponseTypes";
import axios from "axios";
import { useEffect, useState } from "react";
import ReactPaginate from 'react-paginate';

const PAGE_LIMIT = 1;

const getHistoryByPage = async (page: number) => {
  const historyResponse = await axios.get<{
    history: RequestHistory[],
    count: number,
  }>(
    `/api/get-history?page=${page - 1}&limit=${PAGE_LIMIT}`
  );
  return historyResponse.data;
};

const PaginationBar = ({ total, currentPage, onPageChange }: { total: number, currentPage: number, onPageChange: (page: number) => void }) => {
  const totalPages = Math.ceil(total / PAGE_LIMIT);

  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <Button key={i} disabled={currentPage === i} onClick={() => onPageChange(i)}>
          {i}
        </Button>
      );
    }
    return pageNumbers;
  };

  return (
    <div>
      {renderPageNumbers()}
    </div>
  );
};

const RequestsHistoryPage = () => {
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [history, setHistory] = useState<RequestHistory[]>([]);

  useEffect(() => {
    getHistoryByPage(page).then((data) => {
      setHistory(data.history);
      setTotal(data.count);
    });
  }, [page]);

  const handlePageChange = ({ selected }: { selected: number }) => {
    setPage(selected + 1);
  };

  return (
    <div>
      {history.length === 0
        ? "No search history"
        : history.map((el, index) =>
          <div key={index} className="max-w-500 self-center m-10 p-10 rounded-lg bg-neutral-900">
            <div className="mb-5">
              <h3 style={{ fontSize: '1rem', fontWeight: 'bold' }}>Site URL: </h3>
              {el.siteUrl}
            </div>
            <div className="mb-5">
              <h3 style={{ fontSize: '1rem', fontWeight: 'bold' }}>Gemini Response</h3>
              <ul>
                {el.geminiResponse.map((response, index) => (
                  response.content.split('###').map((paragraph, index) => (
                    <li key={index}>{paragraph}</li>
                  ))
                ))}
              </ul>
            </div>
          </div>)}
      <ReactPaginate
        pageCount={Math.ceil(total / PAGE_LIMIT)}
        pageRangeDisplayed={5}
        onPageChange={handlePageChange}
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakLabel="..."
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName="pagination"
        activeClassName="active"
        renderOnZeroPageCount={null}
      />
    </div>
  );
};

export default RequestsHistoryPage;
