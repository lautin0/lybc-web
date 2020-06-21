import React, { useState, useRef } from "react";
// react-bootstrap components
import { Container, Row, Col, Tabs, Tab, Button } from "react-bootstrap";
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import ReactToPrint from "react-to-print";
import DOMPurify from 'dompurify'
import { ComponentToPrintProps } from "./types/types";

function Ws20200329(props: any) {

  const [key, setKey] = useState('home')
  const [data, setData] = useState('')
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
          <h2>2020年3月29日 分享主日</h2>
        </Col>
      </Row>
      <Row className="justify-content-center mt-3">
        <iframe width="660" height="371" src="https://www.youtube.com/embed/videoseries?list=PLUxHXOrQ-4zxkha65pCCH2Iynkque16B_&playsinline=1" frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
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
            <div className="mb-2">
              <div style={{ width: 'fit-content' }}>
                <a href="https://drive.google.com/file/d/1YoJ304UddUlRmDgDEHITH9sa_VZWaqjU/view?usp=sharing" target="_blank">
                  <div>
                    <i style={{ fontSize: 48, color: '#f04100' }} className="far fa-file-pdf"></i>
                  </div>
                  <div>
                    <label>程序表</label>
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
              <p style={{ fontSize: 24 }}><b><i>啟應經文 #78 互相分擔</i></b></p>
              <h4 style={{color: '#cc0000'}}><b className="mr-3">(啟)</b> 看哪、弟兄和睦同居、是何等的善、何等的美。</h4>
              <h4><b className="mr-3">(應)</b> 這好比那貴重的油、澆在亞倫的頭上、流到鬍鬚，又流到他的衣襟。</h4>
              <h4 style={{color: '#cc0000'}}><b className="mr-3">(啟)</b> 愛人不可虛假、惡要厭惡、善要親近。</h4>
              <h4><b className="mr-3">(應)</b> 愛弟兄、要彼此親熱，恭敬人、要彼此推讓。</h4>
              <h4 style={{color: '#cc0000'}}><b className="mr-3">(啟)</b> 聖徒缺乏要幫補，客要一味的款待。</h4>
              <h4><b className="mr-3">(應)</b> 與喜樂的人要同樂，與哀哭的人要同哭。</h4>
              <h4 style={{color: '#cc0000'}}><b className="mr-3">(啟)</b> 要彼此同心，不要志氣高大、倒要俯就卑微的人。不要自以為聰明。</h4>
              <h4><b className="mr-3">(應)</b> 不要以惡報惡、眾人以為美的事、要留心去作。</h4>
              <h4 style={{color: '#cc0000'}}><b className="mr-3">(啟)</b> 若是能行、總要盡力與眾人和睦。</h4>
              <h4><b className="mr-3">(應)</b> 弟兄們、若有人偶然被過犯所勝、你們屬靈的人、就當用溫柔的心、把他挽回過來，又當自己小心、恐怕也被引誘。</h4>
              <h4 style={{color: '#cc0000'}}><b className="mr-3">(啟)</b> 你們各人的重擔要互相擔當、如此、就完全了基督的律法。</h4>
              <h4><b className="mr-3">(應)</b> 人若無有、自己還以為有、就是自欺了。</h4>
              <h4 style={{color: '#cc0000'}}><b className="mr-3">(啟)</b> 各人應當察驗自己的行為、這樣、他所誇的就專在自己、不在別人了。</h4>
              <h4><b className="mr-3">(應)</b> 因為各人必擔當自己的擔子。</h4>
              <h4 style={{color: '#cc0000'}}><b className="mr-3">(啟)</b> 我們行善、不可喪志，若不灰心、到了時候、就要收成。</h4>
              <h4><b className="mr-3">(應)</b> 所以有了機會、就當向眾人行善，向信徒一家的人更當這樣。</h4>
            </div>
          </Tab>
        </Tabs>
      </Row>
    </Container>
  )
}

export default Ws20200329;