import { NavLink, Outlet } from 'react-router-dom';
import noNotification from '../../../assets/images/no-notification.svg';
import { useState } from 'react';
import Modal from '../../../helpers/Modals/Modal';
import { ErrorEmpty } from '../../../helpers/Errors/ErrorEmpty';

const Notifications = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState();

  const closeModal = () => {
    setModalOpen(false);
  };

  const notifications = [];

  return (
    <>
      {notifications?.length ? (
        <div className='content pl-0 md:pl-4 pr-0 lg:pr-4 py-4 grid mm:grid-cols-2 gap-3 md:gap-5'>
          <div className='pt-5'>
            <div className='flex justify-between items-center pb-5'>
              <div className='flex items-center'>
                <span className='font-medium'>Недавние</span>
                <span className='bg-red-500 text-white min-w-[16px] h-[16px] text-[10px] rounded-full text-center ml-2 mb-1'>
                  4
                </span>
              </div>
              <div
                onClick={() => {
                  setModalOpen(true);
                  setModalContent('deleteAllNotifications');
                }}
                className='text-sm text-red-500 cursor-pointer'
              >
                Удалить все
              </div>
            </div>
            {notifications?.map((el) => (
              <NavLink
                to={`${el.id}`}
                key={el?.id}
                className='flex my-3 border-b sidebar border-colBgGray2 pb-3 hover:bg-colBgGray2 py-2 rounded-lg'
              >
                <div className='max-w-[36px] lg:max-w-[44px] min-w-[36px] lg:min-w-[44px] h-[36px] lg:h-[44px] rounded-full overflow-hidden'>
                  <img
                    className='w-full h-full object-cover'
                    src={el?.icon}
                    alt='*'
                  />
                </div>
                <div className='pl-3 w-full'>
                  <div className='flex justify-between items-center'>
                    <h5 className='text-xs lg:text-sm break-all line-clamp-1 pr-1'>
                      {el?.title}
                    </h5>
                    <span className='text-[8px] lg:text-xs text-colGray'>
                      13.00
                    </span>
                  </div>
                  <p className='text-xs lg:text-sm text-colGray break-all line-clamp-1 mt-[2px]'>
                    {el?.text}
                  </p>
                </div>
              </NavLink>
            ))}
          </div>
          <div>
            <Outlet />
          </div>
        </div>
      ) : (
        <div className='flex justify-center w-full'>
          <ErrorEmpty
            title='У вас еще нет уведомлений.'
            desc='Здесь будут уведомления.'
            image={noNotification}
          />
        </div>
      )}
      <Modal isOpen={modalOpen} onClose={closeModal} content={modalContent} />
    </>
  );
};

export default Notifications;
