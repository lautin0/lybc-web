import { useEffect } from "react";

// react-bootstrap components
import {
  Container,
  Row,
  Table,
  Pagination,
} from "react-bootstrap";

import moment from 'moment'
import { useHistory } from "react-router-dom";
import { useWorshipsQuery, Worship } from "generated/graphql";
import usePagination from "hooks/usePagination";
import { useIntl } from "react-intl";
import useLanguage from "hooks/useLanguage";
import { WorshipListItemType } from "./types/types";

function WorshipList() {

  const [locale] = useLanguage()

  const intl = useIntl()

  const history = useHistory();

  const { loading, data: worshipData } = useWorshipsQuery()
  
  const { pageItems, pageNumber, setData, items } = usePagination<WorshipListItemType>()

  function onCellClicked(id: any) {
    history.push('/worship/' + id)
  };

  useEffect(() => {
    if (worshipData === undefined)
      return
    let tmp: Array<Worship> = worshipData.worships != null ? [...worshipData.worships] : []

    setData(tmp?.sort((a: Worship, b: Worship) => {
      if (a.worshipId > b.worshipId) {
        return -1
      } else if (a.worshipId < b.worshipId) {
        return 1
      } else {
        return 0
      }
    })
      .map((x: Worship): WorshipListItemType => {
        return {
          worshipId: x.worshipId,
          date: moment(x.worshipId, 'YYYYMMDD'),
          title: x.type === '分享主日' ? '分享主日' : x.title,
          messenger: x.messenger === '' ? '---' : x.messenger,
          type: x.type
        }
      }))
  }, [worshipData])

  useEffect(() => {
    document.title = intl.formatMessage({ id: "app.menu.activity.online-sermon" })
  }, [locale])

  useEffect(() => {
    //Default scroll to top
    window.scrollTo(0, 0)
  }, [])

  return (
    <>
      <div
        //className="section section-download"
        className="section"
        id="download-section"
      >
        <Container style={{ marginTop: -50 }}>
          <Row className="mt-5">
            <Table striped className={pageItems && pageItems.length > 0 ? 'clickable' : ''}>
              <thead>
                <tr>
                  <th style={{ width: '15%' }}>{intl.formatMessage({ id: "app.tables.date" })}</th>
                  <th style={{ width: '45%' }}>{intl.formatMessage({ id: "app.tables.topic" })}</th>
                  <th style={{ width: '30%' }}>{intl.formatMessage({ id: "app.tables.speaker" })}</th>
                  <th style={{ width: '10%' }}></th>
                </tr>
              </thead>
              <tbody>
                {loading && <tr><th className="text-center" colSpan={4}>
                  <div className="spinner-grow text-secondary" role="status">
                    <span className="sr-only">Loading...</span>
                  </div>
                </th></tr>}
                {((pageItems == null || pageItems.length === 0) && !loading) && <tr><th className="text-center" colSpan={4}>{intl.formatMessage({ id: "app.tables.no-record" })}</th></tr>}
                {
                  (pageItems && pageItems.length > 0) && pageItems.map((value, index) => {
                    return <tr key={index}>
                      <th scope="row">{value.date.format('YYYY-MM-DD')}</th>
                      <td onClick={() => onCellClicked(value.worshipId)}>{value.title}{(index === 0 && pageNumber === 1) && <b className="ml-3" style={{ color: 'red' }}><i>{intl.formatMessage({ id: "app.new" })}</i></b>}</td>
                      <td onClick={() => onCellClicked(value.worshipId)}>{value.messenger}</td>
                      <td onClick={() => onCellClicked(value.worshipId)}><a href="#">{intl.formatMessage({ id: "app.tables.goto" })}</a></td>
                    </tr>
                  })
                }
              </tbody>
            </Table>
            <Pagination
              className="w-100 pagination-primary justify-content-center"
            >
              {items}
            </Pagination>
          </Row>
        </Container>
      </div>
    </>
  );
}

export default WorshipList;