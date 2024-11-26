import Together from 'together-ai';

const together = new Together({ 
    apiKey: import.meta.env.VITE_TOGETHER_API_KEY 
});

export async function generateImage(prompt) {
    try {
        const response = await together.images.create({
            model: "black-forest-labs/FLUX.1-schnell-Free",
            prompt: `photorealistic architectural visualization, modern house design, high-quality 3D rendering, professional real estate photography style: ${prompt}, exterior view, beautiful lighting, high resolution, architectural photography`,
            width: 1024,
            height: 1024,
            steps: 4,
            n: 1,
            response_format: "b64_json"
        });
        
        return response.data[0].b64_json;
    } catch (error) {
        console.error('Error generating house:', error);
        throw error;
    }
}