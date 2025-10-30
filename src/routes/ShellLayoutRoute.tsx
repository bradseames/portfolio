import { Outlet } from 'react-router';
import ShellLayout from '../app/ShellLayout';

export default function ShellLayoutRoute() {
  return (
      <ShellLayout>
        <Outlet />
      </ShellLayout>
  );
}
