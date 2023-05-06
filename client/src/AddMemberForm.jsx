import React, { useState } from 'react';

function AddMemberForm() {
    const [showForm, setShowForm] = useState(false);

    return (
        <div>
            <button onClick={() => setShowForm(showForm ? false : true)}>+ Add Member</button>
            {showForm && (
                <form className="show">
                    {<div>
                        <input type='text' placeholder='username'></input>
                        <textarea name="dietRestrictions" placeholder="Enter your dietary restrictions"></textarea>
                    </div>

                    }
                </form>
            )}
        </div>
    );
}

export default AddMemberForm;
