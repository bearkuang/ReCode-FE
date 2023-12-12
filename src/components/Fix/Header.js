import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const Main = () => {

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const menuItems = [
        { label: "알림", path: "/notification" },
        { label: "채팅", path: "#" },
        { label: "QnA", path: "/qna" },
        { label: "스터디 목록", path: "/" }
    ];

    const { authData, setAuthData } = useContext(AuthContext);
    console.log(authData);
    const navigate = useNavigate();

    const handleLogout = () => {
        setAuthData({});
        localStorage.removeItem("token");
        localStorage.removeItem("authData");  // authData를 로컬 스토리지에서 삭제

        navigate('/');
    };
    // 탭이 닫힐 때 자동 로그아웃이 되도록
    useEffect(() => {
        let timer;
        const resetTimer = () => {
            clearTimeout(timer);
            timer = setTimeout(handleLogout, 1000 * 60 * 60); // 60 minutes 동안 로그인 유지
        };

        window.addEventListener('load', resetTimer);
        document.addEventListener('mousemove', resetTimer);
        document.addEventListener('keypress', resetTimer);

        return () => {
            clearTimeout(timer);
            window.removeEventListener('load', resetTimer);
            document.removeEventListener('mousemove', resetTimer);
            document.removeEventListener('keypress', resetTimer);
        };
    }, []);


    return (
        <header>
            <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
                <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
                    <a href="/" className="flex items-center">
                        <img src="/Recode-logo.png" alt="Recode-logo" border="0" className="mr-3 h-6 h-9" />
                        <img src="/Recode-logo1.png" alt="Recode-logo1" border="0" className="mr-3 h-6 h-9" />
                    </a>
                    <div className="flex items-center lg:order-2">
                        {
                            authData.token != null ? (
                                <button onClick={handleLogout} className="text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800">Log out</button>
                            ) : (
                                <a href="/login" className="text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800">Log in</a>
                            )
                        }
                        <button data-collapse-toggle="mobile-menu-2"
                            type="button"
                            className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="mobile-menu-2"
                            aria-expanded={isMenuOpen}
                            onClick={toggleMenu}>
                            <span className="sr-only">Open main menu</span>
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path></svg>
                            <svg className="hidden w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                        </button>
                    </div>

                    <div className={`${isMenuOpen ? 'flex flex-col absolute right-0 w-1/4 top-[3.5rem]' : 'hidden'} lg:flex lg:flex-row lg:items-center lg:w-auto lg:relative z-10 mr-6`} id="mobile-menu-2">
                        <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
                            {menuItems.map((item, index) => (
                                <li key={index} className={`${isMenuOpen ? 'bg-gray-200' : ''}`}>
                                    <a href={item.path} className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">
                                        {item.label}
                                    </a>
                                </li>
                            ))}
                            {
                                authData.role === "ADMIN" ? (
                                    <li>
                                        <a href={`/admin/studymanagement`} className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">
                                            ADMIN
                                        </a>
                                    </li>
                                ) : authData.role === "CUSTOMER" ? (
                                    <li>
                                        <a href={`/mypage/${authData.id}`} className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">
                                            마이페이지
                                        </a>
                                    </li>
                                ) : null
                            }
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Main;
