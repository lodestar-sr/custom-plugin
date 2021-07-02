import Plugin from '@ckeditor/ckeditor5-core/src/plugin';

import TableUnderlineCommand from './commands/tableunderlinecommand';
import {supportedOptions} from './utils';

export default class TableUnderlineEditing extends Plugin {
  /**
   * @inheritDoc
   */
  constructor(editor) {
    super(editor);

    editor.config.define('tableUnderline', {
      options: supportedOptions
    });
  }

  /**
   * @inheritDoc
   */
  init() {
    const editor = this.editor;
    const schema = editor.model.schema;

    // Filter out unsupported options.
    const enabledOptions = editor.config.get('tableUnderline.options');

    // Allow underlines attribute on all blocks.
    schema.extend('$block', {allowAttributes: 'tableUnderline'});

    const definition = _buildDefinition(enabledOptions);

    editor.conversion.attributeToAttribute(definition);

    editor.commands.add('singleCell', new TableUnderlineCommand(editor, {type: 'singleCell'}));
    editor.commands.add('singleRow', new TableUnderlineCommand(editor, {type: 'singleRow'}));
    editor.commands.add('doubleCell', new TableUnderlineCommand(editor, {type: 'doubleCell'}));
    editor.commands.add('doubleRow', new TableUnderlineCommand(editor, {type: 'doubleRow'}));
    editor.commands.add('singleCellRemove', new TableUnderlineCommand(editor, {type: 'singleCellRemove'}));
    editor.commands.add('singleRowRemove', new TableUnderlineCommand(editor, {type: 'singleRowRemove'}));
  }
}

// Utility function responsible for building converter definition.
// @private
function _buildDefinition(options) {
  const definition = {
    model: {
      key: 'tableUnderline',
      values: options.slice()
    },
    view: {}
  };

  for (const option of options) {
    let borderStyle = 'none';
    switch (option) {
      case 'singleCell':
        borderStyle = '2px solid';
        break;
      case 'singleRow':
        borderStyle = '2px solid';
        break;
      case 'doubleCell':
        borderStyle = '3px double';
        break;
      case 'doubleRow':
        borderStyle = '3px double';
        break;
      case 'none':
        borderStyle = 'none';
        break;
    }
    definition.view[option] = {
      key: 'style',
      value: {
        'border-bottom': borderStyle
      }
    };
  }

  return definition;
}
