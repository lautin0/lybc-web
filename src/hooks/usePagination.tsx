import moment from "moment";
import React, { useState, useCallback, useEffect } from "react";
import { Pagination } from "react-bootstrap";

function usePagination<T>() {

  const pageSize = 5;

  const adjacency = 1;

  const [pageItems, setPageItems] = useState<Array<T> | null>(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [data, setData] = useState<Array<T>>([])

  const totalPageNum = Math.ceil(data.length / pageSize)

  const onPageChanged = useCallback((page: number) => {
    if (page > totalPageNum || page === 0)
      return
    let array: Array<T> = [];
    for (let i = (pageSize * page) - pageSize; i < pageSize * page; i++) {
      data[i] && array.push(data[i])
    }
    setPageItems(array)
    setPageNumber(page)
  }, [data])


  let items = [];
  if (pageItems == null || pageItems.length === 0) {
    items.push(<Pagination.First key={1} />, <Pagination.Prev key={2} />)
    items.push(
      <Pagination.Item key={3} active disabled>
        1
      </Pagination.Item>
    );
    items.push(<Pagination.Next key={4} />, <Pagination.Last key={5} />)
  } else if (totalPageNum <= (5 + (2 * adjacency))) { //5 = start + end + 2 Ellipsis + middle (Enough to show all)
    items.push(<Pagination.First key={1} onClick={() => onPageChanged(1)} />,
      <Pagination.Prev key={2} onClick={() => onPageChanged(pageNumber - 1)} />)
    for (let number = 1; number <= totalPageNum; number++) {
      items.push(
        <Pagination.Item key={number + 2} active={number === pageNumber} onClick={() => onPageChanged(number)}>
          {number}
        </Pagination.Item>,
      );
    }
    items.push(<Pagination.Next key={totalPageNum + 3} onClick={() => onPageChanged(pageNumber + 1)} />,
      <Pagination.Last key={totalPageNum + 4} onClick={() => onPageChanged(totalPageNum)} />)
  } else {
    items.push(<Pagination.First className="d-none d-sm-block" key={1} onClick={() => onPageChanged(1)} />,
      <Pagination.Prev key={2} onClick={() => onPageChanged(pageNumber - 1)} />)

    if (pageNumber <= 2 + (adjacency * 2)) {
      // Close to start, hide close to end
      for (let i = 1; i <= 2 + 1 + (adjacency * 2); i++) { // loop the range of window, i.e. 2*adj + 1(middle node) + start&end node
        items.push(
          <Pagination.Item key={i + 2} active={i === pageNumber} onClick={() => onPageChanged(i)}>
            {i}
          </Pagination.Item>,
        )
      }
      items.push(<Pagination.Ellipsis key={totalPageNum + 2} />)
      items.push(
        <Pagination.Item active={totalPageNum === pageNumber} key={totalPageNum + 3} onClick={() => onPageChanged(totalPageNum)}>
          {totalPageNum}
        </Pagination.Item>,
      )
    } else if (pageNumber >= (totalPageNum - ((adjacency * 2) + 1))) {
      // Close to end, hide close to start
      items.push(
        <Pagination.Item active={1 === pageNumber} key={3} onClick={() => onPageChanged(1)}>
          {1}
        </Pagination.Item>,
      )
      items.push(<Pagination.Ellipsis key={4} />)
      for (let i = (totalPageNum - ((adjacency * 2) + 2 + 1) + 1); i <= totalPageNum; i++) { // Similar logic as above, but +1 at the end because the pagination is not 0-based. Can be simplfied as "wanted window size (e.g. 5) + 1"
        items.push(
          <Pagination.Item key={i + 4} active={i === pageNumber} onClick={() => onPageChanged(i)}>
            {i}
          </Pagination.Item>,
        )
      }
    } else {
      // Handle middle, hide close to start and end
      items.push(
        <Pagination.Item active={totalPageNum === pageNumber} key={3} onClick={() => onPageChanged(1)}>
          {1}
        </Pagination.Item>,
      )
      items.push(<Pagination.Ellipsis key={4} />)

      for (let i = pageNumber - adjacency; i <= pageNumber + adjacency; i++) {
        items.push(
          <Pagination.Item key={i + 4} active={i === pageNumber} onClick={() => onPageChanged(i)}>
            {i}
          </Pagination.Item>,
        )
      }

      items.push(<Pagination.Ellipsis key={totalPageNum + 5} />)
      items.push(
        <Pagination.Item active={totalPageNum === pageNumber} key={totalPageNum + 6} onClick={() => onPageChanged(totalPageNum)}>
          {totalPageNum}
        </Pagination.Item>,
      )
    }

    items.push(<Pagination.Next key={totalPageNum + 7} onClick={() => onPageChanged(pageNumber + 1)} />,
      <Pagination.Last className="d-none d-sm-block" key={totalPageNum + 8} onClick={() => onPageChanged(totalPageNum)} />)
  }

  useEffect(() => {
    if (data !== undefined)
      onPageChanged(1)
  }, [data, onPageChanged])

  return { pageItems, items, pageNumber, setData, totalPageNum, onPageChanged }
}

export default usePagination;