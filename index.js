const express = require('express');
const axios = require('axios');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const themes = {
    light: {
        background: '#ffffff',
        text: '#000000',
        progressBarBg: '#e0e0e0',
        progressBarFill: '#3f51b5',
        titleBg: '#f0f0f0',
        titleBorder: '#cccccc',
    },
    dark: {
        background: '#1a1a1a',
        text: '#ffffff',
        progressBarBg: '#555555',
        progressBarFill: '#ff4081',
        titleBg: '#333333',
        titleBorder: '#444444',
    },
    vibrant: {
        background: '#ffeb3b',
        text: '#3f51b5',
        progressBarBg: '#ffcc00',
        progressBarFill: '#ff5722',
        titleBg: '#ffe082',
        titleBorder: '#ffb300',
    },
    neon: {
        background: '#000000',
        text: '#00ff00',
        progressBarBg: '#333333',
        progressBarFill: '#ff00ff',
        titleBg: '#1a1a1a',
        titleBorder: '#00ff00',
    },
    futuristic: {
        background: '#0a0a0a',
        text: '#00ffff',
        progressBarBg: '#1a1a1a',
        progressBarFill: '#00ffcc',
        titleBg: '#0b3d91',
        titleBorder: '#00ffff',
    },
    pastel: {
        background: '#f9f9f9',
        text: '#6c757d',
        progressBarBg: '#e2e2e2',
        progressBarFill: '#ff6f61',
        titleBg: '#f1f1f1',
        titleBorder: '#dddddd',
    },
    retro: {
        background: '#ffccbc',
        text: '#d32f2f',
        progressBarBg: '#ffab91',
        progressBarFill: '#ff7043',
        titleBg: '#ffccbc',
        titleBorder: '#d32f2f',
    },
    nature: {
        background: '#e8f5e9',
        text: '#388e3c',
        progressBarBg: '#c8e6c9',
        progressBarFill: '#4caf50',
        titleBg: '#a5d6a7',
        titleBorder: '#388e3c',
    },
    warm: {
        background: '#fff3e0',
        text: '#e65100',
        progressBarBg: '#ffcc80',
        progressBarFill: '#ffb300',
        titleBg: '#ffe0b2',
        titleBorder: '#e65100',
    },
    cool: {
        background: '#e0f7fa',
        text: '#00796b',
        progressBarBg: '#b2ebf2',
        progressBarFill: '#00bcd4',
        titleBg: '#80deea',
        titleBorder: '#00796b',
    },
    starrynight: {
        background: '#001f3f',
        text: '#ffffff',
        progressBarBg: '#003366',
        progressBarFill: '#ffcc00',
        titleBg: '#001f3f',
        titleBorder: '#ffcc00',
    },
    cyberpunk: {
        background: '#2b0035',
        text: '#00ffcc',
        progressBarBg: '#5e2b4d',
        progressBarFill: '#ff007f',
        titleBg: '#2b0035',
        titleBorder: '#00ffcc',
    },
    ocean: {
        background: '#0077be',
        text: '#ffffff',
        progressBarBg: '#005f8c',
        progressBarFill: '#00bcd4',
        titleBg: '#0077be',
        titleBorder: '#00bcd4',
    },
    hacker: {
        background: '#0f0f0f',
        text: '#00ff00',
        progressBarBg: '#1a1a1a',
        progressBarFill: '#00ff00',
        titleBg: '#0f0f0f',
        titleBorder: '#00ff00',
    },
    twilight: {
        background: '#4a4e69',
        text: '#f9f7f7',
        progressBarBg: '#22223b',
        progressBarFill: '#9a8c98',
        titleBg: '#4a4e69',
        titleBorder: '#9a8c98',
    },
    autumn: {
        background: '#ffcc00',
        text: '#4a4e69',
        progressBarBg: '#ffb300',
        progressBarFill: '#ff6f61',
        titleBg: '#ffcc00',
        titleBorder: '#4a4e69',
    },
    ice: {
        background: '#e0f7fa',
        text: '#004d40',
        progressBarBg: '#b2ebf2',
        progressBarFill: '#009688',
        titleBg: '#e0f7fa',
        titleBorder: '#004d40',
    },
    galaxy: {
        background: '#1a1a2e',
        text: '#e94560',
        progressBarBg: '#16213e',
        progressBarFill: '#0f3460',
        titleBg: '#1a1a2e',
        titleBorder: '#e94560',
    },
    monochrome: {
        background: '#ffffff',
        text: '#000000',
        progressBarBg: '#cccccc',
        progressBarFill: '#000000',
        titleBg: '#ffffff',
        titleBorder: '#000000',
    },
};

