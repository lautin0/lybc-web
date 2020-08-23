import React, { useState, useRef } from "react";
// react-bootstrap components
import { Container, Row, Col, Tabs, Tab, Button } from "react-bootstrap";
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import ReactToPrint from "react-to-print";
import DOMPurify from 'dompurify'
import { ComponentToPrintProps } from "./types/types";

function Ws20200712(props: any) {

  const [key, setKey] = useState('home')
  const [data, setData] = useState('<h2><br></h2><h2><strong>講題：變苦為甘</strong></h2><p><br></p><p><strong>經文：路得記 1:1-5, 1:15-18, 4:13-17</strong></p>')
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
          <h2>2020年7月12日 主日崇拜</h2>
        </Col>
      </Row>
      <Row className="justify-content-center mt-3">
        <iframe width="660" height="371" src="https://www.youtube.com/embed/videoseries?list=PLUxHXOrQ-4zytGAJXvA-tPbiVmuBDDHR2&playsinline=1" frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
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
                <a href="https://drive.google.com/file/d/1UPKRyJF011ij5YEvEDz25Om2sB2xrFvR/view?usp=sharing" target="_blank">
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
              <p className="my-3" style={{ fontSize: 24 }}><b><i>路得記1:1-5</i></b></p>
              <h4><b className="mr-3">1 : 1</b> 當士師秉政的時候，國中遭遇饑荒。在猶大、伯利恆，有一個人帶著妻子和兩個兒子往摩押地去寄居。</h4>
              <h4><b className="mr-3">1 : 2</b> 這人名叫以利米勒，他的妻名叫拿俄米；他兩個兒子，一個名叫瑪倫，一個名叫基連，都是猶大的伯利恆的以法他人。他們到了摩押地，就住在那裡。</h4>
              <h4><b className="mr-3">1 : 3</b> 後來拿俄米的丈夫以利米勒死了，剩下婦人和他兩個兒子。</h4>
              <h4><b className="mr-3">1 : 4</b> 這兩個兒子娶了摩押女子為妻，一個名叫俄珥巴，一個名叫路得，在那裡住了約有十年。</h4>
              <h4><b className="mr-3">1 : 5</b> 瑪倫和基連二人也死了，剩下拿俄米，沒有丈夫，也沒有兒子。</h4>
              <p className="my-3" style={{ fontSize: 24 }}><b><i>-1:15-18-</i></b></p>
              <h4><b className="mr-3">1 : 15</b> 拿俄米說：看哪，你嫂子已經回他本國和他所拜的神那裡去了，你也跟著你嫂子回去吧！</h4>
              <h4><b className="mr-3">1 : 16</b> 路得說：不要催我回去不跟隨你。你往哪裡去，我也往那裡去；你在哪裡住宿，我也在那裡住宿；你的國就是我的國，你的神就是我的神。</h4>
              <h4><b className="mr-3">1 : 17</b> 你在哪裡死，我也在那裡死，也葬在那裡。除非死能使你我相離！不然，願耶和華重重地降罰與我。</h4>
              <h4><b className="mr-3">1 : 18</b> 拿俄米見路得定意要跟隨自己去，就不再勸他了。</h4>
              <p className="my-3" style={{ fontSize: 24 }}><b><i>-4:13-17-</i></b></p>
              <h4><b className="mr-3">4 : 13</b> 於是，波阿斯娶了路得為妻，與他同房。耶和華使他懷孕生了一個兒子。</h4>
              <h4><b className="mr-3">4 : 14</b> 婦人們對拿俄米說：耶和華是應當稱頌的！因為今日沒有撇下你，使你無至近的親屬。願這孩子在以色列中得名聲。</h4>
              <h4><b className="mr-3">4 : 15</b> 他必提起你的精神，奉養你的老，因為是愛慕你的那兒婦所生的。有這兒婦比有七個兒子還好！</h4>
              <h4><b className="mr-3">4 : 16</b> 拿俄米就把孩子抱在懷中，作他的養母。</h4>
              <h4><b className="mr-3">4 : 17</b> 鄰舍的婦人說：拿俄米得孩子了！就給孩子起名叫俄備得。這俄備得是耶西的父，耶西是大衛的父。</h4>
            </div>
          </Tab>
        </Tabs>
      </Row>
    </Container>
  )
}

export default Ws20200712;