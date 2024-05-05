import React from 'react';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import { Bucket } from '@/models/bucket';
import BucketForm from './BucketForm';

type Props = {
  open: boolean;
  setOpen: (state: boolean) => void;
  editBucket: Bucket | null;
};

export default function BucketFormModal({ open, setOpen, editBucket }: Props) {
  const handleClose = (isBackdropClick: boolean) => {
    if (isBackdropClick) {
      return;
    }
    setOpen(false);
  };

  return (
    <Modal
      open={open}
      onClose={(_, reason) => handleClose(reason === 'backdropClick')}
      sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
    >
      <ModalDialog>
        <BucketForm editBucket={editBucket} onSubmit={() => setOpen(false)} />
      </ModalDialog>
    </Modal>
  );
}
