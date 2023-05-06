
interface Props {
  isOpen: boolean;
  setIsOpen: any;
}

const MessageModal = (props:Props) => {

  if(!props.isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto h-screen w-screen top-0 right-0 bg-modal">
      <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
        <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
          <div className="sm:flex sm:items-start">
            <div className="mt-3">
              <div className='text-green-600 font-bold'>Done!</div>
              <p className="text-sm text-gray-500 mt-2">
                Thank you for purchasing.
              </p>
              
              <button
                type="button"
                className="w-full mt-4 rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 "
                onClick={() => props.setIsOpen && props.setIsOpen(false)}
              >
                OK
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MessageModal;