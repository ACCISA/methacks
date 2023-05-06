import React, { useState } from 'react';

function AddMemberForm() {
  const [showForm, setShowForm] = useState(false);

  return (
    <div>
      <button onClick={() => setShowForm(showForm ? false : true)}>+ Add Member</button>
      {showForm && (
        <form className="show">
          {/* form fields go here */}
        </form>
      )}
    </div>
  );
}

export default AddMemberForm;
