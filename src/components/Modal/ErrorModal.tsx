import { useDispatch } from 'react-redux';

import { uiActions } from '../../store/ui-slice';
import Modal from './UI/Modal';
import ModalCard from './UI/ModalCard';

const ErrorModal: React.FC<{ type: string }> = ({ type }) => {
  const dispatch = useDispatch();

  const closeHandler = () => {
    dispatch(uiActions.toggleErrorModal(type));
  };

  return (
    <Modal onClose={closeHandler}>
      <ModalCard confirmLabel="Okay" onClose={closeHandler} onConfirm={closeHandler}>
        <div className="text-xl">
          <p>{type}</p>
          <div className="flex justify-center items-center mt-5 text-secondary">
            <i className="fa-solid fa-heart-crack fa-3x"></i>
          </div>
        </div>
      </ModalCard>
    </Modal>
  );
};

export default ErrorModal;
