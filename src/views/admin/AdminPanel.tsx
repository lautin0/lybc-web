import React, { useState, useEffect } from 'react'
import { Form, Col } from 'react-bootstrap';
import ReactQuill from 'react-quill';

function AdminPanel() {

  const [form, setForm] = useState<any>();
  const [data, setData] = useState('');
  const [jsonData, setJsonData] = useState('');

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

  const handleChange = (content: any) => {
    setData(content);
  }

  const handleInputChange = (e: any) => setForm({
    ...form,
    [e.currentTarget.name]: e.currentTarget.value
  })

  useEffect(() => {
    setJsonData(JSON.stringify(form))
  }, [form])

  return (
    <>
      <div>
        <nav className="navbar fixed-top navbar-light justify-content-between top-bar" style={{ borderBottom: '.01rem lightgray solid', zIndex: 1040 }}>
          <a className="navbar-brand" style={{ color: 'gray', fontWeight: 'bold', fontSize: 24 }}>管理控制台</a>
          <div className="form-inline">
            <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
            <button className="btn btn-primary my-2 my-sm-0" type="submit">Search</button>
          </div>
        </nav>
        <main>
          <nav className="navbar fixed-top navbar-light d-flex flex-column left-panel">
            <ul className="navbar-nav mt-3">
              <li className="nav-item">
                <a className="nav-link active" href="#"><i className="fa fa-home mr-2"></i>Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#"><i className="fa fa-book mr-2"></i>Tutorials</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#"><i className="fa fa-user mr-2"></i>Articles</a>
              </li>
            </ul>
          </nav>
          <div className="right-panel">
            <div style={{ margin: '0px 48px 24px' }}>
              <header className="banner">
                <p className="category" style={{ color: 'white' }}>Welcome to admin panel!</p>
                <div className="form-inline row mb-3" style={{ marginTop: 40 }}>
                  <div className="m-3" style={{ width: 200, height: 150, background: 'lightgray' }}></div>
                  <div className="m-3" style={{ width: 200, height: 150, background: 'lightgray' }}></div>
                </div>
              </header>
              <div className="content-panel">
                <p className="category" style={{ color: 'black' }}>崇拜管理</p>
                <Form.Row>
                  <Form.Group as={Col}>
                    <Form.Label>元數據</Form.Label>
                    <Form.Control
                      value={jsonData}
                      as="textarea"
                      rows="6"
                      className="admin"
                      readOnly
                    ></Form.Control>
                  </Form.Group>
                </Form.Row>
                <Form.Row>
                  <Form.Group as={Col}>
                    <Form.Label>標題</Form.Label>
                    <Form.Control className="form-control admin" placeholder="請輸入標題"></Form.Control>
                  </Form.Group>
                  <Form.Group as={Col}>
                    <Form.Label>日期</Form.Label>
                    <Form.Control
                      className="form-control admin"
                      placeholder="YYYYMMDD"
                      onChange={handleInputChange}
                      value={form?.id}
                      name="id"
                    ></Form.Control>
                  </Form.Group>
                </Form.Row>
                <Form.Row>
                  <Form.Group as={Col} md={6}>
                    <Form.Label>分類</Form.Label>
                    <Form.Control
                      as="select"
                      className="form-control admin"
                      placeholder="Please select"
                      defaultValue=""
                      onChange={handleInputChange}
                      value={form?.type}
                      name="type"
                    >
                      <option disabled value="">請選擇</option>
                      <option value="主日崇拜">主日崇拜</option>
                      <option value="分享主日">分享主日</option>
                    </Form.Control>
                  </Form.Group>
                </Form.Row>
                <Form.Row>
                  <Form.Group as={Col}>
                    <Form.Label>影片連結</Form.Label>
                    <Form.Control
                      className="form-control admin"
                      placeholder="e.g. https://www.abc.com/"
                      onChange={handleInputChange}
                      value={form?.link}
                      name="link"
                    ></Form.Control>
                  </Form.Group>
                </Form.Row>
                <Form.Row>
                  <Form.Group as={Col} md={6}>
                    <Form.Label>檔案1連結</Form.Label>
                    <Form.Control
                      className="form-control admin"
                      placeholder="e.g. https://www.abc.com/"
                      onChange={handleInputChange}
                      value={form?.docs?.[0]?.link}
                      name="docs[0].link"
                    ></Form.Control>
                  </Form.Group>
                  <Form.Group as={Col} md={3}>
                    <Form.Label>名稱</Form.Label>
                    <Form.Control className="form-control admin"></Form.Control>
                  </Form.Group>
                  <Form.Group as={Col} md={3}>
                    <Form.Label>符號</Form.Label>
                    <Form.Control className="form-control admin" placeholder="e.g.: fa fa-user"></Form.Control>
                  </Form.Group>
                </Form.Row>
                <Form.Row>
                  <Form.Group as={Col} md={6}>
                    <Form.Label>檔案2連結</Form.Label>
                    <Form.Control className="form-control admin" placeholder="e.g. https://www.abc.com/"></Form.Control>
                  </Form.Group>
                  <Form.Group as={Col} md={3}>
                    <Form.Label>名稱</Form.Label>
                    <Form.Control className="form-control admin"></Form.Control>
                  </Form.Group>
                  <Form.Group as={Col} md={3}>
                    <Form.Label>符號</Form.Label>
                    <Form.Control className="form-control admin" placeholder="e.g.: fa fa-user"></Form.Control>
                  </Form.Group>
                </Form.Row>
                <Form.Row className="mb-5">
                  <Form.Label>筆記內容</Form.Label>
                  <ReactQuill
                    className="mb-3"
                    value={data}
                    onChange={handleChange}
                    modules={editorModules}
                    style={{
                      width: '100%',
                      minHeight: 500,
                      // maxWidth: '98vw'
                    }}
                  />
                </Form.Row>
                <Form.Row>
                  <Form.Group as={Col}>
                    <Form.Check
                      id="cb1"
                      type="checkbox"
                      label={<><span className="form-check-sign"></span>Checkbox Example</>}
                    ></Form.Check>
                  </Form.Group>
                </Form.Row>
                <Form.Row>
                  <Form.Group as={Col}>
                    <Form.Row>
                      <Form.Check
                        className="form-check-radio mx-2"
                        id="rb1"
                        name="rb"
                        type="radio"
                        label={<><span className="form-check-sign"></span>Radio Example 1</>}
                      ></Form.Check>
                      <Form.Check
                        className="form-check-radio mx-2"
                        id="rb2"
                        name="rb"
                        type="radio"
                        label={<><span className="form-check-sign"></span>Radio Example 2</>}
                      ></Form.Check>
                    </Form.Row>
                  </Form.Group>
                </Form.Row>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  )
}

export default AdminPanel;