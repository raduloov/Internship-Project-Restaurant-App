import { useDispatch } from 'react-redux';

import { apiActions } from '../../store/api-slice';
import { uiActions } from '../../store/ui-slice';
import Modal from './UI/Modal';
import ModalCard from './UI/ModalCard';

const ConfirmDeleteModal: React.FC<{ type: string }> = ({ type }) => {
  const dispatch = useDispatch();

  const closeHandler = () => {
    dispatch(uiActions.toggleConfirmDeleteModal(type));
  };

  const deleteHandler = () => {
    dispatch(apiActions.confirmDelete(type));
    dispatch(uiActions.toggleConfirmDeleteModal(type));
  };

  return (
    <Modal onClose={closeHandler}>
      <ModalCard
        onClose={closeHandler}
        confirmLabel="Yes"
        declineLabel="No"
        onConfirm={deleteHandler}
        onDecline={closeHandler}
      >
        <div className="text-xl">
          <p>Are you sure you want to delete this {type}?</p>
          <div className="flex justify-center items-center mt-5 text-primary">
            <i className="fa-solid fa-trash fa-3x"></i>
          </div>
        </div>
      </ModalCard>
    </Modal>
  );
};

export default ConfirmDeleteModal;
