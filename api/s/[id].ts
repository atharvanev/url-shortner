// This should be api/s/[id].ts
import type { VercelRequest, VercelResponse } from '@vercel/node';

export default function handler(req: VercelRequest, res: VercelResponse) {
    const { id } = req.query;
    
    res.status(200).json({ 
        message: 'Dynamic route works!',
        receivedId: id 
    });
}