const generateSVG = (skills, theme) => {
    const selectedTheme = themes[theme] || themes.light;

    const skillElements = skills.map((skill, index) => {
        const levelPercentage = skill.level === 'Expert' ? 100 : skill.level === 'Intermediate' ? 70 : 30;
        return `
            <g>
                <text x="20" y="${index * 80 + 100}" font-family="${selectedTheme.fontFamily}" font-size="${selectedTheme.textFontSize}" fill="${selectedTheme.text}">${skill.skill}</text>
                <text x="20" y="${index * 80 + 130}" font-family="${selectedTheme.fontFamily}" font-size="14" fill="${selectedTheme.text}">Level: ${skill.level} (${levelPercentage}%)</text>
                <rect x="200" y="${index * 80 + 90}" width="180" height="10" fill="${selectedTheme.progressBarBg}" rx="5" ry="5"/>
                <rect x="200" y="${index * 80 + 90}" width="${levelPercentage * 1.8}" height="10" fill="${selectedTheme.progressBarFill}" rx="5" ry="5" class="progress-bar">
                    <animate attributeName="width" from="0" to="${levelPercentage * 1.8}" dur="1s" fill="freeze"/>
                </rect>
            </g>
        `;
    }).join('');

    return `
        <svg width="400" height="${skills.length * 80 + 140}" xmlns="http://www.w3.org/2000/svg">
            <style>
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                text { animation: fadeIn 1s ease-in; }
            </style>
            <rect width="100%" height="100%" fill="${selectedTheme.background}"/>
            <rect x="0 " y="0" width="400" height="60" fill="${selectedTheme.titleBg}" stroke="${selectedTheme.titleBorder}" stroke-width="2"/>
            <text x="10" y="40" font-family="${selectedTheme.fontFamily}" font-size="${selectedTheme.titleFontSize}" fill="${selectedTheme.text}">Skill Matrix</text>
            <rect x="0" y="60" width="400" height="10" fill="${selectedTheme.background}"/>
            ${skillElements}
        </svg>
    `;
};

app.get('/health', (req, res) => {
    res.status(200).json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.get('/api/skills/:username/:theme?', async (req, res) => {
    const username = req.params.username;
    const theme = req.params.theme || 'light';

    if (!username) {
        return res.status(400).json({ error: 'Username is required' });
    }

    if (theme && !themes[theme]) {
        return res.status(400).json({ error: 'Invalid theme' });
    }

    try {
        const githubToken = process.env.GITHUB_TOKEN;
        const headers = {
            'Accept': 'application/vnd.github.v3+json',
            ...(githubToken && { 'Authorization': `token ${githubToken}` })
        };

        const reposResponse = await axios.get(`https://api.github.com/users/${username}/repos`, {
            headers,
            timeout: 10000
        });

        const repos = reposResponse.data;

        if (!Array.isArray(repos)) {
            throw new Error('Invalid response from GitHub API');
        }

        const skillMatrix = {};

        for (const repo of repos) {
            if (repo.language) {
                if (!skillMatrix [repo.language]) {
                    skillMatrix[repo.language] = { level: 'Beginner', count: 0, size: 0 };
                }
                skillMatrix[repo.language].count++;
                skillMatrix[repo.language].size += repo.size || 0;
            }
        }

        for (const language in skillMatrix) {
            const { count, size } = skillMatrix[language];
            if (count > 5 && size > 1000) {
                skillMatrix[language].level = 'Expert';
            } else if (count > 2 && size > 500) {
                skillMatrix[language].level = 'Intermediate';
            }
        }

        const skillArray = Object.entries(skillMatrix)
            .map(([skill, { level }]) => ({ skill, level }))
            .sort((a, b) => {
                const levelOrder = { Expert: 3, Intermediate: 2, Beginner: 1 };
                return levelOrder[b.level] - levelOrder[a.level];
            });

        const svg = generateSVG(skillArray, theme);
        res.set('Content-Type', 'image/svg+xml');
        res.send(svg);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while fetching data' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
