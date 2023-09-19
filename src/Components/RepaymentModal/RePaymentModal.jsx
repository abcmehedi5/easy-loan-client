import React from "react";

const RePaymentModal = () => {
  return (
    <div>
      {/* The button to open modal */}
      <a href="#my_modal_8" className="btn">
        open modal
      </a>

      <button>

      </button>
      {/* Put this part before </body> tag */}
      <div className="modal" id="my_modal_8">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Hello!</h3>
          <p className="py-4">This modal works with anchor links</p>
          <div className="modal-action">
            <a href="#" className="btn">
             Cancel
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RePaymentModal;
