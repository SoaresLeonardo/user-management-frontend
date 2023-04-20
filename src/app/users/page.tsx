import { fetchWrapper } from '@/functions/fetch';
import CreateUser from './CreateUser';
import DeleteUser from './DeleteUser';
import EditUser from './EditUser';

type UserProps = {
  id: string;
  name: string;
  email: string;
};

export default async function Users() {
  // Making the request on the API and destructuring the data
  const { data } = await fetchWrapper<{ data: UserProps[] }>('users', {
    cache: 'no-cache'
  });
  return (
    <>
      <div>
        <div>
          <CreateUser />
        </div>
        <ul role="list" className="divide-y divide-gray-100">
          {data.map((user) => (
            <li key={user.id} className="flex justify-between gap-x-6 py-5">
              <div className="flex gap-x-4">
                <div className="min-w-0 flex-auto">
                  <p className="text-sm font-semibold leading-6 text-gray-900">
                    {user.name}
                  </p>
                  <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                    {user.email}
                  </p>
                </div>
              </div>
              <div className="sm:flex sm:flex-row sm:items-end justify-content-between gap-4 text-gray-900">
                <EditUser {...user} />
                <DeleteUser {...user} />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
