import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom'
import './css/ModalPopup.css';
import ModalContext from '../contexts/ModalContext.jsx'
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function TransitionsModal() {
    const { modalOpen, setModalOpen, modalData } = useContext(ModalContext);
    const navigate = useNavigate();

    function handleClose() {
        setModalOpen(false);
    }
    function handleModalRedirect() {
        setModalOpen(false);
        navigate('/form');
    }

    return (
        <Modal
            open={modalOpen}
            onClose={handleClose}
            closeAfterTransition
            slots={{ backdrop: Backdrop }}
            slotProps={{ backdrop: { timeout: 500 } }}
        >
            <Fade in={modalOpen}>
                <Box sx={style}>
                    <Typography variant="h6" component="h2">
                        {modalData
                            ? `${modalData.month + 1}/${modalData.day}/${modalData.year}`
                            : ""}
                    </Typography>
                    <Divider color="black" orientation="horizontal" />
                    <div style={{ margin: "10px 0" }}>
                        <div style={{ display: "flex", flexDirection: "column" }}>
                            {modalData?.notices?.length > 0
                                ? modalData.notices.map((notice, index) => (
                                    <div key={`modal_${index}`} className="calendar_data">
                                        <div style={{ fontFamily: "sans-serif" }}>{notice}</div>
                                    </div>
                                ))
                                : <Typography variant="body2" color="text.secondary">
                                    No events for this day.
                                </Typography>
                            }
                        </div>
                        <div className="button_group">
                            <button className="button_new" onClick={handleModalRedirect}>New</button>
                            <button className="button_cancel" onClick={handleClose}>Cancel</button>
                        </div>
                    </div>
                </Box>
            </Fade>
        </Modal>
    );
}