import Canvas from "./components/Canvas"
import EditorContainer from "./components/EditorContainer"

const PreviewEditor = () => {
  return (
    <EditorContainer>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", position: "relative" }}>
        <Canvas />
      </div>
    </EditorContainer>
  )
}

export default PreviewEditor
