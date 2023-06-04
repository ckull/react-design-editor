import React from 'react'
import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF, useTexture, AccumulativeShadows, RandomizedLight, Decal, Environment, Center } from '@react-three/drei'
import { state } from '~/store/shirtProxy'
import useDesignEditorContext from '~/hooks/useDesignEditorContext'
import { useSnapshot } from 'valtio'
const ShirtShowcase = () => {
  const { currentDesign } = useDesignEditorContext()
  const Shirt = () => {
    const snap = useSnapshot(state)
    const texture = useTexture()
  }

  return (
    <Canvas shadows>
        {/* <ambientLight intensity={0.5}/>
        <Environment presets="city"/>
        <Center>
            <Shirt/>
        </Center> */}
    </Canvas>
  )
}

export default ShirtShowcase