import React from 'react';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import { Bucket } from '@/models/bucket';
import BucketForm from './BucketForm';

type Props = {
  open: boolean;
  editBucket: Bucket | null;
  onSubmit: (bucket: Bucket) => void;
  setOpen: (state: boolean) => void;
};

export default function BucketFormModal({ open, editBucket, onSubmit, setOpen }: Props) {
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
        <BucketForm editBucket={editBucket} onSubmit={onSubmit} handleClose={() => setOpen(false)} />
      </ModalDialog>
    </Modal>
  );
}
