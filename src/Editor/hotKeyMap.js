/*
 * Copyright 2018 WICKLETS LLC
 *
 * This file is part of Wick Editor.
 *
 * Wick Editor is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Wick Editor is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with Wick Editor.  If not, see <https://www.gnu.org/licenses/>.
 */

// Use React Hotkeys style mappings
class HotKeyInterface extends Object {
  static get DEFAULT_REPEAT_START_MS () {
    return 500;
  }

  static get DEFAULT_REPEAT_MS () {
    return 20;
  }

  // Take in wick editor
  constructor(editor) {
    super();

    this.editor = editor;

    // Timers for repeatable keys
    this.repeatKeyTimeout = null;
    this.repeatKeyInterval = null;

    // Initialize all hotkeys settings
    this.createKeyMap();
    this.createHandlers();

    // Keys that should always work.
    this.essentialKeys = ['preview-play-toggle'];
  }

  // Create mappings of actions to keys
  // SINGLE: action:'key' | OR: action:['keya','keyb'] | AND: action 'keya+keyb'

  createKeyMap = () => {
    this.keyMap = {
      'activate-brush': {
        name: "Activate Brush",
        sequences: ['b'],
      },
      'activate-cursor': {
        name: "Activate Cursor",
        sequences: ['c', 'v'],
      },
      'activate-pencil': {
        name: "Activate Pencil",
        sequences: ['p'],
      },
      'activate-eraser': {
        name: "Activate Eraser",
        sequences: ['e'],
      },
      'activate-rectangle': {
        name: "Activate Rectangle",
        sequences: ['r'],
      },
      'activate-ellipse': {
        name: "Activate Ellipse",
        sequences: ['o'],
      },
      'activate-line': {
        name: "Activate Line",
        sequences: ['l'],
      },
      'activate-text': {
        name: "Activate Text",
        sequences: ['t'],
      },
      'activate-pan': {
        name: "Activate Pan",
        sequences: ['space'],
      },
      'activate-fill': {
        name: "Activate Fill",
        sequences: ['f', 'g'],
      },
      'activate-eyedropper': {
        name: "Activate Eyedropper",
        sequences: ['d', 'i'],
      },
      'deactivate-eyedropper': {
        name: "Deactivate Eyedropper",
        sequences: [{sequence: "d", action: "keyup"}, {sequence: "i", action: "keyup"}],
      },
      'deactivate-pan': {
        name: "Deactivate Pan",
        sequences: [{sequence: "space", action: "keyup"}],
      },
      'activate-zoom': {
        name: "Deactivate Zoom",
        sequences: ['z'],
      },
      'delete': {
        name: "Delete",
        sequences: ['backspace', 'del'],
      },
      'preview-play-toggle': {
        name: "Preview Play",
        sequences: ['enter'],
      },
      'preview-play-from-start': {
        name: "Preview Play from Start",
        sequences: ['ctrl+enter','command+enter'],
      },
      'undo': {
        name: "Undo",
        sequences: ['ctrl+z','command+z'],
      },
      'redo': {
        name: "Redo",
        sequences: ['ctrl+y','command+y'],
      },
      'copy': {
        name: "Copy",
        sequences: ['ctrl+c','command+c'],
      },
      'paste': {
        name: "Paste",
        sequences: ['ctrl+v','command+v'],
      },
      'duplicate': {
        name: "Duplicate",
        sequences: ['ctrl+d','command+d'],
      },
      'cut': {
        name: "Cut",
        sequences: ['ctrl+x','command+x'],
      },
      'break-apart': {
        name: "Break Apart",
        sequences: ['ctrl+b','command+b'],
      },
      'grow-brush-size': {
        name: "Increase Brush Size",
        sequences: [']'],
      },
      'shrink-brush-size': {
        name: "Shrink Brush Size",
        sequences: ['['],
      },
      'move-playhead-forwards': {
        name: "Move Playhead Forward",
        sequences: ['.'],
        repeatable: true,
      },
      'move-playhead-backwards': {
        name: "Move Playhead Back",
        sequences: [','],
        repeatable: true,
      },
      'extend-frame': {
        name: "Extend Frame",
        sequences: ['shift+.'],
        repeatable: true,
      },
      'shrink-frame': {
        name: "Shrink Frame",
        sequences: ['shift+,'],
        repeatable: true,
      },
      'extend-and-push-other-frames': {
        name: "Extend And Push Frames",
        sequences: ['shift+]'],
        repeatable: true,
      },
      'shrink-and-pull-other-frames': {
        name: "Shrink And Pull Frames",
        sequences: ['shift+['],
        repeatable: true,
      },
      'move-frame-right': {
        name: "Move Frame Right",
        sequences: ['ctrl+shift+.', 'command+shift+.'],
        repeatable: true,
      },
      'move-frame-left': {
        name: "Move Frame Left",
        sequences: ['ctrl+shift+,', 'command+shift+,'],
        repeatable: true,
      },
      'create-tween': {
        name: "Create Tween",
        sequences: ['shift+t'],
      },
      'cut-frame': {
        name: "Cut Frame",
        sequences: ['shift+c'],
      },
      'insert-blank-frame': {
        name: "Insert Blank Frame",
        sequences: ['shift+8'],
      },
      'select-all': {
        name: "Select All",
        sequences: ['ctrl+a','command+a'],
      },
      'bring-to-front': {
        name: "Bring to Front",
        sequences: ['ctrl+shift+up','command+shift+up'],
      },
      'move-forwards': {
        name: "Move Forwards",
        sequences: ['ctrl+up','command+up'],
      },
      'send-to-back': {
        name: "Send to Back",
        sequences: ['ctrl+shift+down','command+enter'],
      },
      'move-backwards': {
        name: "Move Backwards",
        sequences: ['ctrl+down','command+down'],
      },
      'nudge-up': {
        name: "Nudge Up",
        sequences: ['up'],
        repeatable: true,
      },
      'nudge-down': {
        name: "Nudge Down",
        sequences: ['down'],
        repeatable: true,
      },
      'nudge-left': {
        name: "Nudge Left",
        sequences: ['left'],
        repeatable: true,
      },
      'nudge-right': {
        name: "Nudge Right",
        sequences: ['right'],
        repeatable: true,
      },
      'nudge-up-more': {
        name: "Nudge Up More",
        sequences: ['shift+up'],
        repeatable: true,
      },
      'nudge-down-more': {
        name: "Nudge Down More",
        sequences: ['shift+down'],
        repeatable: true,
      },
      'nudge-left-more': {
        name: "Nudge Left More",
        sequences: ['shift+left'],
        repeatable: true,
      },
      'nudge-right-more': {
        name: "Nudge Right More",
        sequences: ['shift+right'],
        repeatable: true,
      },
      'toggle-script-editor': {
        name: "Toggle Script Editor",
        sequences: ['`'],
      },
      'export-project-as-wick-file': {
        name: "Save Project",
        sequences: ['ctrl+s', 'command+s'],
      },
      'import-project-as-wick-file': {
        name: "Open Project",
        sequences: ['ctrl+o', 'command+o'],
      },
      'create-clip-from-selection': {
        name: "Create Clip from Selection",
        sequences: ['ctrl+g', 'command+g'],
      },
      'break-apart-selection': {
        name: "Break Apart Selection",
        sequences: ['ctrl+shift+g', 'command+shift+g'],
      },
    }

    // Create special sequence for repeatable hotkeys
    this.keyMap['finish-repeating'] = {
      name: 'Finish Repeating',
      sequences: [],
    }
    // Map all repeatable sequences to the custom handler that clears the repeat timers (see finishRepeating)
    for(var name in this.keyMap) {
      var key = this.keyMap[name];
      if(key.repeatable) {
        key.sequences.forEach(sequence => {
          this.keyMap['finish-repeating'].sequences.push({
            sequence: sequence,
            action: 'keyup',
          });
        });
      }
    }
  }

