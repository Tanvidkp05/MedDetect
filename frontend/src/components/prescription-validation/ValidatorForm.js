import React, { useState } from "react";
import {
  Upload,
  FileText,
  AlertTriangle,
  CheckCircle,
  User,
  Pill,
  Shield,
  Activity,
} from "lucide-react";
import "./ValidatorForm.css"; // Import the CSS file

const ValidatorForm = () => {
  const [activeTab, setActiveTab] = useState("upload");
  const [prescriptionFile, setPrescriptionFile] = useState(null);
  const [extractedData, setExtractedData] = useState(null);
  const [validationResults, setValidationResults] = useState(null);
  const [userProfile, setUserProfile] = useState({
    name: "",
    age: "",
    weight: "",
    allergies: [],
    chronicConditions: [],
    currentMedications: [],
    geneticRisks: [],
  });

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setPrescriptionFile(file);
      // Simulate OCR processing
      setTimeout(() => {
        setExtractedData({
          medications: [
            { name: "Metformin", dosage: "500mg", frequency: "Twice daily" },
            { name: "Lisinopril", dosage: "10mg", frequency: "Once daily" },
          ],
          prescribedBy: "Dr. Smith",
          date: "2025-09-10",
          instructions: "Take with food",
        });
        setActiveTab("extracted");
      }, 2000);
    }
  };

  const handleValidation = () => {
    // Simulate AI validation process
    setValidationResults({
      riskLevel: "medium",
      warnings: [
        {
          type: "interaction",
          message:
            "Potential interaction between Metformin and current medication",
          severity: "medium",
        },
        {
          type: "allergy",
          message:
            "Patient allergic to sulfa drugs - check medication components",
          severity: "high",
        },
      ],
      recommendations: [
        "Consider alternative to Lisinopril due to genetic predisposition",
        "Monitor blood glucose levels more frequently",
        "Adjust dosage based on kidney function",
      ],
      safetyScore: 78,
    });
    setActiveTab("results");
  };

  const TabButton = ({ id, label, icon: Icon, active }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`tab-button ${
        active ? "tab-button-active" : "tab-button-inactive"
      }`}
    >
      <Icon size={20} />
      {label}
    </button>
  );

  return (
    <div className="app-container">
      {/* Header */}
      <header className="app-header">
        <div className="header-content">
          <div className="logo-section">
            <div className="logo-icon">
              <Shield color="white" size={24} />
            </div>
            <div className="logo-text">
              <h1 className="app-title">MedDetect</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="main-content">
        {/* Navigation Tabs */}
        <div className="tab-container">
          <TabButton
            id="upload"
            label="Upload Prescription"
            icon={Upload}
            active={activeTab === "upload"}
          />
          <TabButton
            id="profile"
            label="Patient Profile"
            icon={User}
            active={activeTab === "profile"}
          />
          <TabButton
            id="extracted"
            label="Extracted Data"
            icon={FileText}
            active={activeTab === "extracted"}
          />
          <TabButton
            id="results"
            label="Validation Results"
            icon={CheckCircle}
            active={activeTab === "results"}
          />
        </div>

        {/* Upload Tab */}
        {activeTab === "upload" && (
          <div className="card">
            <div className="upload-section">
              <div className="upload-icon">
                <Upload color="#2563eb" size={32} />
              </div>
              <h2 className="section-title">Upload Prescription</h2>
              <p className="section-description">
                Upload your prescription image or PDF for AI-powered validation
              </p>

              <div className="upload-area">
                <input
                  type="file"
                  accept="image/*,.pdf"
                  onChange={handleFileUpload}
                  className="file-input"
                  id="prescription-upload"
                />
                <label htmlFor="prescription-upload" className="upload-label">
                  <div className="upload-content">
                    <FileText color="#9ca3af" size={48} />
                    <p className="upload-text">Click to upload prescription</p>
                    <p className="upload-subtext">
                      Supports JPG, PNG, PDF files
                    </p>
                  </div>
                </label>
              </div>

              {prescriptionFile && (
                <div className="upload-success">
                  <p className="success-text">
                    ✓ {prescriptionFile.name} uploaded successfully
                  </p>
                  <p className="processing-text">Processing with OCR...</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Patient Profile Tab */}
        {activeTab === "profile" && (
          <div className="card">
            <h2 className="section-title">Patient Profile</h2>

            <div className="form-grid">
              <div className="form-column">
                <div className="form-group">
                  <label className="form-label">Full Name</label>
                  <input
                    type="text"
                    value={userProfile.name}
                    onChange={(e) =>
                      setUserProfile({ ...userProfile, name: e.target.value })
                    }
                    className="form-input"
                    placeholder="Enter patient name"
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Age</label>
                    <input
                      type="number"
                      value={userProfile.age}
                      onChange={(e) =>
                        setUserProfile({ ...userProfile, age: e.target.value })
                      }
                      className="form-input"
                      placeholder="Age"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Weight (kg)</label>
                    <input
                      type="number"
                      value={userProfile.weight}
                      onChange={(e) =>
                        setUserProfile({
                          ...userProfile,
                          weight: e.target.value,
                        })
                      }
                      className="form-input"
                      placeholder="Weight"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Known Allergies</label>
                  <textarea
                    className="form-textarea"
                    placeholder="List known allergies (e.g., Penicillin, Sulfa drugs)"
                  />
                </div>
              </div>

              <div className="form-column">
                <div className="form-group">
                  <label className="form-label">Chronic Conditions</label>
                  <div className="checkbox-group">
                    {["Diabetes", "Hypertension", "Heart Disease", "PCOS"].map(
                      (condition) => (
                        <label key={condition} className="checkbox-label">
                          <input type="checkbox" className="checkbox-input" />
                          <span className="checkbox-text">{condition}</span>
                        </label>
                      )
                    )}
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Current Medications</label>
                  <textarea
                    className="form-textarea"
                    placeholder="List current medications and dosages"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Genetic Risk Factors</label>
                  <div className="checkbox-group">
                    {[
                      "Family history of diabetes",
                      "Cardiovascular predisposition",
                      "Drug metabolism variants",
                    ].map((risk) => (
                      <label key={risk} className="checkbox-label">
                        <input type="checkbox" className="checkbox-input" />
                        <span className="checkbox-text">{risk}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Extracted Data Tab */}
        {activeTab === "extracted" && extractedData && (
          <div className="card">
            <h2 className="section-title">Extracted Prescription Data</h2>

            <div className="extracted-grid">
              <div className="medication-section">
                <h3 className="subsection-title">
                  <Pill color="#2563eb" size={20} />
                  Prescribed Medications
                </h3>
                <div className="medication-list">
                  {extractedData.medications.map((med, index) => (
                    <div key={index} className="medication-card">
                      <h4 className="medication-name">{med.name}</h4>
                      <p className="medication-detail">Dosage: {med.dosage}</p>
                      <p className="medication-detail">
                        Frequency: {med.frequency}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="details-section">
                <h3 className="subsection-title">Prescription Details</h3>
                <div className="details-list">
                  <div className="detail-item">
                    <span className="detail-label">Prescribed by:</span>
                    <span className="detail-value">
                      {extractedData.prescribedBy}
                    </span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Date:</span>
                    <span className="detail-value">{extractedData.date}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Instructions:</span>
                    <span className="detail-value">
                      {extractedData.instructions}
                    </span>
                  </div>
                </div>

                <button
                  onClick={handleValidation}
                  className="primary-button validate-button"
                >
                  Validate Prescription
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Validation Results Tab */}
        {activeTab === "results" && validationResults && (
          <div className="results-container">
            {/* Safety Score */}
            <div className="card">
              <div className="safety-score-header">
                <h2 className="section-title">Safety Score</h2>
                <div className="score-display">
                  <div className="score-number">
                    {validationResults.safetyScore}/100
                  </div>
                  <div className="score-label">Medium Risk</div>
                </div>
              </div>
              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{ width: `${validationResults.safetyScore}% `}}
                />
              </div>
            </div>

            {/* Warnings */}
            <div className="card">
              <h3 className="subsection-title warnings-title">
                <AlertTriangle color="#ef4444" size={24} />
                Warnings & Alerts
              </h3>
              <div className="warnings-list">
                {validationResults.warnings.map((warning, index) => (
                  <div
                    key={index}
                    className={`warning-card ${
                      warning.severity === "high"
                        ? "warning-high"
                        : "warning-medium"
                    }`}
                  >
                    <div className="warning-header">
                      <span
                        className={`severity-badge ${
                          warning.severity === "high"
                            ? "severity-high"
                            : "severity-medium"
                        }`}
                      >
                        {warning.severity.toUpperCase()}
                      </span>
                      <span className="warning-type">{warning.type}</span>
                    </div>
                    <p className="warning-message">{warning.message}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Recommendations */}
            <div className="card">
              <h3 className="subsection-title recommendations-title">
                <Activity color="#22c55e" size={24} />
                AI Recommendations
              </h3>
              <div className="recommendations-list">
                {validationResults.recommendations.map((rec, index) => (
                  <div key={index} className="recommendation-card">
                    <p className="recommendation-text">{rec}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="action-buttons">
              <button className="action-button primary-action">
                Generate Report
              </button>
              <button className="action-button secondary-action">
                Consult Doctor
              </button>
              <button className="action-button success-action">
                Alternative Suggestions
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ValidatorForm;