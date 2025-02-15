import React from 'react'

const ConfirmationModal = ({ isOpen, message, onConfirm, onCancel }) => {
  if (!isOpen) return null

  return (
    <div className='modal fade'>
      <div className='modal-dialog'>
        <div className='modal-content'>
        <p>{message}</p>
          <div className='modal-footer'>
            <button onClick={onConfirm}>OK</button>
            <button onClick={onCancel}>Cancel</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ConfirmationModal
