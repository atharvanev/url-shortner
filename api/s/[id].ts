// Replace your api/s/[id].ts with this debug version
import type { VercelRequest, VercelResponse } from '@vercel/node';

const apiURL = process.env.API_ENDPOINT;

export default async function handler(req: VercelRequest, res: VercelResponse) {
    try {
        console.log('=== REDIRECT HANDLER START ===');
        console.log('Request method:', req.method);
        console.log('Request URL:', req.url);
        console.log('Query params:', req.query);
        
        const { id } = req.query;
        console.log('Extracted ID:', id);
        console.log('API URL configured:', !!apiURL);
        console.log('API URL value:', apiURL);

        if (!id) {
            console.log('No ID provided, returning 400');
            return res.status(400).json({ error: 'Missing id' });
        }

        if (!apiURL) {
            console.log('No API URL configured, returning 500');
            return res.status(500).json({ error: 'API_ENDPOINT not configured' });
        }

        const fullUrl = `${apiURL}/id/${id}`;
        console.log('About to call AWS:', fullUrl);

        const awsResponse = await fetch(fullUrl, { method: 'GET' });
        console.log('AWS response status:', awsResponse.status);
        console.log('AWS response ok:', awsResponse.ok);

        if (!awsResponse.ok) {
            console.log('AWS response not ok, redirecting to notfound');
            return res.redirect(302, '/notfound');
        }

        const data = await awsResponse.json();
        console.log('AWS response data:', data);
        
        const originalUrl = data.long_url;
        console.log('Original URL:', originalUrl);

        if (!originalUrl) {
            console.log('No original URL, redirecting to notfound');
            return res.redirect(302, '/notfound');
        }

        console.log('Redirecting to:', originalUrl);
        return res.redirect(301, originalUrl);

    } catch (err) {
        console.error('=== ERROR IN HANDLER ===');
        console.error('Error details:', err);
        console.error('Error message:', err instanceof Error ? err.message : 'Unknown error');
        console.error('Error stack:', err instanceof Error ? err.stack : 'No stack');
        
        return res.status(500).json({ 
            error: 'Internal server error',
            details: err instanceof Error ? err.message : 'Unknown error'
        });
    }
}