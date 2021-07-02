import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import {addListToDropdown, createDropdown} from '@ckeditor/ckeditor5-ui/src/dropdown/utils';
import Model from '@ckeditor/ckeditor5-ui/src/model';
import Collection from '@ckeditor/ckeditor5-utils/src/collection';

import settingsGear from '../theme/icons/settings-gear.svg';

export default class TableUnderlineUI extends Plugin {

  init() {
    const editor = this.editor;

    editor.ui.componentFactory.add('tableUnderline', locale => {
      const options = [
        {
          type: 'button',
          model: {
            commandName: 'singleCell',
            label: 'Cell Underline'
          }
        },
        {
          type: 'button',
          model: {
            commandName: 'singleRow',
            label: 'Row Underline'
          }
        },
        {
          type: 'button',
          model: {
            commandName: 'doubleCell',
            label: 'Cell Double Underline'
          }
        },
        {
          type: 'button',
          model: {
            commandName: 'doubleRow',
            label: 'Row Double Underline'
          }
        },
        {type: 'separator'},
        {
          type: 'button',
          model: {
            commandName: 'singleCellRemove',
            label: 'Clear Cell Underline'
          }
        },
        {
          type: 'button',
          model: {
            commandName: 'singleRowRemove',
            label: 'Clear Row Underline'
          }
        },
      ];

      return this._prepareDropdown('Table Underline', settingsGear, options, locale);
    });
  }

  _prepareDropdown(label, icon, options, locale) {
    const editor = this.editor;

    const dropdownView = createDropdown(locale);
    const commands = [];

    // Prepare dropdown list items for list dropdown.
    const itemDefinitions = new Collection();

    for (const option of options) {
      addListOption(option, editor, commands, itemDefinitions);
    }

    addListToDropdown(dropdownView, itemDefinitions);

    // Decorate dropdown's button.
    dropdownView.buttonView.set({
      label,
      icon,
      tooltip: true
    });

    // Make dropdown button disabled when all options are disabled.
    dropdownView.bind('isEnabled').toMany(commands, 'isEnabled', (...areEnabled) => {
      return areEnabled.some(isEnabled => isEnabled);
    });

    this.listenTo(dropdownView, 'execute', evt => {
      editor.execute(evt.source.commandName);
      editor.editing.view.focus();
    });

    return dropdownView;
  }

}

function addListOption(option, editor, commands, itemDefinitions) {
  const model = option.model = new Model(option.model);
  const {commandName, bindIsOn} = option.model;

  if (option.type !== 'separator') {
    const command = editor.commands.get(commandName);

    commands.push(command);

    model.set({commandName});

    model.bind('isEnabled').to(command);

    if (bindIsOn) {
      model.bind('isOn').to(command, 'value');
    }
  }

  model.set({
    withText: true
  });

  itemDefinitions.add(option);
}
