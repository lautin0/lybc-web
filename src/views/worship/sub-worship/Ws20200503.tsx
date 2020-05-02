import React, { useState, useRef } from "react";
// react-bootstrap components
import { Container, Row, Col, Tabs, Tab, Button } from "react-bootstrap";
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import ReactToPrint from "react-to-print";
import DOMPurify from 'dompurify'
import { ComponentToPrintProps } from "./types/types";

function Ws20200503(props: any) {

  const [key, setKey] = useState('home')
  const [data, setData] = useState('<h2><br></h2><h2><strong>講題：不要憂慮</strong></h2><br/><p>(馬太福音6:24-34)</p>')
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
          <h2>2020年5月3日 聖餐主日崇拜</h2>
        </Col>
      </Row>
      <Row className="justify-content-center mt-3">
        <iframe width="660" height="371" src="https://www.youtube.com/embed/videoseries?list=PLUxHXOrQ-4zxTjnD-IybJEqSufoTsVneq&playsinline=1" frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
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
                <a href={require('assets/pdf/20200503rundown.pdf')} target="_blank">
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
              <p style={{ fontSize: 24 }}><b><i>馬太福音6:24-34</i></b></p>
              <h4><b className="mr-3">6 : 24</b>一個人不能事奉兩個主；不是惡這個，愛那個，就是重這個，輕那個。你們不能又事奉神，又事奉瑪門（瑪門：財利的意思）。</h4>
              <h4><b className="mr-3">6 : 25</b>所以我告訴你們，不要為生命憂慮吃什麼，喝什麼；為身體憂慮穿什麼。生命不勝於飲食嗎？身體不勝於衣裳嗎？</h4>
              <h4><b className="mr-3">6 : 26</b>你們看那天上的飛鳥，也不種，也不收，也不積蓄在倉裡，你們的天父尚且養活他。你們不比飛鳥貴重得多嗎？</h4>
              <h4><b className="mr-3">6 : 27</b>你們哪一個能用思慮使壽數多加一刻呢（或作：使身量多加一肘呢）？</h4>
              <h4><b className="mr-3">6 : 28</b>何必為衣裳憂慮呢？你想野地裡的百合花怎麼長起來；他也不勞苦，也不紡線。</h4>
              <h4><b className="mr-3">6 : 29</b>然而我告訴你們，就是所羅門極榮華的時候，他所穿戴的，還不如這花一朵呢！</h4>
              <h4><b className="mr-3">6 : 30</b>你們這小信的人哪！野地裡的草今天還在，明天就丟在爐裡，神還給他這樣的妝飾，何況你們呢！</h4>
              <h4><b className="mr-3">6 : 31</b>所以，不要憂慮說：吃什麼？喝什麼？穿什麼？</h4>
              <h4><b className="mr-3">6 : 32</b>這都是外邦人所求的，你們需用的這一切東西，你們的天父是知道的。</h4>
              <h4><b className="mr-3">6 : 33</b>你們要先求他的國和他的義，這些東西都要加給你們了。</h4>
              <h4><b className="mr-3">6 : 34</b>所以，不要為明天憂慮，因為明天自有明天的憂慮；一天的難處一天當就夠了。</h4>
            </div>
          </Tab>
        </Tabs>
      </Row>
    </Container>
  )
}

export default Ws20200503;