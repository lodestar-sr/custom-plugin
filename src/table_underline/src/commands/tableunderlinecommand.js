import Command from '@ckeditor/ckeditor5-core/src/command';

const TABLEUNDERLINE = 'tableUnderline';

export default class TableUnderlineCommand extends Command {

  constructor(editor, options = {}) {
    super(editor);
    this.type = options.type || '';
  }

  refresh() {
    const model = this.editor.model;
    const doc = model.document;
    const selection = doc.selection;

    const position = selection.getFirstPosition();
    const tableCell = position.findAncestor('tableCell');

    const isInTable = !!tableCell;

    this.isEnabled = isInTable;

    this.value = isInTable;
  }

  execute() {
    const editor = this.editor;
    const model = editor.model;
    const doc = model.document;
    const selection = doc.selection;

    // Get only those blocks from selected that can have underlines set
    const position = selection.getFirstPosition();
    const tableCell = position.findAncestor('tableCell');
    const tableRow = position.findAncestor('tableRow');

    model.change(writer => {
      if (this.type == 'singleCellRemove') {
        removeUnderline([tableCell], writer);
      } else if (this.type == 'singleRowRemove') {
        removeUnderline(tableRow._children._nodes, writer);
      } else if (this.type == 'singleRow' || this.type == 'doubleRow') {
        setUnderline(tableRow._children._nodes, writer, this.type);
      } else if (this.type == 'singleCell' || this.type == 'doubleCell') {
        setUnderline([tableCell], writer, this.type);
      }
    });
  }
}

function removeUnderline(blocks, writer) {
  for (const block of blocks) {
    writer.setAttribute(TABLEUNDERLINE, 'none', block);
  }
}

function setUnderline(blocks, writer, tableUnderline) {
  for (const block of blocks) {
    writer.setAttribute(TABLEUNDERLINE, tableUnderline, block);
  }
}
