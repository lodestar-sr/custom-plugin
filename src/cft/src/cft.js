import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import ButtonView from "@ckeditor/ckeditor5-ui/src/button/buttonview";

import icon from '../theme/icons/enhance.svg';
import CFTCommand from "./commands/cftcommand";

export default class CFT extends Plugin {

  init() {

    const editor = this.editor;

    editor.commands.add('cft', new CFTCommand(editor));

    editor.ui.componentFactory.add('cft', locale => {

      const view = new ButtonView(locale);
      const command = editor.commands.get('cft');

      view.label = 'Enhance';
      view.icon = icon;
      view.tooltip = true;

      view.bind('isEnabled').to(command);

      // view.bind('isOn').to(command, 'value');

      view.on('execute', () => {
        editor.execute('cft');
      });

      return view;
    });
  }
}