  createHandlers = () => {
    this.handlers = {
      'activate-brush': (() => this.editor.setActiveTool("brush")),
      'activate-cursor': (() => this.editor.setActiveTool("cursor")),
      'activate-pencil': (() => this.editor.setActiveTool("pencil")),
      'activate-eraser': (() => this.editor.setActiveTool("eraser")),
      'activate-rectangle': (() => this.editor.setActiveTool("rectangle")),
      'activate-ellipse': (() => this.editor.setActiveTool("ellipse")),
      'activate-line': (() => this.editor.setActiveTool("line")),
      'activate-text': (() => this.editor.setActiveTool("text")),
      'activate-fill': (() => this.editor.setActiveTool("fillbucket")),
      'activate-eyedropper': (() => this.editor.setActiveTool("eyedropper")),
      'deactivate-eyedropper': this.editor.activateLastTool,
      'activate-pan': (() => this.editor.setActiveTool("pan")),
      'deactivate-pan': this.editor.activateLastTool,
      'activate-zoom': (() => this.editor.setActiveTool("zoom")),
      'delete': this.editor.deleteSelectedObjects,
      'preview-play-toggle': this.editor.togglePreviewPlaying,
      'preview-play-from-start': this.editor.startPreviewPlayFromBeginning,
      'break-apart': this.editor.breakApartSelection,
      'undo': this.editor.undoAction,
      'redo': this.editor.redoAction,
      'leave-focus': this.editor.focusTimelineOfParentObject,
      'do-nothing': (() => console.log("donothing")),
      'copy': this.editor.copySelectionToClipboard,
      'paste': this.editor.pasteFromClipboard,
      'cut': this.editor.cutSelectionToClipboard,
      'duplicate': this.editor.duplicateSelection,
      'grow-brush-size': this.editor.growBrushSize,
      'shrink-brush-size': this.editor.shrinkBrushSize,
      'move-playhead-forwards': this.editor.movePlayheadForwards,
      'move-playhead-backwards': this.editor.movePlayheadBackwards,
      'extend-frame': this.editor.extendFrame,
      'shrink-frame': this.editor.shrinkFrame,
      'extend-and-push-other-frames': this.editor.extendSelectedFramesAndPushOtherFrames,
      'shrink-and-pull-other-frames': this.editor.shrinkSelectedFramesAndPullOtherFrames,
      'move-frame-right': this.editor.moveFrameRight,
      'move-frame-left': this.editor.moveFrameLeft,
      'create-tween': this.editor.createTween,
      'cut-frame': this.editor.cutFrame,
      'insert-blank-frame': this.editor.insertBlankFrame,
      'select-all': this.editor.selectAll,
      'bring-to-front': this.editor.sendSelectionToFront,
      'send-to-back': this.editor.sendSelectionToBack,
      'move-forwards': this.editor.moveSelectionForwards,
      'move-backwards': this.editor.moveSelectionBackwards,
      'nudge-up': this.editor.nudgeSelectionUp,
      'nudge-down': this.editor.nudgeSelectionDown,
      'nudge-left': this.editor.nudgeSelectionLeft,
      'nudge-right': this.editor.nudgeSelectionRight,
      'nudge-up-more': this.editor.nudgeSelectionUpMore,
      'nudge-down-more': this.editor.nudgeSelectionDownMore,
      'nudge-left-more': this.editor.nudgeSelectionLeftMore,
      'nudge-right-more': this.editor.nudgeSelectionRightMore,
      'toggle-script-editor': this.editor.toggleCodeEditor,
      'export-project-as-wick-file': this.editor.exportProjectAsWickFile,
      'import-project-as-wick-file': (() => console.log("Ctrl-O as a shortcut doesn't work yet.")),
      'create-clip-from-selection': (() => this.editor.createClipFromSelection("", false)),
      'break-apart-selection': (() => this.editor.breakApartSelection()),
      'finish-repeating': this.finishRepeating,
    }

    // Wrap each handler for some custom functionality (see wrapHotkeyFunction)
    for(let name in this.handlers) {
      let origHandler = this.handlers[name];
      this.handlers[name] = ((e) => {
        this.wrapHotkeyFunction(e, name, origHandler);
      });
    }

    // Emergency stopgap to make sure the repeat timers don't get stuck
    document.addEventListener('keyup', () => {
      this.finishRepeating();
    });
  }

