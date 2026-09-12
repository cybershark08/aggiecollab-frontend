import { useRef, useState, useEffect } from 'react';
import Editor from '@monaco-editor/react';

function App() {
  const editorRef = useRef(null);
  const wsRef = useRef(null);
  const [isConnected, setIsConnected] = useState(false);
  const isRemoteUpdate = useRef(false);

  useEffect(() => {
    // THIS IS THE ONLY WEBSOCKET DECLARATION (Using your ngrok URL)
    const ws = new WebSocket('wss://aggiecollab-backend.on')
    wsRef.current = ws;

    ws.onopen = () => setIsConnected(true);
    ws.onclose = () => setIsConnected(false);

    ws.onmessage = (event) => {
      if (editorRef.current) {
        isRemoteUpdate.current = true;
        const editor = editorRef.current;
        const model = editor.getModel();
        const pos = editor.getPosition();
        model.setValue(event.data);
        editor.setPosition(pos);
        isRemoteUpdate.current = false;
      }
    };

    return () => ws.close();
  }, []);

  const handleEditorDidMount = (editor) => {
    editorRef.current = editor;
    editor.onDidChangeModelContent(() => {
      if (!isRemoteUpdate.current && wsRef.current?.readyState === WebSocket.OPEN) {
        wsRef.current.send(editor.getModel().getValue());
      }
    });
  };

  return (
    <div style={{ height: '100vh', width: '100vw', backgroundColor: '#1e1e1e' }}>
      <div style={{ padding: '10px', color: 'white', fontFamily: 'sans-serif', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ margin: 0 }}>AggieCollab: Real-Time Editor</h2>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ height: '10px', width: '10px', backgroundColor: isConnected ? '#00ff00' : 'red', borderRadius: '50%', display: 'inline-block' }}></span>
          <span>{isConnected ? 'Live & Syncing' : 'Connecting...'}</span>
        </div>
      </div>
      <Editor
        height="90vh"
        defaultLanguage="javascript"
        defaultValue="// Start typing here. Open a second tab to see the magic!"
        theme="vs-dark"
        onMount={handleEditorDidMount}
        options={{ fontSize: 16, minimap: { enabled: false } }}
      />
    </div>
  );
}

export default App;