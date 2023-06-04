import React, { useEffect } from 'react'
import { Modal, ModalBody, ModalHeader, ModalFooter, ModalButton } from 'baseui/modal'
import usePreviewModal from '~/hooks/usePreviewModal';
import { ROLE } from 'baseui/modal';
import PreviewEditor from '~/views/DesignEditor/PreviewEditor';
import CanvasCustom from '../../CanvasCustom';
import { useRef } from 'react';
import useElementSize from '~/hooks/useElementSize';
type ModalProps = React.ComponentProps<typeof Modal>;

const PreviewModal: React.FC<ModalProps> = (props) => {
    const boxRef = useRef() as any;
    const previewModal = usePreviewModal()
    const { width, height } = useElementSize(boxRef);
    
    useEffect(() => {
        if(boxRef.current) {
            console.log('boxRef: ', boxRef.current.offsetHeight)
        }
    }, [previewModal.isOpen])
    return (
        <Modal
            {...props}
            onClose={previewModal.onClose}
            isOpen={previewModal.isOpen}
            closeable={true}
            animate
            autoFocus
            role={ROLE.dialog}
            overrides={{
                Dialog: {
                    style: {
                        display: 'flex',
                        flexDirection: 'column',
                        width: '80vw',
                        height: '80vh',
                        borderTopRightRadius: "8px",
                        borderEndStartRadius: "8px",
                        borderEndEndRadius: "8px",
                        borderStartEndRadius: "8px",
                        borderStartStartRadius: "8px",
                    },
                },
            }}
        >
            <ModalHeader>Preview and Customize your T-Shirt before publish</ModalHeader>
            <ModalBody $style={{display: 'flex', flexGrow: '1'}}>
                <div ref={boxRef} className='w-full min-h-[500px] flex-1' >
                    <CanvasCustom width={width} height={height}/>
                </div>
            </ModalBody>
            <ModalFooter>
                <ModalButton>
                    Cancel
                </ModalButton>
                <ModalButton>Okay</ModalButton>
            </ModalFooter>
        </Modal>
    )
}

export default PreviewModal