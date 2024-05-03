import CIcon from '@coreui/icons-react';
import { cibGithub, cibGmail, cibFacebook } from '@coreui/icons';
import './Footer.css'

export default function Footer() {
  //  TODO: Replace <p> placeholders with icons
  //  TODO: Fix icons

  return (
    <div
      className="d-flex flex-nowrap w-full flex-row justify-content-center text-white gap-5 mt-auto py-3 fs-5 fw-light border border-3">
      <CIcon icon={cibGithub} className='icon-styles'/>
      <CIcon icon={cibGmail} className='icon-styles'/>
      <CIcon icon={cibFacebook} className='icon-styles'/>
    </div>
  )
}