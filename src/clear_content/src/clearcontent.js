import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import ButtonView from "@ckeditor/ckeditor5-ui/src/button/buttonview";
import ClearContentCommand from "./commands/clearcontentcommand";

import border_1 from '../theme/icons/polish.svg';

export default class ClearContent extends Plugin {

  init() {

    const editor = this.editor;

    editor.commands.add('clearContent', new ClearContentCommand(editor));

    editor.ui.componentFactory.add('clearContent', locale => {

      const view = new ButtonView(locale);
      const command = editor.commands.get('clearContent');

      view.label = 'Polish';
      view.icon = border_1;
      view.tooltip = true;

      view.bind('isEnabled').to(command);

      // view.bind('isOn').to(command, 'value');

      view.on('execute', () => {
        editor.execute('clearContent');
      });

      return view;
    });
  }
}
