import '../../css/footer.css';

const Footer = () => {
    return (
        <div className='footer'>
            <p className='footer-p'>
                &copy; {new Date().getFullYear()} Weather App. All rights reserved. |{' '}
                <a className='footer-a' href="/">T&C</a> |{' '}
                <a className='footer-a' href="/">Privacy Policy</a> |{' '}
                <a className='footer-a' href="/">Contact Us</a>
            </p>
        </div>
    );
}

export default Footer;
