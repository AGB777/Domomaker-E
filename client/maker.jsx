const helper = require('./helper.js');

const handleDomo = (e) => {
    e.preventDefault();
    helper.hideError();
    
    const name = e.target.querySelector('#domoName').value;
    const age = e.target.querySelector('#domoAge').value;
    const _csrf = e.target.querySelector('#_csrf').value;
    
    if(!name || !age) {
        helper.handleError('All fields are required!');
        return false;
    }
    
    sendPost(e.target.action, {name, age, _csrf}, loadDomosFromServer);
    
    return false;
}

const DomoForm = (props) => {
    return (
        <form id="domoForm"
            onSubmit={handleDomo}
            name="domoForm"
            action="/maker"
            method="POST"
            className="domoForm">
            <label htmlFor="name">Who is your Domo? </label>
            <input id="domoName" type="text" name="name" placeHolder="Name Your Domo!" />
            <label htmlFor="age">How old is your Domo? </label>
            <input id="domoAge" type="number" name="age" placeHolder="Age Your Domo!" />
            <input id="_csrf" type="hiden" value={props.csrfToken} />
            <input className="makeDomoSubmit" type="submit" value="Make Your Domo!" />
        </form>
    )
}

const DomoList = (props) => {
    if(props.domos.length===0) {
        return (
            <div className="domoList">
                <h3 className="emptyDomo">No Domos Yet!</h3>
            </div>
        );
    }
    
    const domoNodes = props.domos.map(domo => {
        return(
            <div key={domo._id} className="domo">
                <img src="/assets/img/domoface.jpg" alt="domo face" className="domoFace" />
                <h3 className="domoName">Name: {domo.name} </h3>
                <h3 className="domoAge">Age: {domo.age} </h3>
            </div>
        );
    });
    
    return(
        <div className="domoList">
            {domoNodes}
        </div>
    );
}


const loadDomosFromServer = async () => {
    const response = await fetch('/getDomos');
    const data = await response.json();
    ReactDOM.render(
        <DomoList domos={data.domos} />,
        document.querySelector('#domos')
    );
}

const init = async() => {
    const response = await fetch('/getToken');
    const data = await response.json();
    
    ReactDOM.render(
        <DomoForm csrf={data.csrfToken} />,
        document.querySelector('#makeDomo')
    );
    
    ReactDOM.render(
        <DomoList domos={[]} />,
        document.querySelector('#domos')
    );
    
    loadDomosFromServer();
}

window.onload = init;