'use client';

import { fetchWrapper } from '@/functions/fetch';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { AiFillDelete } from 'react-icons/ai';

type UserProps = {
  id: string;
  name: string;
  email: string;
};

export default function DeleteUser(user: UserProps) {
  const router = useRouter();
  const [modal, setModal] = useState(false);

  const handleChange = () => {
    setModal(!modal);
  };

  const handleDelete = async (userId: string) => {
    await fetchWrapper(`users/${userId}`, {
      method: 'DELETE'
    });

    setModal(false);
    router.refresh();
  };

  return (
    <>
      <button onClick={handleChange} className="text-gray-900">
        <AiFillDelete />
      </button>
      {modal && (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-full max-w-2xl max-h-full">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5">
                  <h3 className="text-2xl font-semibold">Delete user</h3>
                </div>

                <div className="flex items-center justify-end p-6 rounded-b">
                  <button
                    className="background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={handleChange}
                  >
                    close
                  </button>
                  <button
                    className="bg-red-700 text-white font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="submit"
                    onClick={() => handleDelete(user.id)}
                  >
                    Delete
                  </button>
                </div>
                <div className="relative p-6 flex-auto"></div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      )}
    </>
  );
}
