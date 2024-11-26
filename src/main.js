import './style.css';
import { generateImage } from './api';

// Hamburger menu functionality
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    }
});

// Close menu when clicking a link
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// Image generation functionality
document.getElementById('generateBtn').addEventListener('click', async () => {
    const button = document.getElementById('generateBtn');
    const loading = document.getElementById('loading');
    const image = document.getElementById('image');
    const logoPrompt = document.getElementById('logoPrompt');
    const actionButtons = document.getElementById('actionButtons');
    
    button.disabled = true;
    loading.style.display = 'flex';
    image.style.display = 'none';
    actionButtons.style.display = 'none';

    try {
        const imageData = await generateImage(logoPrompt.value);
        image.src = `data:image/png;base64,${imageData}`;
        image.style.display = 'block';
        actionButtons.style.display = 'flex';
    } catch (error) {
        console.error('Error:', error);
        alert('Failed to generate house');
    } finally {
        button.disabled = false;
        loading.style.display = 'none';
    }
});

document.getElementById('downloadBtn').addEventListener('click', () => {
    const image = document.getElementById('image');
    const link = document.createElement('a');
    link.download = 'house.png';
    link.href = image.src;
    link.click();
});