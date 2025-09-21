import express from "express";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import { WaterGuruAPI } from "../../dist/index.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = 3000;

// Serve static files (HTML, CSS, client JS if needed)
app.use(express.static(path.join(__dirname, "..")));

app.use((req, _res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// API endpoint to proxy WaterGuru data
app.get("/dashboard", async (req, res) => {
  const username = req.query.username as string;
  const password = req.query.password as string;

  if (!username || !password) {
    return res.status(400).json({ error: "Username and password required" });
  }

  try {
    const api = new WaterGuruAPI({ username, password });
    const dashboard = await api.getDashboard();
    res.json(dashboard);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
});

app.listen(port, () => {
  console.log(`Demo server running at http://localhost:${port}`);
});
