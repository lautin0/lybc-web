import React, { useState, useRef } from "react";
// react-bootstrap components
import { Container, Row, Col, Tabs, Tab, Button } from "react-bootstrap";
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import ReactToPrint from "react-to-print";
import DOMPurify from 'dompurify'
import { ComponentToPrintProps } from "./types/types";

function Ws20200906(props: any) {

  const [key, setKey] = useState('home')
  const [data, setData] = useState('<h2><br></h2><h2><strong>講題：來到主面前</strong></h2><p><br></p><p><strong>經文：士師記 17:1-6 ; 使徒行傳 3:18-20</strong></p>')
  const componentRef: any = useRef();

  const handleChange = (content: any) => {
    setData(content);
  }

  const ComponentToPrint = React.forwardRef((props: ComponentToPrintProps, ref: any) => {
    return (
      <div className="m-5" ref={ref} dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(props.content) }}>
      </div>
    )
  })

  return (
    <Container style={{ marginTop: -20 }}>
      <Row className="justify-content-md-center">
        <Col className="text-center" lg="8" md="12">
          <h2>2020年9月6日 主日崇拜</h2>
        </Col>
      </Row>
      <Row className="justify-content-center mt-3">
        <iframe width="660" height="371" src="https://www.youtube.com/embed/videoseries?list=PLUxHXOrQ-4zzUuEEkdLy8zBWtRunZv-iS&playsinline=1" frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
      </Row>
      <Row className="mt-5 mb-5 text-center justify-content-center ml-1 mr-1">
        <Tabs
          id=""
          activeKey={key}
          onSelect={(k: any) => setKey(k)}
          className="nav-justified w-100 mb-5"
          style={{ fontSize: 20 }}
        >
          <Tab eventKey="home" title="筆記">
            <div className="mb-2 form-inline">
              <div style={{ width: 'fit-content' }} className="mr-3">
                <a href="https://drive.google.com/file/d/1TM_F04sy_dffqUTT4mny9XVs--qUOJW-/view?usp=sharing" target="_blank" className="dl-link">
                  <div>
                    <i style={{ fontSize: 48, color: '#f04100' }} className="far fa-file-pdf"></i>
                  </div>
                  <div>
                    <label>程序表.pdf</label>
                  </div>
                </a>
              </div>
              {/* <div style={{ width: 'fit-content' }}>
                <a href="https://drive.google.com/file/d/1TM_F04sy_dffqUTT4mny9XVs--qUOJW-/view?usp=sharing" target="_blank" className="dl-link">
                  <div>
                    <i style={{ fontSize: 48, color: '#285595' }} className="far fa-file-word"></i>
                  </div>
                  <div>
                    <label>程序表.docx</label>
                  </div>
                </a>
              </div> */}
            </div>
            <Row>
              <ReactQuill
                className="mb-3"
                value={data}
                onChange={handleChange}
                modules={props.editorModules}
                style={{
                  minHeight: 500,
                  maxWidth: '98vw'
                }}
              />
            </Row>
            <Row className="mt-5 justify-content-end">
              <div className="d-block d-lg-none">
                <Button style={{ transform: 'translate(0px, 25px)' }} variant="primary" onClick={props.handleDownloadNote}>
                  文字轉圖<i className="ml-1 fas fa-exchange-alt"></i>
                </Button>
              </div>
              <div className="d-none d-lg-block">
                <ReactToPrint
                  trigger={() =>
                    <Button variant="primary">另存PDF<i className="fa fa-print ml-1" aria-hidden="true"></i>
                    </Button>}
                  content={() => componentRef.current}
                />
                <div className="d-none">
                  <ComponentToPrint
                    ref={el => (componentRef.current = el)}
                    content={data}
                  />
                </div>
              </div>
            </Row>
          </Tab>
          <Tab eventKey="script" title="經文">
            <div className="text-left mb-5">
              <p className="my-3" style={{ fontSize: 24 }}><b><i>士師記 17:1-6</i></b></p>
              <h4><b className="mr-3">17 : 1</b> 以法蓮山地有一個人名叫米迦。</h4>
              <h4><b className="mr-3">17 : 2</b> 他對母親說：「你那一千一百舍客勒銀子被人拿去，你因此咒詛，並且告訴了我。看哪，這銀子在我這裏，是我拿去了。」他母親說：「我兒啊，願耶和華賜福與你！」</h4>
              <h4><b className="mr-3">17 : 3</b> 米迦就把這一千一百舍客勒銀子還他母親。他母親說：「我分出這銀子來為你獻給耶和華，好雕刻一個像，鑄成一個像。現在我還是交給你。」</h4>
              <h4><b className="mr-3">17 : 4</b> 米迦將銀子還他母親，他母親將二百舍客勒銀子交給銀匠，雕刻一個像，鑄成一個像，安置在米迦的屋內。</h4>
              <h4><b className="mr-3">17 : 5</b> 這米迦有了神堂，又製造以弗得和家中的神像，分派他一個兒子作祭司。</h4>
              <h4><b className="mr-3">17 : 6</b> 那時以色列中沒有王，各人任意而行。</h4>
            </div>
          </Tab>
        </Tabs>
      </Row>
    </Container>
  )
}

export default Ws20200906;