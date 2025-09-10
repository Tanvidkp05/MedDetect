const { PythonShell } = require('python-shell');
const path = require('path');

class HeartDiseaseModel {
  constructor() {
    // Use absolute paths to avoid issues with spaces in directory names
    this.pythonScriptPath = path.resolve(__dirname, '..', 'python', 'predict.py');
    this.assetsPath = path.resolve(__dirname, '..', 'assets');
  }

  async predict(data) {
    return new Promise((resolve, reject) => {
      const options = {
        mode: 'text',
        pythonPath: process.env.PYTHON_PATH || 'python', // Default to 'python' if env var not set
        scriptPath: path.resolve(__dirname, '..', 'python'),
        args: [
          JSON.stringify(data),
          this.assetsPath
        ]
      };

      console.log('Python path:', options.pythonPath);
      console.log('Script path:', options.scriptPath);

      PythonShell.run('predict.py', options, (err, results) => {
        if (err) {
          console.error('Python error details:', err);
          return reject(new Error(`Prediction failed: ${err.message}`));
        }
        try {
          resolve(JSON.parse(results[0]));
        } catch (parseErr) {
          reject(new Error('Failed to parse prediction result'));
        }
      });
    });
  }
}

module.exports = new HeartDiseaseModel();