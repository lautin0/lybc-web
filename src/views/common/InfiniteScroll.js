import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchNewComers } from 'actions';
import { Card, Col, Container, Spinner } from 'react-bootstrap';

function InfiniteScroll() {
  const [initialized, setInitialized] = useState(false)
  const data = useSelector(state => state.newComer.fetchStatus.newComers)
  const isFetching = useSelector(state => state.newComer.fetchStatus.isFetching)
  const dispatch = useDispatch()

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(3);

  const handleScroll = () => {
    var lastEl = document.querySelector("div.new-comer:last-child");
    if(!lastEl)
      return
    var lastElOffset = lastEl.offsetTop + lastEl.clientHeight;
    var pageOffset = window.pageYOffset + window.innerHeight;
    if (pageOffset > lastElOffset) {
      setPage(page + 1);
      dispatch(fetchNewComers(pageSize, page));
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", e => {
      handleScroll();
    })
    return function cleanup() {
      window.removeEventListener("scroll", handleScroll);
    }; 
  })

  useEffect(() => {
    dispatch(fetchNewComers(pageSize, page));
    setPage(page + 1);
    setInitialized(true);
  }, [initialized])

  return (
    <>
      <Container className="row justify-content-start mx-auto">
        {data && data.map(data => (
          <Col key={data.id} md="6" lg="4">
            <Card className="text-center new-comer">
              <Card.Body>
                <Card.Title>{data.name}</Card.Title>
                <Card.Text>{data.phone}</Card.Text>
                <Card.Text>{data.email}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Container>
      {isFetching && 
        <Container className="text-center">
          <label>
            Load More <Spinner animation="grow" />
          </label>
        </Container>
      }
    </>
  );

}

export default InfiniteScroll;