  wrapHotkeyFunction = (e, name, fn) => {
    if(e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
      // If we are not on a text input area, use the hotkey's function
      e.preventDefault();
      fn();

      // Start the repeat timers if this hotkey is repeatable
      var options = this.keyMap[name];
      if(options.repeatable) {
        this.repeatKeyTimeout = setTimeout(() => {
          this.repeatKeyInterval = setInterval(() => {
            fn();
          }, options.repeatMS || HotKeyInterface.DEFAULT_REPEAT_MS);
        }, options.startMS || HotKeyInterface.DEFAULT_REPEAT_START_MS);
      }
    } else {
      // Otherwise, don't call preventDefault and the browser will do it's
      // native keyboard shortcut function (i.e. copy and stuff)
    }
  }

  finishRepeating = () => {
    clearInterval(this.repeatKeyInterval);
    clearTimeout(this.repeatKeyTimeout);
    this.repeatKeyInterval = null;
    this.repeatKeyTimeout = null;
    this.editor.projectDidChange();
  }

  getKeyMap = () => {
    return this.keyMap;
  }

  getHandlers = () => {
    return this.handlers;
  }

  getEssentialKeyMap = () => {
    return this.filterObject(this.essentialKeys, this.getKeyMap());
  }

  getEssentialKeyHandlers = () => {
    return this.filterObject(this.essentialKeys, this.getHandlers());
  }

  /**
   * Returns a filtered object that only contains provided keys
   * @param  {string[]} filters list of strings to filter.
   * @param  {object} obj     object to filter.
   * @return {object}         filtered object
   */
  filterObject(filters, obj) {
    let map = {}

    this.essentialKeys.forEach(key => {
      if (key in obj) {
        map[key] = obj[key]
      }
    });

    return map;
  }
}

export default HotKeyInterface;
