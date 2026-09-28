import React from "react";
import { Container, Logo, LogoutBtn } from "../index";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function Header() {
    const authStatus = useSelector((state) => state.auth.status);

    const navItems = [
        {
            name: "Home",
            slug: "/",
            active: true,
        },
        {
            name: "Login",
            slug: "/login",
            active: !authStatus,
        },
        {
            name: "Sign Up",
            slug: "/signup",
            active: !authStatus,
        },
        {
            name: "All Posts",
            slug: "/all-posts",
            active: authStatus,
        },
        {
            name: "My Posts",
            slug: "/my-posts",
            active: authStatus,
        },
        {
            name: "Write",
            slug: "/add-post",
            active: authStatus,
        },
    ];

    return (
        <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/95 backdrop-blur-sm">
            <Container>
                <nav className="flex min-h-16 items-center justify-between gap-3 py-2">
                    <Link
                        to="/"
                        className="shrink-0 transition-opacity hover:opacity-80"
                    >
                        <Logo width="180px" />
                    </Link>

                    <div className="flex min-w-0 items-center gap-0.5 overflow-x-auto">
                        {navItems.map(
                            (item) =>
                                item.active && (
                                    <Link
                                        key={item.name}
                                        to={item.slug}
                                        className="shrink-0 rounded-lg px-2 py-2 text-xs font-medium text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900 sm:px-3 sm:text-sm lg:px-4"
                                    >
                                        {item.name}
                                    </Link>
                                )
                        )}

                        {authStatus && (
                            <div className="ml-1 shrink-0 border-l border-gray-200 pl-1 sm:pl-2">
                                <LogoutBtn />
                            </div>
                        )}
                    </div>
                </nav>
            </Container>
        </header>
    );
}

export default Header;