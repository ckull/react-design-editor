import Navbar from "./components/Navbar"
import Panels from "./components/Panels"
import Canvas from "./components/Canvas"
import Footer from "./components/Footer"
import Toolbox from "./components/Toolbox"
import { useEffect } from "react"
import EditorContainer from "./components/EditorContainer"
import ContextMenu from "./components/ContextMenu"
import { useEditor } from "@layerhub-io/react"
import useDesignEditorContext from "~/hooks/useDesignEditorContext"
const GraphicEditor = () => {
  const editor = useEditor()


  return (
    <EditorContainer>
      <Navbar />
      <div style={{ display: "flex", flex: 1 }}>
        <Panels />
        <div style={{ flex: 1, display: "flex", flexDirection: "column", position: "relative" }}>
          <Toolbox />
          <Canvas />
          <Footer />
        </div>
      </div>
    </EditorContainer>
  )
}

export default GraphicEditor
