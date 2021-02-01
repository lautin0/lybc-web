import React, { useEffect } from "react";

// react-bootstrap components
import {
  Container,
  Row,
  Table,
  Pagination,
  PageItem
} from "react-bootstrap";
import { useIntl } from "react-intl";

// import moment from 'moment'

const data: Array<any> = []

function Apply() {

  const intl = useIntl()

  useEffect(() => {
    //Default scroll to top
    window.scrollTo(0, 0)
  }, [])

  function onCellClicked(uri: string) {
    window.open(uri, '_blank');
  };

  return (
    <>
      <div
        //className="section section-download"
        className="section"
        id="download-section"
      >
        <Container>
          <Row>
            <Table striped className={data && data.length > 0 ? 'clickable' : ''}>
              <thead>
                <tr>
                  <th>{intl.formatMessage({ id: "app.deadline" })}</th>
                  <th style={{ width: '60%' }}>{intl.formatMessage({ id: "app.menu.activity.title" })}</th>
                  <th style={{ width: '20%' }}>{intl.formatMessage({ id: "app.link" })}</th>
                </tr>
              </thead>
              <tbody>
                {(data == null || data.length === 0) && <tr><th className="text-center" colSpan={3}>{intl.formatMessage({ id: "app.tables.no-record" })}</th></tr>}
                {
                  (data && data.length > 0) && data.map((value, index) => {
                    return <tr key={index}>
                      <th scope="row">{value.date.format('YYYY-MM')}</th>
                      <td onClick={() => onCellClicked(value.uri)}>{value.title}</td>
                      <td onClick={() => onCellClicked(value.uri)}><a href="#">{intl.formatMessage({ id: "app.download" })}</a></td>
                    </tr>
                  })
                }
              </tbody>
            </Table>
            <Pagination size="lg"
              className="w-100 pagination-primary justify-content-center"
            >
              <Pagination.First />
              <Pagination.Prev />
              <PageItem active disabled>
                1
              </PageItem>
              <Pagination.Next />
              <Pagination.Last />
              {/* <Pagination.Last
                onClick={e => e.preventDefault()}
              >
                <span aria-hidden={true}>
                  <i
                    aria-hidden={true}
                    className="fa fa-angle-double-right"
                  ></i>
                </span>
              </Pagination.Last> */}
            </Pagination>
          </Row>
        </Container>
      </div>
    </>
  );
}

export default Apply;
