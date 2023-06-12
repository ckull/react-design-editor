import React, { useRef, useEffect, useState } from "react"
import { Canvas as LayerhubCanvas } from "@layerhub-io/react"
import Playback from "../Playback"
import useDesignEditorContext from "~/hooks/useDesignEditorContext"
import ContextMenu from "../ContextMenu"
import { useRect } from "@dnd-kit/core/dist/hooks/utilities"
import { useEditor } from "@layerhub-io/react"
import { fabric } from "fabric"
import { RGB2CMYK } from "../../utils/filter"
const Canvas = () => {
  const { displayPlayback, setCurrentDesign, currentDesign } = useDesignEditorContext()
  const ref = useRef()
  const [filter, setFilter] = useState()
  const [isGridDraw, setIsGridDraw] = useState(false)

  const width = 4500;
  const height = 5400;
  const editor = useEditor()
  const isMounted = useRef(true)

  // const RGB2CMYKFilter = fabric.util.createClass({

  //   type: 'RGB2CMYK',
  //   webgl: false,
  //   applyTo2d: function (canvasEl: any) {
  //     console.log(canvasEl)
  //     let context = canvasEl.context
  //     console.log('context: ', context)
  //     let imageData = context.getImageData(0, 0, canvasEl.width, canvasEl.height)
  //     let data = imageData.data


  //     for (var i = 0; i < data.length; i += 4) {
  //       var R = data[i],
  //         G = data[i + 1],
  //         B = data[i + 2];

  //       var cmyk = RGB2CMYK(R, G, B, false);

  //       data[i] = cmyk.c;
  //       data[i + 3] = cmyk.m;
  //       data[i + 2] = cmyk.y;
  //       data[i + 1] = cmyk.k;
  //     }

  //     context.putImageData(imageData, 0, 0);
  //   },

  //   isNeutralState: function () {
  //     return false;
  //   },

  //   toObject: function () {
  //     return { type: this.type };
  //   }


  // });

  // fabric.Image.filters.RGB2CMYK = RGB2CMYKFilter;


  // useEffect(() => {
  //   if (editor) {

  //     const { canvas } = editor.canvas

  //     console.log('filter rgb: ', RGB2CMYKFilter)
  //     canvas.on('object:added', function (event: any) {
  //       var object = event.target;
  //       console.log('object inserted: ', object)
  //       // Check if the object is an image
  //       if (object.type === 'StaticImage') {


  //         let dataURL = object.toDataURL();

  //         fabric.Image.fromURL(dataURL, function (img) {
  //           // Add the image to the canvas
  //           const filter = new fabric.Image.filters.RGB2CMYK();

  //           img.filters.push(filter);
  //           img.applyFilters()


  //           canvas.add(img)
  //           canvas.renderAll()
  //         });




  //       }
  //     });
  //   }

  // }, [editor])

  
 
 
  useEffect(() => {
    if (editor && editor.canvas && isMounted.current) {
      // Grid properties
      const { canvas } = editor.canvas
  
      console.log('canvas: ', editor)
      const gridSize = 25;
      const gridStrokeColor = 'rgba(43, 255, 1, 0.5)';
      const gridStrokeWidth = 1;

      for (let i = 0; i < (canvas.width / gridSize); i++) {
        canvas.add(new fabric.Line([i * gridSize, 0, i * gridSize, canvas.height], { stroke: gridStrokeColor, selectable: false, strokeWidth: gridStrokeWidth }));
        canvas.add(new fabric.Line([0, i * gridSize, canvas.width, i * gridSize], { stroke: gridStrokeColor, selectable: false, strokeWidth: gridStrokeWidth }));
      }
      console.log('drawed')

      fabric.Image.fromURL('/black-shirt.jpg', (shirtImage) => {
        // Scale the shirt image to fit within the canvas
        let shirtImageScaleFactor = Math.min(
          canvas.width / shirtImage.getScaledWidth(),
          canvas.height / shirtImage.getScaledHeight()
        );
        console.log('shirt', shirtImage)
        canvas.add(shirtImage);
        shirtImage.scale(shirtImageScaleFactor);
        shirtImage.lockMovementX = true
        shirtImage.sendToBack()
        shirtImage.selectable = false;
        shirtImage.lockMovementY = true
        shirtImage.center()

  
      });

      canvas.requestRenderAll()
      // Snap objects to grid on moving
      canvas.on('object:moving', function (options) {
        options.target.set({
          left: Math.round(options.target.left / gridSize) * gridSize,
          top: Math.round(options.target.top / gridSize) * gridSize
        });
      });

     
      // setIsGridDraw(true)

      isMounted.current = false

    }
  }, [editor])

  




  return (
    <div style={{ flex: 1, display: "flex", position: "relative" }}>
      {displayPlayback && <Playback />}
      <ContextMenu />
      <LayerhubCanvas
        config={{
          background: "#f1f2f6",
          guidelines: true,
          controlsPosition: {
            rotation: "BOTTOM",
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
