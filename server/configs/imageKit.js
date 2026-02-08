// import ImageKit from '@imagekit/nodejs';
// const imagekit = new ImageKit({
   

//     publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
//     privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
//     urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT
// });


// export default imagekit

import ImageKit from '@imagekit/nodejs';

// Validate environment variables
if (!process.env.IMAGEKIT_PRIVATE_KEY || 
    !process.env.IMAGEKIT_PUBLIC_KEY || 
    !process.env.IMAGEKIT_URL_ENDPOINT) {
    console.error('❌ ImageKit environment variables missing!');
    console.error('Required: IMAGEKIT_PRIVATE_KEY, IMAGEKIT_PUBLIC_KEY, IMAGEKIT_URL_ENDPOINT');
    throw new Error('ImageKit configuration incomplete');
}

const imagekit = new ImageKit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT
});

export default imagekit;