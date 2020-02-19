import React, { useEffect, useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchNewComers } from 'actions';
import { Card, Col, Container, Spinner } from 'react-bootstrap';

function InfiniteScroll() {
  const lastScrollTop = useRef(0);

  const data = useSelector(state => state.newComer.fetchStatus.newComers)
  const isFetching = useSelector(state => state.newComer.fetchStatus.isFetching)
  const page = useRef(1)
  const pageSize = useRef(3);
  const dispatch = useDispatch()

  const handleScroll = () => {
    var st = window.pageYOffset || document.documentElement.scrollTop;
    if (st <= lastScrollTop.current) {
      lastScrollTop.current = st <= 0 ? 0 : st;
      return
    }
    lastScrollTop.current = st <= 0 ? 0 : st;

    var lastEl = document.querySelector("div.new-comer:last-child");
    var footerEl = document.querySelector("footer.footer");
    if (!lastEl) {
      return
    }
    var lastElOffset = lastEl.offsetTop + lastEl.clientHeight;
    var pageOffset = window.pageYOffset + window.innerHeight;
    if (pageOffset - footerEl.clientHeight > lastElOffset) {
      dispatch(fetchNewComers(pageSize.current, page.current));
      page.current++
    }
  }

  useEffect(() => {
    if (page.current == 1) {
      dispatch(fetchNewComers(pageSize.current, page.current));
      page.current++;
    }

    window.addEventListener("scroll", e => {
      handleScroll(e);
    })

    return function cleanup() {
      window.removeEventListener("scroll", handleScroll);
    };   
  })

  return (
    <>
      <Container className="row justify-content-start mx-auto new-comer">
        {data && data.map(data => (
          <Col key={data.id} md="6" lg="4">
            <Card className="text-center">
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
            <Spinner animation="grow" />
          </label>
        </Container>
      }
    </>
  );

}

export default InfiniteScroll;