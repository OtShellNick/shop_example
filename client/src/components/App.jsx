import React, {useEffect} from 'react';
import {getSelf} from "@actions/personal";

const App = () => {

    useEffect(() => {
        getSelf();
    }, [])

    return <div>Hello</div>
}

export default App;