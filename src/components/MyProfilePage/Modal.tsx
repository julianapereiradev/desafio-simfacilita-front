import { useState } from "react";
import Modal from "react-modal";

export default function Modals() {
  const [toggle, setToggle] = useState(false);

  async function clicou() {
    alert("clicou em sim");
  }

  return (
    <div>
      <button onClick={() => setToggle(true)}>icone lixeira</button>
      <Modal
        isOpen={toggle}
        onRequestClose={() => setToggle(false)} // close by clicking outside modal & using ESC KEY
        // shouldCloseOnOverlayClick={false} - Dont close by clicking outside modal only using ESC KEY
        style={{
          content: { color: "rgb(231, 83, 83)" }
        }}
      >
        <h2>Are you sure you want to delete this post?</h2>
        <button onClick={() => clicou()}>Yes</button>
        <button onClick={() => setToggle(false)}>No</button>
      </Modal>
    </div>
  );
}
