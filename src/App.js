import React, { useCallback } from 'react';

import { html } from './sample.json';

import { ProsemirrorDevTools } from '@remirror/dev';

import { BoldExtension } from 'remirror/extensions';
import { EditorComponent, Remirror, useRemirror, useCommands, useActive, useHelpers, useKeymap } from '@remirror/react';


const hooks = [
  () => {
    const { getHTML } = useHelpers();
    const handleSaveShortcut = useCallback(
      ({ state }) => {
        console.log(`Save to backend: ${JSON.stringify(getHTML(state))}`);
        return true;
      },
      [getHTML],
    );
    useKeymap('Mod-s', handleSaveShortcut);
  },
];

const Menu = () => {
  const { toggleBold, focus } = useCommands();
  const active = useActive();
  return (
    <button
      onClick={() => {
        toggleBold();
        focus();
      }}
      style={{ fontWeight: active.bold() ? 'bold' : undefined }}
      disabled={toggleBold.enabled() === false}
    >
      B
    </button>
  );
};

const App = () => {
  const { manager, state } = useRemirror({
    extensions: () => [new BoldExtension()],
    selection: 'end',
    stringHandler: 'html',
    content: html,
  });

  return (
    <div className='remirror-theme'>
      <Remirror manager={manager} initialContent={state} hooks={hooks}>
        <Menu />
        <EditorComponent />
        <ProsemirrorDevTools />
      </Remirror>
    </div>
  );
}

export default App;
