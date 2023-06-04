import { useEffect, useRef, useContext } from 'react'
// import { useCanvasContext } from '@components/Canvas/hooks'
import { fabric } from 'fabric'
import { DesignEditorContext } from '~/contexts/DesignEditor'
import PreviewEditor from '../../PreviewEditor'
import DesignEditor from '../../DesignEditor'
import { useEditor } from '@layerhub-io/react'
import useElementSize from '~/hooks/useElementSize'

interface CanvasCustomProps {
  width: number,
  height: number
}
const CanvasCustom: React.FC<CanvasCustomProps> = ({ width, height }) => {
  //   const containerRef = useContainerHandler()
  //   const { setCanvas } = useCanvasContext()
  const canvasRef: any = useRef()
  const workAreaRef: any = useRef()
  const maskRef: any = useRef()
  const { currentPreview } = useContext(DesignEditorContext)
  const editor = useEditor()
  useEffect(() => {
    // const initialHeigh = containerRef.current.clientHeight 
    // const initialWidth = containerRef.current.clientWidth 
    console.log('width: ', width, 'height: ', height)
    canvasRef.current = new fabric.Canvas(canvasRef.current, {
      backgroundColor: '#acacac',
      width: 700,
      height: 500,
      preserveObjectStacking: true,
      enableRetinaScaling: true,
      controlsAboveOverlay: true,
    
    })

    loadBackground()

    maskRef.current = new fabric.Rect({
      //@ts-ignore
      id: 'mask',
      width: 400,
      height: 400,
      absolutePositioned: true,
      fill: '#ffffff',
      selectable: false,
      hoverCursor: 'default',
    })

    // setCanvas(canvas)
    workAreaRef.current = new fabric.Rect({
      //@ts-ignore
      id: 'workarea',
      width: 400,
      height: 400,
      absolutePositioned: true,
      fill: '#ffffff',
      selectable: false,
      hoverCursor: 'default',
    })

    canvasRef.current.add(workAreaRef.current)
    canvasRef.current.add(maskRef.current)
    workAreaRef.current.center()

    workAreaRef.current.clipPath = new fabric.Rect({
      left: maskRef.current.left,
      top: maskRef.current.top,
      width: maskRef.current.width,
      height: maskRef.current.height,
    });

    loadImage()
  }, [])

  const loadBackground = () => {
    fabric.Image.fromURL('/black-shirt.jpg', (img) => {

      // Set the shirt image as the canvasRef.current background
      canvasRef.current.setBackgroundImage(img, canvasRef.current.renderAll.bind(canvasRef.current, {
        scaleX: canvasRef.current.width ,
        scaleY: canvasRef.current.height,

      }));

    })
  }

  const loadImage = async () => {
    const currentScene = editor.scene.exportToJSON()
    const filterd = {
      ...currentScene,
      layers: currentScene['layers'].filter(item => item.id != 'background')
    }
    const image = await editor.renderer.render(filterd)

    console.log('image: ', image)
    const imageUrl = `${image}`; // Replace with your Base64 image string
    fabric.Image.fromURL(imageUrl, (img) => {

      let scaleFactor = workAreaRef.current.width / img.getScaledWidth();

      // If the scaled image's height is still larger than the canvas height
      if (img.getScaledHeight() * scaleFactor > workAreaRef.current.height) {
        // Recompute the scale factor based on height instead
        scaleFactor = workAreaRef.current.height / img.getScaledHeight();
      }

      // Scale the image
      img.scale(scaleFactor);

      canvasRef.current.add(img);
      img.center()

    });
  };

  return (
    <canvas ref={canvasRef}> </canvas>
  )
}

export default CanvasCustom