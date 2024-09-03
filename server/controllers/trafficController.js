import axios from 'axios';

const baseURL = 'https://api.tomtom.com/traffic/map';
const versionNumber = '4'; // Adjust as needed
const style = 'absolute'; // Adjust as needed
const format = 'png'; // Adjust as needed

export const getTrafficFlowMap = async (req, res) => {
    try {
        const { zoom, x, y, thickness = 10, tileSize = 256 } = req.query;
        const apiKey = process.env.TOMTOM_API_KEY;
        
        if (!zoom || !x || !y) {
            return res.status(400).json({ error: 'Missing required query parameters' });
        }

        const url = `${baseURL}/${versionNumber}/tile/flow/${style}/${zoom}/${x}/${y}.${format}?key=${apiKey}&thickness=${thickness}&tileSize=${tileSize}`;
        
        // Fetch the traffic flow map from TomTom API
        const response = await axios.get(url, { responseType: 'arraybuffer' });

        // Send the image response
        res.set('Content-Type', `image/${format}`);
        res.send(response.data);
    } catch (error) {
        console.error('Error fetching traffic flow map:', error);
        res.status(500).json({ error: 'Failed to fetch traffic flow map' });
    }
};
