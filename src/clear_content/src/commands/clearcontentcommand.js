import Command from '@ckeditor/ckeditor5-core/src/command';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/dist/sweetalert2.css';

export default class ClearContentCommand extends Command {

  refresh() {
    const model = this.editor.model;
    const doc = model.document;
    const selection = doc.selection;

    const position = selection.getFirstPosition();
    const tableCell = position.findAncestor('tableCell');

    const isInTable = !!tableCell;

    this.isEnabled = true;//isInTable;

    this.value = isInTable;
  }

  execute() {
    const editor = this.editor;
    const model = editor.model;

    model.change(writer => {

      let htmlData = editor.getData();

      Swal.fire({
        title: "Cleaning up Content",
        allowOutsideClick: false,
        allowEscapeKey: false,
        showConfirmButton: false,
        onBeforeOpen: () => {
          Swal.showLoading();
        },
      });

      let form = new FormData();
      const blob = new Blob([htmlData], { type: 'text/html' });
        let host = window.location.origin;
        if (host.includes("localhost")) {
            host = "https://alpha.accesswire.com";
        }
        let url = `${host}/users/api/clean`;
        //let url = "http://localhost:5000/clean";
      form.append('file', blob, 'filename.html');
        fetch(url, {
        method: 'POST',
        body: form
      }).then(response => {
        Swal.close();
        if (response.status === 200) {
            console.warn("cleanup completed");
            response.text().then(t => {
                if (t.length > 0) {
                    editor.setData(t);
                }
            });
        } else {
          console.warn("Error:" + response.status);
        }
      }).catch(err => {
        console.log(err);
        Swal.close();
      });
    });
  }
}
