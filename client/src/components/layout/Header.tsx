import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Logo } from '../../assets';
import { ProfileSectionList } from '../../models/enums';
import { useUserContext } from '../../store/context/UserContext';
import { ProfileLinkMap } from '../../utils/profile';
import HamburgerMenu from '../ui/buttons/icon-buttons/HamburgerMenu';
import ActiveNavLink from '../ui/links/ActiveNavLink';
import ProfileMenuHeader from '../ui/user/ProfileMenuHeader';
import UserProfileNav from '../ui/user/UserProfileNav';

// Mobile header breakpoint is lg - 1024px.
// Under 1024 px mobile header is displayed. Above 1024px desktop header is displayed.
const Header = () => {
    const { user } = useUserContext();
    const isLoggedIn = !!user;
    // State to manage visibility of the modbile dropdown menu.
    const [showMobileDropdownMenu, setShowMobileDropdownMenu] = useState(false);

    return (
        <header className="relative flex items-center justify-between px-4 md:px-8 lg:px-[3.5%] xl:px-[5%] 2xl:px-[6%] 3xl:px-[7%] py-3 m-0 shadow-sm">
            <div className="logo flex items-center flex-shrink-0 text-main-400">
                {/* Hamburger menu icon that toggles the mobile dropdown menu visibility. Only shown on the mobile screen size */}
                <HamburgerMenu
                    visible={showMobileDropdownMenu}
                    setVisible={setShowMobileDropdownMenu}
                />
                <NavLink
                    to="/"
                    onClick={() => setShowMobileDropdownMenu(false)}
                    className="flex-start gap-2 text-xl tracking-tight hover:cursor-pointer"
                >
                    <Logo size={25} />
                    CodeLikePro
                </NavLink>
            </div>

            {/* Navigation list: Browse, Ranking & Create shown only for a large (> 1024px) screens. */}
            <div className="hidden lg:block w-full">
                <NavList />
            </div>

            {/* Mobile dropdown menu to be displayed if the showMobileDropdownMenu state is true. */}
            <MobileDropdownMenu
                visible={showMobileDropdownMenu}
                onClose={() => setShowMobileDropdownMenu(false)}
            />

            {/* User profile info and navigation on the right side of the header. */}
            {isLoggedIn && <UserProfileNav />}
        </header>
    );
};

/*  Dropdown menu that is shown when the user clicks the hamburger menu on the header.
This will be hidden for the large screen size by default. */
const MobileDropdownMenu: React.FC<{ visible: boolean; onClose: () => void }> = ({
    visible, // boolean value to indicate whether to display the dropdown menu or not.
    onClose, // callback function to hide the mobile dropdown when the user clicks the link inside the nav, block
}) => {
    const isLoggedIn = !!useUserContext().user;
    const { logout } = useUserContext();

    // Determine whether to show the mobile nav or not based on the 'visible' prop.
    const visibleClass = visible ? 'visible' : '';
    return (
        <nav
            className={`mobile-nav absolute lg:hidden z-[500] w-full min-h-[85vh] top-[101%] left-0 bg-gray-100 ${visibleClass}`}
        >
            {/* Dropdown menu for nav list */}
            <div className="px-5 py-5">
                <h2 className="text-gray-700 font-bold text-lg">Menu</h2>
                <div onClick={onClose}>
                    <NavList className="pl-2" />
                </div>
            </div>

            {/* Dropdown menu for profile sections */}
            {isLoggedIn && (
                <div className="px-5 pb-5">
                    <h2 className="text-gray-700 font-bold text-lg">Profile</h2>

                    <ProfileMenuHeader className="px-0 !pl-[0.375rem]" />
                    {/* List of links to particular profile section */}
                    {ProfileSectionList.map((section) => (
                        <Link
                            key={section}
                            onClick={onClose}
                            className="link-underline-effect w-fit flex-start gap-3 ml-2 my-4 whitespace-nowrap font-semibold text-gray-500 hover:text-main-600"
                            to={`/profile/${ProfileLinkMap[section]}`}
                        >
                            {section}
                        </Link>
                    ))}
                    {/* Logout button */}
                    <div
                        onClick={() => {
                            logout();
                            onClose();
                        }}
                        className="link-underline-effect w-fit flex-start gap-3 ml-2 my-4 whitespace-nowrap font-semibold text-gray-500 hover:text-main-600 cursor-pointer"
                    >
                        Logout
                    </div>
                </div>
            )}
        </nav>
    );
};

// List of navigation links like browsing, ranking and create that are used on both mobile and desktop screen sizes.
const NavList: React.FC<{ className?: string }> = ({ className = '' }) => {
    const { user } = useUserContext();
    const isLoggedIn = !!user;

    return (
        <nav
            className={`flex flex-col lg:flex-row flex-grow lg:items-center md:w-auto ${className}`}
        >
            <div className="text-md flex-col lg:flex-row lg:text-center md:flex-grow">
                <ActiveNavLink
                    to="/browse"
                    className="w-fit link-underline-effect mt-4 mr-10 block lg:inline-block lg:mt-0 text-gray-500 font-semibold hover:text-main-600 transition-all"
                    activeClassName="!text-main-500"
                >
                    Explore
                </ActiveNavLink>
                <ActiveNavLink
                    to="/create-exercise"
                    activeClassName="!text-main-500"
                    className="w-fit link-underline-effect mt-4 mr-10 block lg:inline-block lg:mt-0 text-gray-500 font-semibold hover:text-main-600 transition-all"
                >
                    Create
                </ActiveNavLink>
                <ActiveNavLink
                    to={'/showcase-invites'}
                    activeClassName="!text-main-500"
                    className="w-fit link-underline-effect mt-4 mr-10 block lg:inline-block lg:mt-0 text-gray-500 font-semibold hover:text-main-600 transition-all"
                >
                    Showcases
                </ActiveNavLink>
                <ActiveNavLink
                    to="/ranking"
                    activeClassName="!text-main-500"
                    className="w-fit link-underline-effect mt-4 mr-10 block lg:inline-block lg:mt-0 text-gray-500 font-semibold hover:text-main-600 transition-all"
                >
                    Ranking
                </ActiveNavLink>
            </div>
            <div className="flex flex-col lg:flex-row gap-4 max-w-[7rem] lg:max-w-none mt-4 lg:mt-0">
                {!isLoggedIn && (
                    <>
                        <NavLink
                            to="/login"
                            className="bg-transparent hover:bg-main-600 text-main-600 font-regular hover:text-white py-[0.35rem] px-4 border border-main-500 hover:border-transparent rounded shadow-sm"
                        >
                            Login
                        </NavLink>
                        <NavLink
                            to="/register"
                            className="bg-main-500 hover:bg-main-600 text-gray-50 font-regular py-[0.35rem] px-4 border border-main-500 hover:border-transparent rounded shadow-sm"
                        >
                            Register
                        </NavLink>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Header;
