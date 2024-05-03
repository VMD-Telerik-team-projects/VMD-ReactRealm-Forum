import './Footer.css'
import CIcon from '@coreui/icons-react';
import { cibGithub, cibGmail, cibFacebook } from '@coreui/icons';
import { Button } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import SocialsModal from '../SocialsModal/SocialsModal';

export default function Footer() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    if (show) {
      setTimeout(() => {
        location.replace('https://www.github.com')
      }, 3000)
    }
  }, [show])

  return (
    <div
      className="d-flex flex-nowrap w-full flex-row justify-content-center text-white gap-4 mt-auto py-3 fs-5 fw-light bg-black"> 
      <Button onClick={handleShow} className='bg-transparent border-0'>
        <SocialsModal isShown={show} closeHandler={handleClose} />
        <CIcon icon={cibGithub} className='icon-styles' />
      </Button>
      <Button onClick={handleShow} className='bg-transparent border-0'>
        <SocialsModal isShown={show} closeHandler={handleClose} />
        <CIcon icon={cibGmail} className='icon-styles' />
      </Button>
      <Button onClick={handleShow} className='bg-transparent border-0'>
        <SocialsModal isShown={show} closeHandler={handleClose} />
        <CIcon icon={cibFacebook} className='icon-styles' />
      </Button>
    </div>
  )
}