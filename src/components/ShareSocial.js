import React from 'react';

// function ShareSocial() {
//     return (
//         <>
//             <div>שיתוף</div>
            

//         </>
//     );
// }

// export default ShareSocial;



// interface IWebShareImageProps { }

async function onShare() {
    const response = await fetch('yakir1.jpg');
    const blob = await response.blob();
    const filesArray = [new File([blob], 'נר זיכרון', { type: "image/jpeg", lastModified: new Date().getTime() })];
    const shareData = {
        files: filesArray,
    };
    console.log(await fetch('yakir1.jpg'));
    navigator.share(shareData).then(() => {
        console.log('Shared successfully');
    })
}

// function WebShareImage({ }: IWebShareImageProps): JSX.Element {
function ShareSocial() {
    return (
        <div className="exampleContents">
            <h1>Sharing an Image</h1>
            <img src="yakir1.jpg" alt='Nacho Libre saying "take it easy"' />
            <button className="pure-button pure-button-primary share-button" onClick={onShare}>Share Image</button>
        </div>
    );
}

export default ShareSocial;