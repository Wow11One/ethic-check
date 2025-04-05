import { Fragment } from 'react';
import MobileHeader from '@/components/Header/MobileHeader';
import DesktopHeader from '@/components/Header/DesktopHeader';

export default function Header() {
  return (
    <Fragment>
      <DesktopHeader />
      <MobileHeader />
    </Fragment>
  );
}
