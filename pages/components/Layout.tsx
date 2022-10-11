import { useRouter } from "next/router";
import React from "react";
import HomePage from "../HomePage";
import Login from "../Login";

const Layout = (props: any) => {
    const { children } = props;
    const router = useRouter();

    return (
        <div className="container">
            {router.pathname !== '/' && <HomePage path={router.route} /> ? 
                <HomePage>
                    {children}
                </HomePage> : <Login />
            }
        </div>
    );
};

export default Layout;