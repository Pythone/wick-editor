/**
 * Maps actions to editor core functions for use throughout the editor.
 * @extends Object
 */
class ActionMapInterface extends Object {
  constructor(editor) {
    super();
    this.editor = editor;

    this.createEditorActions = this.createEditorActions.bind(this);
    this.createActionGroups = this.createActionGroups.bind(this);
    this.createEditorActions();
    this.createActionGroups();
  }

  /**
   * Creates action objects for use around the editor.
   * Action objects must include properties {function}action and a {string}id representing a unique id. Optional properties include a {string}color, {string}icon, and {string}tooltip.
   */
  createEditorActions () {
    this.editorActions =  {
      flipHorizontal: {
        icon: 'flipHorizontal',
        tooltip: 'Flip Horizontal',
        action: (() => this.editor.flipSelectedHorizontal()),
        color: 'green',
        id: 'action-flip-horizontal',
      },
      flipVertical: {
        icon: 'flipVertical',
        tooltip: 'Flip Vertical',
        action: (() => this.editor.flipSelectedVertical()),
        color: 'green',
        id: 'action-flip-vertical',
      },
      deleteSelection: {
        icon: 'delete',
        tooltip: 'Delete Selection',
        action: (() => this.editor.deleteSelectedObjects()),
        color: 'red',
        id: 'action-delete',
      },
      duplicateSelection: {
        icon: 'duplicate',
        tooltip: 'Duplicate Selection(NYI)',
        action: () => console.error('NYI'),
        color: 'red',
        id: 'action-duplicate',
      },
      sendToBack: {
        icon: 'sendToBack',
        tooltip: 'Send to Back(NYI)',
        action: () => console.error('NYI'),
        color: 'blue',
        id: 'action-send-to-back',
      },
      sendToFront: {
        icon: 'bringToFront',
        tooltip: 'Bring to Front(NYI)',
        action: () => console.error('NYI'),
        color: 'blue',
        id: 'action-send-to-front',
      },
      moveBackward: {
        icon: 'sendBackwards',
        tooltip: 'Send Backward(NYI)',
        action: () => console.error('NYI'),
        color: 'blue',
        id: 'action-move-backward',
      },
      moveForward: {
        icon: 'bringForwards',
        tooltip: 'Send Forward(NYI)',
        action: () => console.error('NYI'),
        color: 'blue',
        id: 'action-move-forward',
      },
      createGroupFromSelection: {
        icon: 'createGroup',
        tooltip: 'Create Group from Selection(NYI)',
        action: () => console.error('NYI'),
        color: 'yellow',
        id: 'action-create-group',
      },
      createClipFromSelection: {
        icon: 'createClip',
        tooltip: 'Create Clip from Selection(NYI)',
        action: () => console.error('NYI'),
        color: 'yellow',
        id: 'action-create-clip',
      },
      createButtonFromSelection: {
        icon: 'createButton',
        tooltip: 'Create Button from Selection(NYI)',
        action: () => console.error('NYI'),
        color: 'yellow',
        id: 'action-create-button',
      },
      editScriptOfSelection: {
        icon: 'editScript',
        tooltip: 'Edit Script of Selection(NYI)',
        action: () => console.error('NYI'),
        color: 'sky',
        id: 'action-edit-script',
      },
      editClipTimeline: {
        icon: 'editTimeline',
        tooltip: 'Edit Clip Timeline(NYI)',
        action: () => console.error('NYI'),
        color: 'sky',
        id: 'action-edit-timeline',
      },
      breakApart: {
        icon: 'breakApart',
        tooltip: 'Break Apart Group(NYI)',
        action: () => console.error('NYI'),
        color: 'red',
        id: 'action-break-apart',
      },
      addTweenToSelection: {
        icon: 'addTween',
        tooltip: 'Add Tween to Frame(NYI)',
        action: () => console.error('NYI'),
        color: 'green',
        id: 'action-add-tween',
      },
      extendFrameToPlayhead: {
        icon: 'extendFrameToPlayhead',
        tooltip: 'Extend Frame to Playhead(NYI)',
        action: () => console.error('NYI'),
        color: 'green',
        id: 'action-extend-frame-to-playhead',
      }
    }
  }

  /**
   * Creates action groups for use within the editor. Action groups are collections of actions which should be displayed together.
   * Action groups must have an {function}on function, which returns true when an action group should be displayed, and an {object<EditorAction>[]}actions array, which describes all associated actions. Optional properties include {string}color, which is used to color code entire Action groups.
   */
  createActionGroups () {
    this.actionGroups = {
      common: {
        on: ( () => this.editor.getSelectionType() !== null ),
        actions: [
          this.editorActions['deleteSelection'],
          this.editorActions['duplicateSelection'],
        ],
        color: 'blue',
      },
      clip: {
        on: ( () => this.editor.getSelectionType() === 'clip' ),
        actions: [
          this.editorActions['editClipTimeline'],
          this.editorActions['editScriptOfSelection'],
        ],
        color: 'green',
      },
      frame: {
        on: ( () => this.editor.getSelectionType() === 'frame' ),
        actions: [
          this.editorActions['addTweenToSelection'],
          this.editorActions['extendFrameToPlayhead'],
          this.editorActions['editScriptOfSelection'],
        ],
        color: 'green',
      },
      group: {
        on: ( () => {
          let type = this.editor.getSelectionType();
          return type === 'clip' || type === 'button' || type === 'group';
        }),
        actions: [
          this.editorActions['breakApart'],
        ],
        color: 'red',
      },
      canvasSelectionMovement: {
        on: ( () => this.editor.getNumCanvasObjectsSelected() > 0 ),
        actions: [
          this.editorActions['moveBackward'],
          this.editorActions['sendToBack'],
          this.editorActions['moveForward'],
          this.editorActions['sendToFront'],
        ],
        color: 'sky',
      },
      canvasSelectionVisuals: {
        on: ( () => this.editor.getNumCanvasObjectsSelected() > 0 ),
        actions: [
          this.editorActions['flipHorizontal'],
          this.editorActions['flipVertical'],
        ],
        color: 'sky',
      },
      canvasSelectionGrouping: {
        on: ( () => this.editor.getNumCanvasObjectsSelected() > 1),
        actions: [
          this.editorActions['createGroupFromSelection'],
          this.editorActions['createClipFromSelection'],
          this.editorActions['createButtonFromSelection']
        ],
        color: 'sky',
      }
    }
  }
}

export default ActionMapInterface;
