import { Editor } from '@tinymce/tinymce-react';

// TinyMCE so the global var exists
// eslint-disable-next-line no-unused-vars
import 'tinymce/tinymce';

// Theme
import 'tinymce/themes/silver';
// Toolbar icons
import 'tinymce/icons/default';
// Editor styles
import 'tinymce/skins/ui/oxide/skin.min.css';

// importing the plugin js.
import 'tinymce/plugins/print';
import 'tinymce/plugins/preview';
import 'tinymce/plugins/searchreplace';
import 'tinymce/plugins/autolink';
import 'tinymce/plugins/directionality';
import 'tinymce/plugins/visualblocks';
import 'tinymce/plugins/visualchars';
import 'tinymce/plugins/fullscreen';
import 'tinymce/plugins/image';
import 'tinymce/plugins/link';
import 'tinymce/plugins/media';
// import 'tinymce/plugins/template';
import 'tinymce/plugins/codesample';
import 'tinymce/plugins/table';
import 'tinymce/plugins/charmap';
import 'tinymce/plugins/hr';
import 'tinymce/plugins/pagebreak';
import 'tinymce/plugins/nonbreaking';
import 'tinymce/plugins/anchor';
import 'tinymce/plugins/toc';
import 'tinymce/plugins/insertdatetime';
import 'tinymce/plugins/advlist';
import 'tinymce/plugins/lists';
import 'tinymce/plugins/wordcount';
import 'tinymce/plugins/textpattern';
import 'tinymce/plugins/help';
import 'tinymce/plugins/code';
// fix emojis error
import 'tinymce/plugins/emoticons/js/emojis.min';
import 'tinymce/plugins/emoticons';

type TinyEditorComponentProps = {
  value: string | undefined
  onChange?: (...event: any[]) => void;
  disabled?: boolean
}

export default function TinyEditorComponent(props: TinyEditorComponentProps) {

  let { value, onChange, disabled } = props

  // note that skin and content_css is disabled to avoid the normal
  // loading process and is instead loaded as a string via content_style
  return (
    <Editor    
      disabled={disabled}
      value={value}      
      init={{
        skin: false,
        min_height: 500,   
        menubar: false,
        statusbar: false, 
        plugins: 'print preview searchreplace autolink directionality visualblocks visualchars fullscreen image link media codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount textpattern help code emoticons',
        toolbar: ['formatselect fontselect fontsizeselect | bold italic strikethrough forecolor backcolor | link image media pageembed | alignleft aligncenter alignright alignjustify | numlist bullist outdent indent | removeformat', 'table | hr pagebreak nonbreaking | insertdatetime charmap emoticons | visualblocks visualchars anchor toc | code searchreplace preview fullscreen | imagetools autolink directionality textpattern advlist lists help'],
        fontsize_formats: '11px 12px 14px 16px 18px 20px 24px 36px 48px',
        font_formats: 'Default=Noto Sans TC,Noto Sans SC,Roboto,Microsoft JhengHei,sans-serif; Arial=arial,helvetica,sans-serif; Courier New=courier new,courier,monospace; AkrutiKndPadmini=Akpdmi-n',
        //document_base_url: getBaseUrl(),
        relative_urls: true,
        convert_urls: false,
        remove_script_host: false,
        content_css: false,
        //content_css: getBaseUrl() + "/css/app.css",
        body_class: "mce-content-body",
        branding: false,
        image_advtab: true,
        image_caption: true,
        //language: 'zh_TW',
        table_class_list: [
          { title: 'None', value: 'none' },
          { title: 'Table', value: 'table' },
          { title: 'Table Bordered', value: 'table table-bordered' },
          { title: 'Table Borderless', value: 'table table-borderless' },
        ],
        // templates: [
        //   { title: '21:9 aspect ratio', description: "", content: '<div class="embed-responsive embed-responsive-21by9"><iframe class="embed-responsive-item video-21by9" src="https://www.youtube.com/embed/zpOULjyy-n8?rel=0"></iframe></div>' },
        //   { title: '16:9 aspect ratio', description: "", content: '<div class="embed-responsive embed-responsive-16by9"><iframe class="embed-responsive-item video-16by9" src="https://www.youtube.com/embed/zpOULjyy-n8?rel=0"></iframe></div>' },
        //   { title: '4:3 aspect ratio', description: "", content: '<div class="embed-responsive embed-responsive-4by3"><iframe class="embed-responsive-item video-4by3" src="https://www.youtube.com/embed/zpOULjyy-n8?rel=0"></iframe></div>' },
        //   { title: '1:1 aspect ratio', description: "", content: '<div class="embed-responsive embed-responsive-1by1"><iframe class="embed-responsive-item video-1by1" src="https://www.youtube.com/embed/zpOULjyy-n8?rel=0"></iframe></div>' },
        // ]
      }}
      onEditorChange={(newValue, editor) => onChange && onChange(newValue)}
    />
  );
}
