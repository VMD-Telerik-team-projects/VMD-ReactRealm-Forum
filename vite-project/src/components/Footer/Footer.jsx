import CIcon from '@coreui/icons-react';
import { cibGithub, cibGmail } from '@coreui/icons';
import './Footer.css'

export default function Footer() {
  //  TODO: Replace <p> placeholders with icons
  return (
    <div
      className="d-flex flex-nowrap w-full flex-row justify-content-center dark text-white gap-5 mt-auto py-3 fs-5 fw-light border border-3"
      variant="dark"
    >
      <CIcon icon={cibGithub} className='icon-styles'/>
      <CIcon icon={cibGmail} className='icon-styles'/>
      <span>More</span>
    </div>
  )
}