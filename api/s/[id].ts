import type { VercelRequest, VercelResponse } from '@vercel/node';


const apiURL = process.env.VITE_API_ENDPOINT; // AWS Lambda endpoint


export default async function handler(req: VercelRequest, res: VercelResponse) {
    const { id } = req.query; // GET path parameter


    if (!id) {
    res.writeHead(400).end('Missing id');
    return;
    }
    try {
    // Call AWS Lambda to get the original URL
    const awsResponse = await fetch(`${apiURL}/id/${id}`, { method: 'GET',});

    if (!awsResponse.ok) {
    // ID not found on AWS
    res.writeHead(302, { Location: '/notfound' });
    res.end();
    return;
    }


    const data = await awsResponse.json(); // { shortUrl: 'https://...' }
    const originalUrl = data.long_url;


    if (!originalUrl) {
    // No URL returned
    res.writeHead(302, { Location: '/notfound' });
    res.end();
    return;
    }
    res.writeHead(301, { Location: originalUrl });
    res.end();
    } catch (err) {
        console.error('Error calling AWS:', err);
        if (!res.writableEnded) {
            res.writeHead(302, { Location: '/notfound' });
            res.end();
        }
    }
}