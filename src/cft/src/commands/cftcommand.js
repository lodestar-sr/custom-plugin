import Command from '@ckeditor/ckeditor5-core/src/command';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/dist/sweetalert2.css';

export default class CFTCommand extends Command {

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
    const table = position.findAncestor('table');

    model.change(writer => {

      const htmlElement = editor.editing.view.domConverter.mapViewToDom(editor.editing.mapper.toViewElement(table));
      let htmlData = htmlElement.innerHTML;

      Swal.fire({
        title: "Converting to Financial Table",
        allowOutsideClick: false,
        allowEscapeKey: false,
        showConfirmButton: false,
        onBeforeOpen: () => {
          Swal.showLoading();
        },
      });

      let form = new FormData();
      const htmlBlob = new Blob([htmlData], {type: 'text/html'});
      form.append('file', htmlBlob, 'filename.htm');
      form.append('task', 'cft');
      fetch('https://aw-rendering-beta.isdrdev.com/api/cft', {
        method: 'POST',
        body: form,
        headers: {
          "Authorization": "Basic QWNjZXNzV2lyZVJlbmRlcjozS0lOWENnMEMwRUpwT1lVem5tZg=="
        }
      }).then(response => {
        if (response.status === 200) {
          console.warn("cft completed");
            response.text().then(responseText => {
            if (responseText.length > 0) {
              editor.model.change(writer => {
                const viewFragment = editor.data.processor.toView(responseText);
                const modelFragment = editor.data.toModel(viewFragment);
                writer.remove(table);
                editor.model.insertContent(modelFragment, table.parent.document.selection);
              });
            }
          });
        } else {
          console.warn("Error:" + response.status);
        }
        Swal.close();
      }).catch(err => {
        console.log(err);
        Swal.close();
      });
    });
  }
}
