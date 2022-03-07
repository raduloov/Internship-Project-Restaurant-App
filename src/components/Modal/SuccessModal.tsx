import { useDispatch } from 'react-redux';

import { uiActions } from '../../store/ui-slice';
import Modal from './UI/Modal';
import ModalCard from './UI/ModalCard';

const SuccessModal: React.FC<{ type: string }> = ({ type }) => {
  const dispatch = useDispatch();

  const closeHandler = () => {
    dispatch(uiActions.toggleSuccessModal(''));
  };

  return (
    <Modal onClose={closeHandler}>
      <ModalCard confirmLabel="Okay" onClose={closeHandler} onConfirm={closeHandler}>
        <div className="text-xl">
          <p>{type} successfully!</p>
          <div className="flex justify-center items-center mt-5 text-primary">
            <i className="fa-solid fa-thumbs-up fa-3x"></i>
          </div>
        </div>
      </ModalCard>
    </Modal>
  );
};

export default SuccessModal;
