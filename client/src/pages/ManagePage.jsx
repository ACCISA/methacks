import { Link } from 'react-router-dom';
import AddMemberForm from '../AddMemberForm';

export default function ManagePage() {

    function handleAddFam() {

    }

    return (
        <>
            <div>
                will have already add memebers here in an rodered list

            </div>
            <div className="text-xl text-center my-4 flex flex-col items-center">
                Your Families
                <div className="border grid grid-cols-4">
                    <button className='m-4 p-2 mt-4 w-auto'>Fam 1</button>
                    <button className='m-4 p-2 mt-4 w-auto'>Fam 2</button>
                    <button className='m-4 p-2 mt-4 w-auto'>Fam 3</button>
                    <button className='m-4 p-2 mt-4 w-auto'>Fam 4</button>
                    <button className='m-4 p-2 mt-4 w-auto'>Fam 5</button>


                </div>
                <Link to={"/manage/new"}>
                    <button className='w-8 rounded-full mt-4'> + </button>
                </Link>
            </div>
            <AddMemberForm />
        </>
    );
}