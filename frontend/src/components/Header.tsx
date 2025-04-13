import logo from '../assets/logo.jpg';

export default function Header() {
    return (
        <header className="bg-[#f6efe7] text-center py-8 relative z-[1]">
            <img src={logo} alt="Banner Loopie" className="max-w-[300px] mx-auto" />
        </header>
    );
}

