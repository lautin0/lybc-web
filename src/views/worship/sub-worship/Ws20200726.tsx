import React, { useState, useRef } from "react";
// react-bootstrap components
import { Container, Row, Col, Tabs, Tab, Button } from "react-bootstrap";
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import ReactToPrint from "react-to-print";
import DOMPurify from 'dompurify'
import { ComponentToPrintProps } from "./types/types";

function Ws20200726(props: any) {

  const [key, setKey] = useState('home')
  const [data, setData] = useState('<h1><br></h1><h1><strong>講題：流淚撒種者的歡呼 (</strong>經文：詩篇 126)</h1><p><br></p><p><strong>1.</strong><strong style="color: black;">憶述上帝意想不到的作為（v.1-3）</strong></p><p><strong style="color: black;"> 圖像：好像做夢的人（v.1）</strong></p><p><strong style="color: black;"> 重覆：耶和華行了大事（v.2, 3）</strong></p><p><strong>2.</strong><strong style="color: black;">確信上帝將要成就的作為（v.4-6）</strong></p><p><strong style="color: black;"> 圖像：好像南地湧流（v.4）</strong></p><p><strong style="color: black;"> 重覆：流淚撒種、歡呼收割（v.5, 6）</strong></p><p><br></p><h2><strong style="color: black;">憶述上帝意想不到的作為（v.1-3）</strong></h2><p><strong style="color: black;">1 當耶和華使錫安被擄的人歸回的時候，我們好像做夢的人。</strong></p><p><strong style="color: black;">2 那時，我們滿口喜笑、滿舌歡呼；</strong></p><p><strong style="color: black;"> 那時，列國中就有人說：「耶和華為他們行了大事！」</strong></p><p><strong style="color: black;">3 耶和華果然為我們行了大事，我們就歡喜。</strong></p><p><strong style="color: rgb(230, 0, 0);">•</strong><strong style="color: red;">這是怎樣的歡喜？</strong></p><p><strong style="color: rgb(230, 0, 0);">•</strong><strong style="color: red;">為何提及列國的反應？</strong></p><p><strong style="color: rgb(230, 0, 0);">•</strong><strong style="color: red;">這是怎樣的作為？</strong></p><p><br></p><p><br></p><p><br></p><h2><strong style="color: black;">確信上帝將要成就的作為（v.4-6）</strong></h2><p><strong style="color: black;">4 耶和華啊，求你使我們這些被擄的人歸回，</strong></p><p><strong style="color: black;">5 流淚撒種的，必歡呼收割！</strong></p><p><strong style="color: black;">6 那帶種流淚出去的，必歡呼地帶禾捆回來！</strong></p><p><strong style="color: rgb(230, 0, 0);">•</strong><strong style="color: red;">撒種者何解帶著淚？</strong></p><p><strong style="color: rgb(230, 0, 0);">•</strong><strong style="color: red;">被擄歸回心情如何？</strong></p><p><strong style="color: rgb(230, 0, 0);">•</strong><strong style="color: red;">這是怎樣的祈求？</strong></p><p><br></p><p><br></p><p><br></p><h2><strong style="color: black;">今天的意義</strong></h2><p><strong>1.</strong><strong style="color: black;">人的作為與上帝的作為之關係</strong></p><p><strong>2.</strong><strong style="color: black;">我們信心的基礎與確據</strong></p><p><strong>3.</strong><strong style="color: black;">面對今天光境當怎樣自處</strong></p><p><strong>4.</strong><strong style="color: black;">盼望在乎出人意外的上帝</strong></p><p><br></p>')
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
          <h2>2020年7月26日 主日崇拜</h2>
        </Col>
      </Row>
      <Row className="justify-content-center mt-3">
        <iframe width="660" height="371" src="https://www.youtube.com/embed/videoseries?list=PLUxHXOrQ-4zxwSbL0_AdTb4bnEOsQDUyp&playsinline=1" frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
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
                <a href="https://drive.google.com/file/d/1FgEhOM-HxLpkIJz5Qu07oUePIh9WGKVh/view?usp=sharing" target="_blank">
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
              <p className="my-3" style={{ fontSize: 24 }}><b><i>詩篇 126</i></b></p>
              <h4><b className="mr-3">126 : 1</b>當耶和華將那些被擄的帶回錫安的時候，我們好像做夢的人。</h4>
              <h4><b className="mr-3">126 : 2</b>我們滿口喜笑、滿舌歡呼的時候，外邦中就有人說：耶和華為他們行了大事！</h4>
              <h4><b className="mr-3">126 : 3</b>耶和華果然為我們行了大事，我們就歡喜。</h4>
              <h4><b className="mr-3">126 : 4</b>耶和華啊，求你使我們被擄的人歸回，好像南地的河水復流。</h4>
              <h4><b className="mr-3">126 : 5</b>流淚撒種的，必歡呼收割！</h4>
              <h4><b className="mr-3">126 : 6</b>那帶種流淚出去的，必要歡歡樂樂地帶禾捆回來！</h4>     
            </div>
          </Tab>
        </Tabs>
      </Row>
    </Container>
  )
}

export default Ws20200726;