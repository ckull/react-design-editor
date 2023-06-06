import React, { useRef, useEffect } from "react"
import { Canvas as LayerhubCanvas } from "@layerhub-io/react"
import Playback from "../Playback"
import useDesignEditorContext from "~/hooks/useDesignEditorContext"
import ContextMenu from "../ContextMenu"
import { useRect } from "@dnd-kit/core/dist/hooks/utilities"
import { useEditor } from "@layerhub-io/react"
const Canvas = () => {
  const { displayPlayback, setCurrentDesign, currentDesign } = useDesignEditorContext()
  const ref = useRef()

  const width = 4500;
  const height = 5400;
  const editor = useEditor()
 
  useEffect(() => {

    
  }, [])



  return (
    <div style={{ flex: 1, display: "flex", position: "relative" }}>
      {displayPlayback && <Playback />}
      <ContextMenu />
      <LayerhubCanvas
        config={{
          background: "#f1f2f6",
          controlsPosition: {
            rotation: "BOTTOM",
          },
          size: {
            width: width,
            height: height
          },
          shadow: {
            blur: 4,
            color: "#fcfcfc",
            offsetX: 0,
            offsetY: 0,
          },
        }}
      />
    </div>
  )
}

export default Canvas
