# GitHub Skill Matrix API

This API generates a skill matrix in SVG format based on a GitHub user's repositories. The matrix displays programming languages used by the user, with skill levels calculated from the number of repositories in each language.

## Demo

Below are examples of each theme.

### Available Themes

- **Light Theme**  
  <a href="https://github-skill-matrix.onrender.com/api/skills/JohnDev19/light">
    <img src="https://github-skill-matrix.onrender.com/api/skills/JohnDev19/light" alt="Light Theme" width="300">
  </a>

- **Dark Theme**  
  <a href="https://github-skill-matrix.onrender.com/api/skills/JohnDev19/dark">
    <img src="https://github-skill-matrix.onrender.com/api/skills/JohnDev19/dark" alt="Dark Theme" width="300">
  </a>

- **Vibrant Theme**  
  <a href="https://github-skill-matrix.onrender.com/api/skills/JohnDev19/vibrant">
    <img src="https://github-skill-matrix.onrender.com/api/skills/JohnDev19/vibrant" alt="Vibrant Theme" width="300">
  </a>

- **Neon Theme**  
  <a href="https://github-skill-matrix.onrender.com/api/skills/JohnDev19/neon">
    <img src="https://github-skill-matrix.onrender.com/api/skills/JohnDev19/neon" alt="Neon Theme" width="300">
  </a>

- **Futuristic Theme**  
  <a href="https://github-skill-matrix.onrender.com/api/skills/JohnDev19/futuristic">
    <img src="https://github-skill-matrix.onrender.com/api/skills/JohnDev19/futuristic" alt="Futuristic Theme" width="300">
  </a>

- **Pastel Theme**  
  <a href="https://github-skill-matrix.onrender.com/api/skills/JohnDev19/pastel">
    <img src="https://github-skill-matrix.onrender.com/api/skills/JohnDev19/pastel" alt="Pastel Theme" width="300">
  </a>

- **Retro Theme**  
  <a href="https://github-skill-matrix.onrender.com/api/skills/JohnDev19/retro">
    <img src="https://github-skill-matrix.onrender.com/api/skills/JohnDev19/retro" alt="Retro Theme" width="300">
  </a>

- **Nature Theme**  
  <a href="https://github-skill-matrix.onrender.com/api/skills/JohnDev19/nature">
    <img src="https://github-skill-matrix.onrender.com/api/skills/JohnDev19/nature" alt="Nature Theme" width="300">
  </a>

- **Warm Theme**  
  <a href="https://github-skill-matrix.onrender.com/api/skills/JohnDev19/warm">
    <img src="https://github-skill-matrix.onrender.com/api/skills/JohnDev19/warm" alt="Warm Theme" width="300">
  </a>

- **Cool Theme**  
  <a href="https://github-skill-matrix.onrender.com/api/skills/JohnDev19/cool">
    <img src="https://github-skill-matrix.onrender.com/api/skills/JohnDev19/cool" alt="Cool Theme" width="300">
  </a>

---

## Usage

### API Endpoints

#### Get Skill Matrix

- **Endpoint**: `/api/skills/:username/:theme?`
- **Method**: `GET`
- **Description**: Generates an SVG skill matrix for a specified GitHub username with an optional theme.

- **Parameters**:
  - `username` (required): The GitHub username.
  - `theme` (optional): Theme for the SVG. Options include:
    - `light`, `dark`, `vibrant`, `neon`, `futuristic`, `pastel`, `retro`, `nature`, `warm`, `cool`

- **Example Request**:

  ```bash
  curl https://github-skill-matrix.onrender.com/api/skills/JohnDev19/cool
  ```

- **Example Response**:
  The endpoint returns an SVG image based on the user’s repositories and selected theme. This SVG includes each language used by the user, along with a visual skill level indicator based on the number of repositories in each language.

### Installation & Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/JohnDev19/GitHub-Skill-Matrix.git
   cd GitHub-Skill-Matrix
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add your environment variables:

   ```plaintext
   PORT=3000
   ```

4. Start the server:

   ```bash
   node index.js
   ```

5. The API will be available at `http://localhost:3000`.

### Configuration

- **PORT**: Set the port in `.env`. The default is `3000` if not specified.

---

## Contributing

Contributions to add more themes or enhance the functionality are welcome. Please create a pull request or submit an issue for new ideas or bug reports.

---

## License

This project is licensed under the MIT [LICENSE](LICENSE).

