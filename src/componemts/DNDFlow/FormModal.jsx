import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import FlowForm from './FlowForm';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow:'0 3px 6px 3px #00000029',
  p: 4,
};

 const  FormModal = ({open,handleClose,onSubmit,nodeLabel,setNodeLabel,editNode}) =>{
  return (
    <div>
      <Modal
        open={open}
        onClose={() => {
            handleClose();
            setNodeLabel('')
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
            <div className='close-modal' onClick={handleClose}>x</div>
            <h3 className='modal-title' style={{color : editNode ? '#186ed1' : 'green'}}>{editNode ? `Editing Node` : 'Adding Node'}</h3>
            <div className='flow_form'>
        <FlowForm onSubmit={onSubmit} nodeLabel={nodeLabel} setNodeLabel={setNodeLabel} editNode={editNode}  />
      </div> 
        </Box>
        
      </Modal>
    </div>
  );
}
export default FormModal