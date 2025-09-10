const { PythonShell } = require('python-shell');
const path = require('path');

class HeartDiseaseModel {
    constructor() {
        this.pythonScriptPath = path.resolve(__dirname, 'python', 'predict.py');
        this.pythonDir = path.resolve(__dirname, 'python');
    }

    async predict(data) {
        return new Promise((resolve, reject) => {
            const options = {
                mode: 'text',
                pythonPath: process.env.PYTHON_PATH || 'python',
                scriptPath: this.pythonDir,
                args: [JSON.stringify(data)]
            };

            console.log('Executing Python prediction with options:', {
                pythonPath: options.pythonPath,
                scriptPath: options.scriptPath,
                hasData: !!data
            });

            PythonShell.run('predict.py', options, (err, results) => {
                if (err) {
                    console.error('Python error details:', err);
                    return reject(new Error(`Prediction failed: ${err.message}`));
                }

                try {
                    console.log('Python output:', results);
                    const result = JSON.parse(results[0]);
                    resolve(result);
                } catch (parseErr) {
                    console.error('Failed to parse Python output:', results);
                    reject(new Error('Failed to parse prediction result'));
                }
            });
        });
    }
}

module.exports = new HeartDiseaseModel();