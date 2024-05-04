import './Footer.css'
import CIcon from '@coreui/icons-react';
import { cibGithub, cibGmail, cibFacebook } from '@coreui/icons';
import { Button } from 'react-bootstrap';
import { useState } from 'react';
import SocialsModal from '../SocialsModal/SocialsModal';
import { GITHUB_LINK, GMAIL_LINK, FACEBOOK_LINK } from '../../common/constants';

export default function Footer() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = (e) => {
    let pageLink = '';

    switch (e.target.parentElement.id) {
      case 'gh-link':
        pageLink = GITHUB_LINK;
        break;
      case 'gm-link':
        pageLink = GMAIL_LINK;
        break;
      case 'fb-link':
        pageLink = FACEBOOK_LINK;
        break;
    }

    setShow(true);

    setTimeout(() => {
      location.replace(pageLink);
    }, 3000);
  }

  return (
    <div className="d-flex flex-nowrap w-full flex-row justify-content-center text-white gap-4 mt-auto py-3 fs-5 fw-light bg-black">
      <Button onClick={handleShow} className='bg-transparent border-0' id="gh-link">
        <SocialsModal isShown={show} closeHandler={handleClose} />
        <CIcon icon={cibGithub} className='icon-styles' />
      </Button>
      <Button onClick={handleShow} className='bg-transparent border-0' id="gm-link">
        <SocialsModal isShown={show} closeHandler={handleClose} />
        <CIcon icon={cibGmail} className='icon-styles' />
      </Button>
      <Button onClick={handleShow} className='bg-transparent border-0' id="fb-link">
        <SocialsModal isShown={show} closeHandler={handleClose} />
        <CIcon icon={cibFacebook} className='icon-styles' />
      </Button>
    </div>
  )
}
