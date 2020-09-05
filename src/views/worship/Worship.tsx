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
import Ws20200329 from "./sub-worship/Ws20200329";
import Ws20200405 from "./sub-worship/Ws20200405";
import Ws20200412 from "./sub-worship/Ws20200412";
import Ws20200419 from "./sub-worship/Ws20200419";
import Ws20200426 from "./sub-worship/Ws20200426";
import Ws20200503 from "./sub-worship/Ws20200503";
import Ws20200510 from "./sub-worship/Ws20200510";
import Ws20200517 from "./sub-worship/Ws20200517";
import Ws20200524 from "./sub-worship/Ws20200524";
import Ws20200531 from "./sub-worship/Ws20200531";
import Ws20200607 from "./sub-worship/Ws20200607";
import Ws20200614 from "./sub-worship/Ws20200614";
import Ws20200712 from "./sub-worship/Ws20200712";
import Ws20200719 from "./sub-worship/Ws20200719";
import Ws20200726 from "./sub-worship/Ws20200726";
import Ws20200802 from "./sub-worship/Ws20200802";
import Ws20200809 from "./sub-worship/Ws20200809";
import Ws20200816 from "./sub-worship/Ws20200816";
import Ws20200823 from "./sub-worship/Ws20200823";
import Ws20200830 from "./sub-worship/Ws20200830";
import Ws20200906 from "./sub-worship/Ws20200906";

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
      {id === '20200906' && <Ws20200906 handleDownloadNote={handleDownloadNote} editorModules={editorModules}/>}
      {id === '20200830' && <Ws20200830 handleDownloadNote={handleDownloadNote} editorModules={editorModules}/>}
      {id === '20200823' && <Ws20200823 handleDownloadNote={handleDownloadNote} editorModules={editorModules}/>}
      {id === '20200816' && <Ws20200816 handleDownloadNote={handleDownloadNote} editorModules={editorModules}/>}
      {id === '20200809' && <Ws20200809 handleDownloadNote={handleDownloadNote} editorModules={editorModules}/>}
      {id === '20200802' && <Ws20200802 handleDownloadNote={handleDownloadNote} editorModules={editorModules}/>}
      {id === '20200726' && <Ws20200726 handleDownloadNote={handleDownloadNote} editorModules={editorModules}/>}
      {id === '20200719' && <Ws20200719 handleDownloadNote={handleDownloadNote} editorModules={editorModules}/>}
      {id === '20200712' && <Ws20200712 handleDownloadNote={handleDownloadNote} editorModules={editorModules}/>}
      {id === '20200614' && <Ws20200614 handleDownloadNote={handleDownloadNote} editorModules={editorModules}/>}
      {id === '20200607' && <Ws20200607 handleDownloadNote={handleDownloadNote} editorModules={editorModules}/>}
      {id === '20200531' && <Ws20200531 handleDownloadNote={handleDownloadNote} editorModules={editorModules}/>}
      {id === '20200524' && <Ws20200524 handleDownloadNote={handleDownloadNote} editorModules={editorModules}/>}
      {id === '20200517' && <Ws20200517 handleDownloadNote={handleDownloadNote} editorModules={editorModules}/>}
      {id === '20200510' && <Ws20200510 handleDownloadNote={handleDownloadNote} editorModules={editorModules}/>}
      {id === '20200503' && <Ws20200503 handleDownloadNote={handleDownloadNote} editorModules={editorModules}/>}
      {id === '20200426' && <Ws20200426 handleDownloadNote={handleDownloadNote} editorModules={editorModules}/>}
      {id === '20200419' && <Ws20200419 handleDownloadNote={handleDownloadNote} editorModules={editorModules}/>}
      {id === '20200412' && <Ws20200412 handleDownloadNote={handleDownloadNote} editorModules={editorModules}/>}
      {id === '20200405' && <Ws20200405 handleDownloadNote={handleDownloadNote} editorModules={editorModules}/>}
      {id === '20200329' && <Ws20200329 handleDownloadNote={handleDownloadNote} editorModules={editorModules}/>}
      {id === '20200322' && <Ws20200322 handleDownloadNote={handleDownloadNote} editorModules={editorModules}/>}
      {id === '20200315' && <Ws20200315 handleDownloadNote={handleDownloadNote} editorModules={editorModules}/>}
      {id === '20200308' && <Ws20200308 handleDownloadNote={handleDownloadNote} editorModules={editorModules}/>}
      {id === '20200223' && <Ws20200223 handleDownloadNote={handleDownloadNote} editorModules={editorModules}/>}
      {id === '20200216' && <Ws20200216 handleDownloadNote={handleDownloadNote} editorModules={editorModules}/>}
    </div>
  )
}

export default Worship;