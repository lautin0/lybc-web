import React, { useState, useRef } from "react";
// react-bootstrap components
import { Container, Row, Col, Tabs, Tab, Button } from "react-bootstrap";
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import ReactToPrint from "react-to-print";
import DOMPurify from 'dompurify'
import { ComponentToPrintProps } from "./types/types";

function Ws20200830(props: any) {

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
          <h2>2020年8月30日 分享主日</h2>
        </Col>
      </Row>
      <Row className="justify-content-center mt-3">
        {/* <iframe width="660" height="371" src="https://www.youtube.com/embed/videoseries?list=PLUxHXOrQ-4zzax2Wt2CZie32yiM9sfVrs&playsinline=1" frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe> */}
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
              {/* <div style={{ width: 'fit-content' }} className="mr-3">
                <a href="https://drive.google.com/file/d/1AYAovLIygCMpMBobnkpr6ytDvXL1aST1/view?usp=sharing" target="_blank" className="dl-link">
                  <div>
                    <i style={{ fontSize: 48, color: '#f04100' }} className="far fa-file-pdf"></i>
                  </div>
                  <div>
                    <label>程序表.pdf</label>
                  </div>
                </a>
              </div> */}
              <div style={{ width: 'fit-content' }}>
                <a href="https://drive.google.com/file/d/1nrhuWJmw1aKwzk67TIZkKKFUV6Fy91CC/view?usp=sharing" target="_blank" className="dl-link">
                  <div>
                    <i style={{ fontSize: 48, color: '#285595' }} className="far fa-file-word"></i>
                  </div>
                  <div>
                    <label>程序表.docx</label>
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
              <p style={{ fontSize: 24 }}><b><i>啟應經文 #32 同死同活</i></b></p>
              <h4 style={{ color: '#cc0000' }}><b className="mr-3">(啟)</b> 所以，你們若真與基督一同復活，就當求在上面的事；</h4>
              <h4><b className="mr-3">(應)</b> 那裏有基督坐在神的右邊。</h4>
              <h4 style={{ color: '#cc0000' }}><b className="mr-3">(啟)</b> 你們要思念上面的事，不要思念地上的事。</h4>
              <h4><b className="mr-3">(應)</b> 因為你們已經死了，你們的生命與基督一同藏在神裏面。</h4>
              <h4 style={{ color: '#cc0000' }}><b className="mr-3">(啟)</b> 基督是我們的生命，</h4>
              <h4><b className="mr-3">(應)</b> 他顯現的時候，你們也要與他一同顯現在榮耀裏。</h4>
              <h4 style={{ color: '#cc0000' }}><b className="mr-3">(啟)</b> 所以要約束你們的心，謹慎自守，</h4>
              <h4><b className="mr-3">(應)</b> 專心盼望耶穌基督顯現的時候所帶來給你們的恩。</h4>
              <h4 style={{ color: '#cc0000' }}><b className="mr-3">(啟)</b> 你們既作順命的兒女，</h4>
              <h4><b className="mr-3">(應)</b> 就不要效法從前蒙昧無知的時候那放縱私慾的樣子。</h4>
              <h4 style={{ color: '#cc0000' }}><b className="mr-3">(啟)</b> 那召你們的既是聖潔，你們在一切所行的事上也要聖 潔。</h4>
              <h4><b className="mr-3">(應)</b> 因為經上記著說：「你們要聖潔，因為我是聖潔的。」</h4>
              <h4 style={{ color: '#cc0000' }}><b className="mr-3">(啟)</b> 原來基督的愛激勵我們；</h4>
              <h4><b className="mr-3">(應)</b> 因我們想，一人既替眾人死，眾人就都死了；</h4>
              <h4 style={{ color: '#cc0000' }}><b className="mr-3">(啟)</b> 並且他替眾人死，是叫那些活著的人不再為自己活，</h4>
              <h4><b className="mr-3">(應)</b> 乃為替他們死而復活的主活。</h4>
              <h4 style={{ color: '#cc0000' }}><b className="mr-3">(啟)</b> 我已經與基督同釘十字架，現在活著的不再是我，</h4>
              <h4><b className="mr-3">(應)</b> 乃是基督在我裏面活著；</h4>
              <h4 style={{ color: '#cc0000' }}><b className="mr-3">(啟)</b> 並且我如今在肉身活著，是因信神的兒子而活；</h4>
              <h4><b className="mr-3">(應)</b> 他是愛我，為我捨己。</h4>
              <h4 style={{ color: '#cc0000' }}><b className="mr-3">(啟)</b> 我斷不以別的誇口，只誇我們主耶穌基督的十字架；</h4>
              <h4><b className="mr-3">(應)</b> 因這十字架，就我而論，世界已經釘在十字架上；</h4>
              <h4 style={{ color: '#cc0000' }}><b className="mr-3">(啟)</b> 就世界而論，我已經釘在十字架上。</h4>
            </div>
          </Tab>
        </Tabs>
      </Row>
    </Container>
  )
}

export default Ws20200830;