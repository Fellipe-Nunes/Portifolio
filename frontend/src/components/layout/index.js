import React from 'react';

import Header from './header/header'
import Footer from './footer/footer'

const layout = (props) => {
    return (
        <div>
            <Header {...props} title="GERENCIADOR DE USUÁRIOS" />
            <main>
                {props.children}
            </main>
            <Footer />
        </div>
    )

}

export default layout;