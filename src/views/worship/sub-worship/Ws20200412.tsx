import React, { useState, useRef } from "react";
// react-bootstrap components
import { Container, Row, Col, Tabs, Tab, Button } from "react-bootstrap";
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import ReactToPrint from "react-to-print";
import DOMPurify from 'dompurify'
import { ComponentToPrintProps } from "./types/types";

function Ws20200412(props: any) {

  const [key, setKey] = useState('home')
  const [data, setData] = useState('<h2><br></h2><h2><strong>講題：復活的大能(弗1:15-23)</strong></h2><p><br></p><p><br></p><h3><strong>(一)無能的世界 林前15:55-56</strong></h3><p><br></p><p><br></p><p><br></p><p><br></p><p><br></p><h3><strong>(二)復活的大能 弗1:19,20; 羅1:4</strong></h3><p><br></p><p><br></p><p><br></p><p><br></p><p><br></p><h3><strong>(三)真知道祂 弗1:17-19</strong></h3><p><br></p><p><br></p><p><br></p><p><br></p><p><br></p><br><br>')
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
          <h2>2020年4月12日 主日崇拜</h2>
        </Col>
      </Row>
      <Row className="justify-content-center mt-3">
        <iframe width="660" height="371" src="https://www.youtube.com/embed/videoseries?list=PLUxHXOrQ-4zzDkH1q2SZz17HX6yHOOGla&playsinline=1" frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
      </Row>
      <Row className="mt-5 mb-5 text-center justify-content-center ml-1 mr-1">
        <Tabs
          id=""
          activeKey={key}
          onSelect={(k: any) => setKey(k)}
          className="nav-justified w-100 mb-5"
          style={{ fontSize: 20 }}
        >
          <Tab eventKey="home" title="講章">
            <div className="mb-2">
              <div style={{ width: 'fit-content' }}>
                <a href="https://drive.google.com/file/d/1_SQKkRCPEGMKo-FN4yTG3VhOVZH6nj7q/view?usp=sharing" target="_blank">
                  <div>
                    <i style={{ fontSize: 48, color: '#f04100' }} className="far fa-file-pdf"></i>
                  </div>
                  <div>
                    <label>程序表.pdf</label>
                  </div>
                </a>
              </div>
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
              <p style={{ fontSize: 24 }}><b><i>以弗所書1:15-23</i></b></p>
              <h4><b className="mr-3">1 : 15</b> 因此，我既聽見你們信從主耶穌，親愛眾聖徒，</h4>
              <h4><b className="mr-3">1 : 16</b> 就為你們不住的感謝神。禱告的時候，常提到你們，</h4>
              <h4><b className="mr-3">1 : 17</b> 求我們主耶穌基督的神，榮耀的父，將那賜人智慧和啟示的靈賞給你們，使你們真知道他，</h4>
              <h4><b className="mr-3">1 : 18</b> 並且照明你們心中的眼睛，使你們知道他的恩召有何等指望，他在聖徒中得的基業有何等豐盛的榮耀；</h4>
              <h4><b className="mr-3">1 : 19</b> 並知道他向我們這信的人所顯的能力是何等浩大，</h4>
              <h4><b className="mr-3">1 : 20</b> 就是照他在基督身上所運行的大能大力，使他從死裡復活，叫他在天上坐在自己的右邊，</h4>
              <h4><b className="mr-3">1 : 21</b> 遠超過一切執政的、掌權的、有能的、主治的，和一切有名的；不但是今世的，連來世的也都超過了。</h4>
              <h4><b className="mr-3">1 : 22</b> 又將萬有服在他的腳下，使他為教會作萬有之首。</h4>
              <h4><b className="mr-3">1 : 23</b> 教會是他的身體，是那充滿萬有者所充滿的。</h4>
            </div>
          </Tab>
        </Tabs>
      </Row>
    </Container>
  )
}

export default Ws20200412;