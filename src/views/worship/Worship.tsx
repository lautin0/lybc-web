import React from "react";
import 'react-quill/dist/quill.snow.css'
import { useParams } from "react-router";
import domtoimage from 'dom-to-image'
import ImageModal from "components/Modals/ImageModal";
import { useDispatch } from "react-redux";
import { setImage, setLoading } from "actions";
import Ws20200223 from "./sub-worship/Ws20200223";
import Ws20200216 from "./sub-worship/Ws20200216";
import Ws20200308 from "./sub-worship/Ws20200308";
import Ws20200315 from "./sub-worship/Ws20200315";
import Ws20200322 from "./sub-worship/Ws20200322";

function Worship() {
  const dispatch = useDispatch();
  let { id } = useParams();

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

  const handleDownloadNote = () => {
    dispatch(setLoading(true))
    domtoimage.toPng(document.getElementsByClassName('ql-editor')[0], { bgcolor: '#ffffe6', quality: .15 })
      .then(async function (data: any) {
        dispatch(setImage(data))
        dispatch(setLoading(false))
      });
  }

  return (
    <div className="section">
      <ImageModal />
      {id === '20200322' && <Ws20200322 handleDownloadNote={handleDownloadNote} editorModules={editorModules}/>}
      {id === '20200315' && <Ws20200315 handleDownloadNote={handleDownloadNote} editorModules={editorModules}/>}
      {id === '20200308' && <Ws20200308 handleDownloadNote={handleDownloadNote} editorModules={editorModules}/>}
      {id === '20200223' && <Ws20200223 handleDownloadNote={handleDownloadNote} editorModules={editorModules}/>}
      {id === '20200216' && <Ws20200216 handleDownloadNote={handleDownloadNote} editorModules={editorModules}/>}
    </div>
  )
}

export default Worship;