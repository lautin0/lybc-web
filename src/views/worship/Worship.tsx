import { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import ImageModal from "components/Modals/ImageModal";
import { useDispatch } from "react-redux";
import { setImage, setLoading } from "actions";
import { Container, Row, Col, Tabs, Tab, Button } from "react-bootstrap";
import DOMPurify from "dompurify";
import moment from "moment";
import html2canvas from 'html2canvas'
import { useWorshipQuery } from "generated/graphql";
import { useIntl } from "react-intl";
import TinyEditorComponent from "components/TinyMCE/TinyEditorComponent";
import tinymce from 'tinymce/tinymce'

function Worship() {
  const intl = useIntl()
  const location = useLocation()
  const dispatch = useDispatch();
  let { id } = useParams<any>();

  const [key, setKey] = useState('home')
  const [data, setData] = useState('')

  const { loading, data: wData, refetch } = useWorshipQuery({
    variables: { worshipId: id }, notifyOnNetworkStatusChange: true
  })

  const handleDownloadNote = () => {
    dispatch(setLoading(true))
    let el = document.getElementsByClassName('tox-edit-area__iframe')[0] as HTMLIFrameElement
    let printEl = el.contentDocument?.firstElementChild! as HTMLElement
    html2canvas(printEl, { scale: 1, useCORS: true, height: el.clientHeight })
      .then(function (canvas: HTMLCanvasElement) {
        dispatch(setImage(canvas.toDataURL()))
        dispatch(setLoading(false))
      });
  }

  const handleChange = (content: any) => {
    setData(content)
  }

  useEffect(() => {
    if (wData !== undefined && wData.worship?.note)
      setData(wData.worship?.note);
  }, [wData])

  useEffect(() => {
    if (refetch) {
      refetch();
    }
  }, [location, refetch])

  useEffect(() => {
    //Default scroll to top
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="section">
      <ImageModal />
      {loading && <Container style={{ marginTop: -20, marginBottom: 60 }}>
        <div className="text-center">
          <div className="spinner-grow text-secondary" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      </Container>}
      {!loading && wData != null && <Container style={{ marginTop: -20 }}>
        <Row className="justify-content-md-center">
          <Col className="text-center" lg="8" md="12">
            <h2>{`${moment(wData.worship?.worshipId, 'YYYYMMDD').format('LL')} ${wData.worship?.type}`}</h2>
          </Col>
        </Row>
        {wData.worship?.link !== '' && <Row className="justify-content-center mt-3">
          <iframe title="sermon-video" width="660" height="371" src={wData.worship?.link as string} frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
        </Row>}
        <Row className="mt-5 mb-5 text-center justify-content-center ml-1 mr-1">
          <Tabs
            id=""
            activeKey={key}
            onSelect={(k: any) => setKey(k)}
            className="nav-justified w-100 mb-5"
            style={{ fontSize: 20 }}
          >
            <Tab eventKey="home" title={intl.formatMessage({ id: "app.worship.notes" })}>
              <div className="mb-2 form-inline">
                {wData.worship?.docs.map((value: any, index: number) => {
                  return <div style={{ width: 'fit-content' }} className="mr-3" key={index}>
                    <a href={value.link} rel="noopener noreferrer" target="_blank" className="dl-link">
                      <div>
                        {value.type === 'pdf' && (<i style={{ fontSize: 48, color: '#f04100' }} className="far fa-file-pdf"></i>)}
                        {value.type === 'docx' && (<i style={{ fontSize: 48, color: '#285595' }} className="far fa-file-word"></i>)}
                      </div>
                      <div>
                        <label>{value.title + '.' + value.type}</label>
                      </div>
                    </a>
                  </div>
                })}
              </div>
              <Row>
                <TinyEditorComponent onChange={handleChange} value={data} />
              </Row>
              <Row className="mt-5 justify-content-end">
                <div className="d-block d-lg-none">
                  <Button style={{ transform: 'translate(0px, 25px)' }} variant="primary" onClick={handleDownloadNote}>
                    {intl.formatMessage({ id: "app.buttons.export-image" })}<i className="ml-1 fas fa-image"></i>
                  </Button>
                </div>
                <div className="d-none d-lg-block">
                  <Button onClick={() => tinymce.activeEditor.execCommand('mcePrint')}>{intl.formatMessage({ id: "app.buttons.export-pdf" })}<i className="fa fa-print ml-1" aria-hidden="true"></i></Button>
                </div>
              </Row>
            </Tab>
            <Tab eventKey="scripture" title={intl.formatMessage({ id: "app.worship.scripture" })}>
              <div className="text-left mb-5 verse" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(wData.worship?.verse as string) }}>
              </div>
            </Tab>
          </Tabs>
        </Row>
      </Container>}
    </div>
  )
}

export default Worship;