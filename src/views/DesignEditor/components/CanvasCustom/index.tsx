import { useEffect, useRef, useContext, useState, RefObject } from 'react'
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
  const canvasRef: any = useRef(null)
  const workAreaRef: any = useRef(null)
  const shirtRef: any = useRef(null)
  const isMounted: any = useRef(true)
  const maskRef: any = useRef()
  const { currentPreview } = useContext(DesignEditorContext)
  const editor = useEditor()

  const workAreaWidth = width/1.5;
  const workAreaHeight = height/1.5;

  
  useEffect(() => {
    if(editor) {
      console.log('editor: ', editor)
      const rect = editor.frame.getBoundingClientRect()
      console.log('rect: ', rect)
    }
  }, [])

  useEffect(() => {
   

    if (!width && !height) return

  

    if (isMounted.current) {
     

      workAreaRef.current = new fabric.Rect({
        //@ts-ignore
        id: 'workarea',
        width: 200,
        height: 400,
        absolutePositioned: true,
        stroke: 'white',
        fill: 'transparent',
        strokeWidth: 1,
        selectable: false,
        hoverCursor: 'default',
        objectCaching: false,
        controlsAboveOverlay: true,
      })

      canvasRef.current = new fabric.Canvas(canvasRef.current, {
        backgroundColor: '#acacac',
        // backgroundImage: '/blackShirt.jpg',
        width: width - 48,
        height: height,
     
      })

      fabric.Image.fromURL('/black-shirt.jpg', (shirtImage) => {
        // Scale the shirt image to fit within the canvas
        let shirtImageScaleFactor = Math.min(
          canvasRef.current.width / shirtImage.getScaledWidth(),
          canvasRef.current.height / shirtImage.getScaledHeight()
        );
        canvasRef.current.add(shirtImage);
        shirtImage.scale(shirtImageScaleFactor);
        shirtImage.lockMovementX = true
        shirtImage.sendToBack()
        shirtImage.selectable = false;
        shirtImage.lockMovementY = true
        shirtImage.center()

        shirtRef.current = shirtImage
      });

     
  
      canvasRef.current.add(workAreaRef.current)
     

      loadImage()
     
      

      isMounted.current = false
    } 

    

    if(!isMounted.current) {
      canvasRef.current.clipTo = function(ctx: any) {
        workAreaRef.current.render(ctx);
      };
      canvasRef.current.setWidth(width - 48 );
      canvasRef.current.setHeight(height);
      canvasRef.current.renderAll();
    }


    workAreaRef.current.center()
    workAreaRef.current.clipPath = new fabric.Rect({
      width: workAreaRef.current.width,
      height: workAreaRef.current.height,
      top: workAreaRef.current.top,
      left: workAreaRef.current.left,
      absolutePositioned: true,
    });

    if(shirtRef.current) {
      shirtRef.current.center()
    }


 
    
    // workAreaRef.current.clipPath = new fabric.Rect({
    //   left: maskRef.current.left,
    //   top: maskRef.current.top,
    //   width: maskRef.current.width,
    //   height: maskRef.current.height,
    // });


    


  }, [width, height])


 



  const loadBackground = () => {
    fabric.Image.fromURL('/black-shirt.jpg', (img) => {

      // Set the shirt image as the canvasRef.current background
      canvasRef.current.setBackgroundImage(img, canvasRef.current.renderAll.bind(canvasRef.current, {
        scaleX: canvasRef.current.width,
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

      img.set({
        clipPath: workAreaRef.current
      });

    });
  };

  return (
    <canvas ref={canvasRef}> </canvas>
  )
}

export default CanvasCustom