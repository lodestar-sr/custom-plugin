import Plugin from '@ckeditor/ckeditor5-core/src/plugin';

import TableUnderlineEditing from './tableunderlineediting';
import TableUnderlineUI from './tableunderlineui';

export default class TableUnderline extends Plugin {

  static get requires() {
    return [TableUnderlineEditing, TableUnderlineUI];
  }

  static get pluginName() {
    return 'TableUnderline';
  }
}