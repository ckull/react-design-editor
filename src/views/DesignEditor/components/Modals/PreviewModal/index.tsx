import React, { useEffect ,useState } from 'react'
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
    const [canvasWidth, setCanvasWidth] = useState(0);
        const [canvasHeight, setCanvasHeight] = useState(0);        
    const { width, height } = useElementSize(boxRef, previewModal.isOpen);


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
            <ModalBody ref={boxRef} $style={{display: 'flex', flexGrow: '1', width: '100%', minHeight: '500px'}}>
                 <CanvasCustom width={width} height={height}/>
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