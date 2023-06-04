import React, { useRef, useEffect } from "react"
import { Canvas as LayerhubCanvas } from "@layerhub-io/react"
import Playback from "../Playback"
import useDesignEditorContext from "~/hooks/useDesignEditorContext"
import ContextMenu from "../ContextMenu"
import { useRect } from "@dnd-kit/core/dist/hooks/utilities"

const Canvas = () => {
  const { displayPlayback } = useDesignEditorContext()
  const ref = useRef()

  useEffect(() => {
    console.log('ref: ', ref.current)
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
          // size: {
          //   width: 800,
          //   height: 800,
          // },
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
