import React from "react";
import HomePage from "../HomePage";

const Layout = (props: any) => {
    const { children } = props;

    return (
        <div className="container">
                <HomePage>
                    {children}
                </HomePage>
        </div>
    );
};

export default Layout;