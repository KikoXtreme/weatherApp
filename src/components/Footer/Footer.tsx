import '../../css/footer.css';

const Footer = () => {
    return (
        <div className='footer'>
            <p className='footer-p'>
                &copy; {new Date().getFullYear()} Weather App. All rights reserved. |{' '}
                <a className='footer-a' href="https://www.weatherapi.com/" target="_blank" rel="noopener noreferrer">T&C</a> |{' '}
                <a className='footer-a' href="https://www.weatherapi.com/" target="_blank" rel="noopener noreferrer">Privacy Policy</a> |{' '}
                <a className='footer-a' href="https://www.weatherapi.com/" target="_blank" rel="noopener noreferrer">Contact Us</a>
            </p>
        </div>
    );
}

export default Footer;
