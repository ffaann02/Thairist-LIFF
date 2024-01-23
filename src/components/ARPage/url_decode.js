// url_decode.js

// Function to decode URL-encoded values
const getParameters = (url) => {
    const params = {};
    const searchParams = new URLSearchParams(url.split('?')[1]);

    for (const [key, value] of searchParams) {
        params[key] = decodeURIComponent(value.replace(/\+/g, ' '));
    }

    return params;
};

// Function to extract parameters from the current URL
const getURLParameters = () => {
    var currentUrl = window.location.href;
    console.log("Current URL:", currentUrl);

    const parameters = getParameters(currentUrl);
    const liffState = parameters['liff.state'];
    const liffStateParams = getParameters(liffState ? decodeURIComponent(liffState) : '');
    console.log(liffStateParams);
    // console.log("Parameters:", parameters);
    // console.log("Value of id in liff.state:", liffStateParams.id);
    // console.log("Value of lat in liff.state:", liffStateParams.lat);
    // console.log("Value of long in liff.state:", liffStateParams.long);
    // console.log("Value of province in liff.state:", liffStateParams.province);
    // console.log("Value of location in liff.state:", liffStateParams.location);
    // console.log("Value of ar_url in liff.state:", liffStateParams.ar_url);
    // console.log("Value of liff.referrer:", parameters['liff.referrer']);
    return {
        parameters,
        liffState: liffStateParams,
        liffReferrer: parameters['liff.referrer']
    };
};

export { getURLParameters };
