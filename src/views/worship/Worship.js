import React, { useState, useRef, useEffect } from "react";
// react-bootstrap components
import { Container, Row, Col, Tabs, Tab, Button } from "react-bootstrap";
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { useParams } from "react-router";
import ReactToPrint from "react-to-print";
import DOMPurify from 'dompurify'
import domtoimage from 'dom-to-image'
import ImageModal from "components/Modals/ImageModal";
import { useDispatch } from "react-redux";
import { setImage, setLoading } from "actions";

function Worship() {
  const dispatch = useDispatch();
  let { id } = useParams();
  const [key, setKey] = useState('home')
  const [data, setData] = useState(`<br /><h3>
  <b>
    講道筆記
  </b>
</h3><br/>
<h3>(馬太五:3-16)</h3>`)
  const componentRef = useRef();

  const editorModules = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
      [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
      // [{ 'size': ['small', 'large', 'huge'] }],  // custom dropdown
      [{ 'header': [1, 2, 3, 4, 5, 6] }],
      [{ 'font': [] }],
      // ['blockquote', 'code-block'],
      // [{ 'header': 1 }, { 'header': 2 }],               // custom button values
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
      // [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
      // [{ 'direction': 'rtl' }],                         // text direction
      [{ 'align': [] }],
      ['clean']                                         // remove formatting button
    ]
  };

  const handleChange = (content) => {
    setData(content);
  }

  const handleDownloadNote = () => {
    dispatch(setLoading(true))
    domtoimage.toPng(document.getElementsByClassName('ql-editor')[0], { bgcolor: '#ffffe6', quality: 0.95 })
      .then(async function (data) {
        dispatch(setImage(data))
        dispatch(setLoading(false))
      });
  }


  useEffect(() => {
    if (id === '20200223') {
      setData(`<br /><h3>
      <b>
        講道筆記
      </b>
    </h3><br/>
    <h3>(馬太五:3-16)</h3>`)
    } else if (id === '20200216') {
      setData(`<br /><h3>
      <b>
        講道筆記
      </b>
    </h3><br/>
    <h3>(歌羅西書3:12-17)</h3>`)
    }
  }, [id])

  const ComponentToPrint = React.forwardRef((props, ref) => {
    return (
      <div className="m-5" ref={ref} dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(props.content) }}>
      </div>
    )
  })

  return (
    <div className="section">
      <ImageModal />
      {id === '20200223' && <Container style={{ marginTop: -20 }}>
        <Row className="justify-content-md-center">
          <Col className="text-center" lg="8" md="12">
            <h2>2020年2月23日 主日崇拜</h2>
          </Col>
        </Row>
        <Row className="justify-content-center mt-3">
          <iframe src="https://drive.google.com/file/d/1WMqJjnvRAOGcqGEV_vIFjFkJ8QDgNFVW/preview" width="660" height="371"></iframe>
        </Row>
        <Row className="mt-5 mb-5 text-center justify-content-center ml-1 mr-1">
          <Tabs
            activeKey={key}
            onSelect={k => setKey(k)}
            className="nav-justified w-100 mb-5"
            style={{ fontSize: 20 }}
          >
            <Tab eventKey="home" title="講章">
              <Row className="mb-3">
                <ReactQuill
                  className="mb-3"
                  value={data}
                  onChange={handleChange}
                  modules={editorModules}
                  style={{ height: 500, maxWidth: '98vw' }}
                />
              </Row>
              <Row className="mt-5 justify-content-end">
                <div className="d-block d-lg-none">
                  <Button variant="primary" onClick={handleDownloadNote}>
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
                </div>
                <div className="d-none">
                  <ComponentToPrint
                    ref={el => (componentRef.current = el)}
                    content={data}
                  />
                </div>
              </Row>
            </Tab>
            <Tab eventKey="script" title="經文">
              <div className="text-left mb-5">
                <p style={{ fontSize: 24 }}><b><i>馬太福音5:3-16</i></b></p>
                <h4><b className="mr-3">5 : 3</b> 「心靈貧窮的人有福了！ 因為天國是他們的。</h4>
                <h4><b className="mr-3">5 : 4</b> 哀慟的人有福了！ 因為他們必得安慰。</h4>
                <h4><b className="mr-3">5 : 5</b> 謙和的人有福了！ 因為他們必承受土地。</h4>
                <h4><b className="mr-3">5 : 6</b> 飢渴慕義的人有福了！ 因為他們必得飽足。</h4>
                <h4><b className="mr-3">5 : 7</b> 憐憫人的人有福了！ 因為他們必蒙憐憫。</h4>
                <h4><b className="mr-3">5 : 8</b> 清心的人有福了！ 因為他們必得見　神。</h4>
                <h4><b className="mr-3">5 : 9</b> 締造和平的人有福了！ 因為他們必稱為　神的兒子。</h4>
                <h4><b className="mr-3">5 : 10</b> 為義受迫害的人有福了！ 因為天國是他們的。</h4>
                <h4><b className="mr-3">5 : 11</b> 「人若因我辱罵你們，迫害你們，捏造各樣壞話毀謗你們，你們就有福了！</h4>
                <h4><b className="mr-3">5 : 12</b> 要歡喜快樂，因為你們在天上的賞賜是很多的。在你們以前的先知，人也是這樣迫害他們。」</h4>
                <h4><b className="mr-3">5 : 13</b> 「你們是地上的鹽。鹽若失了味，怎能叫它再鹹呢？它不再有用，只好被丟在外面，任人踐踏。</h4>
                <h4><b className="mr-3">5 : 14</b> 你們是世上的光。城造在山上是不能隱藏的。</h4>
                <h4><b className="mr-3">5 : 15</b> 人點燈，不放在斗底下，而是放在燈臺上，就照亮一家的人。</h4>
                <h4><b className="mr-3">5 : 16</b> 你們的光也要這樣照在人前，叫他們看見你們的好行為，把榮耀歸給你們在天上的父。」</h4>
              </div>
            </Tab>
          </Tabs>
        </Row>
      </Container>}


      {id === '20200216' && <Container style={{ marginTop: -20 }}>
        <Row className="justify-content-md-center">
          <Col className="text-center" lg="8" md="12">
            <h2>2020年2月16日 主日崇拜</h2>
          </Col>
        </Row>
        {/* <Row className="justify-content-center mt-3">
          <iframe width="660" height="371" src="https://www.youtube-nocookie.com/embed/videoseries?list=PL9ftxiJGUaQC6s19rwlXkTZnYLeo1ZhqW" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </Row> */}
        <Row className="mt-5 mb-5 text-center justify-content-center ml-1 mr-1">
          <Tabs
            activeKey={key}
            onSelect={k => setKey(k)}
            className="nav-justified w-100 mb-5"
            style={{ fontSize: 20 }}
          >
            <Tab eventKey="home" title="講章">
              <Row>
                <ReactQuill
                  className="mb-3"
                  value={data}
                  onChange={handleChange}
                  modules={editorModules}
                  style={{ height: 500, maxWidth: '98vw' }}
                />
              </Row>
              <Row className="mt-5 justify-content-end">
                <div className="d-block d-lg-none">
                  <Button variant="primary" onClick={handleDownloadNote}>
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
                <p style={{ fontSize: 24 }}><b><i>歌羅西書3:12-17</i></b></p>
                <h4><b className="mr-3">3:12</b> 所 以 你 們 既 是 　 神 的 選 民 、 聖 潔 蒙 愛 的 人 、 就 要 存 〔 原 文 作 穿 下 同 〕 憐 憫 、 恩 慈 、 謙 虛 、 溫 柔 、 忍 耐 的 心 。</h4>
                <h4><b className="mr-3">3:13</b> 倘 若 這 人 與 那 人 有 嫌 隙 、 總 要 彼 此 包 容 、 彼 此 饒 恕 ． 主 怎 樣 饒 恕 了 你 們 、 你 們 也 要 怎 樣 饒 恕 人 。</h4>
                <h4><b className="mr-3">3:14</b> 在 這 一 切 之 外 、 要 存 著 愛 心 ． 愛 心 就 是 聯 絡 全 德 的 。</h4>
                <h4><b className="mr-3">3:15</b> 又 要 叫 基 督 的 平 安 在 你 們 心 裡 作 主 ． 你 們 也 為 此 蒙 召 、 歸 為 一 體 ． 且 要 存 感 謝 的 心 。</h4>
                <h4><b className="mr-3">3:16</b> 當 用 各 樣 的 智 慧 、 把 基 督 的 道 理 、 豐 豐 富 富 的 存 在 心 裡 、 〔 或 作 當 把 基 督 的 道 理 豐 豐 富 富 的 存 在 心 裡 以 各 樣 的 智 慧 〕 用 詩 章 、 頌 詞 、 靈 歌 、 彼 此 教 導 、 互 相 勸 戒 心 被 恩 感 歌 頌 　 神 。</h4>
                <h4><b className="mr-3">3:17</b> 無 論 作 甚 麼 、 或 說 話 、 或 行 事 、 都 要 奉 主 耶 穌 的 名 、 藉 著 他 感 謝 父 　 神 。</h4>
              </div>
            </Tab>
          </Tabs>
        </Row>
      </Container>}

    </div>
  )
}

export default Worship;