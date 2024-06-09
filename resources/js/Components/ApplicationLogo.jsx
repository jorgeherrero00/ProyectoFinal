import logo from '../../img/Logo.webp';
export default function ApplicationLogo(props) {
    return (
        <img src={logo} alt="Logo" className="w-24 h-24 object-contain" id='logo-home' />
    );
}
