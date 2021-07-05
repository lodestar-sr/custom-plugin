/**
 * @license Copyright (c) 2014-2020, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
import ClassicEditor from '@ckeditor/ckeditor5-editor-classic/src/classiceditor.js';
import Alignment from '@ckeditor/ckeditor5-alignment/src/alignment.js';
import Autoformat from '@ckeditor/ckeditor5-autoformat/src/autoformat.js';
import Autolink from '@ckeditor/ckeditor5-link/src/autolink.js';
import BlockQuote from '@ckeditor/ckeditor5-block-quote/src/blockquote.js';
import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold.js';
import CKFinderUploadAdapter from '@ckeditor/ckeditor5-adapter-ckfinder/src/uploadadapter.js';
import Code from '@ckeditor/ckeditor5-basic-styles/src/code.js';
import CodeBlock from '@ckeditor/ckeditor5-code-block/src/codeblock.js';
import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials.js';
import FontBackgroundColor from '@ckeditor/ckeditor5-font/src/fontbackgroundcolor.js';
import FontColor from '@ckeditor/ckeditor5-font/src/fontcolor.js';
import FontFamily from '@ckeditor/ckeditor5-font/src/fontfamily.js';
import FontSize from '@ckeditor/ckeditor5-font/src/fontsize.js';
import Heading from '@ckeditor/ckeditor5-heading/src/heading.js';
import Highlight from '@ckeditor/ckeditor5-highlight/src/highlight.js';
import HorizontalLine from '@ckeditor/ckeditor5-horizontal-line/src/horizontalline.js';
import Image from '@ckeditor/ckeditor5-image/src/image.js';
import ImageCaption from '@ckeditor/ckeditor5-image/src/imagecaption.js';
import ImageInsert from '@ckeditor/ckeditor5-image/src/imageinsert.js';
import ImageResize from '@ckeditor/ckeditor5-image/src/imageresize.js';
import ImageStyle from '@ckeditor/ckeditor5-image/src/imagestyle.js';
import ImageToolbar from '@ckeditor/ckeditor5-image/src/imagetoolbar.js';
import ImageUpload from '@ckeditor/ckeditor5-image/src/imageupload.js';
import Indent from '@ckeditor/ckeditor5-indent/src/indent.js';
import IndentBlock from '@ckeditor/ckeditor5-indent/src/indentblock.js';
import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic.js';
import Link from '@ckeditor/ckeditor5-link/src/link.js';
import LinkImage from '@ckeditor/ckeditor5-link/src/linkimage.js';
import List from '@ckeditor/ckeditor5-list/src/list.js';
import ListStyle from '@ckeditor/ckeditor5-list/src/liststyle.js';
import MediaEmbed from '@ckeditor/ckeditor5-media-embed/src/mediaembed.js';
import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph.js';
import PasteFromOffice from '@ckeditor/ckeditor5-paste-from-office/src/pastefromoffice';
import RemoveFormat from '@ckeditor/ckeditor5-remove-format/src/removeformat.js';
import SpecialCharacters from '@ckeditor/ckeditor5-special-characters/src/specialcharacters.js';
import Table from '@ckeditor/ckeditor5-table/src/table.js';
import TableCellProperties from '@ckeditor/ckeditor5-table/src/tablecellproperties';
import TableProperties from '@ckeditor/ckeditor5-table/src/tableproperties';
import TableToolbar from '@ckeditor/ckeditor5-table/src/tabletoolbar.js';
import TextTransformation from '@ckeditor/ckeditor5-typing/src/texttransformation.js';
import Underline from '@ckeditor/ckeditor5-basic-styles/src/underline.js';
import WordCount from '@ckeditor/ckeditor5-word-count/src/wordcount.js';
import ClearContent from "./clear_content/src/clearcontent";
import TableUnderline from "./table_underline/src/tableunderline";
import Subscript from "@ckeditor/ckeditor5-basic-styles/src/subscript";
import Superscript from "@ckeditor/ckeditor5-basic-styles/src/superscript";
import CKFinder from "@ckeditor/ckeditor5-ckfinder/src/ckfinder";
import EditorWatchdog from '@ckeditor/ckeditor5-watchdog/src/editorwatchdog';
import RealTimeCollaborativeEditing from '@ckeditor/ckeditor5-real-time-collaboration/src/realtimecollaborativeediting';
import RealTimeCollaborativeComments from '@ckeditor/ckeditor5-real-time-collaboration/src/realtimecollaborativecomments';
import RealTimeCollaborativeTrackChanges from '@ckeditor/ckeditor5-real-time-collaboration/src/realtimecollaborativetrackchanges';
import PresenceList from '@ckeditor/ckeditor5-real-time-collaboration/src/presencelist';
import CFT from "./cft/src/cft";
import ConvertDivTag from "./convert_div_tag/cdt";
import FullScreen from "./fullscreen/FullScreen";
import InsertImage from "./insert_image/InsertImage";
import EnableCustomDataProcessor from "./enable_custom_data_processor/enable_custom_data_processor";

export default class Editor extends ClassicEditor {}



// Plugins to include in the build.
Editor.builtinPlugins = [
  Alignment,
  Autoformat,
  Autolink,
  BlockQuote,
  Bold,
  CKFinder,
  CKFinderUploadAdapter,
  Code,
  CodeBlock,
  ClearContent,
  CFT,
  ConvertDivTag,
  EnableCustomDataProcessor,
  Essentials,
  FontColor,
  FontSize,
  FullScreen,
  Heading,
  Highlight,
  HorizontalLine,
  Image,
  ImageCaption,
  ImageInsert,
  ImageResize,
  ImageStyle,
  ImageToolbar,
  ImageUpload,
  Indent,
  IndentBlock,
  Italic,
  Link,
  LinkImage,
  List,
  ListStyle,
  MediaEmbed,
  Paragraph,
  PasteFromOffice,
  RemoveFormat,
  SpecialCharacters,
  SpecialCharactersCustomized,
  Subscript,
  Superscript,
  Table,
  TableCellProperties,
  TableProperties,
  TableToolbar,
  TableUnderline,
  TextTransformation,
  Underline,
  WordCount,
  RealTimeCollaborativeEditing,
  RealTimeCollaborativeComments,
  RealTimeCollaborativeTrackChanges,
  PresenceList,
  FontFamily,
  FontBackgroundColor,
  EditorWatchdog,
  InsertImage
];

function SpecialCharactersCustomized(editor) {
  editor.plugins.get('SpecialCharacters').addItems('Text', [
    {title: 'Euro', character: '€'},
    {title: 'Cent', character: '¢'},
    {title: 'Pound', character: '£'},
    {title: '&sect', character: '§'},
    {title: 'Copyright', character: '©'},
    {title: 'reg', character: '®'},
    {title: 'frac14', character: '¼'},
    {title: 'frac12', character: '½'},
    {title: 'frac34', character: '¾'},
    {title: 'Agrave', character: 'À'},
    {title: 'Aacute', character: 'Á'},
    {title: 'Acirc', character: 'Â'},
    {title: 'Atilde', character: 'Ã'},
    {title: 'Auml', character: 'Ä'},
    {title: 'Aring', character: 'Å'},
    {title: 'Egrave', character: 'È'},
    {title: 'Eacute', character: 'É'},
    {title: 'Ecirc', character: 'Ê'},
    {title: 'Euml', character: 'Ë'},
    {title: 'Igrave', character: 'Ì'},
    {title: 'Iacute', character: 'Í'},
    {title: 'Icirc', character: 'Î'},
    {title: 'Iuml', character: 'Ï'},
    {title: 'Ograve', character: 'Ò'},
    {title: 'Oacute', character: 'Ó'},
    {title: 'Ocirc', character: 'Ô'},
    {title: 'Otilde', character: 'Õ'},
    {title: 'Ouml', character: 'Ö'},
    {title: 'THORN', character: 'Þ'},
    {title: 'szlig', character: 'ß'},
    {title: 'agrave', character: 'à'},
    {title: 'aacute', character: 'á'},
    {title: 'acirc', character: 'â'},
    {title: 'atilde', character: 'ã'},
    {title: 'auml', character: 'ä'},
    {title: 'aring', character: 'å'},
    {title: 'ccedil', character: 'ç'},
    {title: 'egrave', character: 'è'},
    {title: 'euml', character: 'ë'},
    {title: 'igrave', character: 'ì'},
    {title: 'iacute', character: 'í'},
    {title: 'icirc', character: 'Î'},
    {title: 'iuml', character: 'Ï'},
    {title: 'ograve', character: 'Ò'},
    {title: 'oacute', character: 'Ó'},
    {title: 'ocirc', character: 'Ô'},
    {title: 'otilde', character: 'Õ'},
    {title: 'ouml', character: 'Ö'},
    {title: 'trade', character: '™'},
  ]);
